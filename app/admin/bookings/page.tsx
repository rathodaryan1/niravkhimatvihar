'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  LogIn,
  LogOut,
  Calendar,
  Users,
  Printer,
  AlertCircle,
  Loader2,
} from 'lucide-react';

function BookingsManagementContent() {
  const searchParams = useSearchParams();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('nkv_admin_token') || '';
      const params = new URLSearchParams();
      if (statusFilter !== 'ALL') params.set('status', statusFilter);
      if (searchQuery) params.set('search', searchQuery);

      const res = await fetch(`/api/admin/bookings?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (json.success && json.data) {
        setBookings(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [statusFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBookings();
  };

  const handleCheckIn = async (bookingId: string) => {
    setActionLoading(true);
    setMessage(null);
    try {
      const token = localStorage.getItem('nkv_admin_token') || '';
      const res = await fetch(`/api/admin/bookings/${bookingId}/check-in`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (json.success) {
        setMessage('Yatri marked as CHECKED_IN successfully');
        fetchBookings();
        if (selectedBooking?.id === bookingId) {
          setSelectedBooking({ ...selectedBooking, status: 'CHECKED_IN' });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleCheckOut = async (bookingId: string) => {
    setActionLoading(true);
    setMessage(null);
    try {
      const token = localStorage.getItem('nkv_admin_token') || '';
      const res = await fetch(`/api/admin/bookings/${bookingId}/check-out`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (json.success) {
        setMessage('Yatri marked as CHECKED_OUT successfully. Room is ready for cleaning/future inventory.');
        fetchBookings();
        if (selectedBooking?.id === bookingId) {
          setSelectedBooking({ ...selectedBooking, status: 'CHECKED_OUT' });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Filter Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-deep">
            Booking Management
          </h1>
          <p className="text-xs text-text-secondary">
            Check-in guests, verify payments, manage departures, and review reservations.
          </p>
        </div>
      </div>

      {message && (
        <div className="p-3.5 bg-green-50 border border-green-200 rounded-xl text-xs text-green-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-status-success shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Search & Filter Controls */}
      <div className="bg-[#FFFDF9] border border-brand-sandstone/30 rounded-2xl p-4 shadow-subtle flex flex-col sm:flex-row justify-between items-center gap-4">
        <form onSubmit={handleSearch} className="flex-1 w-full flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-brand-sandstone absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by Booking ID, Guest Name, or Mobile Number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-brand-sandstone/40 bg-brand-ivory text-brand-deep"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-brand-deep text-brand-ivory text-xs font-bold rounded-xl"
          >
            Search
          </button>
        </form>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-brand-sandstone" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-brand-sandstone/40 bg-brand-ivory text-brand-deep font-semibold"
          >
            <option value="ALL">All Statuses</option>
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="CHECKED_IN">CHECKED_IN</option>
            <option value="CHECKED_OUT">CHECKED_OUT</option>
            <option value="CANCELLED">CANCELLED</option>
            <option value="PENDING_PAYMENT">PENDING_PAYMENT</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-[#FFFDF9] border border-brand-sandstone/30 rounded-3xl p-6 shadow-card">
        {loading ? (
          <div className="py-16 text-center space-y-3">
            <Loader2 className="w-8 h-8 text-brand-gold animate-spin mx-auto" />
            <p className="text-xs text-text-secondary">Loading reservations...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="py-12 text-center text-xs text-text-muted">
            No bookings matching the current filter criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-brand-sandstone/20 text-brand-sandstone uppercase font-bold text-[10px] tracking-wider">
                  <th className="py-3 px-3">Booking ID</th>
                  <th className="py-3 px-3">Guest & Contact</th>
                  <th className="py-3 px-3">Check-In / Out</th>
                  <th className="py-3 px-3">Room Assigned</th>
                  <th className="py-3 px-3">Tariff</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-sandstone/10 font-medium">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-brand-lightSand/30 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-brand-deep">{b.public_booking_id}</td>
                    <td className="py-3 px-3">
                      <span className="font-bold text-brand-deep block">{b.customer?.full_name || 'Guest'}</span>
                      <span className="text-[11px] text-text-muted">{b.customer?.phone}</span>
                    </td>
                    <td className="py-3 px-3 text-text-secondary">
                      <span>{b.check_in}</span>
                      <span className="text-brand-sandstone block text-[10px]">to {b.check_out}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-semibold text-brand-deep block">
                        {b.room?.room_number || 'Room Reserved'}
                      </span>
                      <span className="text-[10px] text-text-muted">Floor {b.room?.floor || 1}</span>
                    </td>
                    <td className="py-3 px-3 font-serif font-bold text-brand-deep">₹{b.total}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          b.status === 'CONFIRMED'
                            ? 'bg-status-success/15 text-status-success'
                            : b.status === 'CHECKED_IN'
                            ? 'bg-blue-50 text-blue-700 font-bold'
                            : b.status === 'CHECKED_OUT'
                            ? 'bg-gray-100 text-gray-700'
                            : 'bg-red-50 text-red-700'
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right space-x-2">
                      <button
                        onClick={() => setSelectedBooking(b)}
                        className="text-xs font-bold text-brand-deep hover:underline"
                      >
                        Details
                      </button>

                      {b.status === 'CONFIRMED' && (
                        <button
                          disabled={actionLoading}
                          onClick={() => handleCheckIn(b.id)}
                          className="px-2.5 py-1 bg-status-success text-white text-[11px] font-bold rounded-lg shadow-sm hover:opacity-90"
                        >
                          Check In
                        </button>
                      )}

                      {b.status === 'CHECKED_IN' && (
                        <button
                          disabled={actionLoading}
                          onClick={() => handleCheckOut(b.id)}
                          className="px-2.5 py-1 bg-brand-deep text-brand-ivory text-[11px] font-bold rounded-lg shadow-sm hover:opacity-90"
                        >
                          Check Out
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#FFFDF9] border border-brand-sandstone/40 rounded-3xl max-w-xl w-full p-8 space-y-6 shadow-elevated max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-brand-sandstone/20">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-brand-sandstone block">
                  Reservation Record
                </span>
                <h3 className="font-serif text-2xl font-bold text-brand-deep">
                  {selectedBooking.public_booking_id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-text-muted hover:text-brand-deep font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs bg-brand-lightSand/40 p-4 rounded-xl border border-brand-sandstone/20">
              <div>
                <span className="text-text-muted block">Guest Name:</span>
                <span className="font-bold text-brand-deep">{selectedBooking.customer?.full_name}</span>
              </div>
              <div>
                <span className="text-text-muted block">Mobile:</span>
                <span className="font-bold text-brand-deep">{selectedBooking.customer?.phone}</span>
              </div>
              <div>
                <span className="text-text-muted block">Email:</span>
                <span className="font-semibold text-brand-deep">{selectedBooking.customer?.email}</span>
              </div>
              <div>
                <span className="text-text-muted block">City, State:</span>
                <span className="font-semibold text-brand-deep">{selectedBooking.customer?.city}, {selectedBooking.customer?.state}</span>
              </div>
              <div>
                <span className="text-text-muted block">Check-In:</span>
                <span className="font-bold text-brand-deep">{selectedBooking.check_in} (10:00 AM)</span>
              </div>
              <div>
                <span className="text-text-muted block">Check-Out:</span>
                <span className="font-bold text-brand-deep">{selectedBooking.check_out} (09:00 AM)</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <span className="text-brand-sandstone font-bold uppercase block">Financial Details</span>
              <div className="flex justify-between pb-1 border-b border-brand-sandstone/20">
                <span>Room Charges:</span>
                <span className="font-semibold text-brand-deep">₹{selectedBooking.subtotal}</span>
              </div>
              <div className="flex justify-between pb-1 border-b border-brand-sandstone/20">
                <span>Total Paid:</span>
                <span className="font-serif font-bold text-sm text-brand-deep">₹{selectedBooking.total}</span>
              </div>
              {selectedBooking.payment && (
                <div className="pt-1 text-[11px] text-text-muted">
                  Razorpay Order ID: <code className="font-mono text-brand-deep">{selectedBooking.payment.provider_order_id}</code>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-brand-sandstone/20">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-brand-sandstone text-brand-deep rounded-xl text-xs font-semibold"
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt</span>
              </button>

              <button
                onClick={() => setSelectedBooking(null)}
                className="px-5 py-2 bg-brand-deep text-brand-ivory text-xs font-bold rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookingsManagementPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-sm text-brand-deep">Loading booking manager...</div>}>
      <BookingsManagementContent />
    </Suspense>
  );
}
