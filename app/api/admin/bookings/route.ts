import { NextRequest, NextResponse } from 'next/server';
import { dbStore } from '@/lib/db/store';
import { verifyAdminToken } from '@/lib/auth/admin-auth';

export async function GET(request: NextRequest) {
  try {
    const token =
      request.cookies.get('nkv_admin_token')?.value ||
      request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token || !verifyAdminToken(token)) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Admin authorization required' } },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const statusFilter = searchParams.get('status');
    const search = searchParams.get('search')?.toLowerCase();

    let bookings = dbStore.bookings.map((b) => ({
      ...b,
      customer: dbStore.customers.find((c) => c.id === b.customer_id),
      room: b.booking_rooms?.[0]?.room || dbStore.rooms.find((r) => r.id === b.booking_rooms?.[0]?.room_id),
      payment: dbStore.payments.find((p) => p.booking_id === b.id),
    }));

    if (statusFilter && statusFilter !== 'ALL') {
      bookings = bookings.filter((b) => b.status === statusFilter);
    }

    if (search) {
      bookings = bookings.filter(
        (b) =>
          b.public_booking_id.toLowerCase().includes(search) ||
          b.customer?.full_name.toLowerCase().includes(search) ||
          b.customer?.phone.includes(search)
      );
    }

    // Sort newest first
    bookings.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return NextResponse.json({
      success: true,
      data: bookings,
    });
  } catch (error: any) {
    console.error('Admin Bookings API Error:', error);
    return NextResponse.json(
      { error: { code: 'SERVER_ERROR', message: 'Unable to retrieve bookings' } },
      { status: 500 }
    );
  }
}
