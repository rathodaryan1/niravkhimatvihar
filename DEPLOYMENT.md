# Nirav Khimat Vihar --- Deployment Plan

## Production stack

-   Vercel --- Next.js hosting
-   Supabase --- PostgreSQL, authentication where required, storage
-   Razorpay --- payments
-   Email provider --- transactional email
-   WhatsApp provider --- booking notifications

## Deployment sequence

1.  Create production Supabase project.
2.  Apply migrations.
3.  Configure RLS.
4.  Create storage buckets and policies.
5.  Seed verified room data.
6.  Configure Vercel project.
7.  Add environment variables.
8.  Deploy application.
9.  Configure Razorpay production credentials.
10. Configure Razorpay webhook URL.
11. Test payment verification.
12. Test booking race conditions.
13. Connect production domain.
14. Verify HTTPS.
15. Run full QA checklist.
16. Obtain management approval.
17. Launch.

## Preview vs production

Never use production payment secrets in preview environments.

Use Razorpay test mode during development.

## Post-launch

Monitor: - Error rates - Failed payments - Booking failures - Webhook
failures - Availability inconsistencies - Database usage - Storage usage
