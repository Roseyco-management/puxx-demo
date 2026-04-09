---
phase: 07-demo-bugfix
plan: "04"
subsystem: portal
tags: [bugfix, supabase, portal, manifest, gap-closure]
dependency_graph:
  requires: [07-01, 07-02, 07-03]
  provides: [clean-portal-entry, working-portal-products, correct-manifest]
  affects: [app/(portal)/portal, lib/seo]
tech_stack:
  added: []
  patterns: [supabase-rest, snake_case-fields, next-metadata]
key_files:
  created: []
  modified:
    - app/(portal)/portal/products/page.tsx
    - app/(portal)/portal/page.tsx
    - lib/seo/metadata.ts
decisions:
  - "Portal products page migrated from Drizzle to Supabase REST (snake_case fields) — consistent with prior portal fixes in 07-02/07-03"
  - "Portal root redirects to /portal/orders (more useful landing) rather than /portal/products"
  - "Manifest metadata updated to /site.webmanifest — W3C canonical name, file already exists in public/"
metrics:
  duration: "63s"
  completed: "2026-04-09"
  tasks_completed: 2
  files_modified: 3
---

# Phase 7 Plan 04: Gap Closure — Portal Products + Manifest Summary

**One-liner:** Migrated portal products page from Drizzle to Supabase REST (snake_case) and fixed manifest metadata reference from manifest.json to site.webmanifest.

## What Was Built

Two final verification gaps from 07-VERIFICATION.md closed:

**Gap 1 (BLOCKER):** Portal products page used Drizzle ORM which fails on Vercel (no PgConnection available). Migrated to `getSupabaseClient().from('products')` REST pattern. Updated all template field references from camelCase Drizzle schema (`nicotineStrength`, `stockQuantity`, `isActive`) to snake_case Supabase columns (`nicotine_strength`, `stock_quantity`, `is_active`). Added error guard that falls back to empty array on Supabase error. Portal root redirect changed from `/portal/products` to `/portal/orders` — orders is the more useful retailer landing page and was already confirmed working.

**Gap 2 (WARNING):** `lib/seo/metadata.ts` declared `manifest: '/manifest.json'` but the actual file is `public/site.webmanifest`. This caused a 404 console error on every page load — visible to demo reviewers. Changed the manifest field to `/site.webmanifest` to match the real file.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Fix portal products page (Drizzle to Supabase REST) and redirect | 1e95cbc | app/(portal)/portal/products/page.tsx, app/(portal)/portal/page.tsx |
| 2 | Fix manifest metadata reference | 2ac04dd | lib/seo/metadata.ts |

## Verification Results

- `grep -r "getDb|from '@/lib/db/drizzle'" app/(portal)/` — CLEAN (no Drizzle in portal)
- `grep "redirect.*portal" app/(portal)/portal/page.tsx` — shows `/portal/orders`
- `grep "manifest" lib/seo/metadata.ts` — shows `/site.webmanifest`
- `npx next build` — completed successfully, all portal routes rendered

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check

- [x] `app/(portal)/portal/products/page.tsx` — written with Supabase REST
- [x] `app/(portal)/portal/page.tsx` — redirects to `/portal/orders`
- [x] `lib/seo/metadata.ts` — manifest field set to `/site.webmanifest`
- [x] commit 1e95cbc exists
- [x] commit 2ac04dd exists
- [x] `npx next build` passed

## Self-Check: PASSED
