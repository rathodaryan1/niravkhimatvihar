import { NextRequest, NextResponse } from 'next/server';
import { dbStore } from '@/lib/db/store';
import { verifyAdminToken } from '@/lib/auth/admin-auth';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token =
      request.cookies.get('nkv_admin_token')?.value ||
      request.headers.get('authorization')?.replace('Bearer ', '');

    const session = token ? verifyAdminToken(token) : null;
    if (!session) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Admin authentication required' } },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json().catch(() => ({}));
    const reason = body.reason || 'Admin cancelled reservation';

    const booking = await dbStore.cancelBooking(id, reason, session.adminId);

    return NextResponse.json({
      success: true,
      data: booking,
    });
  } catch (error: any) {
    console.error('Cancellation error:', error);
    return NextResponse.json(
      { error: { code: 'CANCEL_FAILED', message: error.message || 'Booking cancellation failed' } },
      { status: 400 }
    );
  }
}
