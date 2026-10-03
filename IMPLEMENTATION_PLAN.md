# Nirav Khimat Vihar — Master Implementation Plan

**Document Version:** 1.0  
**Target:** Production-Grade Digital Booking Platform & Hospitality Portal  
**Location:** Palitana, Gujarat, India  
**Date:** October 2026  

---

## 1. Executive Summary & Repository Audit

### Current Repository State
- **Audit Findings:** The workspace contains the 15 specification Markdown files (`PRD.md`, `DESIGN.md`, `SECURITY.md`, `DATABASE.md`, `API.md`, `BOOKING_LOGIC.md`, `TESTING.md`, `DEPLOYMENT.md`, `CONTENT.md`, `PROJECT_STRUCTURE.md`, `ENVIRONMENT.md`, `ADMIN_GUIDE.md`, `IMPLEMENTATION_CHECKLIST.md`, `README.md`, `CHANGELOG.md`). No existing code, `package.json`, or node_modules are present.
- **Specification Conflict Resolution:** Verified against strict hierarchy:
  $$\text{SECURITY.md} \rightarrow \text{PRD.md} \rightarrow \text{BOOKING\_LOGIC.md} \rightarrow \text{DATABASE.md} \rightarrow \text{API.md} \rightarrow \text{DESIGN.md} \rightarrow \text{Remaining Docs}$$
- **Operational Reality:** Operational details (exact room counts, specific room numbers, live pricing, Bhojanshala meal schedules, phone numbers) are treated as **configurable admin-managed data** with clearly marked placeholders, avoiding fictitious data injection while maintaining full end-to-end functionality.

---

## 2. Core Architecture & Tech Stack

### Technology Matrix
- **Framework:** Next.js (App Router, TypeScript, Server Actions + Route Handlers)
- **Styling & UI:** Tailwind CSS, Radix UI / shadcn/ui components, Lucide Icons
- **Animation:** Framer Motion (respecting `prefers-reduced-motion`)
- **Database & Storage:** Supabase PostgreSQL with strict Row Level Security (RLS) policies & Supabase Storage (public property assets vs private document storage)
- **Payment Gateway:** Razorpay Checkout + Server-side Order Creation, Cryptographic HMAC-SHA256 Signature Verification, and Idempotent Webhook Processing
- **Validation:** Zod schemas for all client and server boundary validations
- **Authentication & Authorization:** Secure session/token auth with Role-Based Access Control (`SUPER_ADMIN`, `MANAGER`, `STAFF`, `VIEWER`)
- **Testing:** Unit, Integration, and E2E testing for availability, double-booking prevention, webhook replay protection, and price tampering prevention.

---

## 3. Database Schema Blueprint (`DATABASE.md`)

```
+---------------------------------------------------------------------------------------+
|                                  DATABASE SCHEMA                                      |
+---------------------------------------------------------------------------------------+
|  [admins]              [room_types] <-----+ [rooms] <-----+ [room_blocks]             |
|   - id (UUID)           - id (UUID)       |  - id (UUID)   |  - id (UUID)             |
|   - user_id (UUID)      - name            |  - room_number |  - room_id (FK)          |
|   - role (enum)         - slug            |  - floor       |  - start_date            |
|   - name                - capacity        |  - status      |  - end_date              |
|   - is_active           - base_price      |  - is_active   |  - reason                |
|                         - currency        |                |  - created_by            |
|                         - is_active       |                |                          |
|                                           |                |                          |
|  [customers]           [bookings]         +-[booking_rooms]+                          |
|   - id (UUID)           - id (UUID)       |  - id (UUID)                              |
|   - full_name           - public_booking_id  - booking_id (FK)                        |
|   - phone               - customer_id (FK)   - room_id (FK)                           |
|   - email               - check_in           - nightly_rate                           |
|   - address_fields      - check_out          - room_total                             |
|   - id_verification     - guest_count                                                 |
|                         - status (enum)                                               |
|                         - subtotal, tax, service_charge, discount, total              |
|                         - hold_expires_at (TIMESTAMPTZ)                               |
|                                                                                       |
|  [payments]            [notifications]         [audit_logs]       [content_pages]     |
|   - id (UUID)           - id (UUID)             - id (UUID)        - id (UUID)        |
|   - booking_id (FK)     - booking_id (FK)       - admin_id (FK)    - slug (unique)    |
|   - provider            - channel (enum)        - action           - title            |
|   - provider_order_id   - recipient             - entity_type      - content (JSONB)  |
|   - provider_payment_id - template              - entity_id        - updated_at       |
|   - amount, currency    - status                - metadata (JSONB)                    |
|   - status (enum)       - provider_message_id   - created_at       [gallery_items]    |
|   - verified_at                                                     - id, url, category|
+---------------------------------------------------------------------------------------+
```

### Key Concurrency & Double-Booking Strategy
- **Overlap Formula:**  
  `existing.check_in < requested.check_out AND existing.check_out > requested.check_in`
- **Database Reservation Logic:** Availability and room holds are validated and locked via database transactions / atomic operations.
- **Hold Expiration:** Transient hold mechanism with configurable TTL (e.g., 10 minutes) automatically released upon expiration or payment failure.

---

## 4. Routes & Page Architecture

### 4.1 Public & Customer Web Application (`/app/(site)/...`)
- `/` — **Homepage:** Hero, Date Search Bar, About Nirav Khimat Vihar, Featured Rooms, Dharamshala Facilities, Bhojanshala (Pure Jain Dining), Palitana & Shatrunjaya Yatra Section, Guest Reviews, Gallery Highlights, Location & Directions, Final Booking CTA, Rich Footer.
- `/rooms` — **Room Catalogue:** Filter by capacity, A/C / Non-A/C, pricing, amenities overview.
- `/rooms/[slug]` — **Room Details:** High-res gallery, bed configuration, capacity, detailed amenities, instant booking widget.
- `/booking` — **End-to-End Booking Stepper:**
  - `01 Dates` $\rightarrow$ `02 Room Selection` $\rightarrow$ `03 Guest Details` $\rightarrow$ `04 Review & Charges Breakdown` $\rightarrow$ `05 Secure Payment (Razorpay)` $\rightarrow$ `06 Booking Confirmation & Printable Receipt`.
- `/my-booking` — **Customer Booking Lookup:** Secure lookup via `public_booking_id` + phone/email validation. Displays status, dates, room details, payment receipt, and cancellation options.
- `/facilities` — **Dharamshala Facilities:** A/C, Hot Water, Lift, RO Drinking Water, Parking, Generator Backup, Cleanliness & Peaceful Environment.
- `/bhojanshala` — **Bhojanshala & Dining:** Pure Jain Satvik culinary details, timings (Navkarshi, Chauvihar), pricing rules, dietary guidelines.
- `/palitana` — **Palitana Yatra Guide:** Shatrunjaya Hill pilgrimage guide, Taleti distance, Doli/Palki info, Dharamshala assistance for yatris.
- `/gallery` — **Photo Gallery:** Categorized into Property, Rooms, Dining, Common Areas, Palitana Temples with lightbox view.
- `/contact` — **Contact & Directions:** Inquiry form, phone numbers, WhatsApp link, Google Maps navigation, transport tips from Bhavnagar/Ahmedabad.
- `/privacy`, `/terms`, `/cancellation-policy` — **Statutory Hospitality Policies**.

### 4.2 Admin Management Application (`/app/admin/...`)
- `/admin/login` — Secure Admin Authentication with progressive delay and audit logging.
- `/admin/dashboard` — Live operational dashboard (Today's arrivals/departures, room occupancy rate, pending payments, revenue summary, recent activity).
- `/admin/bookings` — Full booking management (search, filter by status/dates, check-in, check-out, cancel, issue refund, view guest details, print receipt).
- `/admin/calendar` — Matrix availability calendar (rooms $\times$ dates) with visual state indicators (Available, Held, Confirmed, Checked In, Blocked, Maintenance) and manual room block controls.
- `/admin/rooms` — Room types & physical room inventory configuration, pricing, capacity, image assignments, amenities.
- `/admin/pricing` — Base pricing, seasonal/festival surcharge rules, extra guest charges, tax and service fee rates.
- `/admin/customers` — Customer directory with booking histories and contact verification status.
- `/admin/payments` — Financial ledger, Razorpay transaction IDs, verification logs, refund status.
- `/admin/content` — Admin-controlled CMS for contact details, Bhojanshala timings, policies, announcement banners.
- `/admin/gallery` — Image upload & categorization manager with Supabase Storage integration.
- `/admin/reports` — Occupancy reports, revenue analytics, exportable CSV summaries.
- `/admin/audit-logs` — Immutable audit trail of administrative actions (logins, cancellations, manual overrides, price modifications, room blocks).
- `/admin/settings` — System parameters (hold TTL, notification toggles, Razorpay test/live toggle).

---

## 5. API Endpoints Contract (`API.md`)

### Public API Routes
- `GET /api/availability` — Query available room types & compute server-side prices.
- `GET /api/rooms` — Retrieve active room types.
- `GET /api/rooms/[slug]` — Retrieve specific room type details.
- `POST /api/bookings/hold` — Validate availability and establish a temporary room hold.
- `POST /api/bookings/payment-order` — Create Razorpay order against active hold with server-calculated amount.
- `POST /api/payments/verify` — Verify cryptographic signature & confirm booking.
- `POST /api/webhooks/razorpay` — Idempotent webhook receiver verifying HMAC signature.
- `POST /api/bookings/lookup` — Retrieve booking details via verification.
- `POST /api/bookings/cancel` — Guest cancellation request with policy validation.
- `POST /api/contact` — Secure contact inquiry submission.

### Admin API Routes (`/api/admin/...`)
- `GET /api/admin/dashboard` — Real-time metrics and operations feed.
- `GET /api/admin/bookings` & `GET /api/admin/bookings/[id]` — Detailed booking records.
- `POST /api/admin/bookings/[id]/check-in` — Transition booking to `CHECKED_IN`.
- `POST /api/admin/bookings/[id]/check-out` — Transition booking to `CHECKED_OUT`.
- `POST /api/admin/bookings/[id]/cancel` — Admin cancellation and inventory release.
- `GET /api/admin/calendar` — Matrix grid data for rooms and dates.
- `POST /api/admin/rooms` & `PATCH /api/admin/rooms/[id]` — Physical room CRUD.
- `POST /api/admin/rooms/[id]/block` & `POST /api/admin/rooms/[id]/unblock` — Inventory block operations.
- `POST /api/admin/room-types` & `PATCH /api/admin/room-types/[id]` — Room type configuration.
- `GET /api/admin/payments` — Transaction records and status.
- `GET /api/admin/customers` — Customer data index.
- `GET /api/admin/reports` — Reporting summaries.
- `GET /api/admin/audit-logs` — Administrative audit records.
- `POST /api/admin/content` & `GET /api/admin/content` — CMS page content.

---

## 6. Design System & Aesthetics Specification (`DESIGN.md`)

- **Palette:**
  - Deep Brown: `#3A2418` (Primary brand accent / dark contrast)
  - Warm Brown: `#6B4630` (Secondary accent / headers)
  - Sandstone: `#B98A5B` (Warm neutral / card borders / highlights)
  - Soft Gold: `#C7A15A` (Accent gold / badges / CTA highlights)
  - Ivory: `#FAF7F0` (Main surface background)
  - Warm White: `#FFFDF9` (Card & elevated surface background)
  - Light Sand: `#F1E8DA` (Secondary background / input fills)
  - Text Primary: `#241A15`, Text Secondary: `#6E6259`, Text Muted: `#968A80`
- **Typography:**
  - Display / Headings: `Playfair Display` or `Cinzel` / Serif with high elegance
  - Body & UI: `Inter` / `DM Sans` / Sans-serif for optimal readability
- **Visual Feel:** Warm, serene, spiritual, high-end pilgrimage hospitality, generous whitespace, refined micro-interactions.

---

## 7. Phased Implementation Roadmap

1. **Phase A:** Repository initialization, Next.js App Router setup, TypeScript, Tailwind, CSS variables design system, shadcn/ui primitives.
2. **Phase B:** Database schema migration scripts, Supabase client configuration, mock/seed data engine, RLS policies, and data models.
3. **Phase C:** Core booking engine, server-side availability calculator, temporary hold manager, pricing calculator, and double-booking concurrency protection.
4. **Phase D:** Public marketing website & content pages (`/`, `/rooms`, `/rooms/[slug]`, `/facilities`, `/bhojanshala`, `/palitana`, `/gallery`, `/contact`, policy pages).
5. **Phase E:** Customer booking UI stepper (`/booking`) with real-time server validation and responsive summary drawer.
6. **Phase F:** Razorpay payment integration (Test Mode, server order generation, HMAC verification, webhook idempotency).
7. **Phase G:** Customer booking lookup portal (`/my-booking`) with secure verification and printable receipt generator.
8. **Phase H:** Admin panel authentication, dashboard, booking manager, visual availability calendar, room inventory manager, pricing manager, payments ledger, CMS editor, and audit logs.
9. **Phase I:** Notification service abstraction (Email, WhatsApp, SMS logger adapter).
10. **Phase J:** Security hardening (Rate limiting, CSP headers, XSS/CSRF mitigations, sanitized errors).
11. **Phase K:** Testing suite (Unit, Integration, Double-booking simulations), verification against `DATA_VERIFICATION_REQUIRED.md`, and production build validation.
