# Nirav Khimat Vihar --- Security Specification

**Version:** 1.0\
**Scope:** Public website, booking engine, Admin Panel, database,
payments, notifications and deployment.

------------------------------------------------------------------------

## 1. Security Objectives

The platform must protect:

-   Customer personal information
-   Booking information
-   Payment information
-   Admin accounts
-   Room inventory
-   Pricing
-   Operational settings
-   Uploaded documents, if enabled

Primary security goals:

1.  Prevent unauthorized admin access.
2.  Prevent booking manipulation.
3.  Prevent double booking.
4.  Never trust client-side payment success.
5.  Minimize stored personal data.
6.  Keep secrets out of frontend code.
7.  Maintain an audit trail for sensitive admin actions.

------------------------------------------------------------------------

## 2. Threat Model

Consider at minimum:

-   Credential stuffing
-   Brute-force admin login
-   Session theft
-   Broken access control
-   IDOR / insecure direct object references
-   SQL injection
-   XSS
-   CSRF
-   Malicious file uploads
-   API abuse
-   Bot booking
-   Payment tampering
-   Razorpay webhook spoofing
-   Replay attacks
-   Double booking/race conditions
-   Excessive personal-data exposure
-   Secret leakage
-   Admin privilege escalation

------------------------------------------------------------------------

## 3. Authentication

### Admin

Use secure authentication with:

-   Strong password requirements
-   Email verification where supported
-   MFA for administrators where practical
-   Secure session management
-   Rate limiting
-   Account lockout or progressive delays for repeated failures

Never build a custom password-hashing system.

### Customer

MVP can use booking lookup with:

-   Booking ID
-   Verified mobile/email

If OTP is added:

-   Use a reputable OTP provider.
-   Rate-limit OTP requests.
-   Set short expiry.
-   Limit verification attempts.
-   Never log OTP values.

------------------------------------------------------------------------

## 4. Authorization

Every protected backend operation must check authorization server-side.

Do not rely on:

-   Hidden buttons
-   Frontend route guards alone
-   Client-supplied role values
-   Local storage permissions

Admin roles should be explicit.

Suggested roles:

-   `SUPER_ADMIN`
-   `MANAGER`
-   `STAFF`
-   `VIEWER`

Use least privilege.

------------------------------------------------------------------------

## 5. Database Security

Use Supabase Row Level Security (RLS) where appropriate.

Rules:

-   Public users must not have unrestricted database access.
-   Customers should only retrieve their own booking information through
    a controlled server-side flow.
-   Admin data must never be exposed through public queries.
-   Service-role credentials must never be shipped to the browser.
-   Sensitive tables should have explicit policies.

Never expose the Supabase service-role key in client-side JavaScript.

------------------------------------------------------------------------

## 6. Booking Security

### Server-side availability

Availability must be calculated on the server.

Never trust:

``` text
available=true
room_id=123
price=500
```

sent by the browser.

The server must independently calculate:

-   Room availability
-   Price
-   Guest capacity
-   Taxes
-   Service charges
-   Booking status

### Double-booking prevention

Use database transactions/constraints and a safe reservation strategy.

For a physical room, overlapping confirmed reservations must not be
possible.

### Temporary holds

Use:

-   Hold ID
-   Created timestamp
-   Expiry timestamp
-   Booking/session reference

Expired holds must be released automatically or ignored by availability
queries.

------------------------------------------------------------------------

## 7. Payment Security

Use Razorpay Checkout/official server-side integration.

Rules:

-   Never store card numbers or CVV.
-   Never trust client-side `payment_success`.
-   Verify payment signatures server-side.
-   Validate payment amount and currency server-side.
-   Verify the Razorpay order belongs to the intended booking.
-   Process webhooks securely.
-   Make webhook processing idempotent.
-   Store provider transaction/reference IDs, not sensitive card data.

### Payment state

A booking should become `CONFIRMED` only after the server has sufficient
verified evidence of successful payment or an explicitly supported
offline-payment workflow.

------------------------------------------------------------------------

## 8. Webhook Security

For payment webhooks:

-   Verify the provider signature.
-   Reject invalid signatures.
-   Make processing idempotent.
-   Record webhook event IDs.
-   Ignore already-processed events.
-   Do not trust arbitrary booking IDs from an unsigned request.

------------------------------------------------------------------------

## 9. API Security

Every API route must have:

-   Input validation
-   Authentication where required
-   Authorization
-   Rate limiting where appropriate
-   Safe error responses
-   Request-size limits
-   Logging without sensitive data

Use schema validation, e.g. Zod.

Never directly trust request bodies.

------------------------------------------------------------------------

## 10. Input Validation

Validate:

-   Dates
-   Guest counts
-   Room IDs
-   Booking IDs
-   Names
-   Email addresses
-   Phone numbers
-   Prices
-   IDs
-   File types
-   File sizes

Dates must be validated server-side.

Reject impossible ranges such as:

-   Check-out before check-in
-   Excessive guest count
-   Negative room count
-   Invalid room IDs

------------------------------------------------------------------------

## 11. XSS Protection

-   React/Next.js escaping should remain enabled.
-   Avoid `dangerouslySetInnerHTML`.
-   Sanitize rich text if admin content requires HTML.
-   Sanitize user-generated review/content fields.
-   Apply a strong Content Security Policy where practical.

------------------------------------------------------------------------

## 12. SQL Injection

Use parameterized queries/ORM/database APIs.

Never build SQL by string concatenation from user input.

------------------------------------------------------------------------

## 13. CSRF

For state-changing requests, use appropriate framework protections and
same-site cookie settings.

Do not build state-changing actions as GET requests.

Example:

Bad:

`GET /api/cancel-booking?id=123`

Preferred:

`POST /api/bookings/123/cancel`

with server-side authorization and validation.

------------------------------------------------------------------------

## 14. File Upload Security

If customer ID upload or admin image upload is enabled:

-   Allow only required file types.
-   Validate MIME type and file signature where practical.
-   Set file-size limits.
-   Generate safe storage names.
-   Never execute uploaded files.
-   Store private documents in private buckets.
-   Use short-lived signed URLs for private documents.
-   Strip unnecessary metadata where appropriate.

------------------------------------------------------------------------

## 15. Personal Data

Collect only what the booking process actually needs.

Potential customer data:

-   Name
-   Mobile
-   Email
-   Address
-   Guest count
-   Booking history
-   Payment reference

If ID documents are required, define:

-   Why they are collected
-   Who can access them
-   How long they are retained
-   How they are deleted

Do not collect sensitive information just because it might be useful
later.

------------------------------------------------------------------------

## 16. Secrets Management

Secrets must live in server-side environment variables.

Examples:

``` text
SUPABASE_SERVICE_ROLE_KEY
RAZORPAY_KEY_SECRET
RAZORPAY_WEBHOOK_SECRET
EMAIL_API_KEY
WHATSAPP_API_KEY
```

Never commit:

-   `.env`
-   `.env.local`
-   API keys
-   database passwords
-   private keys
-   webhook secrets

Maintain a safe `.env.example` containing variable names only.

------------------------------------------------------------------------

## 17. Frontend Environment Variables

Only variables explicitly intended for public use may use the
framework's public prefix.

Never expose:

-   Service-role keys
-   Payment secrets
-   Webhook secrets
-   Admin credentials
-   Database passwords

------------------------------------------------------------------------

## 18. Admin Security

Admin panel should include:

-   Protected routes
-   Server-side role checks
-   Secure sessions
-   Rate limiting
-   MFA where practical
-   Audit logs
-   Automatic session expiry
-   Logout/revocation
-   Re-authentication for highly sensitive operations

Sensitive actions can require confirmation:

-   Delete room
-   Cancel/refund booking
-   Change payment status
-   Change admin role
-   Export customer data

------------------------------------------------------------------------

## 19. Audit Logging

Record important actions:

-   Admin login
-   Failed admin login
-   Booking creation
-   Booking cancellation
-   Manual booking changes
-   Room blocking
-   Price changes
-   Refund actions
-   Role changes
-   Data exports

Do not put passwords, OTPs, card data or secrets in logs.

Example:

``` text
ADMIN_ACTION
admin_id: ...
action: BLOCK_ROOM
room_id: ...
start: ...
end: ...
timestamp: ...
ip_hash/reference: ...
```

------------------------------------------------------------------------

## 20. Rate Limiting

Apply rate limits to:

-   Admin login
-   OTP requests
-   Booking lookup
-   Availability search where abuse is detected
-   Contact forms
-   Payment creation
-   Public APIs

Use stricter limits for authentication and OTP endpoints.

------------------------------------------------------------------------

## 21. Bot Protection

Consider CAPTCHA/Turnstile or equivalent if automated abuse appears.

Especially protect:

-   Login
-   OTP
-   Contact forms
-   High-volume availability queries
-   Booking creation

Do not make CAPTCHA mandatory everywhere if it harms legitimate users
unnecessarily.

------------------------------------------------------------------------

## 22. Security Headers

Configure appropriate headers, including:

-   Content-Security-Policy
-   Strict-Transport-Security
-   X-Content-Type-Options
-   Referrer-Policy
-   Permissions-Policy
-   Frame protections where compatible

Avoid unsafe CSP exceptions unless genuinely required.

------------------------------------------------------------------------

## 23. Transport Security

Production must use HTTPS.

-   Redirect HTTP to HTTPS.
-   Use secure cookies.
-   Use `HttpOnly` for sensitive session cookies.
-   Use `SameSite=Lax` or stricter where compatible.
-   Never send authentication tokens in URLs.

------------------------------------------------------------------------

## 24. Error Handling

Production errors must not expose:

-   Stack traces
-   SQL errors
-   Environment variables
-   Internal database structure
-   Secrets
-   Provider credentials

Use user-friendly messages and log technical details securely on the
server.

------------------------------------------------------------------------

## 25. Backup & Recovery

For production:

-   Enable appropriate database backups.
-   Define retention.
-   Test restoration.
-   Protect backup exports.
-   Log restore operations.
-   Never expose raw database backups publicly.

------------------------------------------------------------------------

## 26. Dependency Security

Before production:

-   Keep Next.js and dependencies patched.
-   Run `npm audit`/equivalent where appropriate.
-   Review high-severity vulnerabilities.
-   Avoid abandoned packages.
-   Pin/lock dependency versions.
-   Review third-party scripts.

------------------------------------------------------------------------

## 27. Deployment Security

### Vercel

-   Production secrets only in Vercel environment variables.
-   Separate preview and production secrets.
-   Restrict production deployments where possible.
-   Review deployment logs for secret leakage.

### Supabase

-   Enable RLS for exposed tables.
-   Keep service-role key server-side.
-   Review policies before launch.
-   Use separate environments for development and production where
    practical.

------------------------------------------------------------------------

## 28. Security Testing Checklist

### Authentication

-   [ ] Wrong password rejected
-   [ ] Brute force rate limited
-   [ ] Session expires appropriately
-   [ ] Logout invalidates session
-   [ ] Admin routes protected

### Authorization

-   [ ] Normal customer cannot access admin
-   [ ] Staff cannot perform unauthorized manager actions
-   [ ] Customers cannot access another customer's booking

### Booking

-   [ ] Cannot book unavailable room
-   [ ] Cannot overlap confirmed bookings
-   [ ] Expired hold releases room
-   [ ] Price cannot be modified from browser
-   [ ] Guest capacity enforced server-side

### Payment

-   [ ] Invalid payment signature rejected
-   [ ] Wrong amount rejected
-   [ ] Wrong currency rejected
-   [ ] Duplicate webhook is harmless
-   [ ] Failed payment does not confirm booking

### API

-   [ ] Validation on every public input
-   [ ] Rate limiting
-   [ ] Safe errors
-   [ ] No secret leakage

### Files

-   [ ] Invalid file type rejected
-   [ ] Oversized file rejected
-   [ ] Private documents not publicly accessible

------------------------------------------------------------------------

## 29. Privacy & Data Retention

Define a retention policy before launch.

Suggested principle:

-   Keep active booking records for operational/legal needs.
-   Keep payment references as required for accounting.
-   Delete unnecessary documents when their purpose is complete.
-   Allow management to configure retention where legally appropriate.

The production privacy policy should be reviewed for applicable Indian
privacy/data-protection requirements before launch.

------------------------------------------------------------------------

## 30. Incident Response

If a security incident occurs:

1.  Identify affected system/data.
2.  Revoke compromised credentials.
3.  Rotate secrets.
4.  Disable affected endpoints if necessary.
5.  Preserve relevant logs.
6.  Assess affected customers.
7.  Restore from a trusted state.
8.  Patch the root cause.
9.  Document the incident.
10. Complete any legally required notifications.

------------------------------------------------------------------------

## 31. Production Security Gate

Do not launch online booking until:

-   [ ] HTTPS enabled
-   [ ] Admin authentication secured
-   [ ] RLS policies reviewed
-   [ ] Service-role key server-only
-   [ ] Payment signature verification tested
-   [ ] Webhook verification tested
-   [ ] Double-booking race condition tested
-   [ ] Rate limits enabled
-   [ ] Security headers configured
-   [ ] Error messages reviewed
-   [ ] Secrets removed from Git history
-   [ ] Backup/recovery tested
-   [ ] Dependency vulnerabilities reviewed
-   [ ] Privacy/terms/cancellation pages approved
-   [ ] Real room inventory and policies verified by management
