---
phase: 03-customer-account
verified: 2026-04-09T09:00:00Z
retroactive_close: 2026-04-10
status: resolved
score: 7/7 must-haves verified
re_verification: true
close_note: "Phase 3 code was verified clean on 2026-04-09 (status: human_needed, all runtime checks pending). Phase 7's 07-03 plan (commit cd3ab5b) migrated the account DASHBOARD page off Drizzle, but Codex review caught that the nested orders list, order detail, shared layout, and affiliate page were still on Drizzle. Those were migrated in the 07-05 gap-closure bundle across commits c18c5d7 (orders list and detail) and a subsequent commit (layout and affiliate). The legacy non-region-scoped app/(account) route group was deleted as dead code. Every route under app/[region]/account now runs on Supabase REST. The UI contract (components, props) is unchanged, so the 2026-04-09 component-level verification still holds. Runtime verification of CUST-01 remains on the human check list but is no longer a code gap."
human_verification:
  - test: "Log in as demo@puxx.com (password: demo123) and navigate to /uk/account/"
    expected: "Dashboard loads with greeting, recent orders mini-list showing 3 of 4 stub orders, and ReferralCard displaying PUXX-R-DEMO1 / PUXX-W-DEMO1 / £24.50"
    why_human: "Requires live DB with migration applied and seed run — cannot verify rendered output statically"
  - test: "Navigate to /uk/account/orders/ as demo@puxx.com"
    expected: "OrdersDataTable shows 4 rows — PX-DEMO-0004 (pending), PX-DEMO-0003 (processing), PX-DEMO-0002 (shipped), PX-DEMO-0001 (delivered) — each with a coloured status badge and £ currency symbol in the total column"
    why_human: "DB required; status badge colours (success/destructive/default variants) need visual confirmation"
  - test: "Click 'View' on any order row in the table"
    expected: "Navigates to /uk/account/orders/{id} showing full order detail with order items, shipping address, payment info, and region currency (£)"
    why_human: "Link path uses ordersBasePath prop (/{region}/account/orders) — confirm routing resolves correctly at runtime"
  - test: "Visit /uk/account/ in a private/logged-out browser session"
    expected: "Redirected immediately to /uk/sign-in — no account content visible"
    why_human: "Auth redirect from server component getUser() — needs live session cookie behaviour to confirm"
---

# Phase 03: Customer Account Verification Report

**Phase Goal:** A logged-in customer can see their order history and referral codes
**Verified:** 2026-04-09 (initial), re-verified 2026-04-10 (retroactive close after phase 7 completion)
**Status:** resolved — all 7 must-haves code-verified, same UI contract now backed by Supabase REST across all three routes
**Re-verification:** Yes — phase 7 reshaped the backend but the UI contract (components, props, routes) is unchanged. Account dashboard, orders list, and order detail all migrated off Drizzle. Runtime confirmation remains on the human-verification list below but is no longer a code gap.

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | demo@puxx.com user seeded with bcrypt-hashed password demo123 | VERIFIED | `lib/db/seed.ts` line 77: email `demo@puxx.com`, uses `hashPassword('demo123')` |
| 2 | Profile row has PUXX-R-DEMO1, PUXX-W-DEMO1, commissionEarned=24.50 | VERIFIED | seed.ts lines 86-88: all three values present |
| 3 | Four stub orders exist with statuses pending/processing/shipped/delivered | VERIFIED | seed.ts lines 98-122: PX-DEMO-0001 to 0004 with correct statuses |
| 4 | Drizzle migration generated with retail_referral_code, wholesale_referral_code, commission_earned | VERIFIED | `lib/db/migrations/0001_round_swarm.sql` lines 30-32: all three ALTER TABLE statements present |
| 5 | Visiting /uk/account/ while logged in shows dashboard with ReferralCard | VERIFIED (code) | `app/[region]/account/page.tsx` imports and renders `<ReferralCard>` with profile props and currencySymbol from getRegionConfig |
| 6 | Visiting /uk/account/orders/ shows OrdersDataTable with 4 rows and £ currency | VERIFIED (code) | `app/[region]/account/orders/page.tsx` passes `currencySymbol={config.currencySymbol}` and `ordersBasePath={/${region}/account/orders}` to OrdersDataTable |
| 7 | Visiting /uk/account/ unauthenticated redirects to /uk/sign-in | VERIFIED | `app/[region]/account/layout.tsx` line 23-25: `if (!user) { redirect(/${region}/sign-in) }` |

**Score:** 7/7 truths verified (code-level — live DB required for runtime confirmation)

---

## Required Artifacts

### Plan 03-01 (Schema + Seed)

| Artifact | Provides | Status | Details |
|----------|----------|--------|---------|
| `lib/db/schema.ts` | Extended profiles table with referral + commission columns | VERIFIED | Lines 135-137: `retailReferralCode`, `wholesaleReferralCode`, `commissionEarned` all present with correct types |
| `lib/db/seed.ts` | Demo user, 4 stub orders, profile seeded idempotently | VERIFIED | `seedDemoAccount()` function at line 68; called from `seed()` at line 196; delete-before-insert idempotency at line 72 |
| `lib/db/migrations/0001_round_swarm.sql` | Migration with ALTER TABLE for 3 new columns | VERIFIED | Lines 30-32 contain all three ALTER TABLE statements |

### Plan 03-02 (Account UI)

| Artifact | Provides | Status | Details |
|----------|----------|--------|---------|
| `app/[region]/account/layout.tsx` | Auth-gated account shell | VERIFIED | getUser() called; redirect to /{region}/sign-in if null; profile queried via Drizzle; AccountNav rendered |
| `app/[region]/account/page.tsx` | Account dashboard with ReferralCard | VERIFIED | Queries profile, recent orders; renders ReferralCard with all 4 required props |
| `app/[region]/account/orders/page.tsx` | Order history wired to OrdersDataTable | VERIFIED | Queries orders + itemCount; passes currencySymbol and ordersBasePath props |
| `app/[region]/account/orders/[id]/page.tsx` | Order detail with region currency | VERIFIED | Awaits both region + id params; uses getRegionConfig for currencySymbol throughout |
| `components/account/ReferralCard.tsx` | Referral codes and commission display | VERIFIED | Renders retailCode, wholesaleCode in monospace; commissionEarned as {currencySymbol}{value} in green bold; null fallback "Not assigned" |
| `components/account/tables/OrdersDataTable.tsx` | Orders table with currency + path props | VERIFIED | currencySymbol and ordersBasePath props at line 48; both used in column definitions; both in useMemo deps array at line 152 |

---

## Key Link Verification

### Plan 03-01 Links

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `lib/db/schema.ts` profiles table | Drizzle migration | ALTER TABLE SQL | WIRED | Migration file contains all 3 ALTER TABLE statements for the 3 new columns |
| `lib/db/seed.ts` demo user insert | orders insert with userId | `userId: demoUser.id` | WIRED | seed.ts inserts user, then inserts orders referencing demoUser.id (cascade-safe) |

### Plan 03-02 Links

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `app/[region]/account/layout.tsx` | getUser() from lib/db/queries | redirect to sign-in if null | WIRED | Lines 1, 20-24: imported and called with redirect guard |
| `app/[region]/account/page.tsx` | `components/account/ReferralCard.tsx` | profile.retailReferralCode prop | WIRED | Lines 12, 141-146: imported and rendered with profile data |
| `app/[region]/account/orders/page.tsx` | `components/account/tables/OrdersDataTable` | ordersWithItems + currencySymbol props | WIRED | Lines 11, 82-87: imported and rendered with all required props |

---

## Requirements Coverage

| Requirement | Description | Source Plans | Status | Evidence |
|-------------|-------------|--------------|--------|----------|
| CUST-01 | Customer account page shows order history and current order status | 03-01, 03-02 | SATISFIED | Orders queried from DB per user; OrdersDataTable renders status badge per row; order detail page shows status with timeline |
| CUST-02 | Customer account page shows two referral codes (retail + wholesale) and commission earned | 03-01, 03-02 | SATISFIED | Schema columns added; seed populates PUXX-R-DEMO1 / PUXX-W-DEMO1 / £24.50; ReferralCard renders all three from profile |

Both CUST-01 and CUST-02 are marked Complete in REQUIREMENTS.md traceability table — consistent with findings.

---

## Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `components/account/tables/OrdersDataTable.tsx` | 185 | `placeholder="Search orders..."` | Info | HTML input placeholder attribute — not a code stub. No issue. |
| `components/account/tables/OrdersDataTable.tsx` | 302 | `return null` | Info | Inside pagination page button loop — correctly skips rendering dots for non-boundary pages. Not a stub. |

No blockers or warnings found. Both flagged patterns are correct code behaviour.

---

## Human Verification Required

### 1. Account dashboard renders correctly

**Test:** Log in as demo@puxx.com / demo123 and navigate to /uk/account/
**Expected:** Greeting with user name, recent orders mini-list (3 rows with order number, status badge, £ total), ReferralCard showing PUXX-R-DEMO1 / PUXX-W-DEMO1 / £24.50 commission in green
**Why human:** DB connection with migration applied and seed run required — cannot verify rendered output statically

### 2. Order history table shows all 4 orders with correct status colours

**Test:** Navigate to /uk/account/orders/ as demo@puxx.com
**Expected:** 4 rows in OrdersDataTable — pending (default badge), processing (default badge), shipped (default badge), delivered (success/green badge) — all with £ currency symbol in total column
**Why human:** Status badge colour variants require visual confirmation; DB required for row data

### 3. Order detail page resolves correctly

**Test:** Click 'View' on any row in the orders table
**Expected:** Navigates to /uk/account/orders/{id} with full order detail — items list, shipping address card, payment info card, all using £ currency
**Why human:** ordersBasePath prop wiring needs runtime verification that the link href resolves to the correct [region]/account/orders/[id] route

### 4. Auth redirect blocks unauthenticated access

**Test:** Open a private browser window (no session cookie) and visit /uk/account/
**Expected:** Immediate redirect to /uk/sign-in — no account page content visible, no flash of authenticated content
**Why human:** Server-side redirect from getUser() requires live session cookie evaluation to confirm timing and correctness

---

## Gaps Summary

No gaps. All seven must-haves verified at code level. The four human verification items are standard runtime checks that require a live database connection — they cannot be resolved programmatically because the migration has not been applied to a local DB (documented in both SUMMARY files as expected behaviour given no local POSTGRES_URL).

---

_Verified: 2026-04-09_
_Verifier: Claude (gsd-verifier)_
