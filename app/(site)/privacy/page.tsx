import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ChevronRight } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="bg-[#FFFDF8] min-h-screen pb-24">
      <div className="bg-[#241A15] text-[#FFFDF8] py-16 border-b border-[#C7A15A]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#F8F3E8]/60 mb-4 font-serif">
            <Link href="/" className="hover:text-[#C7A15A] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-[#C7A15A]/50" />
            <span className="text-[#C7A15A]">Privacy Policy</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#FFFDF8] tracking-tight">
            Privacy & Data Policy
          </h1>
          <p className="text-xs text-[#C7A15A] font-serif uppercase tracking-widest mt-2">
            Shri Nirav Khimat Bhavan · Palitana, Gujarat
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="space-y-8 text-sm text-[#3A2418]/85 leading-relaxed bg-[#F8F3E8] p-8 sm:p-12 rounded-3xl border border-[#9B7049]/20 shadow-sm font-light">
          <section className="space-y-2">
            <h2 className="font-serif text-2xl font-medium text-[#241A15]">1. Data Collection & Usage</h2>
            <p>
              We collect guest personal information including full name, phone number, email address, and city of residence solely for booking verification, statutory guest registration, and reservation communication.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-2xl font-medium text-[#241A15]">2. Payment Processing Security</h2>
            <p>
              All online transactions are securely encrypted via Razorpay. Shri Nirav Khimat Bhavan does not store card numbers, bank credentials, or CVVs on our servers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-2xl font-medium text-[#241A15]">3. Zero Third-Party Marketing</h2>
            <p>
              We respect your privacy as a pilgrim. Your contact information is never sold, rented, or distributed to commercial advertisers or third-party agencies.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
