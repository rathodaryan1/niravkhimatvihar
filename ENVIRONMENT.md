# Nirav Khimat Vihar --- Environment Configuration

Never commit real secrets.

## Public/browser-safe

``` env
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_RAZORPAY_KEY_ID=
```

## Server-only

``` env
SUPABASE_SERVICE_ROLE_KEY=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
EMAIL_API_KEY=
WHATSAPP_API_KEY=
WHATSAPP_PHONE_NUMBER_ID=
```

## Optional

``` env
SMS_PROVIDER_API_KEY=
SMS_PROVIDER_SENDER_ID=
SENTRY_DSN=
```

## Rules

-   Use separate development and production secrets.
-   Never put server secrets in `NEXT_PUBLIC_*`.
-   Never commit `.env`, `.env.local`, production credentials or
    provider secrets.
-   Use Vercel Environment Variables in production.
-   Rotate credentials if accidentally exposed.
