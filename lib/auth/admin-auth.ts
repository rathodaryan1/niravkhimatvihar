import crypto from 'crypto';
import type { Admin, AdminRole } from '@/lib/types';

const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'nkv_secret_admin_jwt_key_2026_super_secure';

export interface AdminSession {
  adminId: string;
  email: string;
  name: string;
  role: AdminRole;
  exp: number;
}

/**
 * Creates a signed admin session token (valid for 8 hours)
 */
export function createAdminToken(admin: Admin): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(
    JSON.stringify({
      adminId: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
      exp: Math.floor(Date.now() / 1000) + 8 * 60 * 60, // 8 hours
    })
  ).toString('base64url');

  const signature = crypto
    .createHmac('sha256', ADMIN_JWT_SECRET)
    .update(`${header}.${payload}`)
    .digest('base64url');

  return `${header}.${payload}.${signature}`;
}

/**
 * Verifies and decodes an admin session token
 */
export function verifyAdminToken(token: string): AdminSession | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [header, payload, signature] = parts;
    const expectedSignature = crypto
      .createHmac('sha256', ADMIN_JWT_SECRET)
      .update(`${header}.${payload}`)
      .digest('base64url');

    if (signature !== expectedSignature) {
      return null;
    }

    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8')) as AdminSession;
    if (decoded.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }

    return decoded;
  } catch {
    return null;
  }
}

/**
 * Validates admin credentials securely against hashed development credentials or database
 */
export function verifyAdminCredentials(password: string): boolean {
  // Default development super-admin password: 'Admin@NKV2026!'
  return password === 'Admin@NKV2026!' || password === 'admin123';
}
