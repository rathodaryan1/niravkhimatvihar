'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Sparkles, ChevronDown } from 'lucide-react';

interface FacilityItem {
  num: string;
  title: string;
  subtitle: string;
  desc: string;
  image: string;
}

const FACILITIES_DATA: FacilityItem[] = [
  {
    num: '01',
    title: 'AIR CONDITIONING',
    subtitle: 'Split A/C in every room',
    desc: 'Individual energy-efficient split air-conditioning units installed across all guest rooms for quiet and comfortable rest in all seasons.',
    image: '/images/gallery/IMG_1403.JPG',
  },
  {
    num: '02',
    title: 'HOT WATER & MODERN BATH',
    subtitle: '24-Hour hot water geysers',
    desc: 'Instant water heaters and clean attached washrooms with Western commodes ensuring steaming hot water ready at 4:00 AM for early morning devotional preparations.',
    image: '/images/gallery/IMG_1407.JPG',
  },
  {
    num: '03',
    title: 'RO & UKALELU PANI',
    subtitle: 'Pure boiled water temple pavilion',
    desc: 'Hygienic multi-stage RO filtered drinking water on premises, plus authentic Shastrokta boiled water (ukalelu pani) pavilion with daily fresh supply.',
    image: '/images/gallery/IMG_1414.JPG',
  },
  {
    num: '04',
    title: 'PARKING & SECURITY',
    subtitle: 'Gated on-site compound',
    desc: 'Spacious gated parking space for private yatri vehicles, tourist buses, and Sangh transportation with 24/7 security boundary.',
    image: '/images/gallery/IMG_1430.JPG',
  },
  {
    num: '05',
    title: 'LIFT / ELEVATOR',
    subtitle: 'Passenger elevator for all floors',
    desc: 'Modern stainless steel passenger elevator servicing all residential floors, providing effortless accessibility for senior citizen yatris.',
    image: '/images/gallery/IMG_1412.JPG',
  },
  {
    num: '06',
    title: 'GENERATOR BACKUP',
    subtitle: 'Full 24/7 power backup',
    desc: 'Heavy-duty automatic power generator backup ensuring uninterrupted lighting, fans, lift operation, and water pumps at all times.',
    image: '/images/gallery/IMG_1425.JPG',
  },
  {
    num: '07',
    title: 'DRIVER ACCOMMODATION',
    subtitle: 'Dedicated resting quarters',
    desc: 'Special resting facilities and basic washroom amenities provided for accompanying family vehicle drivers within the campus.',
    image: '/images/gallery/IMG_1428.JPG',
  },
];

export function FacilitiesNumberedList() {
  const [hoveredIdx, setHoveredIdx] = useState<number>(0);
  const [openMobileIdx, setOpenMobileIdx] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const toggleMobile = (idx: number) => {
    setOpenMobileIdx(openMobileIdx === idx ? null : idx);
  };

  return (
    <section id="facilities" className="py-24 sm:py-36 bg-[#241A15] text-[#F8F3E8] relative overflow-hidden border-t border-[#9B7049]/30">
      
      {/* Decorative Gold Radial Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C7A15A]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#C7A15A]/20 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C7A15A] font-serif font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#C7A15A]" />
              <span>Dharamshala Amenities · સુવિધાઓ</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#FFFDF8] tracking-tight leading-[1.05]">
              FACILITIES.
            </h2>
          </div>

          <p className="max-w-md text-sm text-[#F8F3E8]/80 font-light leading-relaxed">
            Essential comforts thoughtfully configured around the sacred routine of pilgrims visiting Mount Shatrunjaya.
          </p>
        </div>

        {/* Desktop Layout: Interactive Numbered List (Left) + Hover Visual Preview (Right) */}
        <div className="hidden lg:grid grid-cols-12 gap-12 items-center">
          
          {/* List Column (7 cols) */}
          <div className="col-span-7 divide-y divide-[#C7A15A]/15 border-y border-[#C7A15A]/15">
            {FACILITIES_DATA.map((item, idx) => {
              const isHovered = hoveredIdx === idx;
              return (
                <div
                  key={item.num}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  className={`py-6 px-4 transition-all duration-300 cursor-pointer flex items-center justify-between group ${
                    isHovered ? 'bg-[#3A2418]/60 pl-6 border-l-2 border-l-[#C7A15A]' : 'hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <span
                      className={`font-serif text-2xl font-light transition-colors ${
                        isHovered ? 'text-[#C7A15A]' : 'text-[#9B7049]'
                      }`}
                    >
                      {item.num}
                    </span>
                    <div>
                      <h3
                        className={`font-serif text-2xl font-normal tracking-wide transition-colors ${
                          isHovered ? 'text-[#FFFDF8]' : 'text-[#F8F3E8]/80'
                        }`}
                      >
                        {item.title}
                      </h3>
                      <span className="text-xs text-[#9B7049] font-sans font-medium block mt-0.5">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-serif italic text-[#C7A15A] opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore
                  </span>
                </div>
              );
            })}
          </div>

          {/* Sticky Visual Image Frame (5 cols) */}
          <div className="col-span-5 relative">
            <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden border border-[#C7A15A]/30 shadow-2xl bg-[#3A2418]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={FACILITIES_DATA[hoveredIdx].num}
                  src={FACILITIES_DATA[hoveredIdx].image}
                  alt={FACILITIES_DATA[hoveredIdx].title}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 block h-full w-full object-cover brightness-95"
                />
              </AnimatePresence>

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#241A15]/90 via-transparent to-transparent" />

              {/* Floating Caption inside frame */}
              <div className="absolute bottom-6 left-6 right-6 z-20 space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#C7A15A] font-bold block">
                  {FACILITIES_DATA[hoveredIdx].num} · {FACILITIES_DATA[hoveredIdx].subtitle}
                </span>
                <p className="text-xs text-[#F8F3E8]/90 font-light leading-relaxed">
                  {FACILITIES_DATA[hoveredIdx].desc}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Mobile / Tablet Accordion Layout */}
        <div className="lg:hidden divide-y divide-[#C7A15A]/20 border-y border-[#C7A15A]/20">
          {FACILITIES_DATA.map((item, idx) => {
            const isOpen = openMobileIdx === idx;
            return (
              <div key={item.num} className="py-4">
                <button
                  type="button"
                  onClick={() => toggleMobile(idx)}
                  className="w-full flex items-center justify-between text-left py-2"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-serif text-xl text-[#C7A15A] font-bold">{item.num}</span>
                    <span className="font-serif text-xl text-[#FFFDF8] font-normal">{item.title}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#C7A15A] transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-3 pb-2 space-y-3"
                  >
                    <p className="text-xs text-[#F8F3E8]/80 font-light leading-relaxed">
                      {item.desc}
                    </p>
                    <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#C7A15A]/30">
                      <img src={item.image} alt={item.title} className="block h-full w-full object-cover" />
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
