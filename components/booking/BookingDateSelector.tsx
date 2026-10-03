'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface BookingDateSelectorProps {
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  onDatesChange: (checkIn: string, checkOut: string) => void;
}

export function BookingDateSelector({ checkIn, checkOut, onDatesChange }: BookingDateSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectingTarget, setSelectingTarget] = useState<'checkIn' | 'checkOut'>('checkIn');
  const [viewDate, setViewDate] = useState(() => {
    return checkIn ? new Date(checkIn) : new Date();
  });
  const [hoverDate, setHoverDate] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Close calendar popover on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const formatDateDetails = (dateStr: string) => {
    if (!dateStr) return { dayMonth: '—', year: '—', weekday: '—' };
    const parts = dateStr.split('-');
    if (parts.length !== 3) return { dayMonth: '—', year: '—', weekday: '—' };
    const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    
    const day = d.getDate().toString().padStart(2, '0');
    const month = d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    const year = d.getFullYear().toString();
    const weekday = d.toLocaleDateString('en-US', { weekday: 'long' });

    return {
      dayMonth: `${day} ${month}`,
      year,
      weekday,
    };
  };

  const checkInDetails = formatDateDetails(checkIn);
  const checkOutDetails = formatDateDetails(checkOut);

  // Calendar Helpers
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthName = viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const prevMonth = () => {
    const today = new Date();
    // Don't go before current month
    if (year === today.getFullYear() && month <= today.getMonth()) return;
    setViewDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const toDateString = (y: number, m: number, d: number) => {
    const mm = (m + 1).toString().padStart(2, '0');
    const dd = d.toString().padStart(2, '0');
    return `${y}-${mm}-${dd}`;
  };

  const todayStr = () => {
    const t = new Date();
    return toDateString(t.getFullYear(), t.getMonth(), t.getDate());
  };

  const handleDayClick = (dayString: string) => {
    if (selectingTarget === 'checkIn') {
      // If new checkIn is after or equal to checkOut, set checkOut to checkIn + 1 day
      const d = new Date(dayString);
      const nextD = new Date(d);
      nextD.setDate(nextD.getDate() + 1);
      const nextDStr = toDateString(nextD.getFullYear(), nextD.getMonth(), nextD.getDate());

      if (!checkOut || dayString >= checkOut) {
        onDatesChange(dayString, nextDStr);
      } else {
        onDatesChange(dayString, checkOut);
      }
      setSelectingTarget('checkOut');
    } else {
      // Selecting Check-Out
      if (dayString <= checkIn) {
        // If clicked on or before checkIn, switch to that as checkIn
        const d = new Date(dayString);
        const nextD = new Date(d);
        nextD.setDate(nextD.getDate() + 1);
        const nextDStr = toDateString(nextD.getFullYear(), nextD.getMonth(), nextD.getDate());
        onDatesChange(dayString, nextDStr);
        setSelectingTarget('checkOut');
      } else {
        onDatesChange(checkIn, dayString);
        setIsOpen(false);
      }
    }
  };

  const isDayDisabled = (dayStr: string) => {
    return dayStr < todayStr();
  };

  const isCheckIn = (dayStr: string) => dayStr === checkIn;
  const isCheckOut = (dayStr: string) => dayStr === checkOut;

  const isInRange = (dayStr: string) => {
    if (!checkIn) return false;
    const end = hoverDate && selectingTarget === 'checkOut' && hoverDate > checkIn ? hoverDate : checkOut;
    return dayStr > checkIn && dayStr < end;
  };

  return (
    <div className="relative" ref={containerRef}>
      {/* Date Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Check-In Card */}
        <button
          type="button"
          onClick={() => {
            setSelectingTarget('checkIn');
            setIsOpen(true);
          }}
          className={`flex flex-col text-left p-5 rounded-2xl border transition-all duration-200 bg-[#FCFAF5] ${
            isOpen && selectingTarget === 'checkIn'
              ? 'border-[#A95339] ring-2 ring-[#A95339]/15 shadow-sm'
              : 'border-[#D8C4A8] hover:border-[#A95339]/60'
          }`}
        >
          <div className="flex items-center justify-between w-full mb-1.5">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#A95339] font-bold">
              CHECK-IN
            </span>
            <CalendarIcon className="w-4 h-4 text-[#A95339]" />
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-light text-[#2B1D17] leading-none my-1">
            {checkInDetails.dayMonth}
          </div>
          <div className="flex items-center gap-2 text-xs text-[#2B1D17]/60 font-sans mt-0.5">
            <span>{checkInDetails.year}</span>
            <span>•</span>
            <span>{checkInDetails.weekday}</span>
          </div>
        </button>

        {/* Check-Out Card */}
        <button
          type="button"
          onClick={() => {
            setSelectingTarget('checkOut');
            setIsOpen(true);
          }}
          className={`flex flex-col text-left p-5 rounded-2xl border transition-all duration-200 bg-[#FCFAF5] ${
            isOpen && selectingTarget === 'checkOut'
              ? 'border-[#A95339] ring-2 ring-[#A95339]/15 shadow-sm'
              : 'border-[#D8C4A8] hover:border-[#A95339]/60'
          }`}
        >
          <div className="flex items-center justify-between w-full mb-1.5">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#A95339] font-bold">
              CHECK-OUT
            </span>
            <CalendarIcon className="w-4 h-4 text-[#A95339]" />
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-light text-[#2B1D17] leading-none my-1">
            {checkOutDetails.dayMonth}
          </div>
          <div className="flex items-center gap-2 text-xs text-[#2B1D17]/60 font-sans mt-0.5">
            <span>{checkOutDetails.year}</span>
            <span>•</span>
            <span>{checkOutDetails.weekday}</span>
          </div>
        </button>
      </div>

      {/* Calendar Popover */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-3 p-6 bg-[#FCFAF5] border border-[#D8C4A8] rounded-3xl shadow-2xl animate-fade-in max-w-lg mx-auto sm:mx-0">
          {/* Calendar Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#D8C4A8]/40">
            <div className="space-y-0.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#A95339] block font-bold">
                {selectingTarget === 'checkIn' ? 'SELECT CHECK-IN DATE' : 'SELECT CHECK-OUT DATE'}
              </span>
              <h4 className="font-serif text-lg font-medium text-[#2B1D17]">{monthName}</h4>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevMonth}
                className="w-8 h-8 rounded-full border border-[#D8C4A8] flex items-center justify-center hover:bg-[#F7F3EA] text-[#2B1D17] transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextMonth}
                className="w-8 h-8 rounded-full border border-[#D8C4A8] flex items-center justify-center hover:bg-[#F7F3EA] text-[#2B1D17] transition-colors"
                aria-label="Next month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full border border-[#D8C4A8] flex items-center justify-center hover:bg-red-50 text-[#2B1D17] transition-colors ml-1"
                aria-label="Close calendar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-serif text-[#2B1D17]/50 pt-4 pb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
              <div key={d} className="py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty slots before first day */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="h-10" />
            ))}

            {/* Days in Month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const dayStr = toDateString(year, month, dayNum);
              const disabled = isDayDisabled(dayStr);
              const selectedStart = isCheckIn(dayStr);
              const selectedEnd = isCheckOut(dayStr);
              const inRange = isInRange(dayStr);

              return (
                <div
                  key={dayStr}
                  className={`h-10 flex items-center justify-center relative ${
                    inRange ? 'bg-[#A95339]/10' : ''
                  } ${selectedStart ? 'rounded-l-full bg-[#A95339]/10' : ''} ${
                    selectedEnd ? 'rounded-r-full bg-[#A95339]/10' : ''
                  }`}
                  onMouseEnter={() => !disabled && setHoverDate(dayStr)}
                  onMouseLeave={() => setHoverDate(null)}
                >
                  <button
                    type="button"
                    disabled={disabled}
                    onClick={() => handleDayClick(dayStr)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-serif font-medium transition-all ${
                      selectedStart || selectedEnd
                        ? 'bg-[#A95339] text-[#FFFDF8] shadow-md scale-105 font-bold'
                        : disabled
                        ? 'text-[#2B1D17]/20 cursor-not-allowed'
                        : 'text-[#2B1D17] hover:bg-[#A95339]/20'
                    }`}
                  >
                    {dayNum}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Bottom helper */}
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#D8C4A8]/40 text-xs">
            <span className="text-[#2B1D17]/60">
              Standard Check-In: 10:00 AM • Check-Out: 09:00 AM
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-[#A95339] font-serif font-semibold hover:underline"
            >
              Apply Dates
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
