'use client';

import React from 'react';
import Link from 'next/link';
import { Utensils, Clock, CheckCircle2, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export function BhojanshalaEditorial() {
  const mealSlots = [
    {
      num: '01',
      slot: 'Morning',
      name: 'Navkarshi (Breakfast)',
      time: '08:00 AM – 09:00 AM',
      desc: 'Wholesome warm breakfast, boiled milk, and herbal tea prepared for yatris returning from early morning Shatrunjaya Darshan.',
      note: 'Fresh & Energizing',
    },
    {
      num: '02',
      slot: 'Afternoon',
      name: 'Lunch Satvik Thali',
      time: '12:00 PM – 01:30 PM',
      desc: 'Complete traditional Gujarati Jain Thali with fresh Phulka rotis, aromatic Dal, seasonal kathod, rice, and sweet delicacies.',
      note: 'Full Satvik Thali',
      featured: true,
    },
    {
      num: '03',
      slot: 'Evening',
      name: 'Evening Herbal Tea',
      time: '04:00 PM – 04:30 PM',
      desc: 'Refreshing warm herbal tea and light refreshments served prior to evening chauvihar meal.',
      note: 'Warm Refreshment',
    },
    {
      num: '04',
      slot: 'Pre-Sunset',
      name: 'Chauvihar (Dinner)',
      time: '05:00 PM – Sunset (Panchang)',
      desc: 'Reverently served evening dinner strictly concluding before local sunset according to Shastrokta Jain Maryada.',
      note: 'Pre-Sunset Observance',
    },
  ];

  return (
    <section id="bhojanshala" className="py-24 sm:py-36 bg-[#F8F3E8] text-[#241A15] border-t border-[#9B7049]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#9B7049]/20 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#9B7049] font-serif font-semibold">
              <Utensils className="w-3.5 h-3.5 text-[#C7A15A]" />
              <span>Satvik Dining · શુદ્ધ ભોજનાલય</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#241A15] tracking-tight leading-[1.05]">
              BHOJANSHALA — <br />
              <span className="italic font-normal text-[#9B7049]">a meal is part of the journey.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-[#3A2418]/80 font-light leading-relaxed">
            Prepared with utmost reverence in strict accordance with Jain Shastrokta dietary principles and purity.
          </p>
        </div>

        {/* 4 Meal Timetable Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mealSlots.map((meal) => (
            <div
              key={meal.num}
              className={`rounded-3xl p-6 sm:p-7 transition-all flex flex-col justify-between space-y-6 ${
                meal.featured
                  ? 'bg-[#3A2418] text-[#F8F3E8] shadow-xl border border-[#C7A15A]/40 ring-1 ring-[#C7A15A]/30'
                  : 'bg-white text-[#241A15] border border-[#9B7049]/25 shadow-sm hover:border-[#C7A15A]'
              }`}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span
                    className={`font-serif font-bold text-lg ${
                      meal.featured ? 'text-[#C7A15A]' : 'text-[#9B7049]'
                    }`}
                  >
                    {meal.num}
                  </span>
                  <span
                    className={`text-[10px] uppercase tracking-wider font-bold ${
                      meal.featured ? 'text-[#C7A15A]' : 'text-[#9B7049]'
                    }`}
                  >
                    {meal.slot}
                  </span>
                </div>

                <h3
                  className={`font-serif text-xl font-medium leading-snug ${
                    meal.featured ? 'text-[#FFFDF8]' : 'text-[#241A15]'
                  }`}
                >
                  {meal.name}
                </h3>

                <div
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                    meal.featured
                      ? 'bg-[#241A15] border border-[#C7A15A]/40 text-[#C7A15A]'
                      : 'bg-[#F8F3E8] border border-[#9B7049]/30 text-[#3A2418]'
                  }`}
                >
                  {meal.time}
                </div>

                <p
                  className={`text-xs leading-relaxed font-light ${
                    meal.featured ? 'text-[#F8F3E8]/80' : 'text-[#3A2418]/75'
                  }`}
                >
                  {meal.desc}
                </p>
              </div>

              <div
                className={`text-[11px] font-semibold pt-3 border-t ${
                  meal.featured ? 'border-[#C7A15A]/20 text-[#C7A15A]' : 'border-[#9B7049]/20 text-[#9B7049]'
                }`}
              >
                {meal.note}
              </div>
            </div>
          ))}
        </div>

        {/* 4 Shastrokta Observances Badges */}
        <div className="p-8 rounded-3xl bg-white border border-[#9B7049]/20 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#C7A15A]" />
            <h3 className="font-serif text-2xl font-normal text-[#241A15]">
              Shastrokta Culinary Commitments & Purity
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-[#3A2418]/80 font-light leading-relaxed">
            <div className="space-y-1.5">
              <span className="font-serif font-bold text-sm text-[#241A15] block">Zero Kandmool</span>
              <p>Strict exclusion of onions, garlic, potatoes, carrots, radish, and underground roots.</p>
            </div>
            <div className="space-y-1.5">
              <span className="font-serif font-bold text-sm text-[#241A15] block">Boiled Water (Ukalelu)</span>
              <p>Freshly boiled filtered drinking water prepared at sunrise for pilgrims observing tap vows.</p>
            </div>
            <div className="space-y-1.5">
              <span className="font-serif font-bold text-sm text-[#241A15] block">Chauvihar Discipline</span>
              <p>Evening meal concludes strictly before local sunset according to seasonal panchang timing.</p>
            </div>
            <div className="space-y-1.5">
              <span className="font-serif font-bold text-sm text-[#241A15] block">Tap Sādhana Support</span>
              <p>Devoted meal arrangements for pilgrims performing Ayambil, Ekasana, or Biyasana vows.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
