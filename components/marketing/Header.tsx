'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '@/lib/context/LanguageContext';

const NAV_ITEMS = [
  { name: 'About', href: '/#about' },
  { name: 'Rooms', href: '/rooms' },
  { name: 'Facilities', href: '/#facilities' },
  { name: 'Bhojanshala', href: '/#bhojanshala' },
  { name: 'Palitana', href: '/palitana' },
  { name: 'Gallery', href: '/#gallery' },
  { name: 'Contact', href: '/#contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();

  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || !isHome
            ? 'bg-[#F8F3E8]/95 backdrop-blur-md py-3.5 border-b border-[#9B7049]/20 shadow-sm text-[#241A15]'
            : 'bg-gradient-to-b from-black/70 via-black/30 to-transparent py-5 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand Logo & Name */}
            <Link href="/" className="flex items-center gap-3 group">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-serif font-bold text-base border transition-all duration-500 ${
                  isScrolled || !isHome
                    ? 'bg-[#3A2418] text-[#C7A15A] border-[#C7A15A]/40 shadow-inner'
                    : 'bg-white/10 text-[#C7A15A] border-[#C7A15A]/60 backdrop-blur-md'
                }`}
              >
                NK
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-serif font-semibold text-lg sm:text-xl tracking-wide leading-none transition-colors duration-500 ${
                    isScrolled || !isHome ? 'text-[#241A15]' : 'text-white'
                  }`}
                >
                  SHRI NIRAV KHIMAT BHAVAN
                </span>
                <span
                  className={`text-[9px] uppercase tracking-[0.22em] font-medium mt-0.5 transition-colors duration-500 ${
                    isScrolled || !isHome ? 'text-[#9B7049]' : 'text-[#C7A15A]'
                  }`}
                >
                  Palitana · Jain Dharamshala
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-xs uppercase tracking-[0.18em] font-medium transition-colors py-1 ${
                    isScrolled || !isHome
                      ? 'text-[#3A2418]/80 hover:text-[#3A2418] hover:font-bold'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right Action: Language Pill & Booking CTA */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Language Switcher */}
              <div
                className={`flex gap-px rounded-full border p-0.5 transition-colors ${
                  isScrolled || !isHome
                    ? 'border-[#9B7049]/30 bg-white/70'
                    : 'border-white/30 bg-black/30 backdrop-blur-md'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`cursor-pointer rounded-full border-none px-2.5 py-[3px] font-sans text-[11px] font-bold transition-all ${
                    language === 'en'
                      ? 'bg-[#3A2418] text-[#F8F3E8] shadow-sm'
                      : isScrolled || !isHome
                      ? 'bg-transparent text-[#241A15]'
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
                      ? 'bg-[#3A2418] text-[#F8F3E8] shadow-sm'
                      : isScrolled || !isHome
                      ? 'bg-transparent text-[#241A15]'
                      : 'bg-transparent text-white/80'
                  }`}
                >
                  ગુ
                </button>
              </div>

              {/* Book A Room Button */}
              <Link
                href="/booking"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-bold transition-all shadow-sm active:scale-95 ${
                  isScrolled || !isHome
                    ? 'bg-[#3A2418] hover:bg-[#241A15] text-[#F8F3E8] hover:shadow-md'
                    : 'bg-[#C7A15A] hover:bg-[#DFBE7D] text-[#241A15] shadow-goldGlow'
                }`}
              >
                <span>Book A Room</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Hamburger Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                type="button"
                className={`p-2 rounded-full transition-colors ${
                  isScrolled || !isHome
                    ? 'text-[#241A15] hover:bg-[#9B7049]/10'
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
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#241A15]/95 backdrop-blur-2xl text-[#F8F3E8] flex flex-col justify-between p-6 sm:p-10"
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
                className="p-2 rounded-full bg-white/10 text-[#F8F3E8] hover:bg-white/20 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Large Typography Links */}
            <nav className="space-y-4 my-auto py-6">
              {NAV_ITEMS.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex items-center justify-between py-2 text-2xl sm:text-3xl font-serif font-light text-[#F8F3E8] hover:text-[#C7A15A] transition-colors"
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight className="w-5 h-5 text-[#9B7049] group-hover:text-[#C7A15A] transition-colors" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#C7A15A]/20 space-y-4">
              <Link
                href="/booking"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-[#C7A15A] hover:bg-[#DFBE7D] text-[#241A15] py-4 rounded-full font-bold text-sm uppercase tracking-widest shadow-goldGlow"
              >
                <span>Reserve Room Online</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

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
