'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { RoomType } from '@/lib/types';
import { Users, Bed, Snowflake, Bath, Flame, ArrowRight, Sparkles, X, Check, ShieldCheck, DoorOpen } from 'lucide-react';

interface RoomsShowcaseProps {
  rooms?: RoomType[];
  roomTypes?: RoomType[];
}

export function RoomsShowcase({ rooms, roomTypes }: RoomsShowcaseProps) {
  const displayRooms = rooms || roomTypes || [];
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="rooms" className="py-24 sm:py-36 bg-[#FFFDF8] text-[#241A15] border-t border-[#9B7049]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#9B7049]/20 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#9B7049] font-serif font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#C7A15A]" />
              <span>Sanctuary & Accommodations · યાત્રિક આવાસ</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#241A15] tracking-tight leading-[1.05]">
              STAY — <br />
              <span className="italic font-normal text-[#9B7049]">rooms for your journey.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-[#3A2418]/80 font-light leading-relaxed">
            Clean, well-ventilated air-conditioned rooms with attached Western washrooms and 24-hour hot water designed for restful recovery.
          </p>
        </div>

        {/* Editorial Rooms Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayRooms.slice(0, 3).map((room, idx) => (
            <motion.div
              key={room.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="group bg-[#F8F3E8] rounded-3xl border border-[#9B7049]/25 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#C7A15A] transition-all flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#241A15]">
                <img
                  src={
                    idx === 0
                      ? 'https://oswalyatrikgruh.org/images/rooms/room-1.jpg'
                      : idx === 1
                      ? 'https://oswalyatrikgruh.org/images/suite-room/suite-room-2.jpeg'
                      : 'https://oswalyatrikgruh.org/images/rooms/room-4.jpg'
                  }
                  alt={room.name}
                  className="absolute inset-0 block h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Gradient for Card Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#241A15]/80 via-transparent to-transparent" />

                {/* Index Pill */}
                <div className="absolute top-4 left-4 z-20 bg-[#241A15]/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#C7A15A]/40 text-[#C7A15A] font-serif font-bold text-xs">
                  0{idx + 1}
                </div>

                {/* Capacity Pill */}
                <div className="absolute top-4 right-4 z-20 bg-[#241A15]/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#C7A15A]/40 text-[#F8F3E8] text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5">
                  <Users className="w-3 h-3 text-[#C7A15A]" />
                  <span>Up to {room.capacity} Guests</span>
                </div>
              </div>

              {/* Room Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#9B7049] font-bold block">
                    {room.bed_type}
                  </span>
                  <h3 className="font-serif text-2xl font-medium text-[#241A15] leading-snug">
                    {room.name}
                  </h3>
                  <p className="text-xs text-[#3A2418]/75 leading-relaxed font-light line-clamp-2">
                    {room.short_description || room.description}
                  </p>

                  {/* Amenities Highlights */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#3A2418] bg-white px-2.5 py-1 rounded-md border border-[#9B7049]/20">
                      <Snowflake className="w-3 h-3 text-[#9B7049]" />
                      Air Conditioning
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#3A2418] bg-white px-2.5 py-1 rounded-md border border-[#9B7049]/20">
                      <Bath className="w-3 h-3 text-[#9B7049]" />
                      Western Toilet
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#3A2418] bg-white px-2.5 py-1 rounded-md border border-[#9B7049]/20">
                      <Flame className="w-3 h-3 text-[#9B7049]" />
                      Hot Water
                    </span>
                  </div>
                </div>

                {/* Tariff & View Room CTA */}
                <div className="pt-4 border-t border-[#9B7049]/20 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#9B7049] block">Direct Trust Rate</span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif text-2xl font-bold text-[#241A15]">
                        ₹{room.base_price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-[#3A2418]/70">/ night</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedRoom(room)}
                    className="inline-flex items-center gap-1.5 bg-[#3A2418] hover:bg-[#241A15] text-[#F8F3E8] px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all active:scale-95 cursor-pointer shadow-sm"
                  >
                    <span>View Room</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C7A15A]" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Room Detail Experience Modal */}
      <AnimatePresence>
        {selectedRoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 sm:p-6 backdrop-blur-sm"
            onClick={() => setSelectedRoom(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-2xl w-full bg-[#FFFDF8] rounded-3xl overflow-hidden shadow-2xl border border-[#9B7049]/30 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedRoom(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-[#F8F3E8] text-[#241A15] hover:bg-[#9B7049]/20 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Room Title */}
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#9B7049] font-bold block">
                  ROOM TYPE DETAILS · SHRI NIRAV KHIMAT BHAVAN
                </span>
                <h3 className="font-serif text-3xl font-light text-[#241A15]">
                  {selectedRoom.name}
                </h3>
              </div>

              {/* Description */}
              <p className="text-sm text-[#3A2418]/80 leading-relaxed font-light">
                {selectedRoom.description || selectedRoom.short_description}
              </p>

              {/* Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-[#F8F3E8] rounded-2xl border border-[#9B7049]/20 text-xs">
                <div>
                  <span className="text-[#9B7049] block font-medium">Guest Capacity:</span>
                  <span className="font-bold text-[#241A15]">Up to {selectedRoom.capacity} Yatris</span>
                </div>
                <div>
                  <span className="text-[#9B7049] block font-medium">Bed Arrangement:</span>
                  <span className="font-bold text-[#241A15]">{selectedRoom.bed_type}</span>
                </div>
                <div>
                  <span className="text-[#9B7049] block font-medium">Air Conditioning:</span>
                  <span className="font-bold text-[#241A15]">Split A/C Included</span>
                </div>
                <div>
                  <span className="text-[#9B7049] block font-medium">Bathroom:</span>
                  <span className="font-bold text-[#241A15]">Attached Western</span>
                </div>
                <div>
                  <span className="text-[#9B7049] block font-medium">Hot Water:</span>
                  <span className="font-bold text-[#241A15]">24-Hour Geyser</span>
                </div>
                <div>
                  <span className="text-[#9B7049] block font-medium">Drinking Water:</span>
                  <span className="font-bold text-[#241A15]">Pure RO Water</span>
                </div>
              </div>

              {/* Trust Policy & Check-in Details */}
              <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-xs text-amber-900 space-y-1.5">
                <span className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  Pilgrimage Stay Guidelines
                </span>
                <p>• Strictly Jain Yatrik accommodation adhering to satvik sanctity.</p>
                <p>• Check-in is at 10:00 AM and check-out is at 10:00 AM.</p>
              </div>

              {/* Modal Bottom CTA */}
              <div className="pt-2 flex items-center justify-between border-t border-[#9B7049]/20">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#9B7049] block">Dharamshala Tariff</span>
                  <span className="font-serif text-3xl font-bold text-[#241A15]">
                    ₹{selectedRoom.base_price.toLocaleString('en-IN')}{' '}
                    <span className="text-xs font-normal text-[#3A2418]/70">/ night</span>
                  </span>
                </div>

                <Link
                  href={`/booking?roomTypeId=${selectedRoom.id}`}
                  className="inline-flex items-center gap-2 bg-[#3A2418] hover:bg-[#241A15] text-[#F8F3E8] px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-md transition-all active:scale-95"
                >
                  <span>Book This Room</span>
                  <ArrowRight className="w-4 h-4 text-[#C7A15A]" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
