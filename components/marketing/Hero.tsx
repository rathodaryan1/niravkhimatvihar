'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowDown, Calendar, Compass, Sparkles, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { VideoModal } from './VideoModal';

const HERO_SLIDES = [
  {
    src: '/images/gallery/nirav.jpeg',
    label: 'Front Facade',
    badge: '૫ માળનું ભવ્ય ભવન · Main Facade',
  },
  {
    src: '/images/gallery/IMG_1425.JPG',
    label: 'Campus View',
    badge: 'વિશાળ પરિસર · Campus & Courtyard',
  },
  {
    src: '/images/gallery/IMG_1428.JPG',
    label: 'Entrance Porch',
    badge: 'રાજસ્થાની કોતરણી પ્રવેશદ્વાર · Porch',
  },
  {
    src: '/images/gallery/IMG_1430.JPG',
    label: 'Main Gate',
    badge: 'મુખ્ય પ્રવેશદ્વાર · Welcome Arch',
  },
];

export function Hero() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto rotate slides smoothly every 7 seconds
  useEffect(() => {
    if (videoModalOpen || shouldReduceMotion) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [videoModalOpen, shouldReduceMotion]);

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
    <section className="relative h-[100svh] min-h-[640px] w-full flex items-center justify-center overflow-hidden bg-[#1E140F] text-[#F8F3E8]">
      
      {/* Real Photography Background with Smooth Crossfade */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentSlide}
            initial={shouldReduceMotion ? { opacity: 0.9 } : { opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${HERO_SLIDES[currentSlide].src}')`,
            }}
          />
        </AnimatePresence>

        {/* Top Header Scrim for Navigation Legibility */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#120B08]/90 via-[#120B08]/40 to-transparent z-10 pointer-events-none" />

        {/* Balanced Center Scrim for Real Architecture Visibility & Text Contrast */}
        <div className="absolute inset-0 bg-[#120B08]/35 sm:bg-[#120B08]/30 backdrop-brightness-[0.95] z-10 pointer-events-none" />

        {/* Bottom Scrim for Seamless Transition to Page Content */}
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#1E140F] via-[#1E140F]/70 to-transparent z-10 pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center space-y-7 pt-16 sm:pt-20">
        
        {/* Eyebrow Tag with Real Location & Slide Badge */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C7A15A]/50 bg-[#1E140F]/75 backdrop-blur-md text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#E5C378] font-bold shadow-goldGlow"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C7A15A]" />
          <span>Shri Nirav Khimat Bhavan · Palitana, Gujarat</span>
        </motion.div>

        {/* Clean Editorial Sans Headline */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3"
        >
          <h1 className="font-sans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase leading-[0.95] text-[#FFFDF8] drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)]">
            A Quiet Place
            <span className="block font-semibold tracking-normal text-3xl sm:text-5xl md:text-6xl lg:text-7xl mt-2 font-sans text-[#E5C378] drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
              for your palitana yatra.
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-sm sm:text-base md:text-lg text-[#F8F3E8]/90 max-w-2xl font-normal leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
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
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#C7A15A] hover:bg-[#DFBE7D] text-[#1E140F] font-bold px-8 py-4 rounded-full text-xs uppercase tracking-widest shadow-goldGlow transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#1E140F]" />
            <span>Check Availability</span>
          </button>

          <button
            onClick={scrollToVihar}
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-black/40 hover:bg-black/60 text-[#F8F3E8] border border-white/30 backdrop-blur-md font-semibold px-7 py-4 rounded-full text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer shadow-md"
          >
            <span>Explore The Vihar ↓</span>
            <Compass className="w-4 h-4 text-[#C7A15A]" />
          </button>

          <button
            onClick={() => setVideoModalOpen(true)}
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#1E140F]/85 hover:bg-[#1E140F] text-[#F8F3E8] border border-[#C7A15A]/70 backdrop-blur-md font-semibold px-7 py-4 rounded-full text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer hover:border-[#C7A15A] shadow-md"
          >
            <Play className="w-4 h-4 fill-[#C7A15A] text-[#C7A15A]" />
            <span>Watch Video (58s)</span>
          </button>
        </motion.div>

        {/* Video Tour Modal in Hero */}
        <VideoModal
          isOpen={videoModalOpen}
          onClose={() => setVideoModalOpen(false)}
          videoSrc="/images/gallery/niravkhimatvihar.mp4"
          poster="/images/gallery/nirav.jpeg"
          title="Shri Nirav Khimat Bhavan — Palitana"
          subtitle="Official Dharamshala Video Walkthrough · 58 Seconds"
        />

      </div>

      {/* Real Photo Slide Switcher Pills (Desktop & Tablet) */}
      <div className="absolute bottom-6 right-6 sm:right-10 z-20 hidden md:flex items-center gap-2 bg-[#1E140F]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-lg">
        <span className="text-[10px] uppercase tracking-wider text-[#C7A15A] font-bold mr-1">
          Photos:
        </span>
        {HERO_SLIDES.map((slide, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentSlide(idx)}
            className={`px-3 py-1 rounded-full text-[11px] transition-all cursor-pointer ${
              currentSlide === idx
                ? 'bg-[#C7A15A] text-[#1E140F] font-bold shadow-md'
                : 'text-[#F8F3E8]/75 hover:text-[#FFFDF8] hover:bg-white/10 font-medium'
            }`}
          >
            {slide.label}
          </button>
        ))}
      </div>

      {/* Real Photo Slide Indicator Dots (Mobile) */}
      <div className="absolute bottom-20 z-20 flex md:hidden items-center justify-center gap-2 bg-[#1E140F]/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
        {HERO_SLIDES.map((slide, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              currentSlide === idx ? 'w-6 bg-[#C7A15A]' : 'w-2 bg-white/40'
            }`}
            aria-label={slide.label}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        onClick={scrollToVihar}
        className="absolute bottom-6 z-20 flex flex-col items-center gap-2 cursor-pointer group"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#C7A15A] font-bold group-hover:text-[#DFBE7D] transition-colors drop-shadow-sm">
          Scroll to Discover
        </span>
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-8 h-8 rounded-full border border-[#C7A15A]/40 flex items-center justify-center bg-[#1E140F]/70 backdrop-blur-sm group-hover:border-[#C7A15A] transition-colors shadow-md"
        >
          <ArrowDown className="w-3.5 h-3.5 text-[#C7A15A]" />
        </motion.div>
      </motion.div>

    </section>
  );
}
