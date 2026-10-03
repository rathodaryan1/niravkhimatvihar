import { NextRequest, NextResponse } from 'next/server';
import { cancelBookingSchema } from '@/lib/validation/schemas';
import { dbStore } from '@/lib/db/store';
import { sendNotification } from '@/lib/notifications';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = cancelBookingSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: validated.error.errors[0]?.message || 'Invalid cancellation request',
          },
        },
        { status: 400 }
      );
    }

    const { publicBookingId, phone, reason } = validated.data;
    const cancelledBooking = await dbStore.cancelBooking(publicBookingId, phone, reason);

    const customer = dbStore.customers.find((c) => c.id === cancelledBooking.customer_id);

    // Notify cancellation
    if (customer?.email) {
      await sendNotification({
        to: customer.email,
        type: 'BOOKING_CANCELLED',
        booking: cancelledBooking,
        channel: 'EMAIL',
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        publicBookingId: cancelledBooking.public_booking_id,
        status: cancelledBooking.status,
        cancelledAt: cancelledBooking.cancelled_at,
        cancellationReason: cancelledBooking.cancellation_reason,
      },
    });
  } catch (error: any) {
    console.error('Cancel Booking API Error:', error);
    return NextResponse.json(
      {
        error: {
          code: 'CANCELLATION_FAILED',
          message: error.message || 'Unable to cancel booking',
        },
      },
      { status: 400 }
    );
  }
}
