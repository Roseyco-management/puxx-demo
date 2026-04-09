---
phase: 07-demo-bugfix
plan: "03"
subsystem: ui
tags: [customer-account, supabase, drizzle-migration, logo, preload]

requires:
  - phase: 07-demo-bugfix
    plan: "01"
    provides: [getSupabaseClient-rest pattern for Vercel-compatible data access]
  - phase: 07-demo-bugfix
    plan: "02"
    provides: [storefront and portal routes migrated to Supabase REST]

provides:
  - customer account page loads without 500 (Drizzle replaced with Supabase REST)
  - order history and referral codes render for demo user
  - logo verified correct (PUXX-LOGO-LONG-BLACK.png) in Header

affects: [customer-account, account-orders]

tech-stack:
  added: []
  patterns: [getSupabaseClient-rest for server component page data fetching, snake_case field mapping from Supabase REST response]

key-files:
  created: []
  modified:
    - app/[region]/account/page.tsx

key-decisions:
  - "Account page now uses getSupabaseClient() REST for profile and orders — same pattern as admin API routes (07-01)"
  - "ReferralCard props mapped from snake_case Supabase response: retail_referral_code, wholesale_referral_code, commission_earned"
  - "Logo path verified correct in Logo.tsx (variant=black -> PUXX-LOGO-LONG-BLACK.png) — no fix needed"
  - "No manual <link rel=preload> tags exist in any layout — preload warnings are Next.js font optimization internals, non-actionable"

patterns-established:
  - "Server component pages with user-scoped data: getUser() for auth, getSupabaseClient() for data queries"
  - "Supabase REST field names are snake_case — always map from REST response to snake_case in templates"

requirements-completed: [CUST-01, MOB-01]

duration: 4min
completed: "2026-04-09"
---

# Phase 7 Plan 03: Account Page Bugfix Summary

**Customer account page migrated from broken Drizzle db export to Supabase REST, fixing the 500 crash; logo and preload links verified clean with no fixes required.**

## Performance

- **Duration:** ~4 min
- **Started:** 2026-04-09T22:46:00Z
- **Completed:** 2026-04-09T22:50:00Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments

- Account page no longer crashes with 500 on Vercel — Drizzle db import replaced with getSupabaseClient() REST throughout
- Order history query (count + recent 3) and profile query all use Supabase REST with snake_case field names
- ReferralCard receives correct snake_case props from Supabase REST response
- Logo verified: Header passes `variant="black"` to Logo component which resolves to `/images/logo/PUXX-LOGO-LONG-BLACK.png` — file confirmed present in public/
- No manual preload links found in any layout file — preload warnings are Next.js font optimization internals (non-actionable)

## Task Commits

1. **Task 1: Fix customer account page (Drizzle to Supabase REST)** - `cd3ab5b` (fix)
2. **Task 2: Logo verification + preload cleanup** - verification only, no code changes required

**Plan metadata:** (docs commit follows)

## Files Created/Modified

- `app/[region]/account/page.tsx` - Removed `db`, `orders`, `profiles`, `eq`, `desc` imports; added `getSupabaseClient`; replaced all three Drizzle queries with REST equivalents; updated template and ReferralCard prop refs from camelCase to snake_case

## Decisions Made

- Account page uses `getSupabaseClient()` REST for profile and orders — consistent with the pattern established in 07-01 for admin routes and 07-02 for portal routes
- Supabase REST responses use snake_case column names — `order_number`, `retail_referral_code`, `wholesale_referral_code`, `commission_earned` match the Supabase DB schema
- Logo component already correct — `variant="black"` maps to `PUXX-LOGO-LONG-BLACK.png`, file exists in `public/images/logo/`
- Preload warnings are from Next.js `next/font/google` optimization (Montserrat + Inter) — these are internal Next.js-generated link tags, not manually added, and cannot be fixed in application code

## Deviations from Plan

None - plan executed exactly as written. Task 2 was verification-only; all checks passed without requiring code changes.

## Issues Encountered

None. Build succeeded with zero TypeScript errors. The `fetch failed` warning during static page generation is the pre-existing SSG issue documented in 07-02-SUMMARY.md — not related to these changes.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All Phase 7 demo bugfix plans complete (07-01, 07-02, 07-03)
- Full demo critical path is ready for review:
  - /uk/products — 12 flavor cards with images (07-02)
  - /admin/* — all admin pages functional (07-01)
  - /portal/orders — retailer orders load (07-02)
  - /uk/account — order history + referral codes (07-03)
  - /manifest.json — no longer redirected to /uk (07-01)
- No blockers for demo review session

---
*Phase: 07-demo-bugfix*
*Completed: 2026-04-09*
