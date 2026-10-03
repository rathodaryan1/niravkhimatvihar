'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, ArrowUpRight, MapPin, Phone, Calendar } from 'lucide-react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { BrandMark } from './BrandMark';

const NAV_ITEMS = [
  { name: 'About', href: '/#about', num: '01', match: ['/#about'] },
  { name: 'Rooms', href: '/rooms', num: '02', match: ['/rooms'] },
  { name: 'Facilities', href: '/facilities', num: '03', match: ['/facilities', '/#facilities'] },
  { name: 'Bhojanshala', href: '/bhojanshala', num: '04', match: ['/bhojanshala', '/#bhojanshala'] },
  { name: 'Palitana', href: '/palitana', num: '05', match: ['/palitana'] },
  { name: 'Gallery', href: '/gallery', num: '06', match: ['/gallery', '/#gallery'] },
  { name: 'Contact', href: '/contact', num: '07', match: ['/contact', '/#contact'] },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isCurrentActive = (item: typeof NAV_ITEMS[0]) => {
    if (isHome) return false;
    return item.match.some((m) => pathname.startsWith(m));
  };

  const isDarkNavbar = isScrolled || !isHome;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-out ${
          isDarkNavbar
            ? 'bg-[#F8F3E8]/96 backdrop-blur-md py-3 sm:py-3.5 border-b border-[#9B7049]/20 shadow-sm text-[#241A15]'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4 sm:py-5 text-[#FFFDF8]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand Logo & Monogram */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="hidden sm:block">
                <BrandMark
                  variant="full"
                  theme={isDarkNavbar ? 'dark' : 'light'}
                />
              </div>
              <div className="block sm:hidden">
                <BrandMark
                  variant="mobile"
                  theme={isDarkNavbar ? 'dark' : 'light'}
                />
              </div>
            </Link>

            {/* Desktop Navigation Links (>= 1024px) */}
            <nav className="hidden lg:flex items-center gap-7">
              {NAV_ITEMS.map((item) => {
                const isActive = isCurrentActive(item);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-xs uppercase tracking-[0.18em] font-serif transition-colors duration-200 py-1 relative group ${
                      isActive
                        ? 'text-[#C7A15A] font-bold'
                        : isDarkNavbar
                        ? 'text-[#241A15]/85 hover:text-[#C7A15A] font-medium'
                        : 'text-[#FFFDF8]/90 hover:text-[#C7A15A] font-medium'
                    }`}
                  >
                    <span>{item.name}</span>
                    {isActive ? (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C7A15A] rounded-full"
                      />
                    ) : (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C7A15A] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action: Language Selector & Booking Button */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Compact Language Selector */}
              <div
                className={`flex rounded-full border p-0.5 transition-colors duration-300 ${
                  isDarkNavbar
                    ? 'border-[#9B7049]/30 bg-white/70 shadow-xs'
                    : 'border-white/30 bg-black/30 backdrop-blur-md'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`cursor-pointer rounded-full border-none px-2.5 py-[3px] font-sans text-[11px] font-bold transition-all ${
                    language === 'en'
                      ? 'bg-[#3A2418] text-[#F8F3E8] shadow-xs'
                      : isDarkNavbar
                      ? 'bg-transparent text-[#241A15] hover:text-[#C7A15A]'
                      : 'bg-transparent text-white/80 hover:text-white'
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
                      ? 'bg-[#3A2418] text-[#F8F3E8] shadow-xs'
                      : isDarkNavbar
                      ? 'bg-transparent text-[#241A15] hover:text-[#C7A15A]'
                      : 'bg-transparent text-white/80 hover:text-white'
                  }`}
                  aria-label="Switch to Gujarati"
                >
                  ગુ
                </button>
              </div>

              {/* Book A Room Button (Always visible on desktop + tablet) */}
              <Link
                href="/booking"
                className={`hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-serif font-bold uppercase tracking-widest transition-all shadow-sm active:scale-95 ${
                  isDarkNavbar
                    ? 'bg-[#3A2418] hover:bg-[#241A15] text-[#F8F3E8]'
                    : 'bg-[#C7A15A] hover:bg-[#DFBE7D] text-[#241A15] shadow-goldGlow'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book A Room</span>
              </Link>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                type="button"
                className={`lg:hidden p-2 rounded-full transition-colors ${
                  isDarkNavbar
                    ? 'text-[#241A15] hover:bg-[#9B7049]/10'
                    : 'text-white hover:bg-white/10'
                }`}
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
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-[#241A15]/98 backdrop-blur-2xl text-[#F8F3E8] flex flex-col justify-between p-6 sm:p-10"
          >
            {/* Top Header inside Drawer */}
            <div className="flex items-center justify-between border-b border-[#C7A15A]/20 pb-4">
              <BrandMark variant="full" theme="light" />

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-full bg-white/10 text-[#F8F3E8] hover:bg-white/20 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Staggered Navigation Items */}
            <nav className="space-y-4 my-auto py-6">
              {NAV_ITEMS.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * idx, duration: 0.35, ease: 'easeOut' }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex items-center justify-between py-1.5 border-b border-white/5 hover:border-[#C7A15A]/30 transition-colors"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-xs text-[#C7A15A]/70 font-semibold">
                        {item.num}
                      </span>
                      <span className="font-serif text-2xl sm:text-3xl font-light text-[#F8F3E8] group-hover:text-[#C7A15A] transition-colors">
                        {item.name}
                      </span>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-[#9B7049] group-hover:text-[#C7A15A] transition-colors" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#C7A15A]/20 space-y-4">
              {/* Language Switcher in Mobile Drawer */}
              <div className="flex items-center justify-between pb-2 text-xs">
                <span className="text-[#F8F3E8]/60 uppercase tracking-widest font-mono text-[10px]">
                  Language / ભાષા
                </span>
                <div className="flex gap-1 bg-white/10 p-1 rounded-full border border-white/20">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                      language === 'en' ? 'bg-[#C7A15A] text-[#241A15]' : 'text-[#F8F3E8]'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLanguage('gu')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                      language === 'gu' ? 'bg-[#C7A15A] text-[#241A15]' : 'text-[#F8F3E8]'
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
                className="w-full flex items-center justify-center gap-2 bg-[#C7A15A] hover:bg-[#DFBE7D] text-[#241A15] py-4 rounded-full font-serif font-bold text-xs uppercase tracking-widest shadow-goldGlow transition-transform active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Room Online</span>
              </Link>

              {/* Contact Assistance */}
              <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#F8F3E8]/70 pt-2 gap-2">
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
