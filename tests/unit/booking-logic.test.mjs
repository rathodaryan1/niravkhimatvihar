import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  doDateRangesOverlap,
  calculateNights,
  generatePublicBookingId,
  calculateAuthoritativePrice,
  getHoldExpirationDate,
  isHoldActive,
} from '../../lib/booking/logic.ts';

test('Booking Logic: Date overlap detection', () => {
  // Existing: Oct 15 to Oct 17
  // Overlaps: Oct 16 to Oct 18 -> true
  assert.equal(doDateRangesOverlap('2026-10-15', '2026-10-17', '2026-10-16', '2026-10-18'), true);

  // Exact same dates -> true
  assert.equal(doDateRangesOverlap('2026-10-15', '2026-10-17', '2026-10-15', '2026-10-17'), true);

  // Inside existing: Oct 15 to Oct 16 -> true
  assert.equal(doDateRangesOverlap('2026-10-15', '2026-10-17', '2026-10-15', '2026-10-16'), true);

  // Adjacent / Touch on Check-out: Oct 17 to Oct 19 -> false (Checkout day is available for new Checkin)
  assert.equal(doDateRangesOverlap('2026-10-15', '2026-10-17', '2026-10-17', '2026-10-19'), false);

  // Before existing: Oct 10 to Oct 15 -> false
  assert.equal(doDateRangesOverlap('2026-10-15', '2026-10-17', '2026-10-10', '2026-10-15'), false);
});

test('Booking Logic: Night calculation', () => {
  assert.equal(calculateNights('2026-10-15', '2026-10-16'), 1);
  assert.equal(calculateNights('2026-10-15', '2026-10-18'), 3);
});

test('Booking Logic: Non-sequential Public Booking ID format', () => {
  const id = generatePublicBookingId();
  assert.match(id, /^NKV-\d{4}-[A-Z0-9]{5}$/);
});

test('Booking Logic: Authoritative price calculation ignores client price', () => {
  const mockRoomType = {
    id: 'rt-1',
    name: '2-Bed Standard A/C',
    slug: '2-bed-standard-ac',
    description: '',
    capacity: 2,
    base_price: 1200,
    currency: 'INR',
    bed_type: '2 Single Beds',
    is_active: true,
    created_at: '',
    updated_at: '',
  };

  const pricing = calculateAuthoritativePrice(mockRoomType, 3, 2); // 3 nights, 2 rooms
  assert.equal(pricing.nightlyRate, 1200);
  assert.equal(pricing.subtotal, 1200 * 3 * 2); // 7200
  assert.equal(pricing.tax, 0);
  assert.equal(pricing.total, 7200);
});

test('Booking Logic: Hold expiration validity', () => {
  const futureExp = getHoldExpirationDate(10).toISOString();
  const validBooking = {
    id: 'b-1',
    public_booking_id: 'NKV-2026-TEST1',
    customer_id: 'c-1',
    check_in: '2026-10-15',
    check_out: '2026-10-17',
    guest_count: 2,
    status: 'PENDING_PAYMENT',
    subtotal: 2400,
    service_charge: 0,
    tax: 0,
    discount: 0,
    total: 2400,
    currency: 'INR',
    hold_expires_at: futureExp,
    created_at: '',
    updated_at: '',
  };

  assert.equal(isHoldActive(validBooking), true);

  // Expired hold
  const expiredExp = new Date(Date.now() - 60000).toISOString();
  const expiredBooking = { ...validBooking, hold_expires_at: expiredExp };
  assert.equal(isHoldActive(expiredBooking), false);
});
