# Nirav Khimat Vihar --- API Specification

## General

All API inputs must be validated server-side.

Suggested validation library: Zod.

## Public endpoints

### `GET /api/availability`

Inputs: - checkIn - checkOut - guests - rooms

Returns available room types/rooms and server-calculated prices.

### `GET /api/rooms`

Returns active room types.

### `GET /api/rooms/:slug`

Returns room details.

### `POST /api/bookings/hold`

Creates a temporary booking hold after a fresh availability check.

### `POST /api/bookings/payment-order`

Creates a Razorpay order for a valid hold.

### `POST /api/payments/verify`

Verifies payment server-side and confirms the booking when valid.

### `POST /api/webhooks/razorpay`

Receives and verifies Razorpay webhook events. Must be idempotent.

### `POST /api/bookings/lookup`

Returns a customer's booking only after sufficient verification.

### `POST /api/bookings/cancel`

Cancels a booking according to configured policy and authorization.

## Admin endpoints

All require server-side admin authorization.

-   `GET /api/admin/dashboard`
-   `GET /api/admin/bookings`
-   `GET /api/admin/bookings/:id`
-   `POST /api/admin/bookings/:id/check-in`
-   `POST /api/admin/bookings/:id/check-out`
-   `POST /api/admin/bookings/:id/cancel`
-   `GET /api/admin/calendar`
-   `POST /api/admin/rooms`
-   `PATCH /api/admin/rooms/:id`
-   `POST /api/admin/rooms/:id/block`
-   `POST /api/admin/rooms/:id/unblock`
-   `POST /api/admin/room-types`
-   `PATCH /api/admin/room-types/:id`
-   `GET /api/admin/payments`
-   `GET /api/admin/customers`
-   `GET /api/admin/reports`
-   `GET /api/admin/audit-logs`

## Payment rule

A browser callback must never be the sole source of truth. Payment must
be verified server-side using the payment provider's verification
mechanism.

## Error format

``` json
{
  "error": {
    "code": "ROOM_UNAVAILABLE",
    "message": "The selected room is no longer available."
  }
}
```

Do not return stack traces, secrets, SQL errors or internal
infrastructure details.
