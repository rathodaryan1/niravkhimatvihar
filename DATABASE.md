# Nirav Khimat Vihar --- Database Specification

## Database

Supabase PostgreSQL.

## Core entities

### `admins`

-   `id` UUID PK
-   `user_id` UUID unique
-   `role` enum
-   `name`
-   `is_active`
-   timestamps

### `room_types`

-   `id` UUID PK
-   `name`
-   `slug`
-   `description`
-   `capacity`
-   `base_price`
-   `currency`
-   `is_active`
-   timestamps

### `rooms`

-   `id` UUID PK
-   `room_type_id` FK
-   `room_number`
-   `floor`
-   `status`
-   `is_active`
-   timestamps

### `room_images`

-   `id` UUID PK
-   `room_type_id` FK nullable
-   `room_id` FK nullable
-   `storage_path`
-   `alt_text`
-   `sort_order`

### `room_amenities`

-   `id`
-   `room_type_id`
-   `name`

### `room_blocks`

-   `id`
-   `room_id`
-   `start_date`
-   `end_date`
-   `reason`
-   `created_by`
-   timestamps

### `customers`

-   `id`
-   `full_name`
-   `phone`
-   `email`
-   address fields
-   optional verification fields
-   timestamps

### `bookings`

-   `id` UUID PK
-   `public_booking_id` unique
-   `customer_id`
-   `check_in`
-   `check_out`
-   `guest_count`
-   `status`
-   `subtotal`
-   `service_charge`
-   `tax`
-   `discount`
-   `total`
-   `currency`
-   `hold_expires_at`
-   timestamps

### `booking_rooms`

-   `id`
-   `booking_id`
-   `room_id`
-   `nightly_rate`
-   `room_total`

### `payments`

-   `id`
-   `booking_id`
-   `provider`
-   `provider_order_id`
-   `provider_payment_id`
-   `amount`
-   `currency`
-   `status`
-   `verified_at`
-   timestamps

### `notifications`

-   `id`
-   `booking_id`
-   `channel`
-   `recipient`
-   `template`
-   `status`
-   `provider_message_id`
-   timestamps

### `audit_logs`

-   `id`
-   `admin_id`
-   `action`
-   `entity_type`
-   `entity_id`
-   metadata JSONB
-   created_at

## Booking status

`PENDING_PAYMENT`, `CONFIRMED`, `CHECKED_IN`, `CHECKED_OUT`,
`CANCELLED`, `EXPIRED`, `REFUND_PENDING`, `REFUNDED`.

## Database rules

-   Use UUIDs for internal IDs.
-   Use a separate non-sequential public booking ID.
-   Enable RLS on exposed tables.
-   Keep service-role access server-side.
-   Use database constraints/transactions to prevent overlapping
    reservations.
-   Never trust client-submitted price or availability.
