# UI, Navbar, Admin & Booking System Comprehensive Audit
**Project:** Shri Nirav Khimat Bhavan, Palitana, Gujarat  
**Date:** October 2026

---

## 1. Executive Summary & Audit Objectives
This audit evaluates the current state of customer navigation, visual identity, booking flow, and administrative operations for Shri Nirav Khimat Bhavan. The goal is to elevate the visual standard to that of a serene, quiet luxury Jain pilgrimage destination, integrate a versatile temporary monogram (`BrandMark`), improve desktop and mobile navigation, and ensure 100% operational connectivity from customer booking to admin oversight.

---

## 2. Navbar & Header State Analysis
### Identified Issues:
1. **Contrast & Readability**: In some subpages and transition states, white text over lighter backgrounds lacked sufficient contrast.
2. **Alignment & Visual Hierarchy**: Navigation links and branding required tighter typographic alignment and consistent brand tokens.
3. **Mobile Experience**: Mobile drawer required section indices, dedicated language controls, and smooth Framer Motion reveals.
4. **Mobile Sticky Booking Bar**: The mobile booking bar required refined styling matching the deep brown, ivory, and antique gold palette without cluttering the screen.

### Target Architecture:
- **BrandMark Component** (`components/marketing/BrandMark.tsx`):
  - `variant="full"`: Circular deep brown emblem with antique-gold border + `SHRI NIRAV KHIMAT BHAVAN` + `PALITANA · GUJARAT`.
  - `variant="compact"`: Monogram + `NIRAV KHIMAT`.
  - `variant="mobile"`: Monogram + `NKV`.
- **Desktop Navbar**: Seamless height reduction on scroll (`88px` → `72px`), dynamic ivory glassmorphic blur (`#FCFAF5`), gold active indicator, and accessible language switcher.
- **Mobile Navbar**: Compact sticky bar + fullscreen menu with staggered item reveals and safe-area compliant booking CTA.

---

## 3. Customer Booking → Admin Operations Flow
### Operational Pipeline:
1. **Search & Dates**: Customer selects check-in, check-out, and guest counts using `<BookingDateSelector />` and steppers.
2. **Room Selection**: Editorial room cards display verified database room types and authentic demo photos with lightbox preview.
3. **Guest Verification**: Customer enters full name, mobile, email, and residential address with strict validation.
4. **Atomic 10-Minute Hold**: System calls `/api/bookings/hold`, reserving inventory and initiating hold timer.
5. **Payment / Instant Bypass Verification**: System calls `/api/payments/verify`, validating HMAC-SHA256 signature / dev bypass, marking booking status as `CONFIRMED`.
6. **Automatic Admin Synchronization**:
   - Booking record appears immediately in `/admin/bookings` with real customer details, dates, room assignment, and tariff.
   - Live revenue, active bookings, and today's arrivals update in `/admin/dashboard`.
   - Room slot updates in `/admin/calendar`.
   - Check-in, Check-out, and Cancellation actions update database state and generate audit logs in `/admin/audit-logs`.

---

## 4. Components & Files Action Plan
| Component / File | Current Status | Planned Enhancement |
| :--- | :--- | :--- |
| `components/marketing/BrandMark.tsx` | New | Create reusable temporary monogram component with full, compact, and mobile variants |
| `components/marketing/Header.tsx` | Needs Polish | Integrate `BrandMark`, scroll motion values, active indicator, mobile drawer |
| `components/booking/BookingStepper.tsx` | Implemented | Ensure compact 60-70px desktop horizontal indicator and mobile minimal bar |
| `components/booking/BookingDateSelector.tsx` | Implemented | Calendar popover with month navigation and range highlight |
| `components/booking/BookingSummaryCard.tsx` | Implemented | Sticky desktop summary + mobile bottom sheet |
| `app/admin/bookings/page.tsx` | Functional | Add statistics header, search filters, and detail drawer |
| `app/admin/dashboard/page.tsx` | Functional | Connect live database metrics and quick actions |
| `app/admin/calendar/page.tsx` | Functional | Verify matrix grid and room blocking operations |
| `app/admin/payments/page.tsx` | Functional | Review verified payment listings |
| `lib/razorpay/index.ts` | Updated | Verified bypass mode for development testing |

---

## 5. Security & Verification Rules
- **Authoritative Pricing**: All booking prices are calculated server-side via `calculateAuthoritativePrice`.
- **Secrets Isolation**: `RAZORPAY_KEY_SECRET` and `SUPABASE_SERVICE_ROLE_KEY` remain strictly server-side.
- **Zero Fabrication**: All operational guidelines remain subject to management verification.
