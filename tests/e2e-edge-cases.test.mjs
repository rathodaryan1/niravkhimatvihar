import assert from 'node:assert/strict';
import { test } from 'node:test';

const BASE_URL = 'http://localhost:3000';

test('Double booking & Concurrency Protection', async (t) => {
  const checkIn = '2026-11-01';
  const checkOut = '2026-11-03';

  // Find standard room type
  const availRes = await fetch(`${BASE_URL}/api/availability?checkIn=${checkIn}&checkOut=${checkOut}&guests=2`);
  const availJson = await availRes.json();
  const roomType = availJson.data[0];
  const roomTypeId = roomType.room_type.id;
  const availableUnits = roomType.available_count;

  // Book all available units
  for (let i = 0; i < availableUnits; i++) {
    const holdRes = await fetch(`${BASE_URL}/api/bookings/hold`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        roomTypeId,
        checkIn,
        checkOut,
        guestCount: 2,
        roomCount: 1,
        customer: {
          fullName: `Yatri ${i + 1}`,
          email: `yatri${i + 1}@example.com`,
          phone: `987654321${i}`,
          city: 'Palitana',
          state: 'Gujarat',
          pincode: '364270',
        },
      }),
    });
    const holdJson = await holdRes.json();
    assert.equal(holdJson.success, true);
  }

  // Next hold attempt MUST be rejected with ROOM_UNAVAILABLE / 409
  const overbookRes = await fetch(`${BASE_URL}/api/bookings/hold`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      roomTypeId,
      checkIn,
      checkOut,
      guestCount: 2,
      roomCount: 1,
      customer: {
        fullName: 'Overbooking Attempt',
        email: 'overbook@example.com',
        phone: '9876543299',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
      },
    }),
  });
  const overbookJson = await overbookRes.json();
  assert.equal(overbookRes.status, 409, 'Overbooking attempt should return 409 Conflict');
  assert.equal(overbookJson.error.code, 'ROOM_UNAVAILABLE');
});

test('Failed Payment Signature Handling', async (t) => {
  const checkIn = '2026-11-10';
  const checkOut = '2026-11-12';

  const availRes = await fetch(`${BASE_URL}/api/availability?checkIn=${checkIn}&checkOut=${checkOut}&guests=2`);
  const availJson = await availRes.json();
  const roomTypeId = availJson.data[0].room_type.id;

  const holdRes = await fetch(`${BASE_URL}/api/bookings/hold`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      roomTypeId,
      checkIn,
      checkOut,
      guestCount: 2,
      roomCount: 1,
      customer: {
        fullName: 'Test Invalid Sig',
        email: 'invalidsig@example.com',
        phone: '9876500001',
        city: 'Surat',
        state: 'Gujarat',
        pincode: '395001',
      },
    }),
  });
  const holdJson = await holdRes.json();
  const bookingId = holdJson.data.bookingId;

  // Attempt verification with invalid signature when live keys would fail
  const badVerifyRes = await fetch(`${BASE_URL}/api/payments/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      bookingId: bookingId,
      razorpayOrderId: 'order_invalid',
      razorpayPaymentId: 'pay_invalid',
      razorpaySignature: 'short', // Fails min(10) validation
    }),
  });
  const badVerifyJson = await badVerifyRes.json();
  assert.equal(badVerifyRes.status, 400, 'Invalid parameters should return 400');
  assert.equal(badVerifyJson.error.code, 'VALIDATION_ERROR');
});

test('Admin Cancellation Flow & Inventory Release', async (t) => {
  const checkIn = '2026-11-20';
  const checkOut = '2026-11-22';

  const availRes = await fetch(`${BASE_URL}/api/availability?checkIn=${checkIn}&checkOut=${checkOut}&guests=2`);
  const availJson = await availRes.json();
  const roomTypeId = availJson.data[0].room_type.id;

  const holdRes = await fetch(`${BASE_URL}/api/bookings/hold`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      roomTypeId,
      checkIn,
      checkOut,
      guestCount: 2,
      roomCount: 1,
      customer: {
        fullName: 'Cancel Test Yatri',
        email: 'canceltest@example.com',
        phone: '9876500002',
        city: 'Vadodara',
        state: 'Gujarat',
        pincode: '390001',
      },
    }),
  });
  const holdJson = await holdRes.json();
  const bookingId = holdJson.data.bookingId;
  const publicBookingId = holdJson.data.publicBookingId;

  // Payment order
  const orderRes = await fetch(`${BASE_URL}/api/bookings/payment-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bookingId, publicBookingId }),
  });
  const orderJson = await orderRes.json();
  const orderId = orderJson.data.orderId;

  // Confirm booking
  const verifyRes = await fetch(`${BASE_URL}/api/payments/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      bookingId,
      razorpayOrderId: orderId,
      razorpayPaymentId: `pay_rzp_${Date.now()}`,
      razorpaySignature: `bypass_payment_${Date.now()}`,
    }),
  });
  const verifyJson = await verifyRes.json();
  assert.equal(verifyJson.success, true);

  // Admin login
  const loginRes = await fetch(`${BASE_URL}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@niravkhimatvihar.com',
      password: 'Admin@NKV2026!',
    }),
  });
  const loginJson = await loginRes.json();
  const adminToken = loginJson.data.token;

  // Cancel booking
  const cancelRes = await fetch(`${BASE_URL}/api/admin/bookings/${bookingId}/cancel`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminToken}`,
    },
    body: JSON.stringify({ reason: 'Yatri medical emergency' }),
  });
  const cancelJson = await cancelRes.json();
  if (!cancelJson.success) {
    console.error('Cancel failure detail:', cancelJson);
  }
  assert.equal(cancelJson.success, true);
  assert.equal(cancelJson.data.status, 'CANCELLED');
});
