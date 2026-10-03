'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, Sparkles } from 'lucide-react';

interface GalleryPhoto {
  id: string;
  category: 'property' | 'rooms' | 'temples' | 'dining';
  title: string;
  subtitle: string;
  image: string;
  aspect: 'hero' | 'portrait' | 'landscape' | 'square';
}

const GALLERY_ITEMS: GalleryPhoto[] = [
  {
    id: 'g-1',
    category: 'temples',
    title: 'Sacred Mount Shatrunjaya Darshan',
    subtitle: 'Palitana Pilgrimage Peak',
    image: 'https://oswalyatrikgruh.org/images/temples/temple-1.jpg',
    aspect: 'hero',
  },
  {
    id: 'g-2',
    category: 'property',
    title: 'Dharamshala Courtyard & Architecture',
    subtitle: 'Shri Nirav Khimat Bhavan',
    image: 'https://oswalyatrikgruh.org/images/temples/temple-6.jpg',
    aspect: 'portrait',
  },
  {
    id: 'g-3',
    category: 'rooms',
    title: 'Attached A/C Standard Room',
    subtitle: 'Comfortable Twin & Quad Bedding',
    image: 'https://oswalyatrikgruh.org/images/rooms/room-1.jpg',
    aspect: 'landscape',
  },
  {
    id: 'g-4',
    category: 'rooms',
    title: 'Family Suite Accommodation',
    subtitle: 'Spacious Quarters for Sangh Yatris',
    image: 'https://oswalyatrikgruh.org/images/suite-room/suite-room-2.jpeg',
    aspect: 'square',
  },
  {
    id: 'g-5',
    category: 'dining',
    title: 'Satvik Bhojanshala Dining Hall',
    subtitle: 'Pure Jain Shastrokta Meals',
    image: 'https://oswalyatrikgruh.org/images/bhojnalay/bhojnalay-1.jpg',
    aspect: 'landscape',
  },
  {
    id: 'g-6',
    category: 'property',
    title: 'Open Campus & Surrounding Greenery',
    subtitle: 'Peaceful Environment on Taleti Road',
    image: 'https://oswalyatrikgruh.org/images/open-area/open-area-1.jpg',
    aspect: 'portrait',
  },
];

export function GalleryEditorial() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % GALLERY_ITEMS.length);
    }
  };

  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
    }
  };

  return (
    <section id="gallery" className="py-24 sm:py-36 bg-[#FFFDF8] text-[#241A15] border-t border-[#9B7049]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#9B7049]/20 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#9B7049] font-serif font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#C7A15A]" />
              <span>Visual Chronicle · તસવીરો</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#241A15] tracking-tight leading-[1.05]">
              GALLERY.
            </h2>
          </div>

          <p className="max-w-md text-sm text-[#3A2418]/80 font-light leading-relaxed">
            The quiet architecture, clean accommodations, pure dining hall, and surrounding Palitana foothills.
          </p>
        </div>

        {/* Irregular Masonry Editorial Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Item 1: Large Hero (8 cols) */}
          <div
            onClick={() => openLightbox(0)}
            className="md:col-span-8 group relative aspect-[16/10] rounded-3xl overflow-hidden cursor-pointer bg-[#241A15] shadow-sm hover:shadow-xl transition-all"
          >
            <img
              src={GALLERY_ITEMS[0].image}
              alt={GALLERY_ITEMS[0].title}
              className="absolute inset-0 block h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#241A15]/90 via-[#241A15]/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
            <div className="absolute bottom-6 left-6 right-6 z-20 flex items-end justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C7A15A] font-bold block">
                  {GALLERY_ITEMS[0].subtitle}
                </span>
                <h3 className="font-serif text-2xl font-light text-[#FFFDF8] leading-tight mt-0.5">
                  {GALLERY_ITEMS[0].title}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4 text-[#C7A15A]" />
              </div>
            </div>
          </div>

          {/* Item 2: Portrait (4 cols) */}
          <div
            onClick={() => openLightbox(1)}
            className="md:col-span-4 group relative aspect-[3/4] md:aspect-auto rounded-3xl overflow-hidden cursor-pointer bg-[#241A15] shadow-sm hover:shadow-xl transition-all"
          >
            <img
              src={GALLERY_ITEMS[1].image}
              alt={GALLERY_ITEMS[1].title}
              className="absolute inset-0 block h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#241A15]/90 via-[#241A15]/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
            <div className="absolute bottom-6 left-6 right-6 z-20">
              <span className="text-[10px] uppercase tracking-widest text-[#C7A15A] font-bold block">
                {GALLERY_ITEMS[1].subtitle}
              </span>
              <h3 className="font-serif text-xl font-light text-[#FFFDF8] leading-tight mt-0.5">
                {GALLERY_ITEMS[1].title}
              </h3>
            </div>
          </div>

          {/* Item 3: Landscape (4 cols) */}
          <div
            onClick={() => openLightbox(2)}
            className="md:col-span-4 group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer bg-[#241A15] shadow-sm hover:shadow-xl transition-all"
          >
            <img
              src={GALLERY_ITEMS[2].image}
              alt={GALLERY_ITEMS[2].title}
              className="absolute inset-0 block h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#241A15]/90 via-[#241A15]/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
            <div className="absolute bottom-6 left-6 right-6 z-20">
              <span className="text-[10px] uppercase tracking-widest text-[#C7A15A] font-bold block">
                {GALLERY_ITEMS[2].subtitle}
              </span>
              <h3 className="font-serif text-lg font-light text-[#FFFDF8] leading-tight mt-0.5">
                {GALLERY_ITEMS[2].title}
              </h3>
            </div>
          </div>

          {/* Item 4: Square (4 cols) */}
          <div
            onClick={() => openLightbox(3)}
            className="md:col-span-4 group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer bg-[#241A15] shadow-sm hover:shadow-xl transition-all"
          >
            <img
              src={GALLERY_ITEMS[3].image}
              alt={GALLERY_ITEMS[3].title}
              className="absolute inset-0 block h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#241A15]/90 via-[#241A15]/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
            <div className="absolute bottom-6 left-6 right-6 z-20">
              <span className="text-[10px] uppercase tracking-widest text-[#C7A15A] font-bold block">
                {GALLERY_ITEMS[3].subtitle}
              </span>
              <h3 className="font-serif text-lg font-light text-[#FFFDF8] leading-tight mt-0.5">
                {GALLERY_ITEMS[3].title}
              </h3>
            </div>
          </div>

          {/* Item 5: Landscape (4 cols) */}
          <div
            onClick={() => openLightbox(4)}
            className="md:col-span-4 group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer bg-[#241A15] shadow-sm hover:shadow-xl transition-all"
          >
            <img
              src={GALLERY_ITEMS[4].image}
              alt={GALLERY_ITEMS[4].title}
              className="absolute inset-0 block h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#241A15]/90 via-[#241A15]/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
            <div className="absolute bottom-6 left-6 right-6 z-20">
              <span className="text-[10px] uppercase tracking-widest text-[#C7A15A] font-bold block">
                {GALLERY_ITEMS[4].subtitle}
              </span>
              <h3 className="font-serif text-lg font-light text-[#FFFDF8] leading-tight mt-0.5">
                {GALLERY_ITEMS[4].title}
              </h3>
            </div>
          </div>

        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-md"
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10 cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevLightbox();
              }}
              className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10 cursor-pointer"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Current Image */}
            <div
              className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={GALLERY_ITEMS[lightboxIndex].image}
                alt={GALLERY_ITEMS[lightboxIndex].title}
                className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
              />
              <div className="pt-4 text-center">
                <span className="text-xs uppercase tracking-widest text-[#C7A15A] font-bold block">
                  {GALLERY_ITEMS[lightboxIndex].subtitle}
                </span>
                <span className="font-serif text-xl text-white font-light">
                  {GALLERY_ITEMS[lightboxIndex].title}
                </span>
              </div>
            </div>

            {/* Next */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextLightbox();
              }}
              className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10 cursor-pointer"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
