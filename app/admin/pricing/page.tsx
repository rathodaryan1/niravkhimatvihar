'use client';

import React, { useState, useEffect } from 'react';
import { DollarSign, CheckCircle2, AlertCircle, Loader2, Save } from 'lucide-react';

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
        setMessage(`Tariff for ${json.data.name} updated to ₹${json.data.base_price}/night. Historical booking tariffs remain unchanged.`);
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
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-deep">
          Pricing & Tariff Management
        </h1>
        <p className="text-xs text-text-secondary">
          Configure room tariffs. Note: Existing confirmed bookings permanently retain their historical booked prices.
        </p>
      </div>

      {message && (
        <div className="p-3.5 bg-green-50 border border-green-200 rounded-xl text-xs text-green-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-status-success shrink-0" />
          <span>{message}</span>
        </div>
      )}

      <div className="bg-[#FFFDF9] border border-brand-sandstone/30 rounded-3xl p-6 sm:p-8 shadow-card space-y-6">
        <h2 className="font-serif text-xl font-bold text-brand-deep">Base Nightly Rates (INR)</h2>

        {loading ? (
          <div className="py-12 text-center space-y-2">
            <Loader2 className="w-6 h-6 text-brand-gold animate-spin mx-auto" />
            <p className="text-xs text-text-secondary">Loading tariffs...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {roomTypes.map((rt) => (
              <div
                key={rt.id}
                className="flex flex-col sm:flex-row justify-between sm:items-center p-4 rounded-2xl bg-brand-lightSand/30 border border-brand-sandstone/20 gap-4"
              >
                <div>
                  <span className="font-bold text-sm text-brand-deep block">{rt.name}</span>
                  <span className="text-xs text-text-secondary">Capacity: {rt.capacity} Yatris · {rt.bed_type}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-xs font-bold text-brand-sandstone">₹</span>
                    <input
                      type="number"
                      min={100}
                      step={50}
                      value={prices[rt.id] || ''}
                      onChange={(e) => setPrices({ ...prices, [rt.id]: Number(e.target.value) })}
                      className="w-32 pl-7 pr-3 py-1.5 rounded-xl border border-brand-sandstone/40 bg-brand-ivory text-brand-deep font-bold text-sm"
                    />
                  </div>

                  <button
                    disabled={updatingId === rt.id}
                    onClick={() => handleUpdatePrice(rt.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-deep hover:bg-brand-warm text-brand-ivory text-xs font-bold rounded-xl shadow-sm transition-all"
                  >
                    {updatingId === rt.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Save className="w-3.5 h-3.5 text-brand-gold" />
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
