'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Building2, Sun, Moon } from 'lucide-react';

export function ViharArchitectureSection() {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section className="py-24 sm:py-32 bg-editorial overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand-sandstone font-bold">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Atmosphere & Sanctuary</span>
          </div>

          <h2 className="heading-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-charcoal uppercase">
            A Place to Pause.
          </h2>

          <p className="text-sm sm:text-base text-text-secondary font-light leading-relaxed">
            Quiet corridors, open natural ventilation, and peaceful courtyards tailored for meditation and family tranquility in holy Palitana.
          </p>
        </div>

        {/* Layered Visual Composition */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Tile 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl overflow-hidden bg-brand-deep p-1 shadow-card border border-brand-sandstone/30 group"
          >
            <div className="aspect-[3/4] rounded-[1.35rem] bg-gradient-to-br from-brand-warm to-brand-charcoal p-6 flex flex-col justify-between text-brand-ivory relative overflow-hidden">
              <span className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">The Corridors</span>
              <div className="space-y-1 relative z-10">
                <h3 className="font-display text-xl font-bold text-brand-warmWhite">Silent & Spotless</h3>
                <p className="text-xs text-brand-ivory/80 font-light">
                  Spacious hallways with polished stone and gentle natural breezes throughout the day.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Tile 2 (Elevated Center Card) */}
          <motion.div
            style={{ y: yParallax }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="rounded-3xl overflow-hidden bg-brand-charcoal p-1 shadow-elevated border-2 border-brand-gold/40 group md:-mt-8"
          >
            <div className="aspect-[3/4] rounded-[1.35rem] bg-gradient-to-br from-brand-charcoal to-brand-deep p-8 flex flex-col justify-between text-brand-ivory relative overflow-hidden">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">The Heart</span>
                <Sparkles className="w-4 h-4 text-brand-gold" />
              </div>

              <div className="space-y-2 relative z-10">
                <h3 className="font-display text-2xl font-bold text-brand-warmWhite">Peaceful Courtyard</h3>
                <p className="text-xs text-brand-ivory/80 font-light leading-relaxed">
                  An open central expanse for reflection, fresh morning air, and spiritual bonding among pilgrim families.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Tile 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-3xl overflow-hidden bg-brand-deep p-1 shadow-card border border-brand-sandstone/30 group"
          >
            <div className="aspect-[3/4] rounded-[1.35rem] bg-gradient-to-br from-brand-warm to-brand-charcoal p-6 flex flex-col justify-between text-brand-ivory relative overflow-hidden">
              <span className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Reverent Sanctuary</span>
              <div className="space-y-1 relative z-10">
                <h3 className="font-display text-xl font-bold text-brand-warmWhite">Daily Hospitality</h3>
                <p className="text-xs text-brand-ivory/80 font-light">
                  A welcoming reception team ready 24/7 to assist yatris with timings and guidance.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
