'use client';

import React, { useState, useEffect } from 'react';
import { DollarSign, CheckCircle2, AlertCircle, Loader2, Save, Sparkles, ShieldCheck } from 'lucide-react';

export default function AdminPricingPage() {
  const [roomTypes, setRoomTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const loadPricing = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('nkv_admin_token') || '';
      const res = await fetch('/api/admin/rooms', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (json.success) {
        setRoomTypes(json.data.roomTypes);
        const pMap: Record<string, number> = {};
        json.data.roomTypes.forEach((rt: any) => {
          pMap[rt.id] = Number(rt.base_price);
        });
        setPrices(pMap);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPricing();
  }, []);

  const handleUpdatePrice = async (roomTypeId: string) => {
    setUpdatingId(roomTypeId);
    setMessage(null);

    try {
      const token = localStorage.getItem('nkv_admin_token') || '';
      const res = await fetch('/api/admin/pricing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          roomTypeId,
          newPrice: Number(prices[roomTypeId]),
        }),
      });

      const json = await res.json();
      if (json.success) {
        setMessage(`Tariff for ${json.data.name} updated to ₹${json.data.base_price}/night. Historical booking tariffs remain preserved.`);
        loadPricing();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#3A2418]">
          Pricing &amp; Tariff Management
        </h1>
        <p className="text-xs text-[#6B4630] font-sans">
          Configure room tariffs. Existing confirmed bookings permanently retain their historical booked prices.
        </p>
      </div>

      {message && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{message}</span>
          </div>
          <button onClick={() => setMessage(null)} className="text-xs font-bold underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Pricing Table Card */}
      <div className="bg-[#FFFDF8] border border-[#9B7049]/30 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#9B7049]/20">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#3A2418]">
              Base Nightly Rates (INR)
            </h2>
            <p className="text-xs text-[#6B4630]">
              Server-side authoritative pricing engine
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Server Price Guaranteed</span>
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center space-y-2">
            <Loader2 className="w-6 h-6 text-[#C7A15A] animate-spin mx-auto" />
            <p className="text-xs text-[#6B4630]">Loading tariffs...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {roomTypes.map((rt) => (
              <div
                key={rt.id}
                className="flex flex-col sm:flex-row justify-between sm:items-center p-4 rounded-2xl bg-[#F8F3E8] border border-[#9B7049]/20 gap-4"
              >
                <div>
                  <span className="font-bold text-sm text-[#3A2418] block">{rt.name}</span>
                  <span className="text-xs text-[#6B4630]">
                    Capacity: {rt.capacity} Yatris · {rt.bed_type} · Attached Bath
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-xs font-bold text-[#9B7049]">₹</span>
                    <input
                      type="number"
                      min={100}
                      step={50}
                      value={prices[rt.id] || ''}
                      onChange={(e) => setPrices({ ...prices, [rt.id]: Number(e.target.value) })}
                      className="w-36 pl-8 pr-3 py-2 rounded-xl border border-[#9B7049]/30 bg-[#FFFDF8] text-[#3A2418] font-bold text-sm focus:outline-none focus:border-[#C7A15A]"
                    />
                  </div>

                  <button
                    disabled={updatingId === rt.id}
                    onClick={() => handleUpdatePrice(rt.id)}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#3A2418] hover:bg-[#241A15] text-[#FFFDF8] text-xs font-bold rounded-xl shadow-sm transition-all"
                  >
                    {updatingId === rt.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Save className="w-3.5 h-3.5 text-[#C7A15A]" />
                    )}
                    <span>Save</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
