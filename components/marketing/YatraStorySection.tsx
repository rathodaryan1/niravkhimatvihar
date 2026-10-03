'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mountain, ArrowRight, Sparkles } from 'lucide-react';

export function YatraStorySection() {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <section className="relative py-32 sm:py-44 bg-brand-charcoal text-brand-ivory overflow-hidden">
      {/* Background with Parallax Movement */}
      <motion.div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-35"
        style={{
          y: yParallax,
          backgroundImage: `radial-gradient(#C7A15A 1px, transparent 1px), linear-gradient(180deg, #241A15 0%, #3A2418 50%, #241A15 100%)`,
          backgroundSize: '28px 28px, 100% 100%',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-transparent to-brand-charcoal z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-gold/30 bg-brand-deep/60 backdrop-blur-md text-xs uppercase tracking-widest text-brand-gold font-semibold"
        >
          <Mountain className="w-3.5 h-3.5 text-brand-gold" />
          <span>Shatrunjaya Maha Tirtha</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <span className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tightest uppercase text-brand-gold/30 block leading-none select-none">
            PALITANA
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-brand-warmWhite max-w-4xl mx-auto leading-tight -mt-8 sm:-mt-12 relative z-10">
            &quot;One of Jainism&apos;s most sacred pilgrimage destinations.&quot;
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm sm:text-base md:text-lg text-brand-ivory/80 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Where millions of souls achieved liberation, and where over 863 carved marble temples grace the sacred peaks overlooking Shetrunji river.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pt-4"
        >
          <Link
            href="/palitana"
            className="group inline-flex items-center gap-3 bg-brand-gold/20 hover:bg-brand-gold/30 text-brand-gold border border-brand-gold/40 px-8 py-4 rounded-full text-xs uppercase tracking-widest font-bold transition-all shadow-goldGlow active:scale-95"
          >
            <span>Explore the Sacred Yatra</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
