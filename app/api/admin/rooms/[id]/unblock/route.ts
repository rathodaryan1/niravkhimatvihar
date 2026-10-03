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
    const success = await dbStore.unblockRoom(id, session.adminId);

    return NextResponse.json({
      success,
      message: success ? 'Room unblocked successfully' : 'Block not found',
    });
  } catch (error: any) {
    console.error('Room unblock error:', error);
    return NextResponse.json(
      { error: { code: 'UNBLOCK_FAILED', message: error.message || 'Unable to unblock room' } },
      { status: 400 }
    );
  }
}
