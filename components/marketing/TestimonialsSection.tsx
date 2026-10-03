'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  origin: string;
  year: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    quote: 'Beautifully maintained, clean, and peaceful place to stay. The staff was deeply cooperative and the early morning hot water made our Shatrunjaya ascent effortless.',
    author: 'Shah Family',
    origin: 'Mumbai',
    year: 'Palitana Yatri',
  },
  {
    id: 't-2',
    quote: 'Pure satvik Bhojanshala with fresh warm meals. The elevator facility was a blessing for my elderly parents during our 3-day yatra.',
    author: 'Mehta Family',
    origin: 'Ahmedabad',
    year: 'Pilgrim Sangh',
  },
  {
    id: 't-3',
    quote: 'Peaceful environment located just behind Sanchori Bhavan on Taleti Road. The rooms are spacious with great air conditioning and hygiene.',
    author: 'K. Doshi',
    origin: 'Surat',
    year: 'Regular Yatri',
  },
];

export function TestimonialsSection() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const nextTestimonial = () => {
    setCurrentIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const activeItem = TESTIMONIALS[currentIdx];

  return (
    <section className="py-24 sm:py-36 bg-[#F8F3E8] text-[#241A15] relative overflow-hidden border-t border-[#9B7049]/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#9B7049] font-serif font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#C7A15A]" />
          <span>Pilgrim Reflections · યાત્રિક અનુભવ</span>
        </div>

        {/* Big Quote Symbol */}
        <div className="w-14 h-14 rounded-full bg-white border border-[#9B7049]/20 text-[#C7A15A] flex items-center justify-center mx-auto shadow-sm">
          <Quote className="w-6 h-6" />
        </div>

        {/* Carousel Content */}
        <div className="min-h-[160px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#241A15] italic font-light leading-relaxed">
                &ldquo;{activeItem.quote}&rdquo;
              </p>

              <div className="space-y-0.5">
                <span className="font-serif font-medium text-lg text-[#241A15] block">
                  {activeItem.author}
                </span>
                <span className="text-xs uppercase tracking-widest text-[#9B7049] font-medium block">
                  {activeItem.origin} · {activeItem.year}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 pt-4">
          <button
            type="button"
            onClick={prevTestimonial}
            className="p-3 rounded-full bg-white border border-[#9B7049]/20 text-[#241A15] hover:bg-[#3A2418] hover:text-white transition-colors cursor-pointer shadow-sm"
            aria-label="Previous quote"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-1.5 px-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIdx(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  currentIdx === idx ? 'w-8 bg-[#C7A15A]' : 'w-2 bg-[#9B7049]/30'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={nextTestimonial}
            className="p-3 rounded-full bg-white border border-[#9B7049]/20 text-[#241A15] hover:bg-[#3A2418] hover:text-white transition-colors cursor-pointer shadow-sm"
            aria-label="Next quote"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
