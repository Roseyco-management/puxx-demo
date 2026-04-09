# Phase 7 — Demo Bug Tracker

Recorded 2026-04-09. All issues observed on https://puxx-demo.vercel.app.

---

## Root Cause 1: Database Connection (Drizzle broken on Vercel)

Direct Supabase DB (port 5432) → `ENOTFOUND` from Vercel functions.
Supabase pooler (port 6543) → "Tenant or user not found" (password/format issue).
Supabase REST API via anon key → **works** (RLS disabled on all tables).

**Fix:** Migrate all `getDb()` (Drizzle) calls to `getSupabaseClient()` from `lib/db/supabase.ts`.

### Routes using getDb() — ALL RETURN 500 on Vercel

| File | Method | What it does |
|------|--------|-------------|
| `app/api/admin/products/route.ts` | GET | List all products |
| `app/api/admin/orders/route.ts` | GET | List all orders |
| `app/api/admin/customers/route.ts` | GET | List all users with profiles |
| `app/api/admin/customers/[id]/route.ts` | GET | Single customer detail |
| `app/api/admin/marketing/subscribers/route.ts` | GET/POST/DELETE | Subscriber management |
| `app/api/fulfilment/orders/[id]/route.ts` | PATCH | Update order status |
| `app/api/stripe/checkout/route.ts` | GET | Checkout user/team queries |

### Routes already using Supabase REST — WORKING

| File | Pattern |
|------|---------|
| `app/api/products/route.ts` | `createClient()` with anon key ✅ |
| `app/api/auth/login/route.ts` | `createClient()` with anon key ✅ |
| `app/api/admin/products/route.ts` POST | `getSupabaseClient()` ✅ |
| `app/api/admin/products/[id]/route.ts` | `getSupabaseClient()` ✅ |
| `app/api/admin/products/bulk/route.ts` | `getSupabaseClient()` ✅ |
| `app/api/admin/customers/[id]/route.ts` DELETE | `getSupabaseClient()` ✅ |
| `app/api/admin/customers/[id]/notes/route.ts` | `getSupabaseClient()` ✅ |

---

## Root Cause 2: Auth Pattern Mismatch

App uses custom cookie-based auth (`getSession()` / `setSession()` in `lib/auth/session.ts`).
12 admin routes still call `supabase.auth.getUser()` from `lib/supabase/server.ts` → always returns null → 401.

### Routes using supabase.auth.getUser() — ALL RETURN 401

| File | Methods |
|------|---------|
| `app/api/admin/settings/general/route.ts` | GET, PUT |
| `app/api/admin/settings/payments/route.ts` | GET, PUT |
| `app/api/admin/settings/shipping/route.ts` | GET, POST |
| `app/api/admin/settings/shipping/[id]/route.ts` | PUT, DELETE |
| `app/api/admin/settings/taxes/route.ts` | GET, PUT |
| `app/api/admin/settings/email-templates/route.ts` | GET |
| `app/api/admin/settings/email-templates/[slug]/route.ts` | PUT |
| `app/api/admin/users/route.ts` | GET, POST |
| `app/api/admin/activity/route.ts` | GET, POST |
| `app/api/admin/orders/[id]/invoice/route.ts` | GET |

**Fix:** Replace `supabase.auth.getUser()` with `getSession()` from `lib/auth/session.ts`.
For settings tables that don't exist in the demo DB (`settings`, `shipping_zones`, `email_templates`, `activity_logs`), return hardcoded defaults.

---

## Root Cause 3: Middleware Static File Redirect

**File:** `middleware.ts` line 104

Current matcher: `['/((?!api|_next/static|_next/image|favicon.ico).*)']`

Missing exclusions: `manifest.json`, `robots.txt`, `sitemap.xml`, `videos/`, `images/`

These paths get caught by the region routing logic, which redirects unknown segments to `/uk`.

`nonRegionPrefixes` (line 10): `['api', '_next', 'login', 'register', 'admin', 'account', 'dashboard', 'portal', 'fulfilment']` — doesn't cover static file extensions.

**Fix:** Update matcher to exclude static assets.

---

## Issues by Area

### A. Shop / Marketing Page

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| A1 | 72 products shown instead of 12 flavors | HIGH | `/api/products` returns all variants. `app/[region]/products/page.tsx` renders every one. Need to group by flavor |
| A2 | All products share one SVG image | MED | Seeded `imageUrl` = `/images/graphics/image.svg`. Six SVGs exist (`image.svg` through `image (5).svg`) — assign per flavor |
| A3 | Logo/header — needs verification in browser | MED | `PublicLayout` → `Header` → logo. Files exist: `/images/logo/PUXX-LOGO-LONG-BLACK.png` |
| A4 | `<link rel=preload>` invalid `as` value | LOW | Browser console error, likely font preload |
| A5 | `manifest.json` redirects to `/uk` | LOW | Middleware catches it |

### B. Admin Portal

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| B1 | Admin products list → 500 | HIGH | `getDb()` in `app/api/admin/products/route.ts` GET |
| B2 | Admin orders list → 500 | HIGH | `getDb()` in `app/api/admin/orders/route.ts` GET |
| B3 | Admin customers list → 500 | HIGH | `getDb()` in `app/api/admin/customers/route.ts` GET |
| B4 | Admin subscribers → 500 | HIGH | `getDb()` in `app/api/admin/marketing/subscribers/route.ts` |
| B5 | Settings general → 401 | HIGH | `supabase.auth.getUser()` in settings/general |
| B6 | Settings payments → 401 | HIGH | Same auth pattern |
| B7 | Settings shipping → 401 | HIGH | Same auth pattern |
| B8 | Settings taxes → 401 | HIGH | Same auth pattern |
| B9 | Settings email templates → 401 | HIGH | Same auth pattern |
| B10 | Admin users → 401 | HIGH | Same auth pattern |
| B11 | Admin activity → 401 | HIGH | Same auth pattern |
| B12 | Invoice endpoint → 401 | MED | Same auth pattern |
| B13 | Charts width=-1 errors | MED | Recharts container dimensions |

### C. Retailer Portal

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| C1 | Portal orders page → uses Drizzle | HIGH | `app/(portal)/portal/orders/page.tsx` uses `getDb()` |
| C2 | No dedicated `/api/portal/` routes | INFO | Portal UI pages call admin/auth APIs directly |

### D. Customer Account

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| D1 | Account page exists at `app/[region]/account/page.tsx` | INFO | Uses `getUser()` (custom auth) ✅ BUT also uses `getDb()` for profile/orders → 500 |
| D2 | Need to verify renders with seeded data | MED | Has referral card, recent orders display |

### E. Fulfilment

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| E1 | Fulfilment order update → uses Drizzle | HIGH | `app/api/fulfilment/orders/[id]/route.ts` PATCH uses `getDb()` |

### F. Infrastructure

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| F1 | `POSTGRES_URL` broken (pooler) | WONTFIX | Migrate to REST API instead |
| F2 | `AUTH_SECRET` added | DONE | ✅ |
| F3 | `SESSION_SECRET` unused | LOW | App uses AUTH_SECRET |

---

## Execution Priority

**Wave 1 — Admin API fixes (highest client-visible impact):**
- B1–B4: Drizzle→Supabase REST for products, orders, customers, subscribers
- B5–B12: Replace auth.getUser() with getSession() + return defaults for missing tables
- A5: Middleware matcher fix (1-line)

**Wave 2 — Storefront + Portal fixes:**
- A1: Group products by flavor (12 cards)
- A2: Assign per-flavor images
- C1: Portal orders → Supabase REST
- D1: Account page → Supabase REST
- E1: Fulfilment orders → Supabase REST

**Wave 3 — Polish:**
- B13: Chart dimensions
- A3: Logo verification
- A4: Preload cleanup
