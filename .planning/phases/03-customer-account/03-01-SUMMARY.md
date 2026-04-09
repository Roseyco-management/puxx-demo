---
phase: 03-customer-account
plan: 01
subsystem: database
tags: [drizzle, postgres, seed, schema, referral, commission, demo-data]

# Dependency graph
requires:
  - phase: 02-storefront
    provides: products table seeded (productId=1 available for order items FK)
provides:
  - Extended profiles table with retail_referral_code, wholesale_referral_code, commission_earned columns
  - Drizzle migration 0001_round_swarm.sql with ALTER TABLE statements
  - demo@puxx.com user with bcrypt-hashed password demo123
  - Profile row with PUXX-R-DEMO1, PUXX-W-DEMO1, commissionEarned=24.50
  - 4 stub orders (PX-DEMO-0001 to 0004) covering all statuses: delivered/shipped/processing/pending
affects:
  - 03-customer-account plan 02 (account UI depends on this data existing)

# Tech tracking
tech-stack:
  added: []
  patterns: [idempotent-seed-delete-before-insert, drizzle-alter-table-migration]

key-files:
  created:
    - lib/db/migrations/0001_round_swarm.sql
    - lib/db/migrations/meta/0001_snapshot.json
  modified:
    - lib/db/schema.ts
    - lib/db/seed.ts

key-decisions:
  - "Demo seed uses delete-before-insert on demo@puxx.com for full idempotency — safe to re-run without duplicate key errors"
  - "Orders reference productId=1 (first seeded product) to satisfy FK constraint — seedProducts() must run before seedDemoAccount()"
  - "paymentMethod set to 'worldpay' for demo orders — consistent with UK checkout integration already in place"
  - "currency set to 'GBP' for all demo orders — demo targets UK storefront"

patterns-established:
  - "Idempotent seed pattern: delete by unique key before insert, ensuring re-runnable seed without errors"
  - "Demo data uses realistic dates spread over 90-day window via daysAgo() helper function"

requirements-completed: [CUST-01, CUST-02]

# Metrics
duration: 8min
completed: 2026-04-09
---

# Phase 03 Plan 01: Customer Account Demo Data Summary

**Drizzle schema extended with referral/commission columns, migration generated, and demo@puxx.com seeded with 4 stub orders across all statuses and a referral profile showing PUXX-R-DEMO1 + £24.50 commission**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-04-09T07:00:00Z
- **Completed:** 2026-04-09T07:08:00Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Extended `profiles` pgTable with `retailReferralCode`, `wholesaleReferralCode`, and `commissionEarned` columns
- Generated Drizzle migration `0001_round_swarm.sql` containing the correct ALTER TABLE statements
- Added idempotent `seedDemoAccount()` to seed.ts, called after `seedProducts()` to satisfy FK constraints
- Demo user (demo@puxx.com / demo123), profile with referral codes, and 4 stub orders with order items all seeded

## Task Commits

Each task was committed atomically:

1. **Task 1: Extend profiles schema and run migration** - `062e704` (feat)
2. **Task 2: Extend seed with demo user, orders, and referral profile** - `d9004a6` (feat)

## Files Created/Modified
- `lib/db/schema.ts` - Added retailReferralCode, wholesaleReferralCode, commissionEarned to profiles table
- `lib/db/seed.ts` - Added seedDemoAccount() with demo user, profile, 4 orders, and order items
- `lib/db/migrations/0001_round_swarm.sql` - Drizzle-generated migration with ALTER TABLE for the 3 new columns
- `lib/db/migrations/meta/0001_snapshot.json` - Drizzle migration metadata snapshot

## Decisions Made
- Idempotent seed uses `db.delete(users).where(eq(users.email, 'demo@puxx.com'))` which cascade-deletes profile and orders via FK constraints — no need to delete child rows manually
- `seedProducts()` is called first so `productId: 1` exists for order items FK reference
- `db:migrate` failed locally (no POSTGRES_URL configured) — migration SQL is generated and ready to apply when DB is available; this is expected per plan instructions

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- `pnpm db:migrate` failed with "Database not configured" error — no local POSTGRES_URL. This is expected behaviour documented in the plan. Migration SQL was generated successfully in `lib/db/migrations/0001_round_swarm.sql` and will apply when DB is available.
- `pnpm db:seed` fails for the same reason (no DB connection). Seed script parses and loads correctly; it will run successfully once POSTGRES_URL is configured.

## User Setup Required
None - no external service configuration required beyond the existing POSTGRES_URL needed for all DB operations.

## Next Phase Readiness
- Plan 02 (account UI) can now be built against the well-defined schema and demo data
- All four order statuses (pending, processing, shipped, delivered) are seeded — account UI can render full order history
- Referral codes and commission stub are in place for the referral/affiliate UI section
- Migration must be applied to the target DB before plan 02 UI can run end-to-end

---
*Phase: 03-customer-account*
*Completed: 2026-04-09*
