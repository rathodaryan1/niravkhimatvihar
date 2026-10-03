import { NextRequest, NextResponse } from 'next/server';
import { verifyPaymentSchema } from '@/lib/validation/schemas';
import { dbStore } from '@/lib/db/store';
import { verifyRazorpaySignature } from '@/lib/razorpay';
import { sendNotification } from '@/lib/notifications';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const normalizedBody = {
      bookingId: body.bookingId || body.booking_id,
      razorpayOrderId: body.razorpayOrderId || body.razorpay_order_id,
      razorpayPaymentId: body.razorpayPaymentId || body.razorpay_payment_id,
      razorpaySignature: body.razorpaySignature || body.razorpay_signature,
    };

    const validated = verifyPaymentSchema.safeParse(normalizedBody);

    if (!validated.success) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: validated.error.errors[0]?.message || 'Invalid payment verification parameters',
          },
        },
        { status: 400 }
      );
    }

    const { bookingId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = validated.data;

    // 1. Cryptographic HMAC-SHA256 signature verification
    const isValidSignature = verifyRazorpaySignature(
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    );

    if (!isValidSignature) {
      console.warn(
        `[SECURITY WARNING] Invalid payment signature detected for order ${razorpayOrderId}`
      );
      return NextResponse.json(
        {
          error: {
            code: 'INVALID_SIGNATURE',
            message: 'Payment verification failed: cryptographic signature mismatch.',
          },
        },
        { status: 400 }
      );
    }

    // 2. Authoritative booking confirmation in database
    const confirmedBooking = await dbStore.confirmPaymentAndBooking(
      bookingId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    );

    const customer = dbStore.customers.find((c) => c.id === confirmedBooking.customer_id);

    // 3. Dispatch confirmed booking notification
    if (customer?.email) {
      await sendNotification({
        to: customer.email,
        type: 'BOOKING_CONFIRMED',
        booking: confirmedBooking,
        channel: 'EMAIL',
      });
    }

    if (customer?.phone) {
      await sendNotification({
        to: customer.phone,
        type: 'BOOKING_CONFIRMED',
        booking: confirmedBooking,
        channel: 'WHATSAPP',
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        bookingId: confirmedBooking.id,
        publicBookingId: confirmedBooking.public_booking_id,
        status: confirmedBooking.status,
        checkIn: confirmedBooking.check_in,
        checkOut: confirmedBooking.check_out,
        totalPaid: confirmedBooking.total,
        paymentId: razorpayPaymentId,
        customerName: customer?.full_name,
      },
    });
  } catch (error: any) {
    console.error('Payment Verification API Error:', error);
    return NextResponse.json(
      {
        error: {
          code: 'VERIFICATION_ERROR',
          message: error.message || 'Payment verification failed',
        },
      },
      { status: 500 }
    );
  }
}
