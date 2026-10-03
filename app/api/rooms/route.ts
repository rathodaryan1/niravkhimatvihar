import { NextResponse } from 'next/server';
import { dbStore } from '@/lib/db/store';

export async function GET() {
  try {
    const roomTypes = await dbStore.getRoomTypes();
    return NextResponse.json({
      success: true,
      data: roomTypes,
    });
  } catch (error: any) {
    console.error('Rooms API error:', error);
    return NextResponse.json(
      {
        error: {
          code: 'SERVER_ERROR',
          message: 'Unable to fetch room catalogue',
        },
      },
      { status: 500 }
    );
  }
}
