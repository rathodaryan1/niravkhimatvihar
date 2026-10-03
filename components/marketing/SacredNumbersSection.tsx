'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MandalaPattern } from '@/components/ui/MandalaPattern';
import { Mountain, Sparkles } from 'lucide-react';

interface DimensionStat {
  value: string;
  hindiLabel: string;
  englishLabel: string;
  description: string;
}

const STATS: DimensionStat[] = [
  {
    value: '3,500+',
    hindiLabel: 'पगथिया',
    englishLabel: 'SACRED STEPS',
    description: 'Stone-carved steps ascending from sacred Taleti to Dada Adinath’s supreme Darbar atop the peaks.',
  },
  {
    value: '863',
    hindiLabel: 'जिनालय',
    englishLabel: 'MARBLE DERASARS',
    description: 'Pristine white marble temples clustered across nine holy Tuks on the sanctified hill of Shatrunjaya.',
  },
  {
    value: '1.5 km',
    hindiLabel: 'तलहटी दूरी',
    englishLabel: 'TO TALETI BASE',
    description: 'Situated on Taleti Road for a quick and seamless start to the holy mountain ascent.',
  },
  {
    value: '24',
    hindiLabel: 'जिनेश्वर',
    englishLabel: 'TIRTHANKARAS',
    description: 'Hallowed ground where infinite Kevalis and Tirthankaras have attained supreme Moksha and Nirvana.',
  },
  {
    value: '100%',
    hindiLabel: 'शुद्ध सात्विक',
    englishLabel: 'PURE JAIN BHOJAN',
    description: 'Zero root vegetables (kandmool), boiled ukalelu pani, and Chauvihar served strictly before sunset.',
  },
  {
    value: '24-HR',
    hindiLabel: 'गर्म जल एवं शांति',
    englishLabel: 'HOT WATER & REST',
    description: 'Dedicated geyser hot water available at 4:00 AM for pre-dawn baths before your morning climb.',
  },
];

export function SacredNumbersSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 0.95]);

  return (
    <section
      ref={containerRef}
      className="relative py-28 sm:py-36 bg-[#241A15] text-[#FFFDF8] overflow-hidden border-y border-[#C7A15A]/30"
    >
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#3A2418] via-[#241A15] to-[#17100D] opacity-90" />

      {/* Center Ambient Glowing Mandala */}
      <motion.div
        style={{ rotate, scale }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
      >
        <MandalaPattern size={750} opacity={0.06} color="#C7A15A" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-[#C7A15A] font-serif"
          >
            <span className="h-[1px] w-6 bg-[#C7A15A]/60" />
            <span>Sacred Dimensions · पवित्र गणना</span>
            <span className="h-[1px] w-6 bg-[#C7A15A]/60" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#FFFDF8] tracking-tight leading-[1.08]"
          >
            THE MATH OF <span className="italic font-normal text-[#C7A15A]">devotion</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-base text-[#F8F3E8]/75 font-light leading-relaxed max-w-xl mx-auto"
          >
            Shatrunjaya is not merely a mountain; it is an eternal sanctuary of millions of footsteps, prayers, and tap-sādhana across the ages.
          </motion.p>
        </div>

        {/* Sacred Numbers Grid with Thin Gold Frames */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#C7A15A]/20 border border-[#C7A15A]/30 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md">
          {STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.08 }}
              className="bg-[#241A15]/95 hover:bg-[#3A2418]/90 p-8 sm:p-10 transition-colors duration-500 flex flex-col justify-between space-y-6 group text-center"
            >
              {/* Top Big Number */}
              <div className="space-y-1">
                <span className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#FFFDF8] group-hover:text-[#C7A15A] transition-colors duration-300 block tracking-tight">
                  {stat.value}
                </span>
                <span className="text-sm text-[#C7A15A] font-serif block font-medium">
                  {stat.hindiLabel}
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#F8F3E8]/60 font-mono block">
                  {stat.englishLabel}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-[#F8F3E8]/70 leading-relaxed font-light italic border-t border-[#C7A15A]/15 pt-4">
                &ldquo;{stat.description}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Sanskrit Reflection */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-center pt-4"
        >
          <span className="text-xs text-[#C7A15A]/80 font-serif tracking-widest uppercase">
            नमो जिणाणं · जय जिनेन्द्र · विश्राम और भक्ति का पावन धाम
          </span>
        </motion.div>
      </div>
    </section>
  );
}
