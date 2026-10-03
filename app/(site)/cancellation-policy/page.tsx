import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function CancellationPolicyPage() {
  return (
    <div className="bg-[#FFFDF8] min-h-screen pb-24">
      <div className="bg-[#241A15] text-[#FFFDF8] py-16 border-b border-[#C7A15A]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#F8F3E8]/60 mb-4 font-serif">
            <Link href="/" className="hover:text-[#C7A15A] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-[#C7A15A]/50" />
            <span className="text-[#C7A15A]">Cancellation Policy</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#FFFDF8] tracking-tight">
            Cancellation & Refund Policy
          </h1>
          <p className="text-xs text-[#C7A15A] font-serif uppercase tracking-widest mt-2">
            Shri Nirav Khimat Bhavan · Palitana, Gujarat
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="space-y-8 text-sm text-[#3A2418]/85 leading-relaxed bg-[#F8F3E8] p-8 sm:p-12 rounded-3xl border border-[#9B7049]/20 shadow-sm font-light">
          <section className="space-y-2">
            <h2 className="font-serif text-2xl font-medium text-[#241A15]">1. Standard Cancellation Windows</h2>
            <p>
              Cancellations made <strong>48 hours or more prior to 10:00 AM check-in</strong> are eligible for a full refund minus standard payment gateway processing charges.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-2xl font-medium text-[#241A15]">2. Late Cancellations & No-Shows</h2>
            <p>
              Cancellations made within 48 hours of scheduled check-in or failure to arrive without notice may be subject to a one-night room charge to account for unallocated pilgrimage inventory.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-2xl font-medium text-[#241A15]">3. Self-Service Cancellation</h2>
            <p>
              Yatris can cancel reservations online anytime through the <Link href="/my-booking" className="text-[#C7A15A] underline font-medium">Lookup My Booking</Link> portal using their Booking ID and registered phone number.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
