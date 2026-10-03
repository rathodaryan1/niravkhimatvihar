'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Calendar, Compass, Sparkles } from 'lucide-react';
import { useLanguage } from '@/lib/context/LanguageContext';

export function Hero() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const scrollToAvailability = () => {
    const el = document.getElementById('search-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToVihar = () => {
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full flex items-center justify-center overflow-hidden bg-[#241A15] text-[#F8F3E8]">
      
      {/* Background Photography with Slow Intentional Scale Animation */}
      <motion.div
        initial={shouldReduceMotion ? { scale: 1, opacity: 0.9 } : { scale: 1.08, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://oswalyatrikgruh.org/images/temples/temple-1.jpg')",
        }}
      >
        {/* Dark Cinematic Overlays for Perfect Contrast & Mood */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#241A15] via-[#3A2418]/60 to-black/50 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#241A15]/40 to-[#241A15] z-10" />
        
        {/* Subtle Architectural Grain Overlay */}
        <div
          className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none z-10"
          style={{
            backgroundImage: `radial-gradient(#9B7049 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </motion.div>

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center space-y-7 pt-16 sm:pt-20">
        
        {/* Eyebrow Tag */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C7A15A]/40 bg-[#241A15]/60 backdrop-blur-md text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#C7A15A] font-semibold shadow-goldGlow"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C7A15A]" />
          <span>Shri Nirav Khimat Bhavan · Palitana, Gujarat</span>
        </motion.div>

        {/* Large Editorial Headline */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3"
        >
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight uppercase leading-[0.95] text-[#FFFDF8] drop-shadow-md">
            A Quiet Place
            <span className="block font-normal italic text-[#C7A15A] tracking-normal text-3xl sm:text-5xl md:text-6xl lg:text-7xl mt-2 font-serif lowercase">
              for your palitana yatra.
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-sm sm:text-base md:text-lg text-[#F8F3E8]/80 max-w-2xl font-light leading-relaxed"
        >
          A peaceful stay for pilgrims visiting Palitana. Pure satvik Jain dining, serene air-conditioned accommodation, and dedicated yatri hospitality near sacred Mount Shatrunjaya.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4 pt-3 w-full sm:w-auto"
        >
          <button
            onClick={scrollToAvailability}
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#C7A15A] hover:bg-[#DFBE7D] text-[#241A15] font-bold px-8 py-4 rounded-full text-xs uppercase tracking-widest shadow-goldGlow transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#241A15]" />
            <span>Check Availability</span>
          </button>

          <button
            onClick={scrollToVihar}
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 text-[#F8F3E8] border border-white/20 backdrop-blur-md font-semibold px-8 py-4 rounded-full text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer"
          >
            <span>Explore The Vihar ↓</span>
            <Compass className="w-4 h-4 text-[#C7A15A]" />
          </button>
        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        onClick={scrollToVihar}
        className="absolute bottom-6 z-20 flex flex-col items-center gap-2 cursor-pointer group"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#C7A15A]/80 font-bold group-hover:text-[#C7A15A] transition-colors">
          Scroll to Discover
        </span>
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-8 h-8 rounded-full border border-[#C7A15A]/30 flex items-center justify-center bg-[#241A15]/50 backdrop-blur-sm group-hover:border-[#C7A15A] transition-colors"
        >
          <ArrowDown className="w-3.5 h-3.5 text-[#C7A15A]" />
        </motion.div>
      </motion.div>

    </section>
  );
}
