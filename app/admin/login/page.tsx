'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@niravkhimatvihar.com');
  const [password, setPassword] = useState('Admin@NKV2026!');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error?.message || 'Invalid administrative credentials');
      }

      // Save token in localStorage for API client headers
      localStorage.setItem('nkv_admin_token', json.data.token);
      localStorage.setItem('nkv_admin_user', JSON.stringify(json.data.admin));

      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-deep flex items-center justify-center p-4">
      <div className="bg-[#FFFDF9] border-2 border-brand-gold/60 rounded-3xl p-8 sm:p-10 max-w-md w-full shadow-elevated space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-brand-deep border-2 border-brand-gold flex items-center justify-center text-brand-gold font-serif font-bold text-xl mx-auto shadow-sm">
            NK
          </div>
          <h1 className="font-serif text-2xl font-bold text-brand-deep">
            Admin Portal Login
          </h1>
          <p className="text-xs text-text-secondary">
            Shri Nirav Khimat Bhavan Dharamshala Management System
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-brand-deep uppercase">
              Admin Email *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-brand-sandstone absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-sandstone/40 bg-brand-ivory text-brand-deep text-xs font-medium"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-brand-deep uppercase">
              Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-brand-sandstone absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-sandstone/40 bg-brand-ivory text-brand-deep text-xs font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-brand-deep hover:bg-brand-warm text-brand-ivory font-bold py-3 px-4 rounded-xl shadow-md transition-all active:scale-95 text-xs uppercase tracking-wider"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin text-brand-gold" /> : <ShieldCheck className="w-4 h-4 text-brand-gold" />}
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
          </button>
        </form>

        <div className="text-center pt-2 text-[11px] text-text-muted">
          Development Super Admin: <code className="text-brand-deep font-semibold">Admin@NKV2026!</code>
        </div>
      </div>
    </div>
  );
}
