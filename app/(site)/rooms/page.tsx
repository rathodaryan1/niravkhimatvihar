import React from 'react';
import { dbStore } from '@/lib/db/store';
import { RoomCard } from '@/components/rooms/RoomCard';
import { BookingExperienceSection } from '@/components/marketing/BookingExperienceSection';
import { ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';

export default async function RoomsPage() {
  const roomTypes = await dbStore.getRoomTypes();

  return (
    <div className="space-y-16 pb-24 bg-[#FFFDF8]">
      {/* Editorial Header Banner */}
      <div className="bg-[#241A15] text-[#FFFDF8] py-20 relative overflow-hidden border-b border-[#C7A15A]/30">
        <div className="absolute inset-0 bg-[radial-gradient(#C7A15A_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C7A15A]/30 bg-[#3A2418]/60 text-xs text-[#C7A15A] uppercase tracking-[0.25em] font-serif">
            <Sparkles className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span>Shri Nirav Khimat Bhavan Accommodation</span>
          </div>
          
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#FFFDF8] font-light leading-[1.08] tracking-tight">
            REST, BEFORE <br />
            <span className="italic font-normal text-[#C7A15A]">YOU RISE.</span>
          </h1>
          
          <p className="text-sm sm:text-base text-[#F8F3E8]/80 max-w-2xl mx-auto font-light leading-relaxed">
            Hygienic, serene, and well-maintained air-conditioned rooms designed to provide restorative accommodation for yatris ascending sacred Mount Shatrunjaya.
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-[#9B7049]/20 gap-4">
          <div>
            <h2 className="font-serif text-3xl font-light text-[#241A15]">
              Available Room Categories
            </h2>
            <p className="text-xs text-[#9B7049] mt-1 font-medium">
              All room tariffs include 24-hour hot water, split A/C, and pure RO drinking water.
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-[#3A2418] font-medium bg-[#F8F3E8] border border-[#9B7049]/25 px-4 py-2 rounded-full shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[#C7A15A]" />
            <span>Direct Trust Pricing · No Hidden Surcharges</span>
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {roomTypes.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>

        {/* Accommodation Policy Note */}
        <div className="bg-[#F8F3E8] border border-[#9B7049]/20 rounded-3xl p-8 sm:p-10 space-y-6 shadow-sm">
          <h3 className="font-serif text-2xl font-light text-[#241A15] flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-[#C7A15A]" />
            <span>Dharamshala Accommodation Guidelines</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#3A2418]/80 leading-relaxed font-light">
            <div className="p-4 rounded-xl bg-white/60 border border-[#9B7049]/15 space-y-1">
              <strong className="text-[#241A15] font-serif text-sm block">Check-In & Check-Out Timings</strong>
              <span>Check-in: 10:00 AM | Check-out: 09:00 AM. Early check-in is subject to real-time room turnover and availability.</span>
            </div>
            
            <div className="p-4 rounded-xl bg-white/60 border border-[#9B7049]/15 space-y-1">
              <strong className="text-[#241A15] font-serif text-sm block">Pure Jain Satvik Norms</strong>
              <span>Non-vegetarian foods, eggs, garlic/onion consumables, alcohol, smoking, and loud music are strictly forbidden on premises.</span>
            </div>

            <div className="p-4 rounded-xl bg-white/60 border border-[#9B7049]/15 space-y-1">
              <strong className="text-[#241A15] font-serif text-sm block">Government Identification</strong>
              <span>All adult yatris must present valid government-issued photo ID cards (Aadhaar, Driving License, Passport) upon arrival.</span>
            </div>

            <div className="p-4 rounded-xl bg-white/60 border border-[#9B7049]/15 space-y-1">
              <strong className="text-[#241A15] font-serif text-sm block">Early Morning Yatra Support</strong>
              <span>24-hour geyser hot water is continuously available for early 4:00 AM pre-dawn pilgrimage baths.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Integrated Dark Availability Search */}
      <BookingExperienceSection />
    </div>
  );
}
