'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Users, DoorOpen, Clock, ChevronUp, ChevronDown, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RoomType } from '@/lib/types';

interface BookingSummaryCardProps {
  roomType?: RoomType | any | null;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  rooms?: number;
  subtotal: number;
  serviceCharge: number;
  tax: number;
  discount?: number;
  total: number;
  holdExpiresAt?: string | null;
  onContinue?: () => void;
  continueText?: string;
  isContinuing?: boolean;
  canContinue?: boolean;
  showContinueButton?: boolean;
}

export function BookingSummaryCard({
  roomType,
  checkIn,
  checkOut,
  nights,
  guests,
  rooms = 1,
  subtotal,
  serviceCharge,
  tax,
  discount = 0,
  total,
  holdExpiresAt,
  onContinue,
  continueText = 'CONTINUE →',
  isContinuing = false,
  canContinue = true,
  showContinueButton = false,
}: BookingSummaryCardProps) {
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState<string | null>(null);

  // 10-Minute Hold Countdown Timer
  useEffect(() => {
    if (!holdExpiresAt) {
      setTimeLeft(null);
      return;
    }

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const expiry = new Date(holdExpiresAt).getTime();
      const diff = expiry - now;

      if (diff <= 0) {
        setTimeLeft('Expired');
        clearInterval(interval);
      } else {
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [holdExpiresAt]);

  const formatDateDisplay = (dStr: string) => {
    if (!dStr) return '—';
    const parts = dStr.split('-');
    if (parts.length !== 3) return dStr;
    const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short' }).toUpperCase();
  };

  return (
    <>
      {/* Desktop Sticky Summary Card */}
      <div className="hidden lg:block bg-[#FCFAF5] border border-[#D8C4A8] rounded-3xl p-6 shadow-sm sticky top-28 space-y-5">
        {/* Header */}
        <div className="pb-4 border-b border-[#D8C4A8]/40">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#A95339] block font-bold">
            YOUR STAY
          </span>
          <h3 className="font-serif text-xl font-light text-[#2B1D17] mt-1 truncate">
            {roomType ? roomType.name : 'Select a Room'}
          </h3>
        </div>

        {/* Hold Alert Banner */}
        {holdExpiresAt && timeLeft && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600 animate-pulse shrink-0" />
              <span className="font-medium">Temporary Hold:</span>
            </div>
            <span className="font-mono font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-md">
              {timeLeft}
            </span>
          </div>
        )}

        {/* Compact Stay Details */}
        <div className="space-y-2.5 text-xs text-[#2B1D17]/80 bg-[#F7F3EA] p-4 rounded-2xl border border-[#D8C4A8]/30">
          <div className="flex justify-between items-center">
            <span className="font-mono text-[11px] uppercase text-[#A95339] font-bold">Dates:</span>
            <span className="font-serif font-medium text-[#2B1D17]">
              {formatDateDisplay(checkIn)} → {formatDateDisplay(checkOut)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-mono text-[11px] uppercase text-[#A95339] font-bold">Duration:</span>
            <span className="font-serif font-medium text-[#2B1D17]">
              {nights} {nights === 1 ? 'Night' : 'Nights'}
            </span>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-[#D8C4A8]/20">
            <span className="font-mono text-[11px] uppercase text-[#A95339] font-bold">Party:</span>
            <span className="font-serif font-medium text-[#2B1D17]">
              {guests} Yatrik · {rooms} {rooms === 1 ? 'Room' : 'Rooms'}
            </span>
          </div>
        </div>

        {/* Pricing Breakdown */}
        <div className="space-y-2 text-xs text-[#2B1D17]/70 pt-1">
          <div className="flex justify-between">
            <span>Room Tariff:</span>
            <span className="font-serif font-medium text-[#2B1D17]">₹{subtotal.toLocaleString('en-IN')}</span>
          </div>

          <div className="flex justify-between">
            <span>Service / Maintenance:</span>
            <span className="font-serif font-medium text-[#2B1D17]">₹{serviceCharge.toLocaleString('en-IN')}</span>
          </div>

          <div className="flex justify-between">
            <span>Taxes:</span>
            <span className="font-serif font-medium text-[#2B1D17]">₹{tax.toLocaleString('en-IN')}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-emerald-700 font-medium">
              <span>Discount:</span>
              <span>-₹{discount.toLocaleString('en-IN')}</span>
            </div>
          )}

          <div className="pt-3 border-t border-[#D8C4A8]/40 flex justify-between items-baseline">
            <span className="font-serif font-medium text-sm text-[#2B1D17]">TOTAL:</span>
            <span className="font-serif text-2xl font-light text-[#A95339]">
              ₹{total.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Optional Action Button in Summary */}
        {showContinueButton && onContinue && (
          <div className="pt-2">
            <button
              type="button"
              onClick={onContinue}
              disabled={!canContinue || isContinuing}
              className="w-full flex items-center justify-center gap-2 bg-[#A95339] hover:bg-[#2B1D17] text-[#FFFDF8] font-serif font-semibold py-3.5 px-6 rounded-full shadow-md transition-all active:scale-95 text-xs uppercase tracking-wider disabled:opacity-50"
            >
              <span>{continueText}</span>
            </button>
          </div>
        )}
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FCFAF5]/95 backdrop-blur-md border-t border-[#D8C4A8] px-4 py-3 shadow-2xl">
        <div className="max-w-md mx-auto flex items-center justify-between gap-4">
          <div
            onClick={() => setMobileSheetOpen(!mobileSheetOpen)}
            className="flex flex-col cursor-pointer"
          >
            <div className="flex items-center gap-1">
              <span className="font-serif text-xl font-light text-[#A95339]">
                ₹{total.toLocaleString('en-IN')}
              </span>
              {mobileSheetOpen ? (
                <ChevronDown className="w-3.5 h-3.5 text-[#2B1D17]/60" />
              ) : (
                <ChevronUp className="w-3.5 h-3.5 text-[#2B1D17]/60" />
              )}
            </div>
            <span className="text-[10px] text-[#2B1D17]/60">
              {nights} night · {guests} yatrik (Tap details)
            </span>
          </div>

          {showContinueButton && onContinue && (
            <button
              type="button"
              onClick={onContinue}
              disabled={!canContinue || isContinuing}
              className="flex items-center gap-2 bg-[#A95339] hover:bg-[#2B1D17] text-[#FFFDF8] font-serif font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full shadow-md transition-all active:scale-95 disabled:opacity-50"
            >
              <span>{continueText}</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Sliding Bottom Sheet Modal */}
      <AnimatePresence>
        {mobileSheetOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex items-end justify-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSheetOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Bottom Sheet Content */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="relative w-full max-w-lg bg-[#FCFAF5] rounded-t-3xl border-t border-x border-[#D8C4A8] p-6 shadow-2xl z-10 space-y-4 pb-10"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#D8C4A8]/40">
                <span className="font-serif text-lg font-medium text-[#2B1D17]">Stay Breakdown</span>
                <button
                  onClick={() => setMobileSheetOpen(false)}
                  className="w-8 h-8 rounded-full border border-[#D8C4A8] flex items-center justify-center text-[#2B1D17]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Details in sheet */}
              <div className="space-y-3 text-xs text-[#2B1D17]/80">
                <div className="flex justify-between">
                  <span>Room Category:</span>
                  <span className="font-serif font-medium text-[#2B1D17]">
                    {roomType ? roomType.name : 'Not selected'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Dates:</span>
                  <span className="font-serif font-medium text-[#2B1D17]">
                    {formatDateDisplay(checkIn)} → {formatDateDisplay(checkOut)} ({nights}N)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Party:</span>
                  <span className="font-serif font-medium text-[#2B1D17]">
                    {guests} Yatrik ({rooms} Room)
                  </span>
                </div>
                <div className="pt-2 border-t border-[#D8C4A8]/30 flex justify-between">
                  <span>Room Tariff:</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Fee:</span>
                  <span>₹{serviceCharge.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes:</span>
                  <span>₹{tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-2 border-t border-[#D8C4A8]/40 flex justify-between items-baseline font-bold text-sm text-[#2B1D17]">
                  <span>Total Payable:</span>
                  <span className="font-serif text-xl text-[#A95339]">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
