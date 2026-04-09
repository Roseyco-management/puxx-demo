---
phase: 02-storefront
plan: 01
subsystem: database
tags: [drizzle, postgres, supabase, products, seed, regions, typescript]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: RegionConfig type in lib/config/regions.ts; Drizzle/Supabase db setup; products table schema in lib/db/schema.ts
provides:
  - RegionConfig interface with basePrice field (UK £6.00, CA CA$6.50, US $4.99)
  - 72 seeded product variants (12 flavours x 6 strengths) via pnpm db:seed
  - Idempotent seed function for products table
  - Stripe fully removed from seed.ts
affects: [02-storefront, product-catalogue, product-card, checkout, pricing-display]

# Tech tracking
tech-stack:
  added: []
  patterns: [Drizzle bulk insert for product seeding, idempotent seed via delete-before-insert, region basePrice for currency-correct pricing at display time]

key-files:
  created: []
  modified:
    - lib/config/regions.ts
    - lib/db/seed.ts

key-decisions:
  - "basePrice stored as number in RegionConfig (not string) for arithmetic in cart/pricing calculations"
  - "Products table stores price as UK base GBP 6.00 string; region basePrice used at display time for currency conversion"
  - "Stripe removed entirely from seed.ts — permanently banned for nicotine products; AllayPay is the payment processor"
  - "Seed is idempotent: db.delete(products) before insert so pnpm db:seed is safe to re-run"
  - "isFeatured=true on 4mg variants of Mango Ice, Fresh Mint, Berry Blast — popular/approachable strengths for hero display"

patterns-established:
  - "Region basePrice pattern: store per-unit price in region's native currency inside RegionConfig, access via useRegion().config.basePrice in client components"
  - "Product seeding pattern: FLAVOURS x STRENGTHS matrix loop, toSlug() helper, idempotent delete-before-insert"

requirements-completed: [PROD-01]

# Metrics
duration: 1min
completed: 2026-04-09
---

# Phase 2 Plan 01: Data Layer (basePrice + 72 Product Variants) Summary

**RegionConfig extended with basePrice (UK £6.00 / CA CA$6.50 / US $4.99) and seed.ts generates 72 nicotine pouch variants across 12 flavours x 6 strengths via Drizzle bulk insert, with Stripe fully removed**

## Performance

- **Duration:** 1 min
- **Started:** 2026-04-09T05:56:26Z
- **Completed:** 2026-04-09T05:57:41Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Added basePrice: number to RegionConfig interface, set correct values on all 3 regions (uk: 6.00, ca: 6.50, us: 4.99)
- Replaced Stripe-dependent seed with 72-variant Drizzle product insert (12 flavours x 6 strengths), idempotent and type-safe
- Removed all Stripe references from seed.ts (permanently banned for nicotine products)

## Task Commits

Each task was committed atomically:

1. **Task 1: Add basePrice to RegionConfig and update REGIONS** - `8905219` (feat)
2. **Task 2: Extend seed.ts with 72 nicotine product variants** - `e938e9a` (feat)

**Plan metadata:** (docs commit below)

## Files Created/Modified
- `lib/config/regions.ts` - RegionConfig interface now includes basePrice: number; all 3 REGIONS entries updated
- `lib/db/seed.ts` - Stripe removed; seedProducts() function inserts 72 product variants; seed() calls seedProducts()

## Decisions Made
- basePrice stored as number (not string) so downstream components can do arithmetic directly
- Products table price column remains a decimal string ("6.00" GBP) as the canonical price; basePrice in RegionConfig drives currency-correct display at runtime
- isFeatured set to true only on 4mg variants of Mango Ice, Fresh Mint, and Berry Blast (approachable entry-strength for hero/featured display)
- Stripe fully stripped — no conditional path left; AllayPay is the permanent payment processor choice per client preference

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required. Run `pnpm db:seed` after database is provisioned to populate 72 product variants.

## Next Phase Readiness

- `useRegion().config.basePrice` now available in all client components for currency-correct pricing display
- `pnpm db:seed` seeds 72 products; `GET /api/products` will return them once dev server is running
- Ready for Phase 2 Plan 02: product catalogue routes (`app/[region]/products/`) and product card currency display

---
*Phase: 02-storefront*
*Completed: 2026-04-09*
