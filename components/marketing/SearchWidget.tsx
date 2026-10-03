'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar as CalendarIcon, Clock, Users, ChevronRight, X } from 'lucide-react';
import { useLanguage } from '@/lib/context/LanguageContext';

export function SearchWidget() {
  const router = useRouter();
  const { t, language } = useLanguage();

  // Helper date formatting
  const formatDateToIso = (d: Date) => d.toISOString().split('T')[0];
  const formatDisplayDate = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      const day = d.getDate();
      const month = d.toLocaleString(language === 'gu' ? 'gu-IN' : 'en-US', { month: 'short' });
      return `${day} ${month}`;
    } catch {
      return isoStr;
    }
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [checkIn, setCheckIn] = useState<string>(formatDateToIso(today));
  const [checkOut, setCheckOut] = useState<string>(formatDateToIso(tomorrow));
  const [arrivalTime, setArrivalTime] = useState<string>('10:00');
  const [members, setMembers] = useState<number>(2);
  const [dateModalOpen, setDateModalOpen] = useState<boolean>(false);

  // Calculate nights
  const calculateNights = () => {
    const dIn = new Date(checkIn);
    const dOut = new Date(checkOut);
    const diffTime = Math.abs(dOut.getTime() - dIn.getTime());
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 1;
  };

  const nights = calculateNights();

  const handleCheckInChange = (newIn: string) => {
    setCheckIn(newIn);
    if (newIn >= checkOut) {
      const nextDay = new Date(newIn);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOut(formatDateToIso(nextDay));
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      checkIn,
      checkOut,
      guests: members.toString(),
      arrivalTime,
    });
    router.push(`/booking?${params.toString()}`);
  };

  return (
    <section className="relative z-20 -mt-16 px-6">
      {/* Floating Card Container */}
      <div className="mx-auto max-w-[1100px] rounded-3xl bg-white p-6 shadow-[0_12px_32px_rgba(58,36,24,0.16)] border border-line/50">
        <form
          onSubmit={handleSearch}
          className="grid grid-cols-2 items-end gap-4 md:grid-cols-[repeat(auto-fit,minmax(180px,1fr))]"
        >
          {/* 01. Check-in & Check-out Date Field */}
          <div className="relative col-span-2 flex min-w-0 flex-col gap-1.5 lg:col-span-1">
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.08em] text-terracotta-dark">
              {t('search_checkin_out')}
            </span>
            <button
              type="button"
              onClick={() => setDateModalOpen(true)}
              className="flex h-12 w-full cursor-pointer items-center gap-2.5 rounded-2xl border border-input-line bg-cream px-3.5 text-left text-body text-ink hover:border-terracotta transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A8432F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M3 10h18M8 3v4M16 3v4" />
              </svg>
              <span className="font-semibold text-sm sm:text-base">{formatDisplayDate(checkIn)}</span>
              <span className="text-terracotta font-bold text-sm">→</span>
              <span className="font-semibold text-sm sm:text-base">{formatDisplayDate(checkOut)}</span>
              <span className="ml-auto text-[12px] font-medium text-ink-3 bg-white/80 px-2 py-0.5 rounded-md border border-line">
                {nights} {nights === 1 ? t('search_night') : t('search_nights')}
              </span>
            </button>
          </div>

          {/* 02. Arrival Time */}
          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-[11px] font-bold uppercase tracking-[0.08em] text-terracotta-dark">
              {t('search_arrival_time')}
            </label>
            <input
              type="time"
              value={arrivalTime}
              onChange={(e) => setArrivalTime(e.target.value)}
              className="h-12 rounded-2xl border border-input-line bg-cream px-3 text-body font-semibold text-ink focus:border-terracotta focus:outline-none transition-colors"
            />
          </div>

          {/* 03. Members Stepper */}
          <div className="flex flex-col gap-1.5">
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.08em] text-terracotta-dark">
              {t('search_members')}
            </span>
            <div className="flex h-12 items-center justify-between rounded-2xl border border-input-line bg-cream px-1">
              <button
                type="button"
                onClick={() => setMembers(Math.max(1, members - 1))}
                className="h-10 w-10 cursor-pointer rounded-xl border-none bg-transparent text-xl font-bold text-ink hover:bg-sandstone-soft transition-colors flex items-center justify-center"
              >
                −
              </button>
              <span className="text-body font-bold text-ink px-2">{members}</span>
              <button
                type="button"
                onClick={() => setMembers(Math.min(20, members + 1))}
                className="h-10 w-10 cursor-pointer rounded-xl border-none bg-transparent text-xl font-bold text-ink hover:bg-sandstone-soft transition-colors flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>

          {/* 04. Check Rooms CTA */}
          <div className="col-span-2 flex flex-col gap-1.5 md:col-span-1">
            <span className="text-center text-[12px] font-medium text-ink-3">
              {nights} {nights === 1 ? t('search_night') : t('search_nights')} · {members} {members === 1 ? t('search_yatrik') : t('search_yatriks')}
            </span>
            <button
              type="submit"
              className="flex h-12 w-full cursor-pointer items-center justify-center rounded-2xl bg-terracotta font-sans text-[15px] font-extrabold text-white shadow-md hover:bg-terracotta-dark hover:text-white transition-all active:scale-95"
            >
              {t('search_check_rooms')}
            </button>
          </div>
        </form>
      </div>

      {/* Phone Assistance Prompt underneath Card */}
      <div className="mx-auto mt-3.5 max-w-[1100px] text-center text-[14px] text-ink-3">
        {t('search_book_by_phone')}{' '}
        <a href="tel:02848252670" className="font-bold text-ink hover:text-terracotta underline decoration-terracotta/40 underline-offset-2">
          02848 252670
        </a>{' '}
        /{' '}
        <a href="tel:+919054515959" className="font-bold text-ink hover:text-terracotta underline decoration-terracotta/40 underline-offset-2">
          +91 90545 15959
        </a>
      </div>

      {/* Date Range Modal Dialog */}
      {dateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl space-y-5 border border-line">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h3 className="font-sans text-lg font-bold text-ink">{t('search_checkin_out')}</h3>
              <button
                type="button"
                onClick={() => setDateModalOpen(false)}
                className="p-1.5 rounded-full bg-sandstone-soft text-ink hover:bg-line"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-terracotta-dark mb-1">
                  Check-in Date
                </label>
                <input
                  type="date"
                  min={formatDateToIso(today)}
                  value={checkIn}
                  onChange={(e) => handleCheckInChange(e.target.value)}
                  className="w-full h-12 rounded-2xl border border-input-line bg-cream px-3.5 text-body font-semibold text-ink"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-terracotta-dark mb-1">
                  Check-out Date
                </label>
                <input
                  type="date"
                  min={checkIn}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full h-12 rounded-2xl border border-input-line bg-cream px-3.5 text-body font-semibold text-ink"
                />
              </div>

              <div className="p-3 rounded-xl bg-sandstone-soft text-xs text-ink-2 flex items-center justify-between">
                <span>Total Stay Duration:</span>
                <span className="font-bold text-ink">{nights} {nights === 1 ? t('search_night') : t('search_nights')}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setDateModalOpen(false)}
              className="w-full h-12 rounded-2xl bg-terracotta font-sans text-sm font-bold text-white hover:bg-terracotta-dark"
            >
              Confirm Dates
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
