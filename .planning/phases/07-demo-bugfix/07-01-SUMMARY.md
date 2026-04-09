---
phase: 07-demo-bugfix
plan: "01"
subsystem: admin-api
tags: [bugfix, supabase, auth, drizzle-migration, middleware]
dependency_graph:
  requires: []
  provides: [admin-products-api, admin-orders-api, admin-customers-api, admin-settings-api, admin-users-api, admin-activity-api, admin-invoice-api]
  affects: [admin-dashboard]
tech_stack:
  added: []
  patterns: [getSupabaseClient-rest, getSession-auth, hardcoded-demo-defaults]
key_files:
  created: []
  modified:
    - app/api/admin/products/route.ts
    - app/api/admin/orders/route.ts
    - app/api/admin/customers/route.ts
    - app/api/admin/customers/[id]/route.ts
    - app/api/admin/marketing/subscribers/route.ts
    - app/api/admin/settings/general/route.ts
    - app/api/admin/settings/payments/route.ts
    - app/api/admin/settings/shipping/route.ts
    - app/api/admin/settings/shipping/[id]/route.ts
    - app/api/admin/settings/taxes/route.ts
    - app/api/admin/settings/email-templates/route.ts
    - app/api/admin/settings/email-templates/[slug]/route.ts
    - app/api/admin/users/route.ts
    - app/api/admin/activity/route.ts
    - app/api/admin/orders/[id]/invoice/route.ts
    - app/api/admin/orders/[id]/route.ts
    - middleware.ts
decisions:
  - "Admin data routes (products/orders/customers) use getSupabaseClient() REST pattern — identical to working storefront API routes"
  - "All settings routes return hardcoded demo defaults — settings tables do not exist in Supabase demo DB"
  - "admin/orders/[id]/route.ts fixed as Rule 2 auto-fix — same broken auth pattern, causes order detail page 401"
  - "Activity returns empty array — activity_logs table not seeded; subscribers returns empty array if table missing"
  - "Middleware matcher extended to exclude manifest.json, robots.txt, sitemap, videos, images from region redirect logic"
metrics:
  duration: 212s
  completed_date: "2026-04-09"
  tasks_completed: 2
  files_modified: 17
---

# Phase 7 Plan 01: Admin API Bugfix Summary

**One-liner:** Migrated 16 admin API routes from broken Drizzle/supabase.auth.getUser patterns to getSupabaseClient() REST + getSession() auth, fixing all 500s and 401s in the admin panel.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Migrate 5 admin data routes from Drizzle to Supabase REST | 9601de4 | products, orders, customers, customers/[id], marketing/subscribers |
| 2 | Fix 10 admin settings/auth routes (401s) + middleware matcher | d449905 | settings/* (7 routes), users, activity, orders/[id]/invoice, orders/[id], middleware.ts |

## What Was Fixed

**500 errors (Drizzle DNS failure on Vercel):**
- `GET /api/admin/products` — replaced `getDb()` + Drizzle select with `getSupabaseClient().from('products')`
- `GET /api/admin/orders` — replaced Drizzle join with Supabase `select('*, order_items(*)')`
- `GET /api/admin/customers` — replaced Drizzle join with Supabase users+profiles+orders queries
- `GET /api/admin/customers/[id]` — replaced Drizzle multi-query with Supabase REST equivalents
- All handlers in `marketing/subscribers` — replaced with `getSupabaseClient()` throughout

**401 errors (supabase.auth.getUser returns null):**
- `settings/general`, `payments`, `shipping`, `shipping/[id]`, `taxes`, `email-templates`, `email-templates/[slug]` — all replaced `supabase.auth.getUser()` with `getSession()` and return hardcoded demo defaults
- `admin/users` — auth fix + kept Supabase REST query via `getSupabaseClient()`
- `admin/activity` — auth fix + returns `[]` (activity_logs table absent)
- `admin/orders/[id]/invoice` — auth fix + switched to `getSupabaseClient()`

**Middleware routing fix:**
- `manifest.json` was being redirected to `/uk` by region routing middleware — added `manifest\.json`, `robots\.txt`, `sitemap`, `videos`, `images` to excluded prefixes in matcher

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Auth Fix] app/api/admin/orders/[id]/route.ts**
- **Found during:** Task 2 verification (grep for remaining supabase/server imports)
- **Issue:** `admin/orders/[id]/route.ts` (order detail + PATCH) used same broken `supabase.auth.getUser()` pattern — would cause 401 on the order detail page in admin
- **Fix:** Replaced auth pattern with `getSession()` and `createClient()` with `getSupabaseClient()`; included in Task 2 commit
- **Files modified:** `app/api/admin/orders/[id]/route.ts`
- **Commit:** d449905

## Self-Check

Files verified to exist:
- app/api/admin/products/route.ts — FOUND
- app/api/admin/settings/general/route.ts — FOUND
- middleware.ts — FOUND

Commits verified:
- 9601de4 — FOUND (feat: migrate 5 admin data routes)
- d449905 — FOUND (fix: replace supabase.auth.getUser in 11 routes + middleware)

## Self-Check: PASSED
