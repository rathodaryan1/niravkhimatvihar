import { NextRequest, NextResponse } from 'next/server';
import { createPaymentOrderSchema } from '@/lib/validation/schemas';
import { dbStore } from '@/lib/db/store';
import { createRazorpayOrder } from '@/lib/razorpay';
import { isHoldActive } from '@/lib/booking/logic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = createPaymentOrderSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: validated.error.errors[0]?.message || 'Invalid payment order request',
          },
        },
        { status: 400 }
      );
    }

    const { bookingId, publicBookingId } = validated.data;
    const booking = dbStore.bookings.find((b) => b.id === bookingId);

    if (!booking) {
      return NextResponse.json(
        {
          error: {
            code: 'BOOKING_NOT_FOUND',
            message: 'Booking not found',
          },
        },
        { status: 404 }
      );
    }

    if (booking.status !== 'PENDING_PAYMENT') {
      return NextResponse.json(
        {
          error: {
            code: 'INVALID_STATUS',
            message: `Booking cannot be paid for because it is currently ${booking.status}`,
          },
        },
        { status: 400 }
      );
    }

    // Verify hold has not expired
    if (!isHoldActive(booking)) {
      booking.status = 'EXPIRED';
      return NextResponse.json(
        {
          error: {
            code: 'HOLD_EXPIRED',
            message: 'Your room hold has expired. Please search again for availability.',
          },
        },
        { status: 410 }
      );
    }

    // Authoritatively create Razorpay order for the server-calculated booking total
    const razorpayOrder = await createRazorpayOrder(booking.total, publicBookingId);

    // Save payment record
    await dbStore.attachPaymentOrder(bookingId, razorpayOrder.id, razorpayOrder.amount);

    return NextResponse.json({
      success: true,
      data: {
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount, // in paise
        currency: razorpayOrder.currency,
        keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_niravkhimatvihar',
        publicBookingId: booking.public_booking_id,
      },
    });
  } catch (error: any) {
    console.error('Payment Order API Error:', error);
    return NextResponse.json(
      {
        error: {
          code: 'ORDER_CREATION_FAILED',
          message: error.message || 'Unable to initiate payment order',
        },
      },
      { status: 500 }
    );
  }
}
