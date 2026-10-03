import { NextRequest, NextResponse } from 'next/server';
import { availabilityQuerySchema } from '@/lib/validation/schemas';
import { dbStore } from '@/lib/db/store';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const rawQuery = {
      checkIn: searchParams.get('checkIn'),
      checkOut: searchParams.get('checkOut'),
      guests: searchParams.get('guests'),
      rooms: searchParams.get('rooms') || '1',
    };

    const validated = availabilityQuerySchema.safeParse(rawQuery);
    if (!validated.success) {
      return NextResponse.json(
        {
          error: {
            code: 'INVALID_QUERY',
            message: validated.error.errors[0]?.message || 'Invalid search parameters',
          },
        },
        { status: 400 }
      );
    }

    const { checkIn, checkOut, guests, rooms } = validated.data;
    const results = await dbStore.checkAvailability(checkIn, checkOut, guests, rooms);

    return NextResponse.json({
      success: true,
      query: { checkIn, checkOut, guests, rooms },
      data: results,
    });
  } catch (error: any) {
    console.error('Availability API error:', error);
    return NextResponse.json(
      {
        error: {
          code: 'SERVER_ERROR',
          message: 'Unable to calculate availability at this time',
        },
      },
      { status: 500 }
    );
  }
}
