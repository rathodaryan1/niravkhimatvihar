'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Snowflake, Bath, Flame, ArrowRight, Bed, ShieldCheck } from 'lucide-react';
import { RoomType } from '@/lib/types';

interface RoomCardProps {
  room: RoomType;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
}

export function RoomCard({ room, checkIn, checkOut, guests }: RoomCardProps) {
  const queryParams = new URLSearchParams();
  if (checkIn) queryParams.set('checkIn', checkIn);
  if (checkOut) queryParams.set('checkOut', checkOut);
  if (guests) queryParams.set('guests', guests.toString());
  queryParams.set('roomTypeId', room.id);

  const bookingHref = `/booking?${queryParams.toString()}`;
  const detailsHref = `/rooms/${room.slug}`;

  // Deterministic placeholder mapping
  const imageMap: Record<string, string> = {
    'room-type-2bed-ac': '/placeholder/room-01.jpg',
    'room-type-3bed-ac': '/placeholder/room-02.jpg',
    'room-type-4bed-ac': '/placeholder/room-01.jpg',
    'room-type-deluxe-suite': '/placeholder/room-02.jpg',
  };
  const roomImage = imageMap[room.id] || '/placeholder/room-01.jpg';

  return (
    <div className="bg-[#FFFDF8] rounded-2xl overflow-hidden border border-[#9B7049]/20 shadow-md hover:shadow-xl transition-all duration-500 flex flex-col group hover:-translate-y-1">
      {/* Visual Header / Room Image */}
      <div className="relative h-60 bg-[#241A15] overflow-hidden">
        <Image
          src={roomImage}
          alt={room.name}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-[0.85] group-hover:brightness-95"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#241A15]/90 via-transparent to-black/30" />

        {/* Capacity Badge */}
        <div className="absolute top-3 left-3 z-10 bg-[#241A15]/90 backdrop-blur-md border border-[#C7A15A]/40 text-[#FFFDF8] text-[11px] px-3 py-1 rounded-full font-medium flex items-center gap-1.5 shadow-sm">
          <Users className="w-3.5 h-3.5 text-[#C7A15A]" />
          <span>Up to {room.capacity} Yatris</span>
        </div>

        {/* Bed Configuration Tag */}
        <div className="absolute top-3 right-3 z-10 bg-[#C7A15A] text-[#241A15] text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-sm">
          {room.bed_type}
        </div>

        {/* Room Title on Image */}
        <div className="absolute bottom-3 left-4 right-4 z-10">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#C7A15A] font-medium block">
            PALITANA YATRA STAY
          </span>
          <h4 className="font-serif text-xl font-medium text-[#FFFDF8] truncate">
            {room.name}
          </h4>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <p className="text-xs text-[#3A2418]/75 line-clamp-2 leading-relaxed mb-3 font-light">
            {room.short_description || room.description}
          </p>

          {/* Key Amenities Pills */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#9B7049]/15">
            <span className="inline-flex items-center gap-1 text-[10px] bg-[#F8F3E8] text-[#3A2418] px-2.5 py-1 rounded-full font-medium border border-[#9B7049]/10">
              <Snowflake className="w-3 h-3 text-[#9B7049]" />
              Split A/C
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] bg-[#F8F3E8] text-[#3A2418] px-2.5 py-1 rounded-full font-medium border border-[#9B7049]/10">
              <Bath className="w-3 h-3 text-[#9B7049]" />
              Attached Bath
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] bg-[#F8F3E8] text-[#3A2418] px-2.5 py-1 rounded-full font-medium border border-[#9B7049]/10">
              <Flame className="w-3 h-3 text-[#9B7049]" />
              24-Hr Hot Water
            </span>
          </div>
        </div>

        {/* Pricing and Action Footer */}
        <div className="pt-4 border-t border-[#9B7049]/15 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#9B7049] block font-medium">Tariff from</span>
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-2xl font-semibold text-[#241A15]">
                ₹{room.base_price.toLocaleString('en-IN')}
              </span>
              <span className="text-[11px] text-[#3A2418]/60">/ night</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={detailsHref}
              className="text-xs font-serif font-medium text-[#3A2418] hover:text-[#9B7049] transition-colors px-2 py-1.5"
            >
              Details
            </Link>
            <Link
              href={bookingHref}
              className="inline-flex items-center gap-1.5 bg-[#3A2418] hover:bg-[#241A15] text-[#FFFDF8] text-xs font-medium px-4 py-2 rounded-full shadow-sm hover:shadow transition-all group"
            >
              <span>Book</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C7A15A] group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
