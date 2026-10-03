import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ChevronRight } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="bg-[#FFFDF8] min-h-screen pb-24">
      <div className="bg-[#241A15] text-[#FFFDF8] py-16 border-b border-[#C7A15A]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#F8F3E8]/60 mb-4 font-serif">
            <Link href="/" className="hover:text-[#C7A15A] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-[#C7A15A]/50" />
            <span className="text-[#C7A15A]">Terms & House Rules</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#FFFDF8] tracking-tight">
            Terms of Stay & House Rules
          </h1>
          <p className="text-xs text-[#C7A15A] font-serif uppercase tracking-widest mt-2">
            Shri Nirav Khimat Bhavan · Palitana, Gujarat
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="space-y-8 text-sm text-[#3A2418]/85 leading-relaxed bg-[#F8F3E8] p-8 sm:p-12 rounded-3xl border border-[#9B7049]/20 shadow-sm font-light">
          <section className="space-y-2">
            <h2 className="font-serif text-2xl font-medium text-[#241A15]">1. Pilgrimage Decorum & House Rules</h2>
            <p>
              Shri Nirav Khimat Bhavan operates as a dedicated Jain pilgrimage accommodation facility in sacred Palitana. All guests are expected to maintain the dignity, sanctity, and cleanliness of the premises. Consumption or possession of non-vegetarian food, eggs, root vegetables (kandmool), tobacco, cigarettes, and alcoholic beverages is strictly prohibited.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-2xl font-medium text-[#241A15]">2. Check-In and Check-Out Schedules</h2>
            <p>
              Standard Check-in time is <strong>10:00 AM</strong>. Standard Check-out time is <strong>09:00 AM</strong>. Early check-in or late departure is subject to room availability and approval from the property manager.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-2xl font-medium text-[#241A15]">3. Mandatory Photo Identification</h2>
            <p>
              In accordance with government regulations, every adult guest must produce a valid government-approved photo identity card (Aadhaar card, Passport, Driving License, or Voter ID) at the reception desk during check-in.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-2xl font-medium text-[#241A15]">4. Noise & Common Area Etiquette</h2>
            <p>
              Pilgrims retire early in preparation for pre-dawn mountain ascents. We request all guests to maintain quiet hours in the corridors and courtyard after 10:00 PM.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
