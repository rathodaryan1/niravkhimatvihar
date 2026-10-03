# Nirav Khimat Vihar --- QA & Testing Plan

## Unit tests

Test: - Date validation - Night calculation - Capacity calculation -
Price calculation - Service charge calculation - Tax calculation -
Booking ID generation - Hold expiration - Cancellation rules

## Integration tests

Test: - Availability query - Booking creation - Room hold - Payment
order creation - Payment verification - Webhook processing - Booking
lookup - Admin authorization

## Critical booking tests

### Double booking

Two customers attempt the same room and dates at nearly the same time.

Expected: - Only one confirmed reservation succeeds.

### Payment failure

Expected: - Booking is not confirmed. - Hold eventually releases.

### Webhook replay

Send the same webhook twice.

Expected: - Only one state transition/payment record.

### Modified price

Change price in browser request.

Expected: - Server ignores manipulated price and calculates its own
amount.

### Unauthorized booking access

Customer attempts to retrieve another booking.

Expected: - Request denied.

## E2E

-   Home → availability → room → details → payment → confirmation
-   Booking lookup
-   Admin login
-   Admin calendar
-   Admin room block
-   Admin cancellation
-   Admin payment view

## Responsive

Test: - 320px mobile - 375px mobile - 768px tablet - 1024px laptop -
1440px desktop

## Accessibility

Test: - Keyboard navigation - Focus states - Screen-reader labels -
Contrast - Form errors - Reduced motion

## Launch gate

No production launch until all critical booking, payment and
authorization tests pass.
