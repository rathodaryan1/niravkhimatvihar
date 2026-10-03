import { NextRequest, NextResponse } from 'next/server';
import { createHoldSchema } from '@/lib/validation/schemas';
import { dbStore } from '@/lib/db/store';
import { sendNotification } from '@/lib/notifications';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = createHoldSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: validated.error.errors[0]?.message || 'Invalid booking data',
          },
        },
        { status: 400 }
      );
    }

    const { roomTypeId, checkIn, checkOut, guestCount, roomCount, customer } = validated.data;

    const { booking, customer: savedCustomer } = await dbStore.createBookingHold({
      roomTypeId,
      checkIn,
      checkOut,
      guestCount,
      roomCount,
      customer,
    });

    // Fire notification (logged in dev adapter)
    await sendNotification({
      to: savedCustomer.email,
      type: 'BOOKING_CREATED',
      booking,
      channel: 'EMAIL',
    });

    return NextResponse.json({
      success: true,
      data: {
        bookingId: booking.id,
        publicBookingId: booking.public_booking_id,
        status: booking.status,
        checkIn: booking.check_in,
        checkOut: booking.check_out,
        guestCount: booking.guest_count,
        subtotal: booking.subtotal,
        serviceCharge: booking.service_charge,
        tax: booking.tax,
        discount: booking.discount,
        total: booking.total,
        holdExpiresAt: booking.hold_expires_at,
      },
    });
  } catch (error: any) {
    console.error('Booking Hold API Error:', error);
    return NextResponse.json(
      {
        error: {
          code: 'ROOM_UNAVAILABLE',
          message: error.message || 'The selected room is no longer available.',
        },
      },
      { status: 409 }
    );
  }
}
