import React from 'react';
import Link from 'next/link';
import { Utensils, Clock, CheckCircle2, ShieldCheck, Sparkles, Calendar, ArrowRight } from 'lucide-react';
import { BhojanshalaEditorial } from '@/components/marketing/BhojanshalaEditorial';
import { CinematicCTA } from '@/components/marketing/CinematicCTA';

export default function BhojanshalaPage() {
  return (
    <div className="space-y-0 bg-[#FFFDF8]">
      {/* Editorial Header Banner */}
      <div className="bg-[#241A15] text-[#FFFDF8] py-20 relative overflow-hidden border-b border-[#C7A15A]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C7A15A]/30 bg-[#3A2418]/60 text-xs text-[#C7A15A] uppercase tracking-[0.25em] font-serif">
            <Utensils className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span>Pure Satvik Jain Dining</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#FFFDF8] font-light leading-[1.08] tracking-tight">
            A MEAL SHARED IS <br />
            <span className="italic font-normal text-[#C7A15A]">PART OF THE JOURNEY.</span>
          </h1>

          <p className="text-sm sm:text-base text-[#F8F3E8]/80 max-w-2xl mx-auto font-light leading-relaxed">
            Traditional, wholesome, and strictly satvik Jain meals prepared with utmost reverence according to authentic Shastrokta principles.
          </p>
        </div>
      </div>

      {/* Main Editorial Bhojanshala Section */}
      <BhojanshalaEditorial />

      {/* Detailed Dietary & Tap Sādhana Support Guide */}
      <section className="py-24 bg-[#F8F3E8] border-t border-[#9B7049]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#9B7049] font-medium block">
              Culinary Observances
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#241A15] font-light">
              Jain Dietary Principles & Tap Sādhana
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-[#9B7049]/20 space-y-4 shadow-sm">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C7A15A]" />
                <h3 className="font-serif text-xl font-medium text-[#241A15]">Zero Root Vegetables (Kandmool)</h3>
              </div>
              <p className="text-sm text-[#3A2418]/80 leading-relaxed font-light">
                Strict and uncompromising exclusion of potatoes, onions, garlic, carrots, radish, ginger, beetroot, and underground root vegetables in all dining preparations.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-[#9B7049]/20 space-y-4 shadow-sm">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C7A15A]" />
                <h3 className="font-serif text-xl font-medium text-[#241A15]">Boiled Drinking Water (Ukalelu Pani)</h3>
              </div>
              <p className="text-sm text-[#3A2418]/80 leading-relaxed font-light">
                Freshly boiled, filtered water prepared at sunrise and kept available throughout daylight hours for yatris observing strict niyams and tap vows.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-[#9B7049]/20 space-y-4 shadow-sm">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C7A15A]" />
                <h3 className="font-serif text-xl font-medium text-[#241A15]">Ayambil & Ekasana Support</h3>
              </div>
              <p className="text-sm text-[#3A2418]/80 leading-relaxed font-light">
                Devoted meal accommodation for pilgrims performing Ayambil, Ekasana, or Biyasana sadhana upon prior notification to the Bhojanshala manager.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-[#9B7049]/20 space-y-4 shadow-sm">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C7A15A]" />
                <h3 className="font-serif text-xl font-medium text-[#241A15]">Reverent & Silent Atmosphere</h3>
              </div>
              <p className="text-sm text-[#3A2418]/80 leading-relaxed font-light">
                A serene, dignified dining atmosphere designed for gratitude and peaceful sustenance after completing sacred mountain pilgrimage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <CinematicCTA />
    </div>
  );
}
