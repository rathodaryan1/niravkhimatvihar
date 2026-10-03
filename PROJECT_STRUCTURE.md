# Nirav Khimat Vihar --- Project Structure

Recommended stack: Next.js App Router + TypeScript + Tailwind +
shadcn/ui + Supabase.

``` text
nirav-khimat-vihar/
├── app/
│   ├── (site)/
│   │   ├── page.tsx
│   │   ├── rooms/
│   │   ├── facilities/
│   │   ├── bhojanshala/
│   │   ├── palitana/
│   │   ├── gallery/
│   │   ├── contact/
│   │   ├── booking/
│   │   └── my-booking/
│   ├── admin/
│   │   ├── dashboard/
│   │   ├── bookings/
│   │   ├── calendar/
│   │   ├── rooms/
│   │   ├── pricing/
│   │   ├── customers/
│   │   ├── payments/
│   │   ├── content/
│   │   ├── reports/
│   │   └── settings/
│   ├── api/
│   │   ├── availability/
│   │   ├── bookings/
│   │   ├── payments/
│   │   ├── webhooks/
│   │   └── admin/
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   ├── booking/
│   ├── rooms/
│   ├── marketing/
│   └── admin/
├── lib/
│   ├── supabase/
│   ├── razorpay/
│   ├── booking/
│   ├── pricing/
│   ├── notifications/
│   ├── validation/
│   └── auth/
├── supabase/
│   ├── migrations/
│   ├── seed/
│   └── functions/
├── public/
│   ├── images/
│   └── icons/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env.example
├── SECURITY.md
├── README.md
└── package.json
```

Keep business logic in server-side/lib modules rather than duplicating
it in UI components.
