import React from 'react';
import type { Metadata } from 'next';
import { Camera, Film, Sparkles } from 'lucide-react';
import { GalleryEditorial } from '@/components/marketing/GalleryEditorial';
import { CinematicCTA } from '@/components/marketing/CinematicCTA';

export const metadata: Metadata = {
  title: 'Real Photos & Video Tour | Shri Nirav Khimat Bhavan Palitana',
  description:
    'Explore authentic real photographs and official 58-second video walkthrough of Shri Nirav Khimat Bhavan Dharamshala in Palitana, Gujarat. View rooms, Bhojanshala, and peaceful campus.',
};

export default function GalleryPage() {
  return (
    <div className="space-y-0 bg-[#FFFDF8]">
      {/* Editorial Header Banner */}
      <div className="bg-[#241A15] text-[#FFFDF8] py-20 sm:py-28 relative overflow-hidden border-b border-[#C7A15A]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#C7A15A]/40 bg-[#3A2418]/70 text-xs text-[#C7A15A] uppercase tracking-[0.25em] font-serif shadow-goldGlow">
            <Sparkles className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span>Official Visual Chronicle · તસવીરો અને વીડિયો દર્શન</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#FFFDF8] font-light leading-[1.05] tracking-tight">
            AUTHENTIC MEMORIES & <br />
            <span className="italic font-normal text-[#C7A15A]">SACRED SPACES.</span>
          </h1>

          <p className="text-sm sm:text-base text-[#F8F3E8]/85 max-w-2xl mx-auto font-light leading-relaxed">
            Witness the real facade and heritage carved jharokhas of <strong>Shri Nirav Khimat Bhavan</strong>, alongside our 58-second video walkthrough, clean pilgrim rooms, and Shastrokta Bhojanshala.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-3 text-xs uppercase tracking-widest text-[#C7A15A] font-serif">
            <span className="flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5" /> Real Property Photos
            </span>
            <span className="text-white/30">•</span>
            <span className="flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5" /> 58s Video Walkthrough
            </span>
            <span className="text-white/30">•</span>
            <span>Taleti Road, Palitana</span>
          </div>
        </div>
      </div>

      {/* Masonry Editorial Gallery with Video Tour & Lightbox */}
      <GalleryEditorial />

      {/* Booking CTA */}
      <CinematicCTA />
    </div>
  );
}
