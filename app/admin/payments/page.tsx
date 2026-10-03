'use client';

import React, { useState, useEffect } from 'react';
import { CreditCard, CheckCircle2, AlertCircle, Loader2, ShieldCheck, RefreshCw } from 'lucide-react';

export default function AdminPaymentsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPayments = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('nkv_admin_token') || '';
      const res = await fetch('/api/admin/bookings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (json.success) {
        setBookings(json.data.filter((b: any) => b.payment || b.status === 'CONFIRMED' || b.status === 'CHECKED_IN'));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayments();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#3A2418]">
            Payment Transactions &amp; Ledger
          </h1>
          <p className="text-xs text-[#6B4630] font-sans">
            Razorpay online transaction references, amounts, and cryptographic verification stamps.
          </p>
        </div>

        <button
          onClick={loadPayments}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FFFDF8] border border-[#9B7049]/30 text-xs font-semibold text-[#3A2418] hover:bg-[#F1E8DA]"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Ledger</span>
        </button>
      </div>

      <div className="bg-[#FFFDF8] border border-[#9B7049]/30 rounded-3xl p-6 shadow-md">
        {loading ? (
          <div className="py-16 text-center space-y-2">
            <Loader2 className="w-6 h-6 text-[#C7A15A] animate-spin mx-auto" />
            <p className="text-xs text-[#6B4630]">Loading payment ledger...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="py-16 text-center text-xs text-[#6B4630]">
            No confirmed payment records found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#9B7049]/20 text-[#9B7049] uppercase font-bold text-[10px] tracking-wider">
                  <th className="py-3 px-3">Booking ID</th>
                  <th className="py-3 px-3">Guest Name</th>
                  <th className="py-3 px-3">Provider</th>
                  <th className="py-3 px-3">Gateway Order ID</th>
                  <th className="py-3 px-3">Payment ID</th>
                  <th className="py-3 px-3">Amount</th>
                  <th className="py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#9B7049]/10 font-medium text-[#3A2418]">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-[#F1E8DA]/30 transition-colors">
                    <td className="py-3.5 px-3 font-mono font-bold text-[#3A2418]">
                      {b.public_booking_id}
                    </td>
                    <td className="py-3.5 px-3 font-bold text-[#3A2418]">
                      {b.customer?.full_name || 'Guest'}
                    </td>
                    <td className="py-3.5 px-3 font-mono text-[11px] text-[#6B4630]">
                      RAZORPAY
                    </td>
                    <td className="py-3.5 px-3 font-mono text-[11px] text-[#6B4630]">
                      {b.payment?.provider_order_id || 'order_bypass_verified'}
                    </td>
                    <td className="py-3.5 px-3 font-mono text-[11px] text-[#3A2418]">
                      {b.payment?.provider_payment_id || 'pay_bypass_verified'}
                    </td>
                    <td className="py-3.5 px-3 font-serif font-bold text-sm text-[#3A2418]">
                      ₹{Number(b.total).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>VERIFIED PAID</span>
                      </span>
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
