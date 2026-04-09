# Roadmap: Puxx E-Commerce Platform

## Overview

Fix and launch three WooCommerce e-commerce sites (Canada, UK, US) that were partially built by two previous dev teams but never made it to production. The work moves from foundation (audit, security, hosting) through revenue-critical fixes (payments, order flow) to launch-enabling features (users, pricing, affiliate), then automation (shipping, inventory), and finally the CRM the client wants as a byproduct. Each phase delivers observable value to the client on a roughly monthly cadence aligned with the GBP 2,000/month retainer.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Audit, Security & Infrastructure** - Gain access, lock out previous dev, audit all three sites, set up staging, fix hosting/performance/monitoring
- [ ] **Phase 2: Payments & Order Flow** - Get money flowing and orders processing end-to-end across all three sites
- [ ] **Phase 3: Users, Pricing & Affiliate System** - User roles, custom wholesale pricing, document verification, and the full two-tier referral system
- [ ] **Phase 4: Shipping Automation & Inventory** - Eliminate manual shipping workflow, integrate ShipStation (UK) and Freightcom intermediary (CA/US), enable stock management
- [ ] **Phase 5: CRM & Admin Polish** - Build basic CRM, migrate data from GoHighLevel, polish admin dashboard for mobile-first usage

## Phase Details

### Phase 1: Audit, Security & Infrastructure
**Goal**: All three sites are under our control, audited, secured, monitored, and performant enough to build on — with a staging environment ready for development
**Depends on**: Nothing (first phase)
**Requirements**: AUDIT-01, AUDIT-02, AUDIT-03, AUDIT-04, AUDIT-05, AUDIT-06, HOST-01, HOST-02, HOST-03, HOST-04, SHIP-06
**Success Criteria** (what must be TRUE):
  1. Previous developer (AJ) access is revoked and all credentials are rotated — client can verify no unauthorized access exists
  2. A staging copy of the US site exists where changes can be tested without affecting live sites
  3. All three e-commerce sites plus dummy sites load in under 3 seconds with valid SSL certificates
  4. Uptime monitoring is active and alerts the team within 5 minutes of any site going down
  5. A complete audit document exists cataloguing every plugin, hook, custom code block, and divergence between the three sites
**Plans**: TBD

Plans:
- [ ] 01-01: Access takeover, credential rotation, and staging setup
- [ ] 01-02: Full codebase audit across all three sites
- [ ] 01-03: Hosting hardening — cron, PHP, SSL, backups, performance, uptime monitoring

**Client issues addressed:** I1, I2, I3, I4, I5, I6, I7, I8, J3, J4, J5, H4

### Phase 2: Payments & Order Flow
**Goal**: A customer can place an order on any of the three sites, pay by credit card (gift card workaround for CA/US, WorldPay for UK) or bank transfer, and the order flows through to the fulfilment team automatically — unblocking all three site launches
**Depends on**: Phase 1
**Requirements**: PAY-01, PAY-02, PAY-03, PAY-04, PAY-05, PAY-06, ORD-01, ORD-02, ORD-03, ORD-04, ORD-05, ORD-06
**Success Criteria** (what must be TRUE):
  1. A customer on the UK site can pay by credit card via WorldPay and the order automatically moves to "processing" without admin intervention
  2. A customer on the CA/US site can pay by credit card via the gift card workaround and the order automatically moves to "processing" without admin intervention
  3. A bank transfer order sits at "awaiting payment" until an admin manually confirms it, then progresses normally
  4. The fulfilment team sees new orders on their dashboard, can view order details, enter a tracking number, and mark the order complete
  5. The customer receives automated emails at each stage: order placed, payment confirmed, shipped (with tracking), and delivered
**Plans**: TBD

Plans:
- [ ] 02-01: WorldPay UK fix and gift card plugin CA/US integration
- [ ] 02-02: Bank transfer approval flow and regional payment configuration
- [ ] 02-03: End-to-end order pipeline — status progression, geo-assignment, fulfilment dashboard
- [ ] 02-04: Transactional emails and age verification

**Client issues addressed:** A1, A2, A3 (info), A4, A5, A6, B1, B2, B3, B4, B5, J1

### Phase 3: Users, Pricing & Affiliate System
**Goal**: The platform supports distinct user types with appropriate pricing, and every account has a working two-tier referral system that earns residual commissions — eliminating the coupon code workaround and enabling the client's affiliate-driven growth model
**Depends on**: Phase 2
**Requirements**: ROLE-01, ROLE-02, ROLE-03, ROLE-04, ROLE-05, AFF-01, AFF-02, AFF-03, AFF-04, AFF-05, AFF-06
**Success Criteria** (what must be TRUE):
  1. A wholesale customer sees different (custom) pricing from a retail customer for the same product, and admin can set pricing per individual wholesale account
  2. A new wholesale signup is prompted to upload business ID and trade licence, and their account is held for admin verification before activation
  3. Every new account is automatically issued two separate referral codes (one retail, one wholesale) and can view them on their dashboard
  4. When Customer B (referred by A) refers Customer C, both A and B earn commission on C's purchases — but the chain stops at two tiers
  5. Platform terminology is consistent and clear across all pages, dashboards, and user-facing labels
**Plans**: TBD

Plans:
- [ ] 03-01: User roles, guest checkout, and terminology standardisation
- [ ] 03-02: Custom wholesale pricing and document verification
- [ ] 03-03: Two-tier affiliate system — codes, residual linking, commissions, country rules, payout dashboard

**Client issues addressed:** C1, C2, C3, C4, C5, C6, C7, D1, D2, D3, D4, H2

### Phase 4: Shipping Automation & Inventory
**Goal**: Orders flow from the site to the shipping provider and back with tracking numbers automatically — eliminating the manual copy-paste-email workflow — and stock levels are tracked with low-stock alerts
**Depends on**: Phase 2 (order flow must work), Phase 3 (fulfilment role must exist)
**Requirements**: SHIP-01, SHIP-02, SHIP-03, SHIP-04, SHIP-05
**Success Criteria** (what must be TRUE):
  1. When a UK fulfilment team member creates a shipping label in ShipStation, the tracking number automatically appears on the order in WooCommerce and the customer is notified
  2. CA/US orders can be shipped via Freightcom through an intermediary layer that does not expose that the product is nicotine
  3. Stock automatically deducts when a purchase is made, and products show accurate availability
  4. When stock drops below a configurable threshold, the item appears on an automatic reorder list that admin can review
**Plans**: TBD

Plans:
- [ ] 04-01: ShipStation UK integration
- [ ] 04-02: Freightcom CA/US intermediary workflow
- [ ] 04-03: Inventory management — stock tracking, low-stock alerts, reorder list

**Client issues addressed:** E1, E2, E3, E4, E5, G1, G2

### Phase 5: CRM & Admin Polish
**Goal**: Client and staff can look up any customer, see their full purchase and communication history, send emails or make notes, all from a mobile-friendly interface that does not require WordPress admin access — and the admin dashboard is clean and purpose-built
**Depends on**: Phase 2 (order data must exist), Phase 3 (user data must exist)
**Requirements**: CRM-01, CRM-02, CRM-03, CRM-04, CRM-05
**Success Criteria** (what must be TRUE):
  1. Client can open the CRM on his phone, search for any customer, and see their full timeline (orders, emails, form submissions, notes)
  2. Staff (wife, EA) can access the CRM to view customers and send communications without having WordPress admin access
  3. Contact form submissions and emails automatically appear in the customer's CRM timeline
  4. Existing customer data from GoHighLevel has been migrated and is searchable in the new CRM
  5. The admin dashboard shows a clean summary of pending/overdue/completed orders with click-through to details and basic sales analytics
**Plans**: TBD

Plans:
- [ ] 05-01: CRM core — customer data, timeline, communication, mobile-friendly interface
- [ ] 05-02: CRM data migration from GoHighLevel and contact form routing
- [ ] 05-03: Admin dashboard polish — simplified views, analytics, role-based access

**Client issues addressed:** F1, F2, F3, F4, F5 (info), F6, H1, H3

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5

| Phase | Plans Complete | Status | Completed |
|-------|---------------|--------|-----------|
| 1. Audit, Security & Infrastructure | 0/3 | Not started | - |
| 2. Payments & Order Flow | 0/4 | Not started | - |
| 3. Users, Pricing & Affiliate System | 0/3 | Not started | - |
| 4. Shipping Automation & Inventory | 0/3 | Not started | - |
| 5. CRM & Admin Polish | 0/3 | Not started | - |

---
*Roadmap created: 2026-04-09*
*Last updated: 2026-04-09*
