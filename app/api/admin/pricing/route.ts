import { NextRequest, NextResponse } from 'next/server';
import { dbStore } from '@/lib/db/store';
import { verifyAdminToken } from '@/lib/auth/admin-auth';
import { z } from 'zod';

const updatePriceSchema = z.object({
  roomTypeId: z.string().uuid(),
  newPrice: z.number().positive('Price must be greater than 0'),
});

export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const validated = updatePriceSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: validated.error.errors[0]?.message || 'Invalid price input' } },
        { status: 400 }
      );
    }

    const { roomTypeId, newPrice } = validated.data;
    const updated = await dbStore.updateRoomTypePrice(roomTypeId, newPrice, session.adminId);

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error: any) {
    console.error('Price update error:', error);
    return NextResponse.json(
      { error: { code: 'PRICE_UPDATE_FAILED', message: error.message || 'Unable to update price' } },
      { status: 400 }
    );
  }
}
