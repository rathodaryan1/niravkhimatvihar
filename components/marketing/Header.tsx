'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, MapPin, Phone, Calendar } from 'lucide-react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { BrandMark } from './BrandMark';

interface NavItem {
  name: string;
  transKey: string;
  href: string;
  num: string;
  match: string[];
}

const NAV_ITEMS: NavItem[] = [
  { name: 'About', transKey: 'nav_about', href: '/#about', num: '01', match: ['/#about'] },
  { name: 'Rooms', transKey: 'nav_rooms', href: '/rooms', num: '02', match: ['/rooms'] },
  { name: 'Facilities', transKey: 'nav_facilities', href: '/facilities', num: '03', match: ['/facilities', '/#facilities'] },
  { name: 'Bhojanshala', transKey: 'nav_bhojnalay', href: '/bhojanshala', num: '04', match: ['/bhojanshala', '/#bhojanshala'] },
  { name: 'Palitana', transKey: 'nav_palitana', href: '/palitana', num: '05', match: ['/palitana'] },
  { name: 'Gallery', transKey: 'nav_gallery', href: '/gallery', num: '06', match: ['/gallery', '/#gallery'] },
  { name: 'Contact', transKey: 'nav_contact', href: '/contact', num: '07', match: ['/contact', '/#contact'] },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  const isHome = pathname === '/';

  // Track scroll position for navbar style refinement
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleEscape);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleEscape);
      };
    }
  }, [mobileMenuOpen]);

  const isCurrentActive = (item: NavItem) => {
    if (isHome) return false;
    return item.match.some((m) => pathname.startsWith(m));
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out select-none ${
          isScrolled || !isHome
            ? 'bg-[#1E140F]/95 backdrop-blur-xl py-3 border-b border-[#C7A15A]/30 shadow-lg text-[#FFFDF8]'
            : 'bg-[#1E140F]/85 backdrop-blur-md py-4 sm:py-4.5 border-b border-white/10 text-[#FFFDF8]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Brand Logo & Monogram */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <div className="hidden sm:block">
                <BrandMark variant="full" theme="light" />
              </div>
              <div className="block sm:hidden">
                <BrandMark variant="mobile" theme="light" />
              </div>
            </Link>

            {/* Desktop Navigation Links (>= 1024px) */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6 font-sans">
              {NAV_ITEMS.map((item) => {
                const isActive = isCurrentActive(item);
                const label = t(item.transKey) || item.name;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-[13px] tracking-wide font-medium transition-colors duration-200 py-1.5 px-1 relative group ${
                      isActive
                        ? 'text-[#C7A15A] font-semibold'
                        : 'text-[#FFFDF8]/85 hover:text-[#C7A15A]'
                    }`}
                  >
                    <span>{label}</span>
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[2px] bg-[#C7A15A] rounded-full transition-transform origin-left duration-200 ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Right Action: Language Selector & Booking Button */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              {/* Compact Language Selector */}
              <div className="flex rounded-full border border-white/20 bg-black/40 backdrop-blur-md p-0.5">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`cursor-pointer rounded-full border-none px-2.5 py-[3px] font-sans text-[11px] font-bold transition-all ${
                    language === 'en'
                      ? 'bg-[#C7A15A] text-[#1E140F] shadow-sm'
                      : 'bg-transparent text-white/70 hover:text-white'
                  }`}
                  aria-label="Switch to English"
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('gu')}
                  className={`cursor-pointer rounded-full border-none px-2.5 py-[3px] font-sans text-[11px] font-bold transition-all ${
                    language === 'gu'
                      ? 'bg-[#C7A15A] text-[#1E140F] shadow-sm'
                      : 'bg-transparent text-white/70 hover:text-white'
                  }`}
                  aria-label="Switch to Gujarati"
                >
                  ગુ
                </button>
              </div>

              {/* Book A Room Button (Visible on desktop + tablet) */}
              <Link
                href="/booking"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-sans font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 bg-[#C7A15A] hover:bg-[#DFBE7D] text-[#1E140F]"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{t('btn_online_booking') || 'Book A Room'}</span>
              </Link>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                type="button"
                className="lg:hidden p-2 rounded-full text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[99999] bg-[#1E140F]/98 backdrop-blur-2xl text-[#F8F3E8] flex flex-col justify-between p-6 sm:p-8 select-none"
          >
            {/* Top Header inside Drawer */}
            <div className="flex items-center justify-between border-b border-[#C7A15A]/20 pb-4">
              <BrandMark variant="full" theme="light" />

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-full bg-white/10 text-[#F8F3E8] hover:bg-white/20 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Staggered Navigation Items */}
            <nav className="space-y-3 my-auto py-6 font-sans">
              {NAV_ITEMS.map((item, idx) => {
                const label = t(item.transKey) || item.name;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * idx, duration: 0.25, ease: 'easeOut' }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="group flex items-center justify-between py-2 border-b border-white/10 hover:border-[#C7A15A]/40 transition-colors"
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-xs text-[#C7A15A] font-semibold">
                          {item.num}
                        </span>
                        <span className="text-xl sm:text-2xl font-medium text-[#F8F3E8] group-hover:text-[#C7A15A] transition-colors">
                          {label}
                        </span>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-[#C7A15A]/70 group-hover:text-[#C7A15A] transition-colors" />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#C7A15A]/20 space-y-4 font-sans">
              {/* Language Switcher in Mobile Drawer */}
              <div className="flex items-center justify-between pb-1 text-xs">
                <span className="text-[#F8F3E8]/60 uppercase tracking-wider font-semibold text-[11px]">
                  Language / ભાષા
                </span>
                <div className="flex gap-1 bg-white/10 p-1 rounded-full border border-white/20">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                      language === 'en' ? 'bg-[#C7A15A] text-[#1E140F]' : 'text-[#F8F3E8]'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLanguage('gu')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                      language === 'gu' ? 'bg-[#C7A15A] text-[#1E140F]' : 'text-[#F8F3E8]'
                    }`}
                  >
                    ગુજરાતી
                  </button>
                </div>
              </div>

              {/* Book Room Button */}
              <Link
                href="/booking"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-[#C7A15A] hover:bg-[#DFBE7D] text-[#1E140F] py-3.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-lg transition-transform active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                <span>{t('btn_online_booking') || 'Reserve Room Online'}</span>
              </Link>

              {/* Contact Assistance */}
              <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#F8F3E8]/70 pt-1 gap-2">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C7A15A]" />
                  Taleti Road, Palitana
                </span>
                <a href="tel:02848253050" className="flex items-center gap-1.5 hover:text-[#C7A15A]">
                  <Phone className="w-3.5 h-3.5 text-[#C7A15A]" />
                  02848 253050
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
