import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/lib/razorpay';
import { dbStore } from '@/lib/db/store';

// Cache processed webhook event IDs to guarantee idempotency
const processedEvents = new Set<string>();

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get('x-razorpay-signature');
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || 'dev_webhook_secret_2026';

    const rawBody = await request.text();

    if (!signature) {
      return NextResponse.json(
        { error: { code: 'MISSING_SIGNATURE', message: 'Webhook signature header missing' } },
        { status: 400 }
      );
    }

    // Verify webhook cryptographic signature
    const isValid = verifyWebhookSignature(rawBody, signature, webhookSecret);
    if (!isValid) {
      console.warn('[SECURITY] Razorpay webhook signature invalid');
      return NextResponse.json(
        { error: { code: 'INVALID_SIGNATURE', message: 'Invalid webhook signature' } },
        { status: 400 }
      );
    }

    const event = JSON.parse(rawBody);
    const eventId = event.event_id || event.id;

    // Idempotency check
    if (eventId && processedEvents.has(eventId)) {
      console.log(`[WEBHOOK] Duplicate event ${eventId} safely ignored`);
      return NextResponse.json({ success: true, message: 'Event already processed' });
    }

    if (eventId) {
      processedEvents.add(eventId);
    }

    // Handle payment.captured / payment.authorized events
    if (event.event === 'payment.captured' || event.event === 'order.paid') {
      const paymentEntity = event.payload?.payment?.entity;
      const orderId = paymentEntity?.order_id;
      const paymentId = paymentEntity?.id;

      if (orderId && paymentId) {
        const paymentRecord = dbStore.payments.find((p) => p.provider_order_id === orderId);
        if (paymentRecord) {
          const booking = dbStore.bookings.find((b) => b.id === paymentRecord.booking_id);
          if (booking && booking.status !== 'CONFIRMED') {
            await dbStore.confirmPaymentAndBooking(
              booking.id,
              orderId,
              paymentId,
              signature
            );
            console.log(`[WEBHOOK] Successfully confirmed booking ${booking.public_booking_id} via webhook`);
          }
        }
      }
    }

    return NextResponse.json({ success: true, message: 'Webhook processed successfully' });
  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: { code: 'WEBHOOK_ERROR', message: 'Internal error processing webhook' } },
      { status: 500 }
    );
  }
}
