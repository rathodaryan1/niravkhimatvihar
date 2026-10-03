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
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

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
        <Loader2 className="w-8 h-8 text-brand-gold animate-spin mx-auto" />
        <p className="text-xs text-text-secondary">Loading live operational metrics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Title & Quick Action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-deep">
            Operations Dashboard
          </h1>
          <p className="text-xs text-text-secondary">
            Live overview of today&apos;s arrivals, departures, room occupancy, and revenue.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/calendar"
            className="inline-flex items-center gap-1.5 bg-brand-deep hover:bg-brand-warm text-brand-ivory text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all"
          >
            <span>View Room Matrix</span>
            <ArrowUpRight className="w-4 h-4 text-brand-gold" />
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#FFFDF9] border border-brand-sandstone/30 rounded-2xl p-6 space-y-2 shadow-subtle">
          <div className="flex items-center justify-between text-brand-sandstone">
            <span className="text-xs font-bold uppercase tracking-wider">Today&apos;s Arrivals</span>
            <Users className="w-5 h-5 text-brand-gold" />
          </div>
          <div className="font-serif text-3xl font-bold text-brand-deep">
            {data?.todaysArrivals || 0}
          </div>
          <span className="text-[11px] text-text-muted">Expected pilgrim check-ins</span>
        </div>

        <div className="bg-[#FFFDF9] border border-brand-sandstone/30 rounded-2xl p-6 space-y-2 shadow-subtle">
          <div className="flex items-center justify-between text-brand-sandstone">
            <span className="text-xs font-bold uppercase tracking-wider">Today&apos;s Departures</span>
            <Clock className="w-5 h-5 text-brand-gold" />
          </div>
          <div className="font-serif text-3xl font-bold text-brand-deep">
            {data?.todaysDepartures || 0}
          </div>
          <span className="text-[11px] text-text-muted">Expected room check-outs</span>
        </div>

        <div className="bg-[#FFFDF9] border border-brand-sandstone/30 rounded-2xl p-6 space-y-2 shadow-subtle">
          <div className="flex items-center justify-between text-brand-sandstone">
            <span className="text-xs font-bold uppercase tracking-wider">Available Rooms</span>
            <DoorOpen className="w-5 h-5 text-status-success" />
          </div>
          <div className="font-serif text-3xl font-bold text-status-success">
            {data?.availableRoomsCount || 0} / {data?.totalRoomsCount || 14}
          </div>
          <span className="text-[11px] text-text-muted">Currently ready for booking</span>
        </div>

        <div className="bg-[#FFFDF9] border border-brand-sandstone/30 rounded-2xl p-6 space-y-2 shadow-subtle">
          <div className="flex items-center justify-between text-brand-sandstone">
            <span className="text-xs font-bold uppercase tracking-wider">Total Revenue</span>
            <TrendingUp className="w-5 h-5 text-brand-gold" />
          </div>
          <div className="font-serif text-3xl font-bold text-brand-deep">
            ₹{(data?.totalRevenue || 0).toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-text-muted">Collected via online Razorpay</span>
        </div>
      </div>

      {/* Recent Bookings Feed */}
      <div className="bg-[#FFFDF9] border border-brand-sandstone/30 rounded-3xl p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-brand-sandstone/20">
          <div>
            <h2 className="font-serif text-xl font-bold text-brand-deep">Recent Bookings</h2>
            <p className="text-xs text-text-secondary">Real-time feed of latest customer reservations</p>
          </div>
          <Link
            href="/admin/bookings"
            className="text-xs font-bold text-brand-deep hover:text-brand-warm underline"
          >
            View All Bookings →
          </Link>
        </div>

        {(!data?.recentBookings || data.recentBookings.length === 0) ? (
          <div className="py-12 text-center text-xs text-text-muted">
            No bookings recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-brand-sandstone/20 text-brand-sandstone uppercase font-bold text-[10px] tracking-wider">
                  <th className="py-3 px-3">Booking ID</th>
                  <th className="py-3 px-3">Guest Name</th>
                  <th className="py-3 px-3">Stay Dates</th>
                  <th className="py-3 px-3">Room</th>
                  <th className="py-3 px-3">Amount</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-sandstone/10 font-medium">
                {data.recentBookings.map((b: any) => (
                  <tr key={b.id} className="hover:bg-brand-lightSand/30 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-brand-deep">{b.public_booking_id}</td>
                    <td className="py-3 px-3 font-semibold text-brand-deep">{b.customer?.full_name || 'Guest'}</td>
                    <td className="py-3 px-3 text-text-secondary">{b.check_in} to {b.check_out}</td>
                    <td className="py-3 px-3 text-text-secondary">{b.room?.room_number || 'Standard'}</td>
                    <td className="py-3 px-3 font-serif font-bold text-brand-deep">₹{b.total}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          b.status === 'CONFIRMED'
                            ? 'bg-status-success/15 text-status-success'
                            : b.status === 'CHECKED_IN'
                            ? 'bg-blue-50 text-blue-700'
                            : b.status === 'CANCELLED'
                            ? 'bg-red-50 text-red-700'
                            : 'bg-amber-50 text-amber-800'
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Link
                        href={`/admin/bookings?search=${b.public_booking_id}`}
                        className="text-xs font-bold text-brand-deep hover:text-brand-warm underline"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
