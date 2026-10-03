'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Calendar, Phone, ShieldCheck, Sparkles } from 'lucide-react';

export function CinematicCTA() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative py-32 sm:py-44 bg-[#241A15] text-[#FFFDF8] overflow-hidden">
      {/* Background with Dark Overlays */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center opacity-25 mix-blend-luminosity scale-105"
          style={{
            backgroundImage: "url('https://oswalyatrikgruh.org/images/temples/temple-1.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#241A15] via-[#241A15]/75 to-[#241A15]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        
        {/* Eyebrow */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-[#C7A15A]/30 bg-[#3A2418]/70 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C7A15A]" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#C7A15A] font-serif font-semibold">
            Shri Nirav Khimat Bhavan · Palitana Yatra
          </span>
        </motion.div>

        {/* Large Editorial Headline */}
        <motion.h2
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#FFFDF8] tracking-tight leading-[1.02]"
        >
          YOUR JOURNEY <br />
          <span className="italic font-normal text-[#C7A15A]">begins here.</span>
        </motion.h2>

        {/* Supporting Copy */}
        <motion.p
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-xl text-[#F8F3E8]/80 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Reserve your peaceful air-conditioned sanctuary at the sacred foothills of Mount Shatrunjaya. Instant confirmation with 0% surcharge and pure Satvik hospitality.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Link
            href="/booking"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#C7A15A] hover:bg-[#DFBE7D] text-[#241A15] px-8 py-4 rounded-full font-serif font-bold text-xs uppercase tracking-widest shadow-goldGlow transition-all active:scale-95 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#241A15]" />
            <span>Book Your Room</span>
            <ArrowRight className="w-4 h-4 text-[#241A15]" />
          </Link>

          <Link
            href="/#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 border border-[#F8F3E8]/30 hover:border-[#C7A15A] text-[#F8F3E8] hover:text-[#C7A15A] px-8 py-4 rounded-full font-serif text-xs uppercase tracking-widest backdrop-blur-sm transition-all cursor-pointer"
          >
            <Phone className="w-4 h-4 text-[#C7A15A]" />
            <span>Contact Helpdesk</span>
          </Link>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="pt-10 border-t border-[#FFFDF8]/10 flex flex-wrap justify-center items-center gap-8 text-xs text-[#F8F3E8]/60 uppercase tracking-widest font-mono"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C7A15A]" />
            <span>Direct Trust Tariff</span>
          </div>
          <span className="hidden sm:inline text-[#C7A15A]/40">·</span>
          <div>Pure Satvik Jain Bhojanshala</div>
          <span className="hidden sm:inline text-[#C7A15A]/40">·</span>
          <div>24-Hour Hot Water & Lift Access</div>
        </motion.div>

      </div>
    </section>
  );
}
