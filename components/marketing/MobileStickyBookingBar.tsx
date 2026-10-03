'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, ArrowRight } from 'lucide-react';

export function MobileStickyBookingBar() {
  const pathname = usePathname();

  // Hide on booking and admin pages to prevent UI overlap
  if (pathname.startsWith('/booking') || pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-gradient-to-t from-black/20 to-transparent pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto">
        <Link
          href="/booking"
          className="flex items-center justify-between w-full bg-[#3A2418] hover:bg-[#241A15] text-[#FFFDF8] border border-[#C7A15A]/40 px-5 py-3.5 rounded-full shadow-2xl transition-all active:scale-95 group"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-[#C7A15A]/20 flex items-center justify-center text-[#C7A15A]">
              <Calendar className="w-3.5 h-3.5" />
            </div>
            <span className="font-serif font-bold text-xs uppercase tracking-[0.18em] text-[#FFFDF8]">
              CHECK AVAILABILITY
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#C7A15A] font-medium font-mono">
            <span>RESERVE</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
      </div>
    </div>
  );
}
