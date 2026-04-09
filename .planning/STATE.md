---
gsd_state_version: 1.0
milestone: v0.1
milestone_name: milestone
status: planning
stopped_at: Completed 02-05-PLAN.md (checkout confirmation wire-up)
last_updated: "2026-04-09T06:20:07.570Z"
last_activity: 2026-04-09 — v0.1 Demo roadmap created (6 phases, 18 requirements)
progress:
  total_phases: 6
  completed_phases: 2
  total_plans: 7
  completed_plans: 7
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

### Pending Todos

None yet.

### Blockers/Concerns

- ACCESS: AJ still has active access to all WooCommerce sites — credential rotation is pre-Phase 1 priority.
- PAYMENT: AllayPay/gift card integration is out of scope for demo — demo closes on UX/frontend only.
- DEMO: Checkout demo uses UK/WorldPay (already integrated in puxxireland). CA/US checkout is stubbed.

## Session Continuity

Last session: 2026-04-09T06:20:07.568Z
Stopped at: Completed 02-05-PLAN.md (checkout confirmation wire-up)
Resume file: None
