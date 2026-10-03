import React from 'react';
import Link from 'next/link';
import { Mountain, MapPin, Sparkles, Clock, ShieldCheck, Heart, Calendar, ArrowRight } from 'lucide-react';
import { PalitanaExperienceSection } from '@/components/marketing/PalitanaExperienceSection';
import { YatraStorySection } from '@/components/marketing/YatraStorySection';
import { CinematicCTA } from '@/components/marketing/CinematicCTA';

export default function PalitanaYatraPage() {
  return (
    <div className="space-y-0 bg-[#FFFDF8]">
      {/* Hero Banner */}
      <div className="bg-[#241A15] text-[#FFFDF8] py-20 relative overflow-hidden border-b border-[#C7A15A]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C7A15A]/30 bg-[#3A2418]/60 text-xs text-[#C7A15A] uppercase tracking-[0.25em] font-serif">
            <Mountain className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span>Sacred Shatrunjaya Maha Tirtha</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#FFFDF8] font-light leading-[1.08] tracking-tight">
            PALITANA. <br />
            <span className="italic font-normal text-[#C7A15A]">A JOURNEY WITHIN.</span>
          </h1>

          <p className="text-sm sm:text-base text-[#F8F3E8]/80 max-w-2xl mx-auto font-light leading-relaxed">
            Essential guidance, spiritual significance, and practical knowledge for yatris embarking on the sacred ascent of Mount Shatrunjaya.
          </p>
        </div>
      </div>

      {/* Yatra Story Hero */}
      <YatraStorySection />

      {/* Destination & Step Guidance */}
      <PalitanaExperienceSection />

      {/* Spiritual Sādhana Editorial Details */}
      <section className="py-24 bg-[#F8F3E8] border-t border-[#9B7049]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#9B7049] font-medium block">
                Moksha Tirtha
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#241A15] font-light">
                The Sacred Peaks of 863 Temples
              </h2>
              <p className="text-base text-[#3A2418]/85 leading-relaxed font-light">
                Mount Shatrunjaya is sanctified by the spiritual resonance of infinite Kevalis and Tirthankaras who attained liberation here. Ascending at dawn with peaceful contemplation is a transformative pilgrimage experience.
              </p>
              <p className="text-sm text-[#3A2418]/75 leading-relaxed font-light">
                Shri Nirav Khimat Bhavan provides yatris with a quiet, comfortable sanctuary situated on Taleti Road, allowing for pre-dawn starts and restorative post-yatra nourishment.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#9B7049]/20 shadow-sm space-y-4">
              <h3 className="font-serif text-xl font-medium text-[#241A15] pb-2 border-b border-[#9B7049]/15">
                Yatra Quick Facts
              </h3>
              <div className="space-y-3 text-xs text-[#3A2418]/80">
                <div className="flex justify-between py-1.5 border-b border-[#9B7049]/10">
                  <span className="font-medium text-[#241A15]">Total Mountain Steps:</span>
                  <span className="font-mono text-[#9B7049]">Approx. 3,500 – 3,800 steps</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#9B7049]/10">
                  <span className="font-medium text-[#241A15]">Recommended Start Time:</span>
                  <span className="font-mono text-[#9B7049]">04:30 AM – 05:30 AM (Dawn)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#9B7049]/10">
                  <span className="font-medium text-[#241A15]">Ascent Duration:</span>
                  <span className="font-mono text-[#9B7049]">1.5 to 2.5 hours</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="font-medium text-[#241A15]">Doli / Palki Service:</span>
                  <span className="font-mono text-[#9B7049]">Available at Taleti Gate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <CinematicCTA />
    </div>
  );
}
