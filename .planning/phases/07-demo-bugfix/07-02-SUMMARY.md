---
phase: 07-demo-bugfix
plan: "02"
subsystem: ui
tags: [storefront, products, portal, fulfilment, supabase, drizzle-migration]

requires:
  - phase: 07-demo-bugfix
    plan: "01"
    provides: [getSupabaseClient-rest pattern established for API routes]

provides:
  - shop page shows 12 flavor cards (grouped from 72 variants) with distinct SVG images
  - portal orders page loads via Supabase REST (no 500)
  - fulfilment mark-shipped endpoint works via Supabase REST (no 500)

affects: [storefront, portal, fulfilment]

tech-stack:
  added: []
  patterns: [FLAVOR_IMAGE_MAP flavor-to-image lookup, displayProducts useMemo for flavor grouping, getSupabaseClient-rest for portal/fulfilment routes]

key-files:
  created: []
  modified:
    - app/[region]/products/page.tsx
    - components/products/product-card.tsx
    - app/(portal)/portal/orders/page.tsx
    - app/api/fulfilment/orders/[id]/route.ts

key-decisions:
  - "displayProducts useMemo groups 72 variants into 12 flavor cards — lowest-strength variant is picked as representative per flavor"
  - "FLAVOR_IMAGE_MAP assigns one of 6 SVGs to each of 12 flavors — 6 SVGs cycle across 12 flavors (pairs share images)"
  - "Strength badge replaced with 'Available in 6 strengths' — each card now represents a whole flavor, not a single variant"
  - "Portal orders and fulfilment route use getSupabaseClient() REST with snake_case field names (order_number, created_at)"

patterns-established:
  - "Flavor grouping: useMemo over filteredAndSortedProducts producing displayProducts — filters/sort still operate on full 72-variant set"
  - "Image resolution: FLAVOR_IMAGE_MAP[flavor] || product.imageUrl fallback — handles unseen flavors gracefully"

requirements-completed: [PROD-01, RETAIL-03, FULFL-02]

duration: 12min
completed: "2026-04-09"
---

# Phase 7 Plan 02: Storefront + Portal Bugfix Summary

**Shop page groups 72 variants into 12 distinct flavor cards with per-flavor SVG images; portal orders and fulfilment mark-shipped endpoint migrated from Drizzle to Supabase REST.**

## Performance

- **Duration:** ~12 min
- **Started:** 2026-04-09T22:40:00Z
- **Completed:** 2026-04-09T22:52:00Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- Products page now shows 12 flavor cards instead of 72 variant cards via `displayProducts` useMemo grouping
- Each flavor card shows a distinct SVG from the 6 available files via `FLAVOR_IMAGE_MAP`
- Each card now shows "Available in 6 strengths" badge replacing the single strength badge
- Portal orders page (`/portal/orders`) migrated from Drizzle to `getSupabaseClient()` REST with snake_case field names
- Fulfilment PATCH endpoint (`/api/fulfilment/orders/[id]`) migrated from Drizzle to `getSupabaseClient()` REST

## Task Commits

1. **Task 1: Group products by flavor + assign per-flavor images** - `3247d98` (feat)
2. **Task 2: Fix portal orders + fulfilment endpoint (Drizzle to REST)** - `e48fa47` (fix)

**Plan metadata:** (docs commit follows)

## Files Created/Modified

- `app/[region]/products/page.tsx` - Added `displayProducts` useMemo grouping 72 variants into 12 flavor cards; passes grouped products to ProductGrid
- `components/products/product-card.tsx` - Added `FLAVOR_IMAGE_MAP` for 12 flavors; replaced strength badge with "Available in 6 strengths"; uses resolved flavor image
- `app/(portal)/portal/orders/page.tsx` - Replaced `getDb()` Drizzle query with `getSupabaseClient()` REST; updated template field references to snake_case
- `app/api/fulfilment/orders/[id]/route.ts` - Replaced Drizzle update with `getSupabaseClient().from('orders').update()`; no Drizzle imports remain

## Decisions Made

- `displayProducts` useMemo operates on `filteredAndSortedProducts` — filters and sort still work on all 72 variants, grouping is a final display step only
- Lowest-strength variant selected as representative per flavor — gives consistent "entry-level" pricing display
- 12 flavors mapped to 6 SVG files (pairs share images) — acceptable for demo; real product images are a v1 asset task
- Portal orders uses `user_id` (snake_case) for the `.eq()` filter — matches Supabase column naming from seed

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None. Build succeeded with zero TypeScript errors both tasks. The `fetch failed` warning during build is a pre-existing SSG attempt to reach Supabase at build time — not related to these changes.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All four client-visible bugs fixed across phases 07-01 and 07-02
- Demo is ready: admin panel (07-01), storefront shop page, portal orders, and fulfilment endpoint all functional
- No blockers for demo review session

---
*Phase: 07-demo-bugfix*
*Completed: 2026-04-09*
