import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { dbStore } from '@/lib/db/store';
import {
  Users,
  Bed,
  CheckCircle2,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Snowflake,
  Bath,
  Flame,
  Droplets,
  Sparkles,
  ChevronRight,
  MapPin,
  Clock,
} from 'lucide-react';

export async function generateStaticParams() {
  const roomTypes = await dbStore.getRoomTypes();
  return roomTypes.map((room) => ({
    slug: room.slug,
  }));
}

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const room = await dbStore.getRoomTypeBySlug(slug);

  if (!room) {
    notFound();
  }

  const roomImage = room.images?.[0]?.storage_path || '/placeholder/room-01.jpg';

  return (
    <div className="bg-[#FFFDF8] min-h-screen pb-24">
      {/* Editorial Top Hero Banner */}
      <div className="bg-[#241A15] text-[#FFFDF8] py-14 border-b border-[#C7A15A]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#F8F3E8]/60 mb-6 font-serif">
            <Link href="/" className="hover:text-[#C7A15A] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-[#C7A15A]/50" />
            <Link href="/rooms" className="hover:text-[#C7A15A] transition-colors">Rooms</Link>
            <ChevronRight className="w-3 h-3 text-[#C7A15A]/50" />
            <span className="text-[#C7A15A] font-medium">{room.name}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C7A15A] font-serif block">
                Shri Nirav Khimat Bhavan · Palitana
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#FFFDF8] tracking-tight">
                {room.name}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-xs text-[#F8F3E8]/60 block uppercase tracking-wider">Tariff per night</span>
                <span className="font-serif text-3xl sm:text-4xl font-light text-[#C7A15A]">
                  ₹{room.base_price.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Room Presentation & Imagery (col-span-7) */}
          <div className="lg:col-span-7 space-y-10">
            {/* Visual Room Hero Image */}
            <div className="relative h-96 sm:h-[480px] rounded-3xl overflow-hidden border border-[#9B7049]/30 shadow-xl bg-[#241A15]">
              <Image
                src={roomImage}
                alt={room.name}
                fill
                className="object-cover object-center brightness-95"
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#241A15]/80 via-transparent to-black/20" />

              <div className="absolute top-4 left-4 bg-[#241A15]/90 backdrop-blur-md border border-[#C7A15A]/40 text-[#FFFDF8] text-xs px-4 py-1.5 rounded-full font-serif flex items-center gap-2">
                <Users className="w-4 h-4 text-[#C7A15A]" />
                <span>Accommodates up to {room.capacity} Yatris</span>
              </div>

              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[#FFFDF8] text-xs">
                <span className="bg-[#3A2418]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#C7A15A]/30">
                  {room.bed_type}
                </span>
                <span className="text-[#C7A15A] font-serif">
                  {room.room_size_sqft || 220} sq.ft Room Area
                </span>
              </div>
            </div>

            {/* Editorial Description */}
            <div className="bg-[#F8F3E8] border border-[#9B7049]/20 rounded-3xl p-8 sm:p-10 space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#241A15]">
                About This Room
              </h2>
              <p className="text-base text-[#3A2418]/85 leading-relaxed font-light">
                {room.description}
              </p>
            </div>

            {/* Room Amenities Grid */}
            <div className="bg-[#FFFDF8] border border-[#9B7049]/20 rounded-3xl p-8 sm:p-10 space-y-6 shadow-sm">
              <h2 className="font-serif text-2xl font-light text-[#241A15]">
                Room Amenities & Features
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(room.amenities || []).map((amenity) => (
                  <div
                    key={amenity.id}
                    className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#F8F3E8] border border-[#9B7049]/15"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#C7A15A] shrink-0" />
                    <span className="text-sm font-medium text-[#241A15]">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Booking Widget (col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#241A15] text-[#FFFDF8] border border-[#C7A15A]/30 rounded-3xl p-8 shadow-2xl sticky top-28 space-y-6">
              
              <div className="pb-6 border-b border-[#F8F3E8]/10 space-y-2">
                <span className="text-xs uppercase tracking-[0.2em] text-[#C7A15A] font-serif block">
                  Reserve Accommodation
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-4xl font-light text-[#FFFDF8]">
                    ₹{room.base_price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-[#F8F3E8]/70 font-light">/ night (0% GST)</span>
                </div>
              </div>

              {/* Room Highlights Specs */}
              <div className="space-y-3.5 text-xs text-[#F8F3E8]/80 font-light">
                <div className="flex justify-between items-center py-1.5 border-b border-[#F8F3E8]/5">
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#C7A15A]" />
                    Max Capacity:
                  </span>
                  <span className="font-medium text-[#FFFDF8]">{room.capacity} Guests</span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-[#F8F3E8]/5">
                  <span className="flex items-center gap-2">
                    <Bed className="w-4 h-4 text-[#C7A15A]" />
                    Bed Configuration:
                  </span>
                  <span className="font-medium text-[#FFFDF8]">{room.bed_type}</span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-[#F8F3E8]/5">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#C7A15A]" />
                    Check-In / Out:
                  </span>
                  <span className="font-medium text-[#FFFDF8]">10:00 AM / 09:00 AM</span>
                </div>

                <div className="flex justify-between items-center py-1.5">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#C7A15A]" />
                    Distance to Taleti:
                  </span>
                  <span className="font-medium text-[#FFFDF8]">~1.5 km (~5 mins)</span>
                </div>
              </div>

              {/* Booking Trigger Button */}
              <div className="pt-4">
                <Link
                  href={`/booking?roomTypeId=${room.id}`}
                  className="w-full flex items-center justify-center gap-3 bg-[#C7A15A] hover:bg-[#FFFDF8] text-[#241A15] font-serif font-semibold py-4 px-6 rounded-full shadow-lg transition-all duration-300 text-sm uppercase tracking-wider group"
                >
                  <Calendar className="w-4 h-4 text-[#241A15]" />
                  <span>Book This Room</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Trust badges */}
              <div className="pt-6 border-t border-[#F8F3E8]/10 text-xs text-[#F8F3E8]/60 space-y-2 font-light">
                <div className="flex items-center gap-2 text-[#C7A15A]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Direct Trust Booking</span>
                </div>
                <p>• 100% Secure Payment with Razorpay</p>
                <p>• 10-Minute Temporary Hold Guarantee</p>
                <p>• Instant Digital Confirmation Receipt</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
