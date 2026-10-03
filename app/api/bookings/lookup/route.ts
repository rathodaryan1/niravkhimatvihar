import { NextRequest, NextResponse } from 'next/server';
import { bookingLookupSchema } from '@/lib/validation/schemas';
import { dbStore } from '@/lib/db/store';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = bookingLookupSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: validated.error.errors[0]?.message || 'Please provide valid Booking ID and registered Mobile Number',
          },
        },
        { status: 400 }
      );
    }

    const { publicBookingId, phone } = validated.data;
    const booking = await dbStore.lookupBooking(publicBookingId, phone);

    if (!booking) {
      return NextResponse.json(
        {
          error: {
            code: 'BOOKING_NOT_FOUND',
            message: 'No booking found matching the provided Booking ID and registered mobile number.',
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: booking.id,
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
        currency: booking.currency,
        createdAt: booking.created_at,
        customer: {
          fullName: booking.customer?.full_name,
          phone: booking.customer?.phone,
          email: booking.customer?.email,
          city: booking.customer?.city,
          state: booking.customer?.state,
        },
        rooms: (booking.booking_rooms || []).map((br) => ({
          roomNumber: br.room?.room_number || 'Standard Room',
          floor: br.room?.floor || 1,
          nightlyRate: br.nightly_rate,
        })),
        payment: booking.payment ? {
          providerOrderId: booking.payment.provider_order_id,
          providerPaymentId: booking.payment.provider_payment_id,
          status: booking.payment.status,
          amount: booking.payment.amount,
          verifiedAt: booking.payment.verified_at,
        } : null,
      },
    });
  } catch (error: any) {
    console.error('Booking Lookup API Error:', error);
    return NextResponse.json(
      {
        error: {
          code: 'SERVER_ERROR',
          message: 'Unable to retrieve booking details',
        },
      },
      { status: 500 }
    );
  }
}
