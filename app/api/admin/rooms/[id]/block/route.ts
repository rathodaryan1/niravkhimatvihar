import { NextRequest, NextResponse } from 'next/server';
import { dbStore } from '@/lib/db/store';
import { verifyAdminToken } from '@/lib/auth/admin-auth';
import { roomBlockSchema } from '@/lib/validation/schemas';

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
    const body = await request.json();
    const validated = roomBlockSchema.safeParse({ ...body, roomId: id });

    if (!validated.success) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: validated.error.errors[0]?.message || 'Invalid block parameters' } },
        { status: 400 }
      );
    }

    const { startDate, endDate, reason } = validated.data;
    const block = await dbStore.blockRoom(id, startDate, endDate, reason, session.adminId);

    return NextResponse.json({
      success: true,
      data: block,
    });
  } catch (error: any) {
    console.error('Room block error:', error);
    return NextResponse.json(
      { error: { code: 'BLOCK_FAILED', message: error.message || 'Unable to block room' } },
      { status: 400 }
    );
  }
}
