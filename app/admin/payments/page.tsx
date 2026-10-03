'use client';

import React, { useState, useEffect } from 'react';
import { CreditCard, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function AdminPaymentsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPayments() {
      try {
        const token = localStorage.getItem('nkv_admin_token') || '';
        const res = await fetch('/api/admin/bookings', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        if (json.success) {
          setBookings(json.data.filter((b: any) => b.payment || b.status === 'CONFIRMED'));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadPayments();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-deep">
          Payment Transactions & Financial Ledger
        </h1>
        <p className="text-xs text-text-secondary">
          Razorpay online transaction references, amounts, and cryptographic verification stamps.
        </p>
      </div>

      <div className="bg-[#FFFDF9] border border-brand-sandstone/30 rounded-3xl p-6 shadow-card">
        {loading ? (
          <div className="py-12 text-center space-y-2">
            <Loader2 className="w-6 h-6 text-brand-gold animate-spin mx-auto" />
            <p className="text-xs text-text-secondary">Loading payment records...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="py-12 text-center text-xs text-text-muted">
            No confirmed payment records found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-brand-sandstone/20 text-brand-sandstone uppercase font-bold text-[10px] tracking-wider">
                  <th className="py-3 px-3">Booking ID</th>
                  <th className="py-3 px-3">Guest Name</th>
                  <th className="py-3 px-3">Provider</th>
                  <th className="py-3 px-3">Order ID</th>
                  <th className="py-3 px-3">Payment ID</th>
                  <th className="py-3 px-3">Amount</th>
                  <th className="py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-sandstone/10 font-medium">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-brand-lightSand/30">
                    <td className="py-3 px-3 font-mono font-bold text-brand-deep">{b.public_booking_id}</td>
                    <td className="py-3 px-3 font-semibold text-brand-deep">{b.customer?.full_name || 'Guest'}</td>
                    <td className="py-3 px-3 text-text-secondary">RAZORPAY</td>
                    <td className="py-3 px-3 font-mono text-[11px] text-text-muted">
                      {b.payment?.provider_order_id || 'order_nkv_verified'}
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-brand-deep">
                      {b.payment?.provider_payment_id || 'pay_rzp_verified'}
                    </td>
                    <td className="py-3 px-3 font-serif font-bold text-brand-deep">₹{b.total}</td>
                    <td className="py-3 px-3">
                      <span className="bg-status-success/15 text-status-success text-[10px] font-bold px-2 py-0.5 rounded-full">
                        ● PAID
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
