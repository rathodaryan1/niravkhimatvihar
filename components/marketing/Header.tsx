'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, MapPin, Phone, Calendar } from 'lucide-react';
import { useLanguage } from '@/lib/context/LanguageContext';

const NAV_ITEMS = [
  { name: 'About', href: '/#about', match: ['/#about'] },
  { name: 'Rooms', href: '/rooms', match: ['/rooms'] },
  { name: 'Facilities', href: '/facilities', match: ['/facilities', '/#facilities'] },
  { name: 'Bhojanshala', href: '/bhojanshala', match: ['/bhojanshala', '/#bhojanshala'] },
  { name: 'Palitana', href: '/palitana', match: ['/palitana'] },
  { name: 'Gallery', href: '/gallery', match: ['/gallery', '/#gallery'] },
  { name: 'Contact', href: '/contact', match: ['/contact', '/#contact'] },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();

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

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || !isHome
            ? 'bg-[#FCFAF5]/95 backdrop-blur-md py-3.5 border-b border-[#D8C4A8]/60 shadow-sm text-[#2B1D17]'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand Logo & Title */}
            <Link href="/" className="flex items-center gap-3 group select-none">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-serif font-bold text-sm border transition-all duration-300 shadow-sm ${
                  isScrolled || !isHome
                    ? 'bg-[#3A2418] text-[#C7A15A] border-[#C7A15A]/40'
                    : 'bg-white/10 text-[#C7A15A] border-[#C7A15A]/60 backdrop-blur-md'
                }`}
              >
                NK
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-serif font-medium text-base sm:text-lg tracking-wide leading-tight transition-colors duration-300 ${
                    isScrolled || !isHome ? 'text-[#2B1D17]' : 'text-[#FFFDF8]'
                  }`}
                >
                  SHRI NIRAV KHIMAT BHAVAN
                </span>
                <span
                  className={`text-[9px] uppercase tracking-[0.22em] font-semibold transition-colors duration-300 ${
                    isScrolled || !isHome ? 'text-[#A95339]' : 'text-[#C7A15A]'
                  }`}
                >
                  Palitana · Jain Dharamshala
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Items */}
            <nav className="hidden lg:flex items-center gap-7">
              {NAV_ITEMS.map((item) => {
                const isActive = isCurrentActive(item);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-xs uppercase tracking-[0.16em] font-serif transition-all duration-200 py-1 relative ${
                      isActive
                        ? 'text-[#A95339] font-bold'
                        : isScrolled || !isHome
                        ? 'text-[#2B1D17]/80 hover:text-[#A95339] font-medium'
                        : 'text-white/85 hover:text-white font-medium'
                    }`}
                  >
                    <span>{item.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#A95339] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Side Actions: Language Pill & Booking CTA */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Language Switcher */}
              <div
                className={`flex rounded-full border p-0.5 transition-colors ${
                  isScrolled || !isHome
                    ? 'border-[#D8C4A8] bg-[#F7F3EA]'
                    : 'border-white/30 bg-black/30 backdrop-blur-md'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`cursor-pointer rounded-full border-none px-2.5 py-[3px] font-sans text-[11px] font-bold transition-all ${
                    language === 'en'
                      ? 'bg-[#3A2418] text-[#FFFDF8] shadow-xs'
                      : isScrolled || !isHome
                      ? 'bg-transparent text-[#2B1D17]'
                      : 'bg-transparent text-white/80'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('gu')}
                  className={`cursor-pointer rounded-full border-none px-2.5 py-[3px] font-sans text-[11px] font-bold transition-all ${
                    language === 'gu'
                      ? 'bg-[#3A2418] text-[#FFFDF8] shadow-xs'
                      : isScrolled || !isHome
                      ? 'bg-transparent text-[#2B1D17]'
                      : 'bg-transparent text-white/80'
                  }`}
                >
                  ગુ
                </button>
              </div>

              {/* Book A Room Button */}
              <Link
                href="/booking"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-serif font-bold uppercase tracking-widest transition-all shadow-sm active:scale-95 ${
                  isScrolled || !isHome
                    ? 'bg-[#A95339] hover:bg-[#2B1D17] text-[#FFFDF8]'
                    : 'bg-[#C7A15A] hover:bg-[#DFBE7D] text-[#241A15]'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book A Room</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                type="button"
                className={`p-2 rounded-full transition-colors ${
                  isScrolled || !isHome
                    ? 'text-[#2B1D17] hover:bg-[#D8C4A8]/20'
                    : 'text-white hover:bg-white/10'
                }`}
                aria-label="Open menu"
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
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-[#1F1511]/98 backdrop-blur-2xl text-[#FCFAF5] flex flex-col justify-between p-6 sm:p-10"
          >
            {/* Top Bar inside Menu */}
            <div className="flex items-center justify-between border-b border-[#C7A15A]/20 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#3A2418] border border-[#C7A15A] flex items-center justify-center font-serif font-bold text-sm text-[#C7A15A]">
                  NK
                </div>
                <div>
                  <span className="font-serif font-bold text-base block text-[#FFFDF8]">
                    SHRI NIRAV KHIMAT BHAVAN
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-[#C7A15A] font-semibold block">
                    Palitana · Gujarat
                  </span>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full bg-white/10 text-[#FCFAF5] hover:bg-white/20 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Links List */}
            <nav className="space-y-3 my-auto py-6">
              {NAV_ITEMS.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * idx, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex items-center justify-between py-2 text-2xl font-serif font-light text-[#FCFAF5] hover:text-[#C7A15A] transition-colors"
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight className="w-5 h-5 text-[#9B7049] group-hover:text-[#C7A15A] transition-colors" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#C7A15A]/20 space-y-4">
              {/* Mobile Language Switcher */}
              <div className="flex items-center justify-between pb-2 text-xs">
                <span className="text-white/60">Language:</span>
                <div className="flex gap-1 bg-white/10 p-1 rounded-full border border-white/20">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      language === 'en' ? 'bg-[#C7A15A] text-[#1F1511]' : 'text-white'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLanguage('gu')}
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      language === 'gu' ? 'bg-[#C7A15A] text-[#1F1511]' : 'text-white'
                    }`}
                  >
                    ગુજરાતી
                  </button>
                </div>
              </div>

              <Link
                href="/booking"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-[#A95339] hover:bg-[#C7A15A] text-[#FFFDF8] hover:text-[#1F1511] py-4 rounded-full font-serif font-bold text-xs uppercase tracking-widest transition-colors shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Room Online</span>
              </Link>

              <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#FCFAF5]/70 pt-2 gap-2">
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
