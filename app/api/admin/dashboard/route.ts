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

    const metrics = await dbStore.getDashboardMetrics();
    return NextResponse.json({
      success: true,
      data: metrics,
    });
  } catch (error: any) {
    console.error('Admin Dashboard API Error:', error);
    return NextResponse.json(
      { error: { code: 'SERVER_ERROR', message: 'Unable to retrieve dashboard metrics' } },
      { status: 500 }
    );
  }
}
