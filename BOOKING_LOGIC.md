# Nirav Khimat Vihar --- Booking Logic

## Definitions

A booking occupies a room from check-in date up to, but not including,
check-out date.

Example:

Check-in: 15 Oct Check-out: 17 Oct

Occupied nights: - 15 Oct - 16 Oct

The room becomes available on 17 Oct for a new check-in, subject to
operating rules.

## Overlap rule

Two bookings overlap when:

`existing.check_in < requested.check_out`

AND

`existing.check_out > requested.check_in`

This rule must be evaluated server-side.

## Availability

A room is unavailable if:

1.  It has a confirmed/check-in booking overlapping the requested range.
2.  It has an active payment hold overlapping the requested range.
3.  It is manually blocked for any overlapping date.

## Hold lifecycle

1.  Customer chooses room.
2.  Server verifies availability.
3.  Server creates hold.
4.  Hold receives expiry timestamp.
5.  Customer pays.
6.  Server verifies payment.
7.  Booking becomes confirmed.
8.  If hold expires, it no longer blocks inventory.

## Pricing

Never accept total price from the client.

Server calculates:

`subtotal = sum(room nightly rates × nights)`

Then:

`total = subtotal + service charges + taxes - discounts`

Store the final calculated values on the booking so historical bookings
do not change when future prices change.

## Cancellation

Cancellation rules are configurable.

When a cancellation is accepted: - Change booking status. - Process
refund if applicable. - Update payment status. - Release inventory. -
Send notification.

## Concurrency

Use database-level protection/transactions for final reservation
confirmation.

The UI availability result is advisory; the final server transaction is
authoritative.
