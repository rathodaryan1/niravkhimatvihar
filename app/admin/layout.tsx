'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarCheck,
  CalendarDays,
  DoorOpen,
  DollarSign,
  CreditCard,
  FileText,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Menu,
  X,
} from 'lucide-react';

const ADMIN_NAV = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Bookings', href: '/admin/bookings', icon: CalendarCheck },
  { name: 'Availability Calendar', href: '/admin/calendar', icon: CalendarDays },
  { name: 'Room Inventory', href: '/admin/rooms', icon: DoorOpen },
  { name: 'Pricing Engine', href: '/admin/pricing', icon: DollarSign },
  { name: 'Payments Ledger', href: '/admin/payments', icon: CreditCard },
  { name: 'Audit Logs', href: '/admin/audit-logs', icon: FileText },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<any | null>(null);

  useEffect(() => {
    // If on login page, skip layout chrome
    if (pathname === '/admin/login') return;

    const storedUser = localStorage.getItem('nkv_admin_user');
    if (storedUser) {
      try {
        setAdminUser(JSON.parse(storedUser));
      } catch (e) {
        console.error(e);
      }
    }
  }, [pathname]);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = () => {
    localStorage.removeItem('nkv_admin_token');
    localStorage.removeItem('nkv_admin_user');
    document.cookie = 'nkv_admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#F7F3EA] flex flex-col lg:flex-row text-brand-deep">
      {/* Mobile Header Bar */}
      <div className="lg:hidden bg-brand-deep text-brand-ivory px-4 py-3 flex items-center justify-between border-b border-brand-gold/30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-brand-warm border border-brand-gold flex items-center justify-center font-bold text-xs text-brand-gold">
            NK
          </div>
          <span className="font-serif font-bold text-base">Admin Console</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg bg-brand-warm text-brand-ivory"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-brand-deep text-brand-ivory/90 flex flex-col justify-between p-4 border-r border-brand-gold/20 transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="space-y-6">
          {/* Brand Logo & Role */}
          <div className="p-2 border-b border-brand-ivory/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-warm border-2 border-brand-gold flex items-center justify-center font-bold text-brand-gold text-sm font-serif">
                NK
              </div>
              <div>
                <span className="font-serif font-bold text-sm block text-brand-ivory">Shri Nirav Khimat Bhavan</span>
                <span className="text-[10px] uppercase tracking-widest text-brand-gold font-semibold block">
                  {adminUser?.role || 'SUPER_ADMIN'}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {ADMIN_NAV.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-gold text-brand-deep shadow-md font-bold'
                      : 'text-brand-ivory/80 hover:bg-brand-warm hover:text-brand-ivory'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-deep' : 'text-brand-sandstone'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-brand-ivory/10 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-brand-ivory/70 hover:bg-brand-warm hover:text-brand-ivory"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Website</span>
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-red-300 hover:bg-red-950/40 hover:text-red-200 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Operational Bar */}
        <header className="hidden lg:flex items-center justify-between bg-[#FFFDF9] border-b border-brand-sandstone/30 px-8 py-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
            <ShieldCheck className="w-4 h-4 text-status-success" />
            <span>Authorized Management Console · Live Database Connected</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="text-text-muted">{adminUser?.email || 'admin@niravkhimatvihar.com'}</span>
            <span className="px-2.5 py-0.5 rounded-full bg-brand-lightSand border border-brand-sandstone/40 text-brand-deep font-bold text-[10px]">
              {adminUser?.role || 'SUPER_ADMIN'}
            </span>
          </div>
        </header>

        {/* Scrollable Page Body */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
