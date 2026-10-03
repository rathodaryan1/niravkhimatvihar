'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Flame, Clock, BedDouble, Droplets } from 'lucide-react';
import { useLanguage } from '@/lib/context/LanguageContext';

export function IntroductionSection() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const keyPoints = [
    {
      label: 'PRE-DAWN YATRA READINESS',
      desc: '24-hour hot water and early morning elevator access ready for sunrise mountain ascent.',
      value: '24-Hr Hot Water',
    },
    {
      label: 'TALETI ROAD PROXIMITY',
      desc: 'Located behind Sanchori Bhavan on Taleti Road, minutes from the Shatrunjaya base.',
      value: 'Taleti Vicinity',
    },
    {
      label: 'SHASTROKTA SATVIK SANCTITY',
      desc: 'Pure Jain Bhojanshala serving fresh Navkarshi breakfast, lunch thali, and chauvihar.',
      value: '100% Satvik',
    },
    {
      label: 'ACCESSIBILITY & REST',
      desc: 'Passenger elevator for senior citizens, power generator backup, and clean A/C rooms.',
      value: 'Lift & Generator',
    },
  ];

  return (
    <section id="about" className="py-24 sm:py-36 bg-[#F8F3E8] text-[#241A15] relative overflow-hidden border-t border-[#9B7049]/20">
      
      {/* Subtle Background Watermark */}
      <div className="absolute top-1/2 -right-40 -translate-y-1/2 text-[#9B7049]/5 font-serif text-[18vw] select-none pointer-events-none tracking-tight">
        PALITANA
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Asymmetrical Editorial Composition (5 cols visual / 7 cols narrative) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Framed Property Visual */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Framed Architecture Card */}
            <div className="relative z-10 w-full rounded-3xl overflow-hidden border border-[#C7A15A]/40 shadow-2xl bg-[#241A15]">
              <div className="relative aspect-[3/4] w-full">
                <img
                  src="https://oswalyatrikgruh.org/images/temples/temple-6.jpg"
                  alt="Shri Nirav Khimat Bhavan Architecture & Courtyard"
                  className="absolute inset-0 block h-full w-full object-cover brightness-95 hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Dark Gradient Overlay for Typography */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#241A15]/95 via-[#241A15]/30 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-5 left-5 z-20 bg-[#241A15]/85 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#C7A15A]/40 flex items-center gap-2 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-[#C7A15A]" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#FFFDF8] font-serif font-bold">
                    Pavitra Yatrik Bhavan
                  </span>
                </div>

                {/* Bottom Story Card */}
                <div className="absolute bottom-6 left-6 right-6 z-20 space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#C7A15A] font-semibold block">
                    THE VIHAR SANCTUARY
                  </span>
                  <h3 className="font-serif text-2xl font-light text-[#FFFDF8] leading-tight">
                    Shri Nirav Khimat Bhavan
                  </h3>
                  <p className="text-xs text-[#F8F3E8]/80 leading-relaxed font-light">
                    Providing peaceful, hygienic, and serene Jain pilgrimage accommodation for yatris visiting Mount Shatrunjaya.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Narrative & Asymmetrical Dimensions */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Eyebrow */}
            <div>
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[#9B7049] font-serif font-semibold mb-3">
                <span className="h-[1px] w-6 bg-[#C7A15A]" />
                <span>The Vihar · પવિત્ર આવાસ</span>
                <span className="h-[1px] w-6 bg-[#C7A15A]" />
              </div>

              {/* Large Editorial Headline */}
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#241A15] tracking-tight leading-[1.06]">
                A PLACE TO PAUSE.
              </h2>
            </div>

            {/* Left-Bordered Lead Paragraph */}
            <div className="border-l-2 border-[#C7A15A] pl-5 space-y-3">
              <p className="font-serif text-lg sm:text-xl text-[#3A2418] italic font-normal leading-relaxed">
                &ldquo;A peaceful place to rest, refresh and prepare for your Palitana journey.&rdquo;
              </p>
              <p className="text-sm sm:text-base text-[#3A2418]/85 leading-relaxed font-light">
                Situated peacefully on <strong>Taleti Road (Behind Sanchori Bhavan)</strong> in Palitana, <strong>Shri Nirav Khimat Bhavan</strong> provides devoted pilgrims with clean air-conditioned rooms, elevator mobility, hot water facilities, and a pure satvik Bhojanshala.
              </p>
            </div>

            {/* Asymmetrical Key Dimensions Grid */}
            <div className="space-y-4 pt-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#9B7049] font-serif font-bold block">
                Pilgrimage Comfort & Amenities
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {keyPoints.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-[#9B7049]/20 shadow-sm space-y-1.5 hover:border-[#C7A15A] transition-colors"
                  >
                    <div className="flex items-baseline justify-between">
                      <span className="font-serif text-xl font-medium text-[#241A15]">{item.value}</span>
                    </div>
                    <p className="text-xs text-[#3A2418]/75 leading-relaxed font-light">{item.desc}</p>
                  </div>
                ))}

                {/* Direct Trust Tariff Banner */}
                <div className="sm:col-span-2 p-5 rounded-2xl bg-white border border-[#9B7049]/20 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#C7A15A] transition-colors">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#C7A15A] shrink-0" />
                    <div>
                      <span className="font-serif text-base font-medium text-[#241A15] block">
                        Direct Dharamshala Trust Tariff · 0% Surcharge
                      </span>
                      <span className="text-xs text-[#3A2418]/70 font-light">
                        Transparent room tariffs, instant receipt, and 100% Satvik sanctity.
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/rooms"
                    className="inline-flex items-center gap-1.5 text-xs font-serif font-bold text-[#9B7049] hover:text-[#3A2418] transition-colors shrink-0"
                  >
                    <span>View Rooms</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
