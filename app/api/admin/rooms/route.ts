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
        { error: { code: 'UNAUTHORIZED', message: 'Admin authentication required' } },
        { status: 401 }
      );
    }

    const rooms = dbStore.rooms.map((r) => ({
      ...r,
      roomType: dbStore.roomTypes.find((rt) => rt.id === r.room_type_id),
    }));

    return NextResponse.json({
      success: true,
      data: {
        rooms,
        roomTypes: dbStore.roomTypes,
        blocks: dbStore.roomBlocks,
      },
    });
  } catch (error: any) {
    console.error('Admin Rooms API Error:', error);
    return NextResponse.json(
      { error: { code: 'SERVER_ERROR', message: 'Unable to retrieve rooms' } },
      { status: 500 }
    );
  }
}
