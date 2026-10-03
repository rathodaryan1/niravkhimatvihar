import assert from 'node:assert/strict';
import { test } from 'node:test';

const BASE_URL = 'http://localhost:3000';

test('Full Customer Booking to Admin Lifecycle Flow', async (t) => {
  // 1. Check availability
  const checkIn = '2026-10-15';
  const checkOut = '2026-10-17';
  const availRes = await fetch(`${BASE_URL}/api/availability?checkIn=${checkIn}&checkOut=${checkOut}&guests=2`);
  const availJson = await availRes.json();
  assert.equal(availJson.success, true, 'Availability check should succeed');
  assert.ok(Array.isArray(availJson.data), 'data should be an array of room types');
  assert.ok(availJson.data.length > 0, 'Should return available room types');

  const selectedItem = availJson.data[0];
  const roomTypeId = selectedItem.room_type.id;

  // 2. Create Hold
  const holdPayload = {
    roomTypeId: roomTypeId,
    checkIn: checkIn,
    checkOut: checkOut,
    guestCount: 2,
    roomCount: 1,
    customer: {
      fullName: 'Shri Gautam Shah',
      email: 'gautam.shah.unique@example.com',
      phone: '9822211100',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '380001',
    },
  };

  const holdRes = await fetch(`${BASE_URL}/api/bookings/hold`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(holdPayload),
  });
  const holdJson = await holdRes.json();
  assert.equal(holdJson.success, true, 'Hold should be created');
  assert.ok(holdJson.data.bookingId, 'Should have bookingId');
  const bookingId = holdJson.data.bookingId;
  const publicBookingId = holdJson.data.publicBookingId;

  // 3. Create Payment Order
  const orderRes = await fetch(`${BASE_URL}/api/bookings/payment-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bookingId: bookingId, publicBookingId: publicBookingId }),
  });
  const orderJson = await orderRes.json();
  assert.equal(orderJson.success, true, 'Payment order created');
  const razorpayOrderId = orderJson.data.orderId;

  // 4. Verify Payment (Instant test / bypass verification)
  const verifyRes = await fetch(`${BASE_URL}/api/payments/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      bookingId: bookingId,
      razorpayOrderId: razorpayOrderId,
      razorpayPaymentId: `pay_rzp_${Date.now()}`,
      razorpaySignature: `bypass_payment_${Date.now()}`,
    }),
  });
  const verifyJson = await verifyRes.json();
  if (!verifyJson.success) {
    console.error('Verify failure detail:', verifyJson);
  }
  assert.equal(verifyJson.success, true, 'Payment verification should succeed');
  assert.equal(verifyJson.data.status, 'CONFIRMED', 'Booking must be CONFIRMED');

  // 5. Admin Login
  const loginRes = await fetch(`${BASE_URL}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@niravkhimatvihar.com',
      password: 'Admin@NKV2026!',
    }),
  });
  const loginJson = await loginRes.json();
  if (!loginJson.success) {
    console.error('Login failure detail:', loginJson);
  }
  assert.equal(loginJson.success, true, 'Admin login should succeed');
  const adminToken = loginJson.data.token;

  // 6. Admin Bookings List Verification
  const adminBookingsRes = await fetch(`${BASE_URL}/api/admin/bookings`, {
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  const adminBookingsJson = await adminBookingsRes.json();
  assert.equal(adminBookingsJson.success, true, 'Admin bookings fetch should succeed');
  const foundBooking = adminBookingsJson.data.find((b) => b.id === bookingId);
  assert.ok(foundBooking, 'Created customer booking MUST appear in admin bookings list');
  assert.equal(foundBooking.status, 'CONFIRMED');
  assert.equal(foundBooking.customer.full_name, 'Shri Gautam Shah');

  // 7. Admin Dashboard Metrics Verification
  const dashboardRes = await fetch(`${BASE_URL}/api/admin/dashboard`, {
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  const dashboardJson = await dashboardRes.json();
  assert.equal(dashboardJson.success, true, 'Admin dashboard metrics fetch should succeed');
  assert.ok(dashboardJson.data.totalRevenue > 0, 'Total revenue should reflect payments');

  // 8. Admin Check-in
  const checkInRes = await fetch(`${BASE_URL}/api/admin/bookings/${bookingId}/check-in`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  const checkInJson = await checkInRes.json();
  assert.equal(checkInJson.success, true, 'Admin check-in should succeed');
  assert.equal(checkInJson.data.status, 'CHECKED_IN');

  // 9. Admin Check-out
  const checkOutRes = await fetch(`${BASE_URL}/api/admin/bookings/${bookingId}/check-out`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  const checkOutJson = await checkOutRes.json();
  assert.equal(checkOutJson.success, true, 'Admin check-out should succeed');
  assert.equal(checkOutJson.data.status, 'CHECKED_OUT');

  // 10. Audit Log Verification
  const auditRes = await fetch(`${BASE_URL}/api/admin/audit-logs`, {
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  const auditJson = await auditRes.json();
  assert.equal(auditJson.success, true, 'Audit logs fetch should succeed');
  const checkInLog = auditJson.data.find((l) => l.action === 'BOOKING_CHECKED_IN' && l.entity_id === bookingId);
  const checkOutLog = auditJson.data.find((l) => l.action === 'BOOKING_CHECKED_OUT' && l.entity_id === bookingId);
  assert.ok(checkInLog, 'Check-in audit log must exist');
  assert.ok(checkOutLog, 'Check-out audit log must exist');
});
