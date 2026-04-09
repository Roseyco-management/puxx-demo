---
gsd_state_version: 1.0
milestone: v0.1
milestone_name: milestone
status: planning
stopped_at: Completed 07-demo-bugfix-04-PLAN.md
last_updated: "2026-04-09T23:04:40.910Z"
last_activity: 2026-04-09 — v0.1 Demo roadmap created (6 phases, 18 requirements)
progress:
  total_phases: 7
  completed_phases: 7
  total_plans: 23
  completed_plans: 23
  percent: 0
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-04-09)

**Core value:** The three e-commerce sites must process orders end-to-end — from checkout through payment, fulfilment assignment, shipping, and customer notification — without manual intervention on the happy path.
**Current focus:** Phase 1: Foundation (v0.1 Demo)

## Current Position

Phase: 1 of 6 (Foundation)
Plan: 0 of TBD in current phase
Status: Ready to plan
Last activity: 2026-04-09 — v0.1 Demo roadmap created (6 phases, 18 requirements)

Progress: [░░░░░░░░░░] 0%

## Performance Metrics

**Velocity:**
- Total plans completed: 0
- Average duration: -
- Total execution time: 0 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| - | - | - | - |

**Recent Trend:**
- Last 5 plans: -
- Trend: -

*Updated after each plan completion*
| Phase 01-foundation P01 | 5 | 2 tasks | 14 files |
| Phase 01-foundation P02 | 2 | 2 tasks | 2 files |
| Phase 02-storefront P01 | 1 | 2 tasks | 2 files |
| Phase 02-storefront P02 | 286s | 2 tasks | 7 files |
| Phase 02-storefront P03 | 3 | 2 tasks | 1 files |
| Phase 02-storefront P04 | 8 | 2 tasks | 3 files |
| Phase 02-storefront P05 | 88s | 2 tasks | 2 files |
| Phase 02-storefront P06 | 8 | 2 tasks | 2 files |
| Phase 03-customer-account P01 | 8 | 2 tasks | 4 files |
| Phase 03-customer-account P02 | 3 | 2 tasks | 6 files |
| Phase 04-admin-dashboard P01 | 59s | 2 tasks | 2 files |
| Phase 04-admin-dashboard P02 | 108 | 2 tasks | 5 files |
| Phase 05-portals P01 | 112s | 2 tasks | 2 files |
| Phase 05-portals P04 | 100s | 2 tasks | 3 files |
| Phase 05-portals P05 | 97s | 2 tasks | 2 files |
| Phase 05-portals P02 | 198s | 2 tasks | 4 files |
| Phase 05-portals P03 | 129s | 2 tasks | 6 files |
| Phase 06-polish P01 | 103s | 2 tasks | 3 files |
| Phase 06-polish P02 | 8 | 2 tasks | 6 files |
| Phase 07-demo-bugfix P01 | 212s | 2 tasks | 17 files |
| Phase 07-demo-bugfix P02 | 12min | 2 tasks | 4 files |
| Phase 07-demo-bugfix P03 | 4min | 2 tasks | 1 files |
| Phase 07-demo-bugfix P04 | 63s | 2 tasks | 3 files |

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- [v0.1 Demo]: Roadmap replaces old 6-phase v1 roadmap. v1 will be recreated when client pays.
- [v0.1 Demo]: Source codebases — puxxireland (storefront/checkout), Blue Pillar (portals/affiliate), TailAdmin Pro (admin)
- [Roadmap]: Path B recommended (custom build from puxxireland). Path A (WP fix) is fallback.
- [Roadmap]: AllayPay preferred payment processor for CA/US — real integration is Phase 1 (post sign-off)
- [Phase 01-foundation]: PublicLayout moved from root layout to [region]/layout.tsx so each region gets header/footer
- [Phase 01-foundation]: RegionContext uses separate 'use client' file so server layout can import without forcing client boundary
- [Phase 01-foundation]: middleware.ts keeps nonRegionPrefixes allowlist to prevent false-positive redirects for admin/auth/api
- [Phase 01-foundation]: RegionSelector uses native <select> over custom popover — accessible by default, no library dependency
- [Phase 01-foundation]: All Header nav links (including Login/Shop Now CTAs) region-prefixed to maintain consistent region-aware navigation
- [Phase 02-storefront]: basePrice stored as number in RegionConfig for arithmetic in cart/pricing calculations; products table price column remains GBP string as canonical
- [Phase 02-storefront]: Stripe removed entirely from seed.ts — permanently banned for nicotine products; seed is idempotent via delete-before-insert
- [Phase 02-storefront]: ProductCard uses config.basePrice (not product.price) for display — all regions show flat regional price per config
- [Phase 02-storefront]: Checkout address fields neutralised: Eircode->Postcode, County->County/State, phone placeholder generalised
- [Phase 02-03]: Checkpoint auto-approved in --auto mode — human browser verification deferred to demo review session
- [Phase 02-storefront]: VariantSelector receives region as prop not via useRegion to avoid context boundary issues with server component PDP
- [Phase 02-storefront]: Checkout confirmation uses early return pattern (if confirmed) rather than step state machine — simpler for demo scope
- [Phase 02-storefront]: Step5Payment left orphaned from new checkout flow — currency fix future-proofs the component without adding complexity
- [Phase 02-storefront]: Step6Confirmation receives order data via props from checkout/page.tsx — no shared checkout store, no schema mismatch risk
- [Phase 02-storefront]: useCheckoutStore and lib/stores/cart-store removed entirely — lib/store/cart-store is sole pricing source
- [Phase 03-customer-account]: Demo seed uses delete-before-insert on demo@puxx.com for full idempotency — cascade FK deletes child rows automatically
- [Phase 03-customer-account]: Orders reference productId=1 so seedProducts() must run before seedDemoAccount() to satisfy FK constraint
- [Phase 03-customer-account]: Demo orders use currency GBP and paymentMethod worldpay — consistent with UK storefront checkout integration
- [Phase 03-customer-account]: Account layout uses Drizzle (not Supabase) for profile query — consistent with schema established in plan 01
- [Phase 03-customer-account]: OrdersDataTable currencySymbol defaults to £ and ordersBasePath defaults to /account/orders for backward compat with (account) group routes
- [Phase 03-customer-account]: ReferralCard is pure server component — no clipboard JS needed for demo visual fidelity
- [Phase 04-admin-dashboard]: Followed existing delete-before-insert idempotency pattern for admin user seed
- [Phase 04-admin-dashboard]: Removed all Supabase client calls and realtime subscription from dashboard — replaced with static stub data
- [Phase 04-admin-dashboard]: Products POST handler kept on Supabase — only GET rewritten to Drizzle per plan scope
- [Phase 04-admin-dashboard]: Product mutation handlers (delete/activate/deactivate) stubbed as v1 placeholders
- [Phase 05-portals]: affiliate@puxx.com uses role='member' — falls through to /uk/account where affiliate tab lives
- [Phase 05-portals]: daysAgo helper duplicated locally in seedPortalUsers to avoid unnecessary refactor of seedDemoAccount
- [Phase 05-portals]: isActive uses pathname.endsWith(item.href) for region-prefixed account nav highlighting
- [Phase 05-portals]: components/ui/table.tsx created as shadcn Table — was listed as available in plan but missing from codebase
- [Phase 05-portals]: GET /api/admin/customers/[id] rewritten to Drizzle; DELETE kept on Supabase (soft delete, demo scope)
- [Phase 05-portals]: orders array added to API response; CRM page populates timeline from fetch without extra round-trip
- [Phase 05-portals]: Portal layout uses client-side useEffect auth gate with role='retailer' check — mirrors admin layout pattern
- [Phase 05-portals]: Trade price computed inline as price * 0.8 — no dedicated wholesalePrice column needed for demo
- [Phase 05-portals]: portal/orders is server component querying Drizzle via getSession().user.id — InvoiceButton is standalone client component
- [Phase 05-portals]: FulfilmentQueue is client component receiving initialOrders from server FulfilmentPage — hybrid server/client pattern
- [Phase 06-polish]: OrdersDataTable uses block md:hidden card list mirroring TanStack table state — no extra state needed
- [Phase 06-polish]: Checkout progress labels hidden below sm: breakpoint — icon-only progress bar at 375px avoids text overflow
- [Phase 06-polish]: Mobile card view uses block md:hidden / hidden md:block dual-render — no JS breakpoint detection needed
- [Phase 07-demo-bugfix]: Admin data routes use getSupabaseClient() REST — identical to working storefront API routes, not Drizzle
- [Phase 07-demo-bugfix]: Settings routes return hardcoded demo defaults — settings tables do not exist in Supabase demo DB
- [Phase 07-demo-bugfix]: Middleware matcher extended to exclude manifest.json, robots.txt, sitemap, videos, images from region redirect
- [Phase 07-demo-bugfix]: displayProducts useMemo groups 72 variants into 12 flavor cards — lowest-strength variant picked as representative
- [Phase 07-demo-bugfix]: Portal orders and fulfilment route use getSupabaseClient() REST with snake_case field names (order_number, created_at)
- [Phase 07-demo-bugfix]: Account page uses getSupabaseClient() REST for profile/orders — snake_case field names match Supabase DB schema
- [Phase 07-demo-bugfix]: Logo verified correct in Logo.tsx (variant=black -> PUXX-LOGO-LONG-BLACK.png, file present in public/)
- [Phase 07-demo-bugfix]: Preload warnings are Next.js font optimization internals — no manual preload links in app layouts, non-actionable
- [Phase 07-demo-bugfix]: Portal products page migrated from Drizzle to Supabase REST with snake_case field refs — consistent with 07-02/07-03 pattern
- [Phase 07-demo-bugfix]: Portal root redirects to /portal/orders (most useful retailer landing) not /portal/products
- [Phase 07-demo-bugfix]: Manifest metadata updated to /site.webmanifest — matches actual public/ file, eliminates 404 console error

### Pending Todos

None yet.

### Blockers/Concerns

- ACCESS: AJ still has active access to all WooCommerce sites — credential rotation is pre-Phase 1 priority.
- PAYMENT: AllayPay/gift card integration is out of scope for demo — demo closes on UX/frontend only.
- DEMO: Checkout demo uses UK/WorldPay (already integrated in puxxireland). CA/US checkout is stubbed.

## Session Continuity

Last session: 2026-04-09T23:04:40.908Z
Stopped at: Completed 07-demo-bugfix-04-PLAN.md
Resume file: None
