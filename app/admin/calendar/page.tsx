'use client';

import React, { useState, useEffect } from 'react';
import {
  CalendarDays,
  ShieldCheck,
  Lock,
  Unlock,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Plus,
} from 'lucide-react';

export default function AdminCalendarPage() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [blocks, setBlocks] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Block modal state
  const [blockModalOpen, setBlockModalOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('Routine Room Maintenance & Deep Cleaning');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Generate next 14 calendar dates
  const dates: string[] = [];
  const curr = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(curr);
    d.setDate(curr.getDate() + i);
    dates.push(d.toISOString().split('T')[0]);
  }

  const loadData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('nkv_admin_token') || '';
      const [roomsRes, bookingsRes] = await Promise.all([
        fetch('/api/admin/rooms', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/admin/bookings', { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      const roomsJson = await roomsRes.json();
      const bookingsJson = await bookingsRes.json();

      if (roomsJson.success) {
        setRooms(roomsJson.data.rooms);
        setBlocks(roomsJson.data.blocks);
      }
      if (bookingsJson.success) {
        setBookings(bookingsJson.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    if (dates.length > 0) {
      setStartDate(dates[0]);
      setEndDate(dates[1]);
    }
  }, []);

  const handleCreateBlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoomId) return;
    setSubmitting(true);
    setMessage(null);

    try {
      const token = localStorage.getItem('nkv_admin_token') || '';
      const res = await fetch(`/api/admin/rooms/${selectedRoomId}/block`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          startDate,
          endDate,
          reason,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setMessage('Room successfully blocked from customer availability.');
        setBlockModalOpen(false);
        loadData();
      } else {
        alert(json.error?.message || 'Failed to block room');
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUnblock = async (blockId: string) => {
    try {
      const token = localStorage.getItem('nkv_admin_token') || '';
      const res = await fetch(`/api/admin/rooms/${blockId}/unblock`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (json.success) {
        setMessage('Room unblocked and returned to active inventory.');
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Helper to determine status for a specific room on a specific date
  const getCellStatus = (roomId: string, dateStr: string) => {
    // 1. Check if blocked
    const block = blocks.find(
      (b) => b.room_id === roomId && dateStr >= b.start_date && dateStr <= b.end_date
    );
    if (block) {
      return { type: 'BLOCKED', label: 'Blocked', blockId: block.id, reason: block.reason };
    }

    // 2. Check if occupied by confirmed booking
    const booking = bookings.find((b) => {
      const isOccupying = b.status === 'CONFIRMED' || b.status === 'CHECKED_IN';
      if (!isOccupying) return false;
      const matchRoom = b.booking_rooms?.some((br: any) => br.room_id === roomId);
      if (!matchRoom) return false;
      return dateStr >= b.check_in && dateStr < b.check_out;
    });

    if (booking) {
      return {
        type: booking.status === 'CHECKED_IN' ? 'CHECKED_IN' : 'CONFIRMED',
        label: booking.public_booking_id,
        guest: booking.customer?.full_name,
      };
    }

    return { type: 'AVAILABLE', label: 'Avail' };
  };

  return (
    <div className="space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-deep">
            Room Availability Matrix & Calendar
          </h1>
          <p className="text-xs text-text-secondary">
            14-Day interactive room occupancy grid with administrative blocking controls.
          </p>
        </div>

        <button
          onClick={() => {
            if (rooms.length > 0) setSelectedRoomId(rooms[0].id);
            setBlockModalOpen(true);
          }}
          className="inline-flex items-center gap-2 bg-brand-deep hover:bg-brand-warm text-brand-ivory text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all"
        >
          <Lock className="w-3.5 h-3.5 text-brand-gold" />
          <span>Block Room / Maintenance</span>
        </button>
      </div>

      {message && (
        <div className="p-3.5 bg-green-50 border border-green-200 rounded-xl text-xs text-green-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-status-success shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-6 bg-[#FFFDF9] border border-brand-sandstone/30 px-6 py-3 rounded-2xl text-xs">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-md bg-status-success/20 border border-status-success" />
          <span className="font-semibold text-brand-deep">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-md bg-brand-deep" />
          <span className="font-semibold text-brand-deep">Confirmed Booking</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-md bg-blue-600" />
          <span className="font-semibold text-brand-deep">Checked In</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-md bg-red-600" />
          <span className="font-semibold text-brand-deep">Admin Blocked / Repair</span>
        </div>
      </div>

      {/* Matrix Grid Table */}
      <div className="bg-[#FFFDF9] border border-brand-sandstone/30 rounded-3xl p-6 shadow-card overflow-x-auto">
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <Loader2 className="w-8 h-8 text-brand-gold animate-spin mx-auto" />
            <p className="text-xs text-text-secondary">Computing occupancy matrix...</p>
          </div>
        ) : (
          <table className="w-full text-center text-xs border-collapse">
            <thead>
              <tr className="border-b border-brand-sandstone/20">
                <th className="p-3 text-left font-bold text-brand-deep w-36 bg-brand-lightSand/50 rounded-l-xl">
                  Physical Room
                </th>
                {dates.map((d) => {
                  const dayObj = new Date(d);
                  const dayName = dayObj.toLocaleDateString('en-US', { weekday: 'short' });
                  const dayNum = dayObj.getDate();
                  const monthName = dayObj.toLocaleDateString('en-US', { month: 'short' });

                  return (
                    <th key={d} className="p-2 border-l border-brand-sandstone/10 font-medium">
                      <span className="text-[10px] text-brand-sandstone block uppercase">{dayName}</span>
                      <span className="font-bold text-brand-deep">{dayNum} {monthName}</span>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-sandstone/10">
              {rooms.map((room) => (
                <tr key={room.id} className="hover:bg-brand-lightSand/20">
                  <td className="p-3 text-left font-bold text-brand-deep bg-brand-lightSand/30">
                    <span className="block font-mono text-sm">{room.room_number}</span>
                    <span className="text-[10px] text-text-muted">{room.roomType?.name?.split(' ')[0] || 'Room'} · Fl {room.floor}</span>
                  </td>

                  {dates.map((d) => {
                    const status = getCellStatus(room.id, d);
                    return (
                      <td key={d} className="p-1 border-l border-brand-sandstone/10">
                        {status.type === 'AVAILABLE' ? (
                          <div className="h-10 rounded-lg bg-status-success/15 border border-status-success/30 flex items-center justify-center text-[10px] font-bold text-status-success">
                            Avail
                          </div>
                        ) : status.type === 'CONFIRMED' ? (
                          <div
                            title={`Reserved: ${status.label} (${status.guest})`}
                            className="h-10 rounded-lg bg-brand-deep text-brand-gold flex items-center justify-center text-[10px] font-mono font-bold px-1 truncate shadow-sm cursor-help"
                          >
                            {status.label.replace('NKV-2026-', '')}
                          </div>
                        ) : status.type === 'CHECKED_IN' ? (
                          <div
                            title={`In-House: ${status.label} (${status.guest})`}
                            className="h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center text-[10px] font-mono font-bold px-1 truncate shadow-sm cursor-help"
                          >
                            In-House
                          </div>
                        ) : (
                          <div
                            title={`Blocked: ${status.reason}`}
                            className="h-10 rounded-lg bg-red-600 text-white flex flex-col items-center justify-center text-[9px] font-bold px-1 shadow-sm"
                          >
                            <span>Blocked</span>
                            <button
                              onClick={() => handleUnblock(status.blockId)}
                              className="text-[8px] underline text-red-100 hover:text-white"
                            >
                              Unblock
                            </button>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Block Room Modal */}
      {blockModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#FFFDF9] border border-brand-sandstone/40 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-elevated">
            <h3 className="font-serif text-xl font-bold text-brand-deep">
              Block Room Inventory
            </h3>
            <p className="text-xs text-text-secondary">
              Blocked rooms immediately disappear from customer-facing availability during selected dates.
            </p>

            <form onSubmit={handleCreateBlock} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-brand-deep uppercase">
                  Select Room *
                </label>
                <select
                  value={selectedRoomId}
                  onChange={(e) => setSelectedRoomId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-brand-sandstone/40 bg-brand-ivory text-brand-deep font-bold"
                >
                  {rooms.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.room_number} — {r.roomType?.name} (Floor {r.floor})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-brand-deep uppercase">Start Date *</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-brand-sandstone/40 bg-brand-ivory text-brand-deep"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-brand-deep uppercase">End Date *</label>
                  <input
                    type="date"
                    required
                    min={startDate}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-brand-sandstone/40 bg-brand-ivory text-brand-deep"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-brand-deep uppercase">Reason for Block *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Geyser repair / Management hold / Renovation"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-brand-sandstone/40 bg-brand-ivory text-brand-deep"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setBlockModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-text-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 text-xs font-bold bg-brand-deep text-brand-ivory rounded-xl"
                >
                  {submitting ? 'Applying Block...' : 'Confirm Block'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
