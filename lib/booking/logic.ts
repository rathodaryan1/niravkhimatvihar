import type { Booking, RoomBlock, RoomType } from '@/lib/types';

/**
 * Checks whether two date ranges overlap.
 * Formula: existing.check_in < requested.check_out AND existing.check_out > requested.check_in
 */
export function doDateRangesOverlap(
  startA: string | Date,
  endA: string | Date,
  startB: string | Date,
  endB: string | Date
): boolean {
  const sA = new Date(startA).getTime();
  const eA = new Date(endA).getTime();
  const sB = new Date(startB).getTime();
  const eB = new Date(endB).getTime();

  return sA < eB && eA > sB;
}

/**
 * Calculates total nights between check-in and check-out
 */
export function calculateNights(checkIn: string, checkOut: string): number {
  const dIn = new Date(checkIn);
  const dOut = new Date(checkOut);
  const diffTime = dOut.getTime() - dIn.getTime();
  const nights = Math.round(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(1, nights);
}

/**
 * Generates an authoritative non-sequential Public Booking ID
 * Example: NKV-2026-8F4K2
 */
export function generatePublicBookingId(): string {
  const year = new Date().getFullYear();
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let randomPart = '';
  for (let i = 0; i < 5; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `NKV-${year}-${randomPart}`;
}

/**
 * Calculates server-authoritative price breakdown.
 * Never trust client prices!
 */
export interface PriceBreakdown {
  nightlyRate: number;
  nights: number;
  roomCount: number;
  subtotal: number;
  serviceCharge: number;
  tax: number;
  discount: number;
  total: number;
}

export function calculateAuthoritativePrice(
  roomType: RoomType,
  nights: number,
  roomCount: number = 1,
  discount: number = 0
): PriceBreakdown {
  const nightlyRate = Number(roomType.base_price);
  const subtotal = nightlyRate * nights * roomCount;
  // Dharmashala charitable trust setting: 0% tax / 0% service charge default
  const serviceCharge = 0;
  const tax = 0;
  const total = Math.max(0, subtotal + serviceCharge + tax - discount);

  return {
    nightlyRate,
    nights,
    roomCount,
    subtotal,
    serviceCharge,
    tax,
    discount,
    total,
  };
}

/**
 * Calculates hold expiration timestamp (defaults to 10 minutes from now)
 */
export function getHoldExpirationDate(ttlMinutes: number = 10): Date {
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + ttlMinutes);
  return expiresAt;
}

/**
 * Checks if a booking's hold is currently valid
 */
export function isHoldActive(booking: Booking): boolean {
  if (booking.status !== 'PENDING_PAYMENT') return false;
  if (!booking.hold_expires_at) return false;
  return new Date(booking.hold_expires_at).getTime() > Date.now();
}

/**
 * Determines if a room is occupied or blocked for the requested dates
 */
export function isRoomUnavailable(
  roomId: string,
  checkIn: string,
  checkOut: string,
  activeBookings: Booking[],
  roomBlocks: RoomBlock[]
): boolean {
  // 1. Check active blocks (maintenance, management hold, etc.)
  for (const block of roomBlocks) {
    if (block.room_id === roomId) {
      if (doDateRangesOverlap(block.start_date, block.end_date, checkIn, checkOut)) {
        return true;
      }
    }
  }

  // 2. Check bookings occupying this room
  for (const booking of activeBookings) {
    // Only consider bookings that occupy inventory: CONFIRMED, CHECKED_IN, or active PENDING_PAYMENT hold
    const isBlocking =
      booking.status === 'CONFIRMED' ||
      booking.status === 'CHECKED_IN' ||
      isHoldActive(booking);

    if (isBlocking && booking.booking_rooms) {
      const occupiesRoom = booking.booking_rooms.some((br) => br.room_id === roomId);
      if (occupiesRoom) {
        if (doDateRangesOverlap(booking.check_in, booking.check_out, checkIn, checkOut)) {
          return true;
        }
      }
    }
  }

  return false;
}
