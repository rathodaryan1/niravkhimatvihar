# Nirav Khimat Vihar --- Design System & UI Specification

**Version:** 1.0\
**Design goal:** Premium, peaceful, trustworthy Jain pilgrimage
accommodation.

------------------------------------------------------------------------

## 1. Design Direction

The website should feel:

-   Peaceful
-   Traditional but modern
-   Clean
-   Premium
-   Trustworthy
-   Pilgrimage-oriented
-   Welcoming to families and yatris

### Avoid

-   Generic hotel-template appearance
-   Excessive gradients
-   Neon colors
-   Overly flashy animations
-   Crowded layouts
-   Fake luxury claims
-   Stock-photo-heavy design when actual property photography is
    available

------------------------------------------------------------------------

## 2. Brand Personality

### Keywords

`Peaceful` · `Heritage` · `Hospitality` · `Spiritual` · `Clean` ·
`Trustworthy`

### Visual concept

Use subtle references to Indian/Jain architectural forms without turning
the interface into a decorative temple poster.

------------------------------------------------------------------------

## 3. Color System

### Primary

-   Deep Brown: `#3A2418`
-   Warm Brown: `#6B4630`
-   Sandstone: `#B98A5B`
-   Soft Gold: `#C7A15A`

### Backgrounds

-   Ivory: `#FAF7F0`
-   Warm White: `#FFFDF9`
-   Light Sand: `#F1E8DA`

### Text

-   Primary: `#241A15`
-   Secondary: `#6E6259`
-   Muted: `#968A80`

### Status

Use semantic colors only for status:

-   Success: green
-   Warning: amber
-   Error: red
-   Information: blue

Do not use red as a dominant brand color.

------------------------------------------------------------------------

## 4. Typography

Recommended pairing:

### Display

**Playfair Display** or another elegant serif.

Use for: - Hero headline - Section headings - Major room titles

### UI/body

**Inter** or **DM Sans**.

Use for: - Navigation - Buttons - Forms - Tables - Body text

### Typography rules

-   Strong hierarchy.
-   Comfortable line height.
-   Avoid all-caps paragraphs.
-   Minimum comfortable mobile body size: approximately 16px.

------------------------------------------------------------------------

## 5. Layout

### Desktop

-   Maximum content width: approximately 1200--1280px.
-   Generous vertical spacing.
-   12-column grid where appropriate.

### Mobile

-   Single-column layout.
-   Sticky booking CTA where useful.
-   Large touch targets.
-   Bottom-sheet style filters/booking controls where appropriate.

------------------------------------------------------------------------

## 6. Navigation

Desktop:

``` text
LOGO

Home
Rooms
Facilities
Bhojanshala
Palitana
Gallery
Contact

[ Book Now ]
```

Mobile:

``` text
LOGO                       ☰
```

Booking CTA should remain visually prominent.

------------------------------------------------------------------------

## 7. Hero

### Composition

Large property image/video with readable overlay or split layout.

Content:

**NIRAV KHIMAT VIHAR**

**A Peaceful Stay for Your Palitana Yatra**

Short supporting copy.

Actions:

`Check Availability`

`Explore Rooms`

Avoid placing important text over visually busy areas.

------------------------------------------------------------------------

## 8. Booking Search Component

Desktop: horizontal booking bar.

Mobile: stacked cards.

Fields:

-   Check-in
-   Check-out
-   Guests
-   Rooms

Primary button:

**Check Availability**

Use native/date-picker friendly controls.

------------------------------------------------------------------------

## 9. Room Cards

Each card contains:

-   Large image
-   Room name
-   Capacity
-   3--5 key amenities
-   Price
-   Price basis, e.g. `/night`
-   Availability status where applicable
-   Book button

Example:

``` text
┌──────────────────────────────┐
│                              │
│        ROOM IMAGE            │
│                              │
├──────────────────────────────┤
│  4 Bed A/C Room              │
│  Up to 4 guests              │
│                              │
│  A/C · Bathroom · Hot Water  │
│                              │
│  ₹____ / night               │
│                              │
│  [ View Details ] [ Book ]   │
└──────────────────────────────┘
```

------------------------------------------------------------------------

## 10. Booking UI

Use a stepper:

`01 Dates → 02 Room → 03 Details → 04 Review → 05 Payment`

Show a persistent booking summary on desktop.

Mobile should show a collapsible summary.

------------------------------------------------------------------------

## 11. Forms

Rules:

-   Clear labels above fields.
-   Required fields marked clearly.
-   Inline validation.
-   Never clear valid fields after an error.
-   Explain why sensitive information is needed.
-   Avoid unnecessarily collecting personal data.

------------------------------------------------------------------------

## 12. Payment Screen

Show:

-   Room
-   Dates
-   Guests
-   Price breakdown
-   Cancellation policy
-   Total
-   Secure payment CTA

Do not ask the customer to enter card data into the website if Razorpay
Checkout handles it.

------------------------------------------------------------------------

## 13. Booking Confirmation

Visual hierarchy:

1.  Success icon
2.  Booking confirmed
3.  Booking ID
4.  Dates
5.  Room
6.  Amount
7.  Actions

Buttons:

`Download Receipt`

`WhatsApp`

`View Booking`

------------------------------------------------------------------------

## 14. Admin UI

Admin should prioritize information density and speed over decorative
design.

### Sidebar

``` text
Dashboard
Bookings
Calendar
Rooms
Pricing
Customers
Payments
Gallery
Content
Reports
Audit Logs
Settings
```

### Dashboard cards

-   Occupancy
-   Today's arrivals
-   Today's departures
-   Available rooms
-   Pending payments
-   Revenue

### Tables

Use: - Search - Filters - Pagination - Status badges - Bulk actions
where safe

------------------------------------------------------------------------

## 15. Availability Calendar

Use a clear room-by-date matrix.

States:

-   Available
-   Reserved
-   Checked in
-   Blocked
-   Maintenance
-   Pending hold

Never rely on color alone; include labels/icons for accessibility.

------------------------------------------------------------------------

## 16. Motion

Use Framer Motion subtly.

Recommended:

-   Hero entrance
-   Section reveal
-   Image hover
-   Card hover
-   Booking step transitions
-   Modal/sheet transitions

Avoid:

-   Constant floating elements
-   Excessive parallax
-   Long loading animations
-   Motion that interferes with forms

Respect `prefers-reduced-motion`.

------------------------------------------------------------------------

## 17. Imagery

Priority order:

1.  Actual Nirav Khimat Vihar property photos
2.  Actual rooms
3.  Actual dining/Bhojanshala
4.  Actual surrounding Palitana locations
5.  Carefully selected supporting photography

Never represent a stock image as an actual room/property.

------------------------------------------------------------------------

## 18. Icons

Use one consistent icon family, e.g. Lucide.

Examples:

-   Bed
-   Users
-   Snowflake
-   Shower
-   Droplets
-   Car
-   Utensils
-   MapPin
-   Phone
-   MessageCircle
-   Calendar
-   CreditCard

------------------------------------------------------------------------

## 19. Accessibility

Target WCAG 2.2 AA practices:

-   Keyboard navigation
-   Visible focus states
-   Sufficient contrast
-   Alt text
-   Semantic HTML
-   Accessible labels
-   Error announcements
-   Reduced-motion support
-   Touch-friendly controls

------------------------------------------------------------------------

## 20. Responsive Breakpoints

Use Tailwind responsive conventions.

Primary design checks:

-   Small mobile
-   Large mobile
-   Tablet
-   Laptop
-   Desktop
-   Large desktop

Do not design desktop first and simply shrink it. Booking must be
designed intentionally for mobile.

------------------------------------------------------------------------

## 21. Empty/Error/Loading States

Design all states before development:

### No availability

> No rooms available for these dates.

Actions: - Change dates - Change guest count - Contact Dharamshala

### Payment failed

> Payment could not be completed.

Actions: - Try again - Choose another payment method - Contact support

### Booking expired

> Your room hold expired. Please search again.

### Network error

> Something went wrong. Your booking status has not been assumed.

Provide a safe retry action.

------------------------------------------------------------------------

## 22. Content Rules

Do not invent:

-   Room counts
-   Prices
-   Reviews
-   Facilities
-   Policies
-   Ratings
-   Contact numbers
-   Meal timings

Use placeholders until management verifies the information.

------------------------------------------------------------------------

## 23. Design Quality Checklist

Before launch:

-   [ ] No placeholder images
-   [ ] No fake reviews
-   [ ] No inconsistent spacing
-   [ ] No horizontal overflow
-   [ ] Mobile booking flow tested
-   [ ] Keyboard navigation tested
-   [ ] Loading states tested
-   [ ] Empty states tested
-   [ ] Payment states tested
-   [ ] Admin dashboard responsive enough for practical use
