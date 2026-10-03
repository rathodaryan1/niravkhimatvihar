# Nirav Khimat Vihar --- Product Requirements Document (PRD)

**Document version:** 1.0\
**Project:** Nirav Khimat Vihar Dharamshala & Online Booking Platform\
**Status:** Demo / MVP planning\
**Primary market:** Palitana, Gujarat, India

------------------------------------------------------------------------

## 1. Product Overview

Nirav Khimat Vihar will be a modern, mobile-first Dharamshala website
with a complete online room-booking system.

The product has two experiences:

1.  **Customer website** --- discover the property, view
    rooms/facilities, check availability, book a room, pay online, and
    manage a booking.
2.  **Admin panel** --- manage rooms, availability, bookings, pricing,
    payments, customers, content, and reports.

The platform should feel like a trustworthy pilgrimage-stay service
rather than a generic hotel template.

> **Important:** Room prices, exact room inventory, meal timings,
> eligibility rules, contact numbers, cancellation policy, and other
> operational details must be verified with Nirav Khimat Vihar
> management before production launch.

------------------------------------------------------------------------

## 2. Goals

### Primary goals

-   Allow customers to book rooms online.
-   Prevent double booking through server-side availability checks and
    temporary booking holds.
-   Give management complete control over room inventory and
    reservations.
-   Support online payments through Razorpay.
-   Provide booking confirmation and receipt.
-   Make the website excellent on mobile devices.
-   Present the Dharamshala, rooms, Bhojanshala, facilities, gallery,
    and Palitana location professionally.
-   Provide a scalable foundation for future WhatsApp/SMS/email
    notifications.

### Non-goals for MVP

-   Full OTA/channel-manager integration with Booking.com, MakeMyTrip,
    etc.
-   Complex loyalty program.
-   Multi-property management.
-   Native Android/iOS applications.
-   Automated dynamic pricing based on machine learning.

------------------------------------------------------------------------

## 3. Target Users

### Customer / Pilgrim

Needs to: - Understand the property. - Find suitable accommodation. -
Check exact dates. - See available rooms and price. - Enter guest
information. - Pay securely. - Receive booking confirmation. - Look up a
booking later.

### Dharamshala Admin

Needs to: - See today's arrivals/departures. - Manage rooms. - Block
rooms. - Confirm/cancel bookings. - View payments. - Manage pricing. -
View customers. - Export reports. - Update website content.

------------------------------------------------------------------------

## 4. Public Website

### 4.1 Home

Sections:

1.  Header/navigation
2.  Hero
3.  Availability search
4.  About Nirav Khimat Vihar
5.  Featured rooms
6.  Facilities
7.  Bhojanshala
8.  Palitana Yatra section
9.  Guest reviews
10. Gallery
11. Location
12. Booking CTA
13. Footer

Primary CTA: **Book Your Stay**

Secondary CTA: **Check Availability**

### 4.2 Rooms

-   Room type cards
-   Capacity
-   Amenities
-   Photos
-   Price
-   Availability CTA

### 4.3 Room Details

-   Image gallery
-   Room description
-   Capacity
-   Amenities
-   Bed configuration
-   Pricing
-   Availability selector
-   Booking CTA

### 4.4 Booking

Customer flow:

`Dates → Guests → Available Rooms → Guest Details → Review → Payment → Confirmation`

### 4.5 My Booking

Lookup using:

-   Booking ID
-   Mobile number

Display: - Booking status - Dates - Room - Guest count - Payment
status - Amount - Cancellation policy - Receipt

### 4.6 Bhojanshala

-   Dining information
-   Photos
-   Timings
-   Meal information
-   Pricing

All operational information must be editable by admin.

### 4.7 Facilities

Examples, subject to management verification:

-   Air conditioning
-   Attached bathroom
-   Hot water
-   RO water
-   Parking
-   Lift
-   Generator
-   Bhojanshala

### 4.8 Gallery

Categories: - Property - Rooms - Dining - Common areas - Nearby
pilgrimage locations

### 4.9 Location

-   Address
-   Google Maps
-   Get Directions
-   Nearby pilgrimage information

### 4.10 Contact

-   Phone
-   WhatsApp
-   Email
-   Contact form
-   Directions

------------------------------------------------------------------------

## 5. Booking Requirements

### Availability

Availability must be calculated server-side.

The system must consider:

-   Physical room inventory
-   Existing confirmed bookings
-   Active temporary holds
-   Admin room blocks
-   Check-in/check-out dates

### Temporary hold

When a customer starts payment, the selected room should be temporarily
held for a short configurable period.

If payment fails or the hold expires, the room becomes available again.

### Booking statuses

-   `PENDING_PAYMENT`
-   `CONFIRMED`
-   `CHECKED_IN`
-   `CHECKED_OUT`
-   `CANCELLED`
-   `EXPIRED`
-   `REFUND_PENDING`
-   `REFUNDED`

### Payment statuses

-   `CREATED`
-   `PENDING`
-   `PAID`
-   `FAILED`
-   `REFUNDED`
-   `PARTIALLY_REFUNDED`

### Booking ID

Use a non-sequential public booking identifier such as:

`NKV-2026-8F4K2`

Do not expose database IDs to customers.

------------------------------------------------------------------------

## 6. Customer Booking Flow

### Step 1 --- Search

Customer enters:

-   Check-in
-   Check-out
-   Adults
-   Children
-   Number of rooms

### Step 2 --- Available rooms

Show only rooms that satisfy capacity and availability.

### Step 3 --- Guest details

-   Full name
-   Mobile
-   Email
-   Address
-   City
-   State
-   Pincode
-   Guest count
-   Optional ID/eligibility information if required by management

### Step 4 --- Review

Display:

-   Room
-   Dates
-   Nights
-   Guest count
-   Room charges
-   Service charges
-   Taxes
-   Discount, if applicable
-   Final amount

### Step 5 --- Payment

Razorpay checkout.

### Step 6 --- Verification

Never trust the browser payment-success callback alone.

The backend verifies the payment and/or processes the payment webhook
before confirming the booking.

### Step 7 --- Confirmation

Show:

-   Booking ID
-   Status
-   Room
-   Dates
-   Guests
-   Amount paid
-   Receipt
-   Contact options

------------------------------------------------------------------------

## 7. Admin Panel

### Dashboard

Metrics:

-   Today's check-ins
-   Today's check-outs
-   Occupied rooms
-   Available rooms
-   Pending payments
-   Today's bookings
-   Revenue

### Booking Management

Admin can:

-   Search
-   Filter
-   View
-   Confirm where applicable
-   Cancel
-   Check in
-   Check out
-   Record/refund payment status
-   Print/download receipt

### Room Management

Admin can:

-   Create room types
-   Create physical rooms
-   Set capacity
-   Set amenities
-   Upload photos
-   Set active/inactive status
-   Set base price

### Availability Calendar

-   Daily/monthly calendar
-   Room-level occupancy
-   Manual room blocks
-   Maintenance blocks

### Pricing

-   Base price
-   Seasonal price
-   Festival price
-   Extra guest fee
-   Service charge
-   Tax configuration

### Content

Admin can manage:

-   Gallery
-   Facilities
-   Bhojanshala information
-   Contact details
-   Booking policies
-   Cancellation policy

------------------------------------------------------------------------

## 8. Data Model

Core tables:

-   `admins`
-   `room_types`
-   `rooms`
-   `room_images`
-   `room_amenities`
-   `room_blocks`
-   `customers`
-   `bookings`
-   `booking_rooms`
-   `payments`
-   `notifications`
-   `content_pages`
-   `gallery_items`
-   `audit_logs`

### Important relationships

`room_types 1 → many rooms`

`bookings 1 → many booking_rooms`

`customers 1 → many bookings`

`bookings 1 → many payments`

------------------------------------------------------------------------

## 9. Recommended Technology

### Frontend

-   Next.js
-   TypeScript
-   Tailwind CSS
-   shadcn/ui
-   Framer Motion

### Backend

-   Next.js server-side APIs/server actions
-   Server-side validation

### Database

-   Supabase PostgreSQL

### Storage

-   Supabase Storage

### Payments

-   Razorpay

### Hosting

-   Vercel

### Notifications

-   Email provider
-   WhatsApp provider
-   Optional SMS/OTP provider

------------------------------------------------------------------------

## 10. Functional Requirements

### FR-01 --- Room availability

The system shall return accurate availability for the selected date
range.

### FR-02 --- Booking

A customer shall be able to reserve an available room.

### FR-03 --- Payment

The system shall create and verify online payments.

### FR-04 --- Double-booking protection

The system shall prevent two confirmed bookings from occupying the same
physical room for overlapping dates.

### FR-05 --- Admin inventory

Admins shall be able to create, edit, activate, deactivate, and block
rooms.

### FR-06 --- Booking lookup

Customers shall be able to retrieve their booking using a booking ID and
verified contact information.

### FR-07 --- Notifications

The system shall support booking confirmation notifications.

### FR-08 --- Audit trail

Important admin actions shall be recorded.

### FR-09 --- Responsive UI

The complete customer experience shall work on mobile, tablet, and
desktop.

### FR-10 --- Error handling

Payment failures, expired holds, unavailable rooms, invalid dates, and
network failures shall have clear user-facing states.

------------------------------------------------------------------------

## 11. Business Rules

-   Check-out date must be later than check-in date.
-   Room availability must be checked again immediately before
    confirmation.
-   A payment success shown only by the frontend must not confirm a
    booking.
-   An expired payment hold must release the room.
-   Cancellation/refund rules must be configurable.
-   Taxes/service charges must be configurable.
-   Eligibility requirements must be configurable and verified by
    management.
-   Room prices must be admin-controlled.

------------------------------------------------------------------------

## 12. MVP Acceptance Criteria

The MVP is complete when:

-   Customer can search dates.
-   Customer sees real available inventory.
-   Customer can select a room.
-   Customer can enter guest details.
-   Customer can complete a Razorpay test payment.
-   Backend verifies payment.
-   Booking is created only after successful verification.
-   The room is unavailable for overlapping dates.
-   Admin sees the booking immediately.
-   Admin can block/unblock rooms.
-   Customer receives a confirmation screen.
-   Customer can retrieve the booking.
-   Mobile and desktop layouts work correctly.
-   Security controls in `SECURITY.md` are implemented.

------------------------------------------------------------------------

## 13. Future Enhancements

-   WhatsApp Business API
-   SMS OTP
-   Automated check-in reminders
-   QR booking confirmation
-   Digital ID verification
-   Multiple properties
-   Coupon system
-   Advanced analytics
-   Accounting integration
-   Channel manager/OTA integrations
-   Multi-language Gujarati/Hindi/English
