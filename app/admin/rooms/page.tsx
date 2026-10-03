'use client';

import React, { useState, useEffect } from 'react';
import { DoorOpen, Plus, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [roomTypes, setRoomTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRooms() {
      try {
        const token = localStorage.getItem('nkv_admin_token') || '';
        const res = await fetch('/api/admin/rooms', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        if (json.success) {
          setRooms(json.data.rooms);
          setRoomTypes(json.data.roomTypes);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadRooms();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-deep">
          Room Inventory & Categories
        </h1>
        <p className="text-xs text-text-secondary">
          Separation of physical rooms from room categories for accurate inventory management.
        </p>
      </div>

      {/* Room Categories */}
      <div className="space-y-4">
        <h2 className="font-serif text-xl font-bold text-brand-deep">Room Categories (Catalogue)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {roomTypes.map((rt) => (
            <div key={rt.id} className="bg-[#FFFDF9] border border-brand-sandstone/30 rounded-2xl p-6 space-y-3 shadow-subtle">
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-sandstone block">
                {rt.slug}
              </span>
              <h3 className="font-serif text-lg font-bold text-brand-deep">{rt.name}</h3>
              <p className="text-xs text-text-secondary line-clamp-2">{rt.description}</p>
              <div className="pt-2 flex justify-between items-center text-xs">
                <span className="font-bold text-brand-deep">₹{rt.base_price}/night</span>
                <span className="text-text-muted">Max {rt.capacity} Guests</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Physical Rooms Table */}
      <div className="bg-[#FFFDF9] border border-brand-sandstone/30 rounded-3xl p-6 shadow-card space-y-4">
        <h2 className="font-serif text-xl font-bold text-brand-deep">Physical Room Inventory (14 Rooms)</h2>
        {loading ? (
          <div className="py-12 text-center space-y-2">
            <Loader2 className="w-6 h-6 text-brand-gold animate-spin mx-auto" />
            <p className="text-xs text-text-secondary">Loading physical room records...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-brand-sandstone/20 text-brand-sandstone uppercase font-bold text-[10px]">
                  <th className="py-3 px-3">Room Number</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Floor</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-sandstone/10">
                {rooms.map((r) => (
                  <tr key={r.id} className="hover:bg-brand-lightSand/30">
                    <td className="py-3 px-3 font-mono font-bold text-brand-deep">{r.room_number}</td>
                    <td className="py-3 px-3 font-semibold text-brand-deep">{r.roomType?.name}</td>
                    <td className="py-3 px-3 text-text-secondary">Floor {r.floor}</td>
                    <td className="py-3 px-3">
                      <span className="bg-status-success/15 text-status-success text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {r.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-status-success font-bold">● Active</td>
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
