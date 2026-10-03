'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, Users, Bed, CheckCircle2, Snowflake, Bath, Flame, Droplets, Sparkles, ArrowRight } from 'lucide-react';
import { RoomType } from '@/lib/types';

interface RoomLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomType: RoomType | any | null;
  onSelectRoom?: (roomTypeId: string) => void;
  isSelected?: boolean;
}

export function RoomLightboxModal({
  isOpen,
  onClose,
  roomType,
  onSelectRoom,
  isSelected = false,
}: RoomLightboxModalProps) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !roomType) return null;

  const roomImage =
    roomType.images?.[0]?.storage_path ||
    (roomType.slug?.includes('standard')
      ? '/images/rooms/room-standard-1.jpg'
      : roomType.slug?.includes('executive')
      ? '/images/rooms/room-executive-1.jpg'
      : roomType.slug?.includes('family')
      ? '/images/rooms/room-family-1.jpg'
      : '/images/rooms/room-suite-1.jpg');

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#1F1511]/80 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 15 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-3xl bg-[#FCFAF5] border border-[#D8C4A8] rounded-3xl shadow-2xl overflow-hidden z-10 my-8"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#1F1511]/70 hover:bg-[#1F1511] text-white flex items-center justify-center transition-colors shadow-lg"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Large Room Visual */}
          <div className="relative h-64 sm:h-80 w-full bg-[#1F1511]">
            <Image
              src={roomImage}
              alt={roomType.name}
              fill
              className="object-cover brightness-95"
              sizes="(max-width: 1024px) 100vw, 800px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F1511]/80 via-transparent to-black/20" />

            {/* Badges on image */}
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white text-xs">
              <span className="bg-[#A95339] px-3.5 py-1.5 rounded-full font-serif font-medium shadow-md">
                Shri Nirav Khimat Bhavan
              </span>
              <span className="bg-[#1F1511]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#D8C4A8]/40">
                {roomType.room_size_sqft || 240} sq.ft
              </span>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-2 pb-4 border-b border-[#D8C4A8]/40">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#2B1D17]">
                  {roomType.name}
                </h3>
                <p className="text-xs text-[#A95339] font-mono uppercase tracking-wider mt-1">
                  PALITANA YATRA ACCOMMODATION
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="font-serif text-3xl font-light text-[#A95339]">
                  ₹{roomType.base_price?.toLocaleString('en-IN') || 0}
                </span>
                <span className="text-xs text-[#2B1D17]/60 block font-sans">/ night</span>
              </div>
            </div>

            {/* Key Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#F7F3EA] border border-[#D8C4A8]/30 space-y-1">
                <span className="flex items-center gap-1.5 text-xs text-[#A95339] font-bold uppercase tracking-wider">
                  <Users className="w-3.5 h-3.5" />
                  Capacity
                </span>
                <span className="text-sm font-serif font-medium text-[#2B1D17] block">
                  Up to {roomType.capacity} Guests
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F7F3EA] border border-[#D8C4A8]/30 space-y-1">
                <span className="flex items-center gap-1.5 text-xs text-[#A95339] font-bold uppercase tracking-wider">
                  <Bed className="w-3.5 h-3.5" />
                  Bed Type
                </span>
                <span className="text-sm font-serif font-medium text-[#2B1D17] block truncate">
                  {roomType.bed_type}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F7F3EA] border border-[#D8C4A8]/30 space-y-1 col-span-2 sm:col-span-1">
                <span className="flex items-center gap-1.5 text-xs text-[#A95339] font-bold uppercase tracking-wider">
                  <Snowflake className="w-3.5 h-3.5" />
                  Climate
                </span>
                <span className="text-sm font-serif font-medium text-[#2B1D17] block">
                  Split Air Conditioning
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="font-serif text-base font-medium text-[#2B1D17]">Room Overview</h4>
              <p className="text-xs sm:text-sm text-[#2B1D17]/80 leading-relaxed font-light">
                {roomType.description}
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="space-y-3 pt-2">
              <h4 className="font-serif text-base font-medium text-[#2B1D17]">Included Amenities</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  'Split Air Conditioning',
                  'Attached Bathroom with Western Toilet',
                  '24-Hour Hot Water Supply',
                  'Pure RO Drinking Water',
                  'Fresh Bed Linen & Daily Cleanliness',
                  'Elevator Access to Floors',
                ].map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#2B1D17]/80">
                    <CheckCircle2 className="w-4 h-4 text-[#A95339] shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-[#D8C4A8]/40 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-full text-xs font-serif font-semibold text-[#2B1D17]/70 hover:text-[#2B1D17] transition-colors"
              >
                Close
              </button>

              {onSelectRoom && (
                <button
                  type="button"
                  onClick={() => {
                    onSelectRoom(roomType.id);
                    onClose();
                  }}
                  className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-serif font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 ${
                    isSelected
                      ? 'bg-[#A95339] text-white'
                      : 'bg-[#2B1D17] hover:bg-[#A95339] text-[#FFFDF8]'
                  }`}
                >
                  <span>{isSelected ? 'Room Selected ✓' : 'Select This Room'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
