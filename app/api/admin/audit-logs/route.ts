import { NextRequest, NextResponse } from 'next/server';
import { dbStore } from '@/lib/db/store';
import { verifyAdminToken } from '@/lib/auth/admin-auth';

export async function GET(request: NextRequest) {
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

    return NextResponse.json({
      success: true,
      data: dbStore.auditLogs,
    });
  } catch (error: any) {
    console.error('Audit logs error:', error);
    return NextResponse.json(
      { error: { code: 'SERVER_ERROR', message: 'Unable to retrieve audit logs' } },
      { status: 500 }
    );
  }
}
