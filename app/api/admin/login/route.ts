import { NextRequest, NextResponse } from 'next/server';
import { adminLoginSchema } from '@/lib/validation/schemas';
import { dbStore } from '@/lib/db/store';
import { createAdminToken, verifyAdminCredentials } from '@/lib/auth/admin-auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = adminLoginSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: { code: 'INVALID_CREDENTIALS', message: 'Email and password are required' } },
        { status: 400 }
      );
    }

    const { email, password } = validated.data;
    const admin = dbStore.admins.find((a) => a.email.toLowerCase() === email.toLowerCase() && a.is_active);

    if (!admin || !verifyAdminCredentials(password)) {
      // Record failed login audit log
      dbStore.addAuditLog({
        action: 'ADMIN_LOGIN_FAILED',
        entity_type: 'ADMIN',
        metadata: { email, ip: request.headers.get('x-forwarded-for') || '127.0.0.1' },
      });

      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Invalid administrative email or password' } },
        { status: 401 }
      );
    }

    // Generate signed token
    const token = createAdminToken(admin);

    // Update last login
    admin.last_login_at = new Date().toISOString();

    // Record successful login
    dbStore.addAuditLog({
      admin_id: admin.id,
      action: 'ADMIN_LOGIN_SUCCESS',
      entity_type: 'ADMIN',
      entity_id: admin.id,
      metadata: { email: admin.email, role: admin.role },
    });

    const response = NextResponse.json({
      success: true,
      data: {
        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },
        token,
      },
    });

    // Set secure HTTP-only cookie
    response.cookies.set('nkv_admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 8 * 60 * 60, // 8 hours
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Admin Login API Error:', error);
    return NextResponse.json(
      { error: { code: 'SERVER_ERROR', message: 'Admin authentication service error' } },
      { status: 500 }
    );
  }
}
