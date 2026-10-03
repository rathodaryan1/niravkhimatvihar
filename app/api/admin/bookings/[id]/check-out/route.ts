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
    const booking = await dbStore.checkOutBooking(id, session.adminId);

    return NextResponse.json({
      success: true,
      data: booking,
    });
  } catch (error: any) {
    console.error('Check-out error:', error);
    return NextResponse.json(
      { error: { code: 'CHECK_OUT_FAILED', message: error.message || 'Check-out failed' } },
      { status: 400 }
    );
  }
}
