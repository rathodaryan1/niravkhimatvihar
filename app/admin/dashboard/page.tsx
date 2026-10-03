'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  DoorOpen,
  CalendarCheck,
  CreditCard,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Building,
  Activity,
  Calendar,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'GOOD MORNING';
    if (hour < 17) return 'GOOD AFTERNOON';
    return 'GOOD EVENING';
  };

  useEffect(() => {
    async function loadDashboard() {
      try {
        const token = localStorage.getItem('nkv_admin_token') || '';
        const res = await fetch('/api/admin/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        if (json.success && json.data) {
          setData(json.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center space-y-3">
        <Loader2 className="w-8 h-8 text-[#C7A15A] animate-spin mx-auto" />
        <p className="text-xs text-[#6B4630]">Loading live operational metrics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-2 border-b border-[#9B7049]/20">
        <div>
          <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#C7A15A] block">
            {getGreeting()} · PALITANA · GUJARAT
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#3A2418]">
            Shri Nirav Khimat Bhavan
          </h1>
          <p className="text-xs text-[#6B4630] font-sans mt-0.5">
            TODAY&apos;S OVERVIEW — Real-time reservations, room occupancy, ledger &amp; audit stream.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/calendar"
            className="inline-flex items-center gap-1.5 bg-[#3A2418] hover:bg-[#241A15] text-[#FFFDF8] text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all"
          >
            <span>Room Availability Matrix</span>
            <ArrowUpRight className="w-4 h-4 text-[#C7A15A]" />
          </Link>
        </div>
      </div>

      {/* 6 Key Operational Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* 1. Arrivals */}
        <div className="bg-[#FFFDF8] border border-[#9B7049]/30 rounded-2xl p-4 space-y-1 shadow-sm">
          <div className="flex items-center justify-between text-[#9B7049]">
            <span className="text-[10px] font-bold uppercase tracking-wider">Today&apos;s Arrivals</span>
            <Users className="w-4 h-4 text-[#C7A15A]" />
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#3A2418]">
            {data?.todaysArrivals || 0}
          </div>
          <span className="text-[10px] text-[#6B4630]/80 block">Yatris checking in</span>
        </div>

        {/* 2. Departures */}
        <div className="bg-[#FFFDF8] border border-[#9B7049]/30 rounded-2xl p-4 space-y-1 shadow-sm">
          <div className="flex items-center justify-between text-[#9B7049]">
            <span className="text-[10px] font-bold uppercase tracking-wider">Today&apos;s Departures</span>
            <Clock className="w-4 h-4 text-[#C7A15A]" />
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#3A2418]">
            {data?.todaysDepartures || 0}
          </div>
          <span className="text-[10px] text-[#6B4630]/80 block">Check-outs (09:00 AM)</span>
        </div>

        {/* 3. Occupied */}
        <div className="bg-[#FFFDF8] border border-[#9B7049]/30 rounded-2xl p-4 space-y-1 shadow-sm">
          <div className="flex items-center justify-between text-[#9B7049]">
            <span className="text-[10px] font-bold uppercase tracking-wider">Occupied Rooms</span>
            <Building className="w-4 h-4 text-[#6B4630]" />
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#3A2418]">
            {data?.occupiedRooms || 0}
          </div>
          <span className="text-[10px] text-[#6B4630]/80 block">Currently in-house</span>
        </div>

        {/* 4. Available Rooms */}
        <div className="bg-[#FFFDF8] border border-[#9B7049]/30 rounded-2xl p-4 space-y-1 shadow-sm">
          <div className="flex items-center justify-between text-[#9B7049]">
            <span className="text-[10px] font-bold uppercase tracking-wider">Available Rooms</span>
            <DoorOpen className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-emerald-700">
            {data?.availableRoomsCount || 0}
          </div>
          <span className="text-[10px] text-[#6B4630]/80 block">of {data?.totalRoomsCount || 14} rooms</span>
        </div>

        {/* 5. Pending Payments */}
        <div className="bg-[#FFFDF8] border border-[#9B7049]/30 rounded-2xl p-4 space-y-1 shadow-sm">
          <div className="flex items-center justify-between text-[#9B7049]">
            <span className="text-[10px] font-bold uppercase tracking-wider">Pending Holds</span>
            <CreditCard className="w-4 h-4 text-amber-600" />
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-amber-700">
            {data?.pendingPaymentsCount || 0}
          </div>
          <span className="text-[10px] text-[#6B4630]/80 block">10-min active holds</span>
        </div>

        {/* 6. Today's Revenue */}
        <div className="bg-[#FFFDF8] border border-[#9B7049]/30 rounded-2xl p-4 space-y-1 shadow-sm">
          <div className="flex items-center justify-between text-[#9B7049]">
            <span className="text-[10px] font-bold uppercase tracking-wider">Today&apos;s Revenue</span>
            <TrendingUp className="w-4 h-4 text-[#C7A15A]" />
          </div>
          <div className="font-serif text-xl sm:text-2xl font-bold text-[#3A2418]">
            ₹{(data?.todaysRevenue || 0).toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-[#6B4630]/80 block">Total: ₹{(data?.totalRevenue || 0).toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Main Grid: Today's Bookings + Room Availability Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Today & Recent Bookings */}
        <div className="lg:col-span-2 bg-[#FFFDF8] border border-[#9B7049]/30 rounded-3xl p-6 shadow-md space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#9B7049]/20">
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#3A2418]">
                Today&apos;s &amp; Recent Bookings
              </h2>
              <p className="text-xs text-[#6B4630]">
                Live feed of verified pilgrim reservations
              </p>
            </div>
            <Link
              href="/admin/bookings"
              className="text-xs font-bold text-[#3A2418] hover:text-[#6B4630] underline flex items-center gap-1"
            >
              <span>Manage All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {(!data?.recentBookings || data.recentBookings.length === 0) ? (
            <div className="py-12 text-center text-xs text-[#6B4630]">
              No reservations recorded yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#9B7049]/20 text-[#9B7049] uppercase font-bold text-[10px] tracking-wider">
                    <th className="py-2.5 px-2">Booking ID</th>
                    <th className="py-2.5 px-2">Yatri Name</th>
                    <th className="py-2.5 px-2">Stay Dates</th>
                    <th className="py-2.5 px-2">Room</th>
                    <th className="py-2.5 px-2">Amount</th>
                    <th className="py-2.5 px-2">Status</th>
                    <th className="py-2.5 px-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#9B7049]/10 font-medium text-[#3A2418]">
                  {data.recentBookings.slice(0, 6).map((b: any) => (
                    <tr key={b.id} className="hover:bg-[#F1E8DA]/40 transition-colors">
                      <td className="py-3 px-2 font-mono font-bold text-[#3A2418]">{b.public_booking_id}</td>
                      <td className="py-3 px-2 font-bold">{b.customer?.full_name || 'Guest'}</td>
                      <td className="py-3 px-2 text-[#6B4630] text-[11px]">{b.check_in} → {b.check_out}</td>
                      <td className="py-3 px-2 text-[#6B4630]">{b.room?.room_number || 'Room A-101'}</td>
                      <td className="py-3 px-2 font-serif font-bold">₹{Number(b.total).toLocaleString('en-IN')}</td>
                      <td className="py-3 px-2">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            b.status === 'CONFIRMED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : b.status === 'CHECKED_IN'
                              ? 'bg-blue-100 text-blue-800'
                              : b.status === 'CANCELLED'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-right">
                        <Link
                          href={`/admin/bookings?search=${b.public_booking_id}`}
                          className="text-xs font-bold text-[#3A2418] hover:text-[#C7A15A] underline"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Col: Room Inventory Breakdown */}
        <div className="bg-[#FFFDF8] border border-[#9B7049]/30 rounded-3xl p-6 shadow-md space-y-4">
          <div className="pb-3 border-b border-[#9B7049]/20">
            <h2 className="font-serif text-lg font-bold text-[#3A2418]">
              Room Availability
            </h2>
            <p className="text-xs text-[#6B4630]">
              Real-time inventory by room category
            </p>
          </div>

          <div className="space-y-3">
            {data?.roomTypeStats?.map((rt: any) => (
              <div
                key={rt.id}
                className="p-3.5 bg-[#F8F3E8] rounded-2xl border border-[#9B7049]/20 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between font-bold text-[#3A2418]">
                  <span>{rt.name}</span>
                  <span className="font-serif text-[#C7A15A]">₹{rt.price}/N</span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#6B4630]">
                  <span>Total Rooms: {rt.total}</span>
                  <span className="font-bold text-emerald-700">{rt.available} Available</span>
                </div>

                {/* Visual Bar */}
                <div className="w-full bg-[#E7DCCA] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full transition-all"
                    style={{
                      width: `${rt.total > 0 ? (rt.available / rt.total) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/admin/rooms"
            className="block text-center py-2.5 px-4 rounded-xl border border-[#9B7049]/30 text-xs font-bold text-[#3A2418] hover:bg-[#F1E8DA] transition-colors"
          >
            Manage Room Inventory →
          </Link>
        </div>
      </div>

      {/* Bottom Grid: Recent Payments & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Payments */}
        <div className="bg-[#FFFDF8] border border-[#9B7049]/30 rounded-3xl p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#9B7049]/20">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#3A2418]">
                Recent Payments
              </h2>
              <p className="text-xs text-[#6B4630]">
                Verified transactions from online gateway
              </p>
            </div>
            <Link
              href="/admin/payments"
              className="text-xs font-bold text-[#3A2418] hover:text-[#6B4630] underline"
            >
              All Payments →
            </Link>
          </div>

          {(!data?.recentPayments || data.recentPayments.length === 0) ? (
            <div className="py-8 text-center text-xs text-[#6B4630]">
              No transactions recorded yet.
            </div>
          ) : (
            <div className="space-y-2.5">
              {data.recentPayments.map((p: any) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-3 bg-[#F8F3E8] rounded-xl border border-[#9B7049]/20 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#3A2418]">{p.customer_name}</span>
                      <span className="font-mono text-[10px] text-[#9B7049]">{p.public_booking_id}</span>
                    </div>
                    <span className="text-[10px] text-[#6B4630] font-mono">
                      Order: {p.provider_order_id}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="font-serif font-bold text-[#3A2418] block">
                      ₹{Number(p.amount).toLocaleString('en-IN')}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800">
                      {p.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Audit Activity */}
        <div className="bg-[#FFFDF8] border border-[#9B7049]/30 rounded-3xl p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#9B7049]/20">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#3A2418]">
                Recent Audit Activity
              </h2>
              <p className="text-xs text-[#6B4630]">
                Security log of administrative actions
              </p>
            </div>
            <Link
              href="/admin/audit-logs"
              className="text-xs font-bold text-[#3A2418] hover:text-[#6B4630] underline"
            >
              Full Log Stream →
            </Link>
          </div>

          {(!data?.recentActivity || data.recentActivity.length === 0) ? (
            <div className="py-8 text-center text-xs text-[#6B4630]">
              No administrative events recorded yet.
            </div>
          ) : (
            <div className="space-y-2.5">
              {data.recentActivity.map((log: any) => (
                <div
                  key={log.id}
                  className="flex items-start justify-between p-3 bg-[#F8F3E8] rounded-xl border border-[#9B7049]/20 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 font-bold text-[#3A2418]">
                      <Activity className="w-3.5 h-3.5 text-[#C7A15A]" />
                      <span>{log.action}</span>
                    </div>
                    <span className="text-[10px] text-[#6B4630] block">
                      Entity: {log.entity_type} {log.entity_id ? `(${log.entity_id})` : ''}
                    </span>
                  </div>

                  <span className="text-[10px] text-[#9B7049] whitespace-nowrap">
                    {new Date(log.created_at).toLocaleTimeString('en-IN', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
