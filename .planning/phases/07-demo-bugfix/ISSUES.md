# Phase 7 — Demo Bug Tracker

Recorded 2026-04-09. All issues observed on https://puxx-demo.vercel.app before Phase 7 execution.

---

## Root Cause: Database Connection

**The primary technical root cause of most failures:**
- Direct Supabase DB (port 5432) → `ENOTFOUND` from Vercel functions
- Supabase pooler (port 6543) → "Tenant or user not found" (wrong password/format)
- Supabase anon key via REST API (PostgREST) → **works** (RLS is disabled on all tables)
- **Fix strategy:** Migrate all failing Drizzle DB calls to Supabase anon-key REST queries

**Secondary root cause:** Mixed auth patterns
- Custom cookie-based auth (`getSession()` in `lib/auth/session.ts`) is live and working
- Several admin/portal API routes still call `supabase.auth.getUser()` which returns `null` → 401
- **Fix strategy:** Replace all `supabase.auth.getUser()` checks with `getSession()`

---

## Issues by Area

### A. Shop / Marketing Page

| # | Issue | Severity | Fix |
|---|-------|----------|-----|
| A1 | Products grid shows 72 variants (12 flavors × 6 strengths) — should show 12 flavor cards only, with strength selector per card or just one representative card per flavor | HIGH | `/api/products` — deduplicate by flavor; products page — group by flavor |
| A2 | No product images — seeded `imageUrl` points to `/images/graphics/image.svg` which exists but all 72 products share one generic SVG | MED | Assign one of the 6 SVGs per flavor (rotate through `image.svg`, `image (1).svg`…`image (5).svg`) |
| A3 | Logo not visible on shop page header (may load but unclear if PublicLayout header renders correctly) | MED | Verify `PublicLayout` renders logo; check `src` path |
| A4 | `<link rel=preload> must have valid 'as' value` — browser error on login page | LOW | Find which preload tag has no `as`; likely a font or script preload in head |
| A5 | `manifest.json` returns redirect (middleware catches it → redirects to `/uk`) | LOW | Add static asset paths to middleware non-region list |

### B. Admin Portal (`/admin`)

| # | Issue | Severity | Fix |
|---|-------|----------|-----|
| B1 | `/api/admin/products` → 500 — uses `getDb()` (Drizzle, broken POSTGRES_URL) | HIGH | Rewrite to use Supabase anon REST client |
| B2 | `/api/admin/orders` → 500 — same Drizzle issue | HIGH | Rewrite to use Supabase anon REST client |
| B3 | `/api/admin/customers` → 500 — same Drizzle issue | HIGH | Rewrite to use Supabase anon REST client |
| B4 | `/api/admin/subscribers` → 500 — same Drizzle issue | HIGH | Rewrite to use Supabase anon REST client |
| B5 | `/api/admin/settings/general` → 401 — calls `supabase.auth.getUser()`, returns null with custom auth | HIGH | Replace auth check with `getSession()` |
| B6 | `/api/admin/settings/payments` → 401 — same `supabase.auth.getUser()` issue | HIGH | Replace auth check with `getSession()` |
| B7 | `/api/admin/settings/shipping` → 401 — same | HIGH | Replace auth check with `getSession()` |
| B8 | Chart component shows "width=-1, height=-1" errors — recharts container has no explicit size | MED | Wrap charts in container with `min-h-[300px]` or pass explicit dimensions |
| B9 | Admin auth middleware only checks session exists, doesn't verify `role === 'admin'` | MED | Add role check in middleware for `/admin` routes |

### C. Retailer Portal (`/portal`)

| # | Issue | Severity | Fix |
|---|-------|----------|-----|
| C1 | Portal auth layout calls `/api/auth/me` — check if this returns correct data | MED | Already verified working ✓ |
| C2 | `/api/portal/orders` or similar — likely Drizzle 500 errors (not yet verified) | HIGH | Audit and rewrite as Supabase REST |
| C3 | Wholesale pricing tier visibility — not confirmed working | MED | Verify portal products show wholesale pricing |

### D. Customer Account (`/account` or customer dashboard)

| # | Issue | Severity | Fix |
|---|-------|----------|-----|
| D1 | Phase 3 (Customer Account) was never completed — order history, order status not built | HIGH | Implement customer account page with orders from Supabase REST |
| D2 | Referral code display not verified | MED | Show referral code from seeded profile |

### E. Infrastructure / Env Vars

| # | Issue | Severity | Fix |
|---|-------|----------|-----|
| E1 | `DATABASE_URL` and `POSTGRES_URL` both broken for Drizzle (cannot connect to Supabase direct/pooler) | HIGH | Leave broken; migrate to REST API instead |
| E2 | `AUTH_SECRET` was missing — now added | DONE | ✓ Fixed |
| E3 | No `SUPABASE_SERVICE_ROLE_KEY` set — needed if any route needs to bypass RLS in future | LOW | Note for later; RLS is currently off so anon key works |
| E4 | `SESSION_SECRET` set but unused (app uses `AUTH_SECRET`) | LOW | Verify or remove |

---

## Priority Order for Phase 7

1. **B1–B4** Admin API 500s (Drizzle → REST) — highest user-visible impact
2. **B5–B7** Admin settings 401s (auth pattern) — blocks settings pages
3. **A1** Products display 72 not 12 — bad UX on main storefront
4. **A2** Product images — assign different SVGs per flavor
5. **C2** Portal API 500s — retailer portal broken
6. **D1** Customer account — Phase 3 deliverable
7. **A5** Manifest redirect — easy fix
8. **B8** Chart dimensions
9. **A3–A4** Logo/preload cleanup
