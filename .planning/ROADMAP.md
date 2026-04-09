# Roadmap: Puxx E-Commerce Platform

## Overview

Build and launch a multi-region e-commerce platform for Puxx (Canada, UK, US) with all 9 modules from the original proposal. £2,000/month retainer for 6 months (£12,000 total). E-commerce sites working within 1-2 months, remaining modules delivered over the retainer period.

**Approach:** Path B (custom build) recommended — single platform for all regions using existing puxxireland codebase. Path A (WordPress fix) documented as fallback.

## Phases

- [ ] **Phase 1: E-Commerce Core + Payments** — Working storefront with checkout, payments (AllayPay CA/US, WorldPay UK, bank transfer), age verification, order flow end-to-end, transactional emails (Weeks 1-4)
- [ ] **Phase 2: Users, Pricing & Affiliate System** — User roles, custom wholesale pricing, document verification, two-tier referral system, fulfilment team dashboard (Weeks 3-6)
- [ ] **Phase 3: Retailer Portal + Invoicing** — Branded B2B ordering portal, one-click reorder, auto invoicing, payment tracking (Weeks 7-10)
- [ ] **Phase 4: Shipping, Inventory & Smart Reorder** — ShipStation UK, Freightcom intermediary CA/US, stock management, low-stock alerts, predictive reorder automation (Weeks 9-14)
- [ ] **Phase 5: CRM & Communication Hub** — Customer data, interaction timeline, WhatsApp + email integration, GHL migration, mobile-first, staff access (Weeks 13-18)
- [ ] **Phase 6: Reporting, Analytics & Polish** — Sales dashboards, retailer performance, KPIs, exportable reports, hosting/monitoring, optimization, handover (Weeks 17-24)

## Module-to-Phase Mapping

| # | Original Module | Phase | Timeline |
|---|----------------|-------|----------|
| 1 | Order Automation | Phase 1 | Weeks 1-4 |
| 2 | CRM & Contact Management | Phase 5 | Weeks 13-18 |
| 3 | Retailer Portal (B2B) | Phase 3 | Weeks 7-10 |
| 4 | Smart Reorder Automation | Phase 4 | Weeks 9-14 |
| 5 | Inventory Management | Phase 4 | Weeks 9-14 |
| 6 | Invoicing & Payments | Phase 3 | Weeks 7-10 |
| 7 | Shipping & Fulfilment Dashboard | Phase 4 | Weeks 9-14 |
| 8 | Communication Hub | Phase 5 | Weeks 13-18 |
| 9 | Reporting & Analytics | Phase 6 | Weeks 17-24 |

## Phase Details

### Phase 1: E-Commerce Core + Payments
**Goal**: A customer can browse products, check out, pay by credit card or bank transfer, and receive order confirmation — across all three regions (CA/UK/US) from a single platform
**Depends on**: Nothing (first phase)
**Timeline**: Weeks 1-4 (Month 1)
**Modules**: Module 1 (Order Automation) + payment integrations + age verification
**Requirements**: AUDIT-01 to 06, PAY-01 to 06, ORD-01 to 06, HOST-01 to 04, SHIP-06
**Success Criteria**:
  1. UK customer pays via WorldPay and order auto-progresses to processing
  2. CA/US customer pays via AllayPay (or alternative nicotine processor) and order auto-progresses
  3. Age verification gate blocks checkout for unverified users
  4. Customer receives automated emails at each order stage
  5. All three domains (puxxpouches.ca, .co.uk, .com) route to the platform with correct regional config
  6. Uptime monitoring active with alerts within 5 minutes of downtime

Plans:
- [ ] 01-01: Platform foundation — fork puxxireland, multi-region routing, products, checkout
- [ ] 01-02: Payment integration — AllayPay (CA/US), WorldPay (UK), bank transfer, age verification
- [ ] 01-03: Order flow — status progression, fulfilment assignment, transactional emails
- [ ] 01-04: Infrastructure — hosting, SSL, backups, uptime monitoring, cron

**Client issues addressed:** A1, A2, A3, A4, A5, A6, B1, B2, B3, B4, B5, I1-I8, J1, J3, H4

### Phase 2: Users, Pricing & Affiliate System
**Goal**: Distinct user types with custom pricing, wholesale document verification, and a working two-tier affiliate system that earns residual commissions
**Depends on**: Phase 1
**Timeline**: Weeks 3-6 (overlaps with end of Phase 1)
**Modules**: Core user/pricing/affiliate features from discovery call
**Requirements**: ROLE-01 to 05, AFF-01 to 06
**Success Criteria**:
  1. Wholesale customers see custom pricing; admin can set per-account prices
  2. Wholesale signup requires document upload; account held for admin verification
  3. Every account auto-issued two referral codes (retail + wholesale) visible on dashboard
  4. Two-tier commission works (A refers B refers C, both A and B earn)
  5. Commission rates adjustable per account and per country
  6. Platform terminology consistent across all pages

Plans:
- [ ] 02-01: User roles, guest checkout, wholesale document verification
- [ ] 02-02: Custom wholesale pricing replacing coupon workaround
- [ ] 02-03: Two-tier affiliate system — codes, residual linking, commissions, payouts

**Client issues addressed:** C1-C7, D1-D4, H2

### Phase 3: Retailer Portal + Invoicing
**Goal**: Retail partners have a branded portal to browse products, place orders, reorder with one click, and receive professional invoices with payment tracking
**Depends on**: Phase 1 (products + checkout), Phase 2 (user roles + pricing)
**Timeline**: Weeks 7-10 (Month 2-3)
**Modules**: Module 3 (Retailer Portal) + Module 6 (Invoicing & Payments)
**Requirements**: PORTAL-01 to 06, INV-01 to 05
**Success Criteria**:
  1. Retailer logs into branded PUX portal and sees wholesale pricing
  2. Retailer can browse catalogue, add to cart, and confirm order in under 60 seconds
  3. One-click reorder from previous orders works
  4. Branded PDF invoice auto-generated on order confirmation
  5. Payment status tracking (paid, pending, overdue) visible to admin
  6. Overdue payment reminders sent automatically

Plans:
- [ ] 03-01: Retailer portal — branded login, catalogue, ordering flow, order history
- [ ] 03-02: Invoicing system — auto-generation, PDF branding, payment tracking, reminders

**Client issues addressed:** Original Module 3 + Module 6 features

### Phase 4: Shipping, Inventory & Smart Reorder
**Goal**: Shipping is automated (ShipStation UK, Freightcom intermediary CA/US), stock levels track accurately with low-stock alerts, and the smart reorder engine predicts when retailers need to restock
**Depends on**: Phase 1 (order flow), Phase 2 (fulfilment roles), Phase 3 (retailer data)
**Timeline**: Weeks 9-14 (Month 3-4)
**Modules**: Module 4 (Smart Reorder) + Module 5 (Inventory) + Module 7 (Shipping Dashboard)
**Requirements**: SHIP-01 to 05, REORDER-01 to 05
**Success Criteria**:
  1. ShipStation label creation auto-uploads tracking to platform and notifies customer
  2. CA/US orders ship via Freightcom intermediary without exposing nicotine product type
  3. Stock auto-deducts on purchase with accurate availability displayed
  4. Low-stock items appear on reorder list at configurable threshold
  5. Smart reorder predicts when retailers are due to reorder and sends automated outreach
  6. Reorder dashboard shows overdue, on-track, and recently ordered retailers

Plans:
- [ ] 04-01: ShipStation UK integration + Freightcom CA/US intermediary
- [ ] 04-02: Inventory management — stock tracking, low-stock alerts, reorder list
- [ ] 04-03: Smart reorder engine — pattern tracking, predictions, automated outreach

**Client issues addressed:** E1-E5, G1-G3, Original Module 4 + 5 + 7 features

### Phase 5: CRM & Communication Hub
**Goal**: Client and staff can look up any customer, see full history, communicate via email and WhatsApp, all from a mobile-first interface without needing admin backend access
**Depends on**: Phase 1 (customer data), Phase 3 (retailer data)
**Timeline**: Weeks 13-18 (Month 4-5)
**Modules**: Module 2 (CRM) + Module 8 (Communication Hub)
**Requirements**: CRM-01 to 05, COMMS-01 to 05
**Success Criteria**:
  1. Client can search any customer on phone and see full timeline (orders, emails, WhatsApp, notes)
  2. Staff access CRM without admin backend access
  3. WhatsApp Business API sends and receives messages tied to customer records
  4. Template messages for order confirmation, reorder prompts, payment reminders
  5. GoHighLevel data migrated and searchable
  6. Bulk messaging for announcements works

Plans:
- [ ] 05-01: CRM core — customer data, timeline, communication, mobile-first
- [ ] 05-02: WhatsApp + email integration, conversation history, templates, bulk messaging
- [ ] 05-03: GHL data migration, contact form routing, staff access

**Client issues addressed:** F1-F6, Original Module 2 + 8 features

### Phase 6: Reporting, Analytics & Polish
**Goal**: Data-driven dashboards showing sales, stock, and retailer performance with exportable reports — plus final optimization, documentation, and handover
**Depends on**: All previous phases (data must exist)
**Timeline**: Weeks 17-24 (Month 5-6)
**Modules**: Module 9 (Reporting & Analytics) + admin polish + handover
**Requirements**: REPORT-01 to 05
**Success Criteria**:
  1. Sales reports by product, retailer, region, and time period
  2. Top retailers and underperformers visible on dashboard
  3. Revenue tracking and growth metrics displayed with visual charts
  4. All reports exportable as CSV/PDF
  5. Admin dashboard shows clean pending/overdue/completed orders
  6. Full documentation and handover complete

Plans:
- [ ] 06-01: Reporting dashboards — sales, inventory, retailer performance, KPIs
- [ ] 06-02: Admin dashboard polish — simplified views, analytics, role-based access
- [ ] 06-03: Optimization, documentation, training, handover

**Client issues addressed:** H1, H3, Original Module 9 features

## Progress

**Execution Order:**
Phases 1-2 overlap slightly. Phases 3-6 are sequential with some overlap.

| Phase | Plans Complete | Status | Timeline |
|-------|---------------|--------|----------|
| 1. E-Commerce Core + Payments | 0/4 | Not started | Weeks 1-4 |
| 2. Users, Pricing & Affiliate | 0/3 | Not started | Weeks 3-6 |
| 3. Retailer Portal + Invoicing | 0/2 | Not started | Weeks 7-10 |
| 4. Shipping, Inventory & Smart Reorder | 0/3 | Not started | Weeks 9-14 |
| 5. CRM & Communication Hub | 0/3 | Not started | Weeks 13-18 |
| 6. Reporting, Analytics & Polish | 0/3 | Not started | Weeks 17-24 |

---
*Roadmap created: 2026-04-09*
*Last updated: 2026-04-09 — expanded to all 9 modules, compressed timeline*
