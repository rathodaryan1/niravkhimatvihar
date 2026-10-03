'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  CheckCircle2,
  Calendar,
  Users,
  AlertCircle,
  Printer,
  XCircle,
  Clock,
  ShieldCheck,
  Building2,
  Phone,
  Mail,
  MapPin,
  Loader2,
  Sparkles,
} from 'lucide-react';

export default function MyBookingPage() {
  const [bookingId, setBookingId] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [booking, setBooking] = useState<any | null>(null);

  // Cancellation State
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelling, setCancelling] = useState(false);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBooking(null);
    setLoading(true);

    try {
      const res = await fetch('/api/bookings/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          publicBookingId: bookingId.trim(),
          phone: phone.trim(),
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error?.message || 'No reservation found matching the details provided.');
      }

      setBooking(json.data);
    } catch (err: any) {
      setError(err.message || 'Unable to retrieve booking.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async () => {
    if (!booking) return;
    setCancelling(true);
    setError(null);

    try {
      const res = await fetch('/api/bookings/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          publicBookingId: booking.publicBookingId,
          phone: booking.customer.phone,
          reason: cancelReason || 'Guest requested cancellation',
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error?.message || 'Cancellation could not be completed.');
      }

      setBooking({ ...booking, status: 'CANCELLED', cancelledAt: json.data.cancelledAt });
      setCancelModalOpen(false);
    } catch (err: any) {
      setError(err.message || 'Failed to cancel booking.');
    } finally {
      setCancelling(false);
    }
  };

  return (
    <div className="bg-[#FFFDF8] min-h-screen pb-24">
      {/* Editorial Header Banner */}
      <div className="bg-[#241A15] text-[#FFFDF8] py-20 relative overflow-hidden border-b border-[#C7A15A]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C7A15A]/30 bg-[#3A2418]/60 text-xs text-[#C7A15A] uppercase tracking-[0.25em] font-serif">
            <Sparkles className="w-3.5 h-3.5 text-[#C7A15A]" />
            <span>Yatri Self-Service Portal</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#FFFDF8] font-light leading-[1.08] tracking-tight">
            FIND & MANAGE <br />
            <span className="italic font-normal text-[#C7A15A]">YOUR RESERVATION.</span>
          </h1>

          <p className="text-sm sm:text-base text-[#F8F3E8]/80 max-w-2xl mx-auto font-light leading-relaxed">
            Enter your Booking ID and the 10-digit mobile number used during reservation to view receipt, check status, or manage your stay.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-10">
        {/* Lookup Form */}
        <div className="bg-[#F8F3E8] border border-[#9B7049]/20 rounded-3xl p-8 sm:p-10 shadow-sm">
          <form onSubmit={handleLookup} className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-end">
            <div className="space-y-2">
              <label className="block text-xs font-serif font-medium text-[#241A15] uppercase tracking-wider">
                Booking ID *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. NKV-2026-XXXXX"
                value={bookingId}
                onChange={(e) => setBookingId(e.target.value.toUpperCase())}
                className="w-full px-4 py-3 rounded-2xl border border-[#9B7049]/30 bg-white text-[#241A15] font-mono text-sm uppercase focus:outline-none focus:ring-2 focus:ring-[#C7A15A]"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-serif font-medium text-[#241A15] uppercase tracking-wider">
                Registered Mobile *
              </label>
              <input
                type="tel"
                required
                maxLength={10}
                placeholder="e.g. 9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                className="w-full px-4 py-3 rounded-2xl border border-[#9B7049]/30 bg-white text-[#241A15] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#C7A15A]"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#3A2418] hover:bg-[#241A15] text-[#FFFDF8] font-serif font-semibold py-3.5 px-6 rounded-full shadow-md transition-all active:scale-95 text-xs uppercase tracking-wider h-[46px]"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin text-[#C7A15A]" /> : <Search className="w-4 h-4 text-[#C7A15A]" />}
                <span>Find Booking</span>
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Booking Details Display */}
        {booking && (
          <div className="bg-white border border-[#9B7049]/20 rounded-3xl p-8 sm:p-10 shadow-lg space-y-8 animate-fade-in">
            {/* Top Status Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-[#9B7049]/15 gap-4">
              <div>
                <span className="text-xs text-[#9B7049] uppercase tracking-wider block font-medium">
                  Booking Reference
                </span>
                <span className="font-mono text-2xl font-bold text-[#241A15]">{booking.publicBookingId}</span>
              </div>

              <div>
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-serif font-medium ${
                    booking.status === 'CONFIRMED'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                      : booking.status === 'CHECKED_IN'
                      ? 'bg-blue-50 text-blue-800 border border-blue-200'
                      : booking.status === 'CHECKED_OUT'
                      ? 'bg-gray-100 text-gray-700 border border-gray-300'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  ● {booking.status}
                </span>
              </div>
            </div>

            {/* Stay & Yatri Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#F8F3E8] p-6 rounded-2xl border border-[#9B7049]/20 text-xs">
              <div className="space-y-2">
                <span className="text-[#9B7049] font-serif font-medium uppercase tracking-wider block">Stay Schedule</span>
                <div className="flex items-center gap-2 text-[#241A15] font-semibold text-sm">
                  <Calendar className="w-4 h-4 text-[#C7A15A]" />
                  <span>{booking.checkIn} (10:00 AM) to {booking.checkOut} (09:00 AM)</span>
                </div>
                <div className="flex items-center gap-2 text-[#3A2418]/75 font-light">
                  <Users className="w-4 h-4 text-[#C7A15A]" />
                  <span>{booking.guestCount} Registered Yatris</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[#9B7049] font-serif font-medium uppercase tracking-wider block">Yatri Information</span>
                <div className="font-semibold text-[#241A15] text-sm">{booking.customer.fullName}</div>
                <div className="text-[#3A2418]/75 flex items-center gap-2 font-light">
                  <Phone className="w-3.5 h-3.5 text-[#C7A15A]" />
                  <span>{booking.customer.phone}</span>
                </div>
                <div className="text-[#3A2418]/75 flex items-center gap-2 font-light">
                  <MapPin className="w-3.5 h-3.5 text-[#C7A15A]" />
                  <span>{booking.customer.city}, {booking.customer.state}</span>
                </div>
              </div>
            </div>

            {/* Financial Breakdown */}
            <div className="space-y-3 text-xs text-[#3A2418]/80 font-light">
              <h3 className="font-serif text-base font-medium text-[#241A15]">Financial Summary</h3>
              <div className="flex justify-between pb-2 border-b border-[#9B7049]/10">
                <span>Room Tariff:</span>
                <span className="font-semibold text-[#241A15]">₹{booking.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#9B7049]/10">
                <span>Taxes / Service Fee:</span>
                <span className="font-semibold text-[#241A15]">₹{booking.tax + booking.serviceCharge}</span>
              </div>
              <div className="flex justify-between items-baseline pt-2">
                <span className="font-bold text-sm text-[#241A15]">Total Amount Paid:</span>
                <span className="font-serif text-2xl font-light text-[#241A15]">
                  ₹{booking.total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#9B7049]/15">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 bg-[#F8F3E8] hover:bg-white border border-[#9B7049]/30 text-[#241A15] px-6 py-2.5 rounded-full text-xs font-serif font-semibold transition-all shadow-sm"
              >
                <Printer className="w-4 h-4 text-[#C7A15A]" />
                <span>Print Official Receipt</span>
              </button>

              {booking.status === 'CONFIRMED' && (
                <button
                  onClick={() => setCancelModalOpen(true)}
                  className="inline-flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 px-6 py-2.5 rounded-full text-xs font-medium transition-all"
                >
                  <XCircle className="w-4 h-4 text-red-600" />
                  <span>Request Cancellation</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Cancellation Confirmation Modal */}
        {cancelModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-[#FFFDF8] border border-[#9B7049]/30 rounded-3xl max-w-md w-full p-8 space-y-4 shadow-2xl">
              <h3 className="font-serif text-2xl font-light text-[#241A15]">
                Confirm Booking Cancellation
              </h3>
              <p className="text-xs text-[#3A2418]/80 leading-relaxed font-light">
                Are you sure you wish to cancel reservation <strong>{booking?.publicBookingId}</strong>? In accordance with policy, inventory will be immediately released.
              </p>

              <div className="space-y-1.5">
                <label className="block text-xs font-serif font-medium text-[#241A15] uppercase tracking-wider">
                  Reason for cancellation
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. Change in pilgrimage schedule"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#9B7049]/30 bg-[#F8F3E8] text-[#241A15]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setCancelModalOpen(false)}
                  className="px-4 py-2 text-xs font-serif font-semibold text-[#3A2418]/70 hover:text-[#241A15]"
                >
                  Go Back
                </button>
                <button
                  type="button"
                  disabled={cancelling}
                  onClick={handleCancelBooking}
                  className="px-6 py-2.5 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-full transition-all"
                >
                  {cancelling ? 'Cancelling...' : 'Confirm Cancellation'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
