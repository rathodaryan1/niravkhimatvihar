'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, MessageSquare, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/lib/context/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#241A15] text-[#F8F3E8]/80 pt-20 pb-12 border-t border-[#C7A15A]/30 relative overflow-hidden">
      {/* Decorative Gold Hairline */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C7A15A] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Main Grid: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-[#F8F3E8]/10">
          
          {/* Col 1: Brand & Narrative (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#3A2418] border border-[#C7A15A] flex items-center justify-center text-[#C7A15A] font-serif font-bold text-lg shadow-inner">
                NK
              </div>
              <div>
                <span className="font-serif font-medium text-xl sm:text-2xl text-[#FFFDF8] tracking-wide block">
                  SHRI NIRAV KHIMAT BHAVAN
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C7A15A] font-light">
                  Palitana · Jain Dharamshala
                </span>
              </div>
            </div>

            <p className="text-sm text-[#F8F3E8]/75 leading-relaxed font-light max-w-sm">
              A peaceful sanctuary for pilgrims visiting the sacred hills of Mount Shatrunjaya in Palitana, Gujarat. Pure satvik dining and air-conditioned accommodation.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#C7A15A]">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Dedicated Satvik Pilgrimage Seva</span>
            </div>
          </div>

          {/* Col 2: Explore Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-serif text-sm font-semibold text-[#C7A15A] tracking-widest uppercase">
              Explore
            </h3>
            <ul className="space-y-2.5 text-xs font-light">
              <li>
                <Link href="/#about" className="hover:text-[#C7A15A] transition-colors">
                  About The Vihar
                </Link>
              </li>
              <li>
                <Link href="/rooms" className="hover:text-[#C7A15A] transition-colors">
                  Rooms & Quarters
                </Link>
              </li>
              <li>
                <Link href="/#facilities" className="hover:text-[#C7A15A] transition-colors">
                  Amenities & Facilities
                </Link>
              </li>
              <li>
                <Link href="/#bhojanshala" className="hover:text-[#C7A15A] transition-colors">
                  Pure Satvik Bhojanshala
                </Link>
              </li>
              <li>
                <Link href="/palitana" className="hover:text-[#C7A15A] transition-colors">
                  Palitana Yatra Guide
                </Link>
              </li>
              <li>
                <Link href="/#gallery" className="hover:text-[#C7A15A] transition-colors">
                  Photo Chronicle
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Booking & Management (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-serif text-sm font-semibold text-[#C7A15A] tracking-widest uppercase">
              Book
            </h3>
            <ul className="space-y-2.5 text-xs font-light">
              <li>
                <Link href="/booking" className="hover:text-[#C7A15A] transition-colors font-semibold text-[#C7A15A]">
                  Check Availability →
                </Link>
              </li>
              <li>
                <Link href="/my-booking" className="hover:text-[#C7A15A] transition-colors">
                  Lookup My Booking
                </Link>
              </li>
              <li>
                <Link href="/cancellation-policy" className="hover:text-[#C7A15A] transition-colors">
                  Stay Policies
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-[#C7A15A] transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-serif text-sm font-semibold text-[#C7A15A] tracking-widest uppercase">
              Contact
            </h3>
            <ul className="space-y-3 text-xs font-light">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C7A15A] shrink-0" />
                <a href="tel:02848253050" className="hover:text-[#C7A15A] transition-colors">
                  02848 253050
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                <a
                  href="https://wa.me/919376656100"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C7A15A] shrink-0" />
                <a href="mailto:contact@niravkhimatbhavan.org" className="hover:text-[#C7A15A] transition-colors truncate">
                  Email Desk
                </a>
              </li>
              <li className="flex items-start gap-2 pt-1">
                <MapPin className="w-3.5 h-3.5 text-[#C7A15A] shrink-0 mt-0.5" />
                <span className="leading-tight text-[11px]">
                  Taleti Road, Palitana
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F8F3E8]/50 font-light">
          <p>© {new Date().getFullYear()} Shri Nirav Khimat Bhavan. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#C7A15A] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#C7A15A] transition-colors">
              Terms & Rules
            </Link>
            <Link href="/cancellation-policy" className="hover:text-[#C7A15A] transition-colors">
              Refund & Cancellation
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
