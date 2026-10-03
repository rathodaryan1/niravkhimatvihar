import { NextRequest, NextResponse } from 'next/server';
import { dbStore } from '@/lib/db/store';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const roomType = await dbStore.getRoomTypeBySlug(slug);

    if (!roomType) {
      return NextResponse.json(
        {
          error: {
            code: 'NOT_FOUND',
            message: 'Room type not found',
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: roomType,
    });
  } catch (error: any) {
    console.error('Room details API error:', error);
    return NextResponse.json(
      {
        error: {
          code: 'SERVER_ERROR',
          message: 'Unable to retrieve room details',
        },
      },
      { status: 500 }
    );
  }
}
