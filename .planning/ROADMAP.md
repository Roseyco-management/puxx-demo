# Roadmap: Puxx v0.1 Demo

## Overview

A pre-sales frontend demo built to close the client deal before Phase 1 production work begins. Starting from three existing codebases — puxxireland (storefront/checkout/WorldPay/age verification), Blue Pillar (portals/affiliate), and TailAdmin Pro (admin dashboard) — this milestone assembles a working multi-region storefront with checkout, customer account, admin dashboard, retailer portal, fulfilment view, affiliate preview, and CRM stub, all wired together and mobile-responsive. Eighteen requirements across six phases. When the client signs, this demo becomes the basis for v1.

## Milestone

**v0.1 Demo** — Pre-sales frontend demo (18 requirements, 6 phases)

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - App scaffold with multi-region routing and regional config switching (completed 2026-04-09)
- [x] **Phase 2: Storefront** - Product catalogue, product detail, age gate, and checkout flow (completed 2026-04-09)
- [ ] **Phase 3: Customer Account** - Order history, order status, and referral code display
- [ ] **Phase 4: Admin Dashboard** - Orders, customers, and product management views
- [x] **Phase 5: Portals** - Retailer portal, fulfilment view, affiliate preview, and CRM stub (completed 2026-04-09)
- [ ] **Phase 6: Polish** - Mobile responsiveness across all key views

## Phase Details

### Phase 1: Foundation
**Goal**: The demo app runs and routes to region-correct config for CA, UK, and US
**Depends on**: Nothing (first phase)
**Requirements**: REG-01, REG-02
**Success Criteria** (what must be TRUE):
  1. Visiting the CA, UK, and US routes (or localhost equivalents) loads the app with the correct regional currency and payment method displayed for each
  2. A visible region selector on the storefront allows switching between CAD, GBP, and USD and the displayed currency updates immediately on switch
  3. The app runs without errors and all three regional configs resolve correctly
**Plans:** 2/2 plans complete

Plans:
- [ ] 01-01-PLAN.md — Scaffold demo app from puxxireland + regional config, middleware, and [region] layout (REG-01)
- [ ] 01-02-PLAN.md — RegionSelector component wired into Header (REG-02)

### Phase 2: Storefront
**Goal**: A visitor can browse products and complete a checkout with age verification
**Depends on**: Phase 1
**Requirements**: PROD-01, PROD-02, CHKOUT-01, CHKOUT-02
**Success Criteria** (what must be TRUE):
  1. Product catalogue page displays all 12 flavour variants, each with 6 strength options, at the correct base pricing
  2. Individual product detail page shows images, a flavour/strength selector, and an add-to-cart button
  3. Age verification gate appears before checkout and blocks progress until the user confirms they are 18+
  4. A customer can complete an end-to-end checkout for the UK region using the WorldPay integration ported from puxxireland
**Plans:** 5/5 plans complete

Plans:
- [ ] 02-01-PLAN.md — Add basePrice to region config and seed 72 product variants (PROD-01)
- [ ] 02-02-PLAN.md — Move products, cart, checkout under [region]/ with region-aware currency and payment label (PROD-01, PROD-02, CHKOUT-01, CHKOUT-02)
- [x] 02-03-PLAN.md — Human verification of all 4 Phase 2 success criteria (PROD-01, PROD-02, CHKOUT-01, CHKOUT-02) (completed 2026-04-09)
- [ ] 02-04-PLAN.md — Gap closure: VariantSelector on PDP + ProductCard Add to Cart wired (PROD-02)
- [ ] 02-05-PLAN.md — Gap closure: Checkout onSubmit confirmation state + Step5Payment currency fix (CHKOUT-02)

### Phase 3: Customer Account
**Goal**: A logged-in customer can see their order history and referral codes
**Depends on**: Phase 2
**Requirements**: CUST-01, CUST-02
**Success Criteria** (what must be TRUE):
  1. Customer account page shows a list of past orders with current status displayed per order
  2. Customer account page shows two referral codes (retail and wholesale) and a commission earned summary
**Plans:** 2 plans

Plans:
- [ ] 03-01-PLAN.md — Extend profiles schema with referral columns, run migration, seed demo user + 4 stub orders (CUST-01, CUST-02)
- [ ] 03-02-PLAN.md — Create [region]/account/ route tree, ReferralCard component, wire OrdersDataTable with region currency (CUST-01, CUST-02)

### Phase 4: Admin Dashboard
**Goal**: An admin can view and manage orders, customers, and products from the TailAdmin Pro layout
**Depends on**: Phase 1
**Requirements**: ADMIN-01, ADMIN-02, ADMIN-03
**Success Criteria** (what must be TRUE):
  1. Admin orders list is visible and browsable with order status shown per row
  2. Admin customer list is visible and browsable
  3. Admin product catalogue view is visible and browsable with product details accessible
**Plans:** 1/2 plans executed

Plans:
- [ ] 04-01-PLAN.md — Seed admin@puxx.com user + stub dashboard overview page (ADMIN-01, ADMIN-02, ADMIN-03)
- [ ] 04-02-PLAN.md — Rewrite 3 admin API routes and 2 pages to use Drizzle instead of Supabase (ADMIN-01, ADMIN-02, ADMIN-03)

### Phase 5: Portals
**Goal**: Retailer, fulfilment, affiliate, and CRM roles each have a distinct authenticated view with representative data
**Depends on**: Phase 4
**Requirements**: RETAIL-01, RETAIL-02, RETAIL-03, FULFL-01, FULFL-02, AFF-01, CRM-01
**Success Criteria** (what must be TRUE):
  1. Retailer portal has a branded PUX login separate from the main storefront; once logged in the retailer can browse the catalogue with wholesale pricing tiers visible
  2. Retailer can view their order history and invoice list from within the portal
  3. Fulfilment team has a separate login and sees a queue of pending orders; they can mark an order as shipped from their dashboard
  4. Affiliate dashboard preview (read-only, Blue Pillar components) shows referral codes, referred customers, and commission summary
  5. CRM customer profile page shows contact info, an order timeline, and stubbed communication history in a read-only view
**Plans:** 5/5 plans complete

Plans:
- [ ] 05-01-PLAN.md — Seed 3 portal users + signIn role redirects (RETAIL-01, RETAIL-03, FULFL-01, AFF-01)
- [ ] 05-02-PLAN.md — Retailer portal layout + product catalogue with wholesale pricing (RETAIL-01, RETAIL-02)
- [ ] 05-03-PLAN.md — Retailer orders page + fulfilment layout/queue/mark-shipped API (RETAIL-03, FULFL-01, FULFL-02)
- [ ] 05-04-PLAN.md — Affiliate nav link + affiliate preview page (AFF-01)
- [ ] 05-05-PLAN.md — CRM customer profile: Drizzle rewrite + order timeline + stub comms (CRM-01)

### Phase 6: Polish
**Goal**: All key views are mobile-responsive and demo-ready on any device
**Depends on**: Phase 5
**Requirements**: MOB-01
**Success Criteria** (what must be TRUE):
  1. Storefront, checkout, and customer account render correctly on a 375px mobile viewport with no overflow or broken layout
  2. Admin dashboard, retailer portal, and fulfilment view render correctly on a 375px mobile viewport
  3. No horizontal overflow, overlapping elements, or broken layouts on any key view at mobile size
**Plans:** 2 plans

Plans:
- [ ] 06-01-PLAN.md — Fix public views: storefront product page, checkout progress steps, customer account orders table (MOB-01)
- [ ] 06-02-PLAN.md — Fix internal views: portal header nav, portal tables, fulfilment layout/queue, admin orders table (MOB-01)

## Progress

**Execution Order:** 1 → 2 → 3 → 4 → 5 → 6
(Phases 3 and 4 can build in parallel once Phase 2 is complete)

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 2/2 | Complete   | 2026-04-09 |
| 2. Storefront | 5/5 | Complete   | 2026-04-09 |
| 3. Customer Account | 0/2 | Not started | - |
| 4. Admin Dashboard | 1/2 | In Progress|  |
| 5. Portals | 5/5 | Complete   | 2026-04-09 |
| 6. Polish | 0/2 | Not started | - |

---
*Roadmap created: 2026-04-09*
*Milestone: v0.1 Demo — 18 requirements, 6 phases*
