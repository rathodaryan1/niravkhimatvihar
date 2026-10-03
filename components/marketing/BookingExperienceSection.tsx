'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, Users, DoorOpen, Search, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

export function BookingExperienceSection() {
  const router = useRouter();

  const formatDate = (d: Date) => d.toISOString().split('T')[0];
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [checkIn, setCheckIn] = useState<string>(formatDate(today));
  const [checkOut, setCheckOut] = useState<string>(formatDate(tomorrow));
  const [guests, setGuests] = useState<number>(2);
  const [rooms, setRooms] = useState<number>(1);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      checkIn,
      checkOut,
      guests: guests.toString(),
      rooms: rooms.toString(),
    });
    router.push(`/booking?${params.toString()}`);
  };

  return (
    <section id="booking-experience" className="py-24 sm:py-32 bg-cinematic relative overflow-hidden text-brand-ivory">
      {/* Background Decorative Motif */}
      <div className="absolute inset-0 bg-[radial-gradient(#C7A15A_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-gold/30 bg-brand-charcoal/50 text-xs uppercase tracking-widest text-brand-gold font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Digital Yatra Reservation</span>
          </div>

          <h2 className="heading-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-warmWhite uppercase tracking-tight">
            Your Room Awaits.
          </h2>

          <p className="text-sm sm:text-base text-brand-ivory/80 font-light leading-relaxed">
            Real-time availability calculated directly on our server. Secure your peaceful accommodation before beginning your Shatrunjaya ascent.
          </p>
        </motion.div>

        {/* Custom Integrated Booking Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="bg-brand-charcoal/80 border border-brand-gold/30 rounded-3xl p-6 sm:p-10 shadow-cinematic backdrop-blur-xl"
        >
          <form onSubmit={handleSearch} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Check-In */}
              <div className="space-y-2">
                <label className="block text-[11px] uppercase tracking-widest text-brand-gold font-bold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                  Check-In Date
                </label>
                <input
                  type="date"
                  min={formatDate(today)}
                  value={checkIn}
                  onChange={(e) => {
                    const newIn = e.target.value;
                    setCheckIn(newIn);
                    if (newIn >= checkOut) {
                      const next = new Date(newIn);
                      next.setDate(next.getDate() + 1);
                      setCheckOut(formatDate(next));
                    }
                  }}
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-brand-gold/30 bg-brand-deep/60 text-brand-warmWhite text-sm font-medium focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
                />
              </div>

              {/* Check-Out */}
              <div className="space-y-2">
                <label className="block text-[11px] uppercase tracking-widest text-brand-gold font-bold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                  Check-Out Date
                </label>
                <input
                  type="date"
                  min={checkIn}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-brand-gold/30 bg-brand-deep/60 text-brand-warmWhite text-sm font-medium focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
                />
              </div>

              {/* Guests */}
              <div className="space-y-2">
                <label className="block text-[11px] uppercase tracking-widest text-brand-gold font-bold flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-brand-gold" />
                  Total Yatris
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value, 10))}
                  className="w-full px-4 py-3 rounded-2xl border border-brand-gold/30 bg-brand-deep/60 text-brand-warmWhite text-sm font-medium focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20].map((num) => (
                    <option key={num} value={num} className="bg-brand-charcoal text-brand-ivory">
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rooms */}
              <div className="space-y-2">
                <label className="block text-[11px] uppercase tracking-widest text-brand-gold font-bold flex items-center gap-1.5">
                  <DoorOpen className="w-3.5 h-3.5 text-brand-gold" />
                  Rooms Required
                </label>
                <select
                  value={rooms}
                  onChange={(e) => setRooms(parseInt(e.target.value, 10))}
                  className="w-full px-4 py-3 rounded-2xl border border-brand-gold/30 bg-brand-deep/60 text-brand-warmWhite text-sm font-medium focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num} className="bg-brand-charcoal text-brand-ivory">
                      {num} {num === 1 ? 'Room' : 'Rooms'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-brand-gold/20 pt-6">
              <div className="flex items-center gap-2 text-xs text-brand-gold font-medium">
                <ShieldCheck className="w-4 h-4 text-brand-gold" />
                <span>Instant Temporary Hold & Concurrency Safe Confirmation</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-brand-gold hover:bg-brand-goldLight text-brand-charcoal font-bold px-10 py-4 rounded-full text-xs uppercase tracking-widest shadow-goldGlow transition-all active:scale-95"
              >
                <span>Check Availability</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
