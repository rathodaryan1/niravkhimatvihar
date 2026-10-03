'use client';

import React, { useState, useEffect } from 'react';
import {
  DoorOpen,
  Plus,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Building,
  Layers,
  Users,
  Sparkles,
  Edit2,
} from 'lucide-react';

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
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#3A2418]">
          Room Inventory &amp; Categories
        </h1>
        <p className="text-xs text-[#6B4630] font-sans">
          Separation of physical rooms from room categories for accurate Dharamshala inventory management.
        </p>
      </div>

      {/* Room Categories */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold text-[#3A2418]">
            Room Categories (Catalogue)
          </h2>
          <span className="text-xs text-[#9B7049] font-medium">
            4 Configured Types
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {roomTypes.map((rt) => (
            <div
              key={rt.id}
              className="bg-[#FFFDF8] border border-[#9B7049]/30 rounded-2xl p-5 space-y-3 shadow-sm hover:border-[#C7A15A] transition-colors"
            >
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#9B7049] block">
                {rt.slug}
              </span>
              <h3 className="font-serif text-lg font-bold text-[#3A2418]">{rt.name}</h3>
              <p className="text-xs text-[#6B4630] line-clamp-2">{rt.description}</p>
              <div className="pt-2 flex justify-between items-center text-xs border-t border-[#9B7049]/15">
                <span className="font-bold text-[#3A2418]">₹{rt.base_price}/night</span>
                <span className="text-[#6B4630] font-medium">Max {rt.capacity} Yatris</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Physical Rooms Table */}
      <div className="bg-[#FFFDF8] border border-[#9B7049]/30 rounded-3xl p-6 shadow-md space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#9B7049]/20">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#3A2418]">
              Physical Room Inventory (14 Units)
            </h2>
            <p className="text-xs text-[#6B4630]">
              Individual numbered rooms mapped to category stock.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            100% Operational Status
          </span>
        </div>

        {loading ? (
          <div className="py-16 text-center space-y-2">
            <Loader2 className="w-6 h-6 text-[#C7A15A] animate-spin mx-auto" />
            <p className="text-xs text-[#6B4630]">Loading physical room records...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#9B7049]/20 text-[#9B7049] uppercase font-bold text-[10px] tracking-wider">
                  <th className="py-3 px-3">Room Number</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Floor</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Active State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#9B7049]/10 font-medium text-[#3A2418]">
                {rooms.map((r) => (
                  <tr key={r.id} className="hover:bg-[#F1E8DA]/30 transition-colors">
                    <td className="py-3.5 px-3 font-mono font-bold text-[#3A2418]">
                      {r.room_number}
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-[#3A2418]">
                      {r.roomType?.name || 'Standard'}
                    </td>
                    <td className="py-3.5 px-3 text-[#6B4630]">Floor {r.floor}</td>
                    <td className="py-3.5 px-3">
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        {r.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-emerald-700 font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
                      <span>Active</span>
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
