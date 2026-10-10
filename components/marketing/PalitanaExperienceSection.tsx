'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Mountain, ArrowRight, Sparkles, Compass } from 'lucide-react';

export function PalitanaExperienceSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative py-28 sm:py-36 bg-[#1E140F] text-[#F8F3E8] overflow-hidden">
      {/* Background Full-Width Visual with Subtle Parallax & Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center opacity-30 mix-blend-luminosity scale-105"
          style={{
            backgroundImage: "url('/images/gallery/IMG_1430.JPG')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E140F] via-[#1E140F]/85 to-[#1E140F]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Heading & Oversized Typography */}
        <div className="max-w-4xl space-y-4">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C7A15A] font-bold font-sans"
          >
            <Mountain className="w-4 h-4 text-[#C7A15A]" />
            <span>Sacred Shatrunjaya Foothills · પાલીતાણા યાત્રા</span>
          </motion.div>

          <motion.h2
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-sans text-4xl sm:text-6xl lg:text-7xl font-black text-[#FFFDF8] tracking-tight leading-[1.02]"
          >
            PALITANA — <br />
            <span className="font-semibold text-[#E5C378]">where the journey begins.</span>
          </motion.h2>
        </div>

        {/* 2-Column Pilgrimage Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 space-y-5 text-sm sm:text-base text-[#F8F3E8]/85 font-light leading-relaxed border-l-2 border-[#C7A15A]/40 pl-6"
          >
            <p>
              The holy ascent of Mount Shatrunjaya is not merely an ascent of 3,500+ sacred marble steps — it is an inward pilgrimage of purification, devotion, and reverence to Shri Adinath Bhagwan.
            </p>
            <p>
              Located conveniently on Taleti Road, <strong>Shri Nirav Khimat Bhavan</strong> gives yatris the quiet rest and early morning readiness needed before the sacred mountain ascent.
            </p>
            
            <div className="pt-2">
              <Link
                href="/palitana"
                className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#C7A15A] hover:text-[#DFBE7D] transition-colors"
              >
                <span>Read Full Palitana Yatra Guide</span>
                <ArrowRight className="w-4 h-4 text-[#C7A15A] group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* 3 Metric Dimension Badges */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div className="p-5 rounded-2xl bg-[#3A2418]/60 border border-[#9B7049]/30 backdrop-blur-sm space-y-1">
              <span className="font-serif text-3xl font-light text-[#C7A15A] block">3,500+</span>
              <span className="text-xs font-semibold text-[#FFFDF8] block">Marble Steps</span>
              <p className="text-[11px] text-[#F8F3E8]/70 font-light">Leading to Dada&apos;s Holy Tuk atop the sacred peak.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#3A2418]/60 border border-[#9B7049]/30 backdrop-blur-sm space-y-1">
              <span className="font-serif text-3xl font-light text-[#C7A15A] block">Taleti Rd</span>
              <span className="text-xs font-semibold text-[#FFFDF8] block">Close to Base</span>
              <p className="text-[11px] text-[#F8F3E8]/70 font-light">Situated behind Sanchori Bhavan on Taleti Road.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#3A2418]/60 border border-[#9B7049]/30 backdrop-blur-sm space-y-1">
              <span className="font-serif text-3xl font-light text-[#C7A15A] block">04:30 AM</span>
              <span className="text-xs font-semibold text-[#FFFDF8] block">Pre-Dawn Ready</span>
              <p className="text-[11px] text-[#F8F3E8]/70 font-light">Early hot water & lift access ready for morning ascent.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#3A2418]/60 border border-[#9B7049]/30 backdrop-blur-sm space-y-1">
              <span className="font-serif text-3xl font-light text-[#C7A15A] block">Satvik</span>
              <span className="text-xs font-semibold text-[#FFFDF8] block">Bhojanshala</span>
              <p className="text-[11px] text-[#F8F3E8]/70 font-light">Navkarshi breakfast, lunch thali, and chauvihar.</p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
