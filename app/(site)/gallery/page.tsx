import React from 'react';
import { Sparkles, Camera } from 'lucide-react';
import { GalleryEditorial } from '@/components/marketing/GalleryEditorial';
import { CinematicCTA } from '@/components/marketing/CinematicCTA';

export default function GalleryPage() {
  return (
    <div className="space-y-0 bg-[#FFFDF8]">
      {/* Editorial Header Banner */}
      <div className="bg-[#241A15] text-[#FFFDF8] py-20 relative overflow-hidden border-b border-[#C7A15A]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C7A15A]/30 bg-[#3A2418]/60 text-xs text-[#C7A15A] uppercase tracking-[0.25em] font-serif">
            <Camera className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span>Visual Showcase</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#FFFDF8] font-light leading-[1.08] tracking-tight">
            A PLACE TO <br />
            <span className="italic font-normal text-[#C7A15A]">PAUSE.</span>
          </h1>

          <p className="text-sm sm:text-base text-[#F8F3E8]/80 max-w-2xl mx-auto font-light leading-relaxed">
            Explore Shri Nirav Khimat Bhavan Dharamshala, our clean guest accommodations, authentic Bhojanshala, and serene Palitana surroundings.
          </p>
        </div>
      </div>

      {/* Masonry Editorial Gallery with Lightbox */}
      <GalleryEditorial />

      {/* Booking CTA */}
      <CinematicCTA />
    </div>
  );
}
