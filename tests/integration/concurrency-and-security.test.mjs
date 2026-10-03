import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dbStore } from '../../lib/db/store.ts';
import { verifyRazorpaySignature } from '../../lib/razorpay/index.ts';

test('Integration: Concurrency & Double-Booking Protection', async () => {
  const roomTypes = await dbStore.getRoomTypes();
  const targetRoomType = roomTypes[0]; // 2-Bed Standard (4 physical rooms: A-101, A-102, A-103, A-104)

  const checkIn = '2026-11-01';
  const checkOut = '2026-11-04';

  // Reserve all 4 rooms for same dates
  for (let i = 0; i < 4; i++) {
    const res = await dbStore.createBookingHold({
      roomTypeId: targetRoomType.id,
      checkIn,
      checkOut,
      guestCount: 2,
      roomCount: 1,
      customer: {
        fullName: `Pilgrim User ${i}`,
        phone: `987654321${i}`,
        email: `pilgrim${i}@example.com`,
        city: 'Palitana',
        state: 'Gujarat',
        pincode: '364270',
      },
    });
    assert.ok(res.booking);
  }

  // 5th customer attempts to reserve the same room type for overlapping dates
  await assert.rejects(
    async () => {
      await dbStore.createBookingHold({
        roomTypeId: targetRoomType.id,
        checkIn,
        checkOut,
        guestCount: 2,
        roomCount: 1,
        customer: {
          fullName: 'Late Pilgrim',
          phone: '9876543299',
          email: 'late@example.com',
          city: 'Palitana',
          state: 'Gujarat',
          pincode: '364270',
        },
      });
    },
    /no longer available/
  );
});

test('Integration: Cryptographic Payment Verification', () => {
  // Test valid signature in dev simulation
  const valid = verifyRazorpaySignature('order_nkv_test_123', 'pay_123', 'test_mode_valid_signature');
  assert.equal(valid, true);

  // Invalid fake signature rejected
  const invalid = verifyRazorpaySignature('order_real_123', 'pay_real_123', 'fake_unverified_sig');
  assert.equal(invalid, false);
});

test('Integration: Customer Booking Lookup Privacy', async () => {
  const roomTypes = await dbStore.getRoomTypes();
  const hold = await dbStore.createBookingHold({
    roomTypeId: roomTypes[1].id,
    checkIn: '2026-12-10',
    checkOut: '2026-12-12',
    guestCount: 3,
    roomCount: 1,
    customer: {
      fullName: 'Sureshbhai Shah',
      phone: '9825098250',
      email: 'suresh@example.com',
      city: 'Surat',
      state: 'Gujarat',
      pincode: '395001',
    },
  });

  const publicId = hold.booking.public_booking_id;

  // Correct phone -> returns booking
  const found = await dbStore.lookupBooking(publicId, '9825098250');
  assert.ok(found);
  assert.equal(found.public_booking_id, publicId);

  // Wrong phone -> returns null (Access Denied)
  const denied = await dbStore.lookupBooking(publicId, '9999999999');
  assert.equal(denied, null);
});

test('Integration: Administrative Room Block Removes Inventory', async () => {
  const roomTypes = await dbStore.getRoomTypes();
  const rt = roomTypes[2]; // 4-Bed Family

  const checkIn = '2026-12-20';
  const checkOut = '2026-12-25';

  const availBefore = await dbStore.checkAvailability(checkIn, checkOut, 4, 1);
  const beforeCount = availBefore.find((a) => a.room_type.id === rt.id).available_count;

  // Block room C-301
  const block = await dbStore.blockRoom('c-301', checkIn, checkOut, 'Annual Maintenance', 'admin-1');

  const availAfter = await dbStore.checkAvailability(checkIn, checkOut, 4, 1);
  const afterCount = availAfter.find((a) => a.room_type.id === rt.id).available_count;

  assert.equal(afterCount, beforeCount - 1);

  // Unblock
  await dbStore.unblockRoom(block.id, 'admin-1');
  const availRestored = await dbStore.checkAvailability(checkIn, checkOut, 4, 1);
  assert.equal(availRestored.find((a) => a.room_type.id === rt.id).available_count, beforeCount);
});
