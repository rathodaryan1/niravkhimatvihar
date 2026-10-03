import React from 'react';
import Link from 'next/link';
import {
  Snowflake,
  Flame,
  Building2,
  Droplets,
  Utensils,
  Car,
  Sparkles,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import { FacilitiesNumberedList } from '@/components/marketing/FacilitiesNumberedList';
import { CinematicCTA } from '@/components/marketing/CinematicCTA';

export default function FacilitiesPage() {
  const extendedFacilities = [
    {
      num: '01',
      title: 'Split Air Conditioning',
      desc: 'All guest rooms feature efficient split A/C systems providing quiet, customizable climate control for restful recovery after mountain climbing.',
    },
    {
      num: '02',
      title: '24-Hour Hot Water Supply',
      desc: 'Individual high-capacity geysers and central solar heating ensure hot water is always available at 4:00 AM for early yatra pre-dawn preparations.',
    },
    {
      num: '03',
      title: 'Passenger Elevator / Lift',
      desc: 'Full elevator service connects all residential floors to the reception and dining hall, facilitating ease of mobility for senior citizens.',
    },
    {
      num: '04',
      title: 'Commercial RO Drinking Water',
      desc: 'High-grade reverse osmosis plant on-premises supplying pure drinking water, alongside boiled water (ukalelu pani) for yatris observing vows.',
    },
    {
      num: '05',
      title: 'Pure Jain Bhojanshala',
      desc: 'Traditional satvik dining hall serving freshly prepared meals during Navkarshi, Dupahar Bhojan, and Chauvihar times.',
    },
    {
      num: '06',
      title: 'Dedicated Vehicle Parking',
      desc: 'Spacious on-site parking area for private cars and pilgrim buses with 24/7 premises watch and driver assistance.',
    },
    {
      num: '07',
      title: 'Continuous Power Backup',
      desc: 'Automatic generator backup ensures uninterrupted lighting, fans, elevators, and water pumps during municipal outages.',
    },
    {
      num: '08',
      title: 'Daily Housekeeping & Hygiene',
      desc: 'Strict daily sanitation, fresh linen, and spotless washroom maintenance reflecting sacred pilgrimage cleanliness.',
    },
  ];

  return (
    <div className="space-y-0 bg-[#FFFDF8]">
      {/* Editorial Header Banner */}
      <div className="bg-[#241A15] text-[#FFFDF8] py-20 relative overflow-hidden border-b border-[#C7A15A]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C7A15A]/30 bg-[#3A2418]/60 text-xs text-[#C7A15A] uppercase tracking-[0.25em] font-serif">
            <Sparkles className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span>Dedicated Pilgrim Comfort</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#FFFDF8] font-light leading-[1.08] tracking-tight">
            COMFORT IN SERVICE <br />
            <span className="italic font-normal text-[#C7A15A]">OF THE YATRA.</span>
          </h1>

          <p className="text-sm sm:text-base text-[#F8F3E8]/80 max-w-2xl mx-auto font-light leading-relaxed">
            Every facility at Shri Nirav Khimat Bhavan is arranged to provide peace of mind, physical comfort, and seamless support for your Shatrunjaya pilgrimage.
          </p>
        </div>
      </div>

      {/* Numbered Facilities Interactive Section */}
      <FacilitiesNumberedList />

      {/* Grid of Extended Amenities */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#9B7049] font-medium block">
            Operational Highlights
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#241A15] font-light">
            Designed for Serene Sādhana
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {extendedFacilities.map((f, idx) => (
            <div
              key={idx}
              className="bg-[#F8F3E8] border border-[#9B7049]/20 rounded-2xl p-6 space-y-3 hover:border-[#C7A15A] transition-all"
            >
              <span className="font-mono text-xs text-[#C7A15A] font-semibold block">{f.num}</span>
              <h3 className="font-serif text-lg font-medium text-[#241A15]">{f.title}</h3>
              <p className="text-xs text-[#3A2418]/75 leading-relaxed font-light">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final Booking Call to Action */}
      <CinematicCTA />
    </div>
  );
}
