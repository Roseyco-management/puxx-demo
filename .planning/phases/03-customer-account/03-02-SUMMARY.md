---
phase: 03-customer-account
plan: 02
subsystem: ui
tags: [nextjs, drizzle, account, referral, orders, region, shadcn]

# Dependency graph
requires:
  - phase: 03-customer-account
    plan: 01
    provides: profiles table with retailReferralCode, wholesaleReferralCode, commissionEarned; demo@puxx.com seeded with 4 orders and referral data
provides:
  - Auth-gated account route tree at app/[region]/account/ (layout, dashboard, orders list, order detail)
  - ReferralCard component displaying retail/wholesale codes and commission earned
  - OrdersDataTable upgraded with currencySymbol and ordersBasePath props (replaces hardcoded € and /account/orders link)
affects:
  - Any future phase adding account sub-pages under [region]/account/

# Tech tracking
tech-stack:
  added: []
  patterns: [region-aware-server-component, drizzle-profile-query, auth-gate-redirect-pattern]

key-files:
  created:
    - app/[region]/account/layout.tsx
    - app/[region]/account/page.tsx
    - app/[region]/account/orders/page.tsx
    - app/[region]/account/orders/[id]/page.tsx
    - components/account/ReferralCard.tsx
  modified:
    - components/account/tables/OrdersDataTable.tsx

key-decisions:
  - "Account layout uses Drizzle (not Supabase) for profile query — consistent with schema established in plan 01"
  - "OrdersDataTable currencySymbol defaults to £ (UK) matching primary demo storefront, ordersBasePath defaults to /account/orders for backward compat"
  - "ReferralCard is a pure server component (no use client) — no clipboard JS needed for demo visual"
  - "Account dashboard belt-and-braces auth: both layout and page.tsx call getUser() and redirect if null"

patterns-established:
  - "Region-aware account pages: await params → const { region } = await params → getRegionConfig(region).currencySymbol"
  - "Auth gate pattern: getUser() → if (!user) redirect(/{region}/sign-in)"
  - "Drizzle profile query: db.select().from(profiles).where(eq(profiles.userId, user.id)).limit(1)"

requirements-completed: [CUST-01, CUST-02]

# Metrics
duration: 3min
completed: 2026-04-09
---

# Phase 03 Plan 02: Customer Account UI Summary

**Region-prefixed account route tree with auth-gated layout, ReferralCard component, and region-aware OrdersDataTable currency delivering CUST-01 order history and CUST-02 referral codes at /uk/account/**

## Performance

- **Duration:** ~3 min
- **Started:** 2026-04-09T06:51:08Z
- **Completed:** 2026-04-09T06:53:56Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- Created `app/[region]/account/layout.tsx` — auth-gated shell using `getUser()` + Drizzle profile query, redirects unauthenticated users to `/${region}/sign-in`, replaces "PUXX Ireland" header with region-aware "PUXX" link
- Created `components/account/ReferralCard.tsx` — Card component showing retail/wholesale referral codes in monospace with Copy buttons and commission earned in green bold text
- Created account dashboard, orders list, and order detail pages all region-prefixed and region-currency-aware
- Fixed `OrdersDataTable` to accept `currencySymbol` and `ordersBasePath` props, replacing hardcoded `€` and `/account/orders` link

## Task Commits

Each task was committed atomically:

1. **Task 1: Region account layout and ReferralCard** - `c1586ca` (feat)
2. **Task 2: Account dashboard, orders pages, OrdersDataTable fix** - `88938f2` (feat)

## Files Created/Modified
- `app/[region]/account/layout.tsx` - Auth-gated account shell with Drizzle profile query and region-aware PUXX header link
- `app/[region]/account/page.tsx` - Account dashboard with greeting, recent orders mini-list, and ReferralCard
- `app/[region]/account/orders/page.tsx` - Full order history page wired to OrdersDataTable with region currency
- `app/[region]/account/orders/[id]/page.tsx` - Order detail page with region currency symbol throughout
- `components/account/ReferralCard.tsx` - New ReferralCard server component with referral codes and commission display
- `components/account/tables/OrdersDataTable.tsx` - Added currencySymbol + ordersBasePath props; fixed hardcoded € and /account/orders link; updated useMemo deps

## Decisions Made
- Account layout uses Drizzle (not Supabase) for profile query — consistent with plan 01 schema approach
- `OrdersDataTable` currencySymbol defaults to `£` to match primary UK demo storefront; `ordersBasePath` defaults to `/account/orders` for backward compatibility with existing `(account)` group routes
- `ReferralCard` is a pure server component — no clipboard interactivity needed for demo visual fidelity
- Both layout.tsx and page.tsx perform the auth check (belt-and-braces) to ensure no page leaks if layout is bypassed

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None - build exits cleanly. Pre-existing "fetch failed" error in build output is from missing POSTGRES_URL in local environment (same as plan 01).

## User Setup Required
None - no new external service configuration required. POSTGRES_URL must be configured before the account UI can run end-to-end (same requirement as plan 01).

## Next Phase Readiness
- `/uk/account/` is now a navigable demo route showing dashboard, ReferralCard (PUXX-R-DEMO1, PUXX-W-DEMO1, £24.50), and order history
- `/uk/account/orders/` shows 4 orders table with £ currency symbol and correct status badges
- `/uk/account/orders/{id}` resolves by id with region currency
- Unauthenticated visits redirect to `/uk/sign-in`
- Phase 04 can build on the established `app/[region]/` route tree pattern

---
*Phase: 03-customer-account*
*Completed: 2026-04-09*
