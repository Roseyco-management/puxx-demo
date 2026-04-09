# Requirements: Puxx E-Commerce Platform

**Defined:** 2026-04-08
**Core Value:** The three e-commerce sites must process orders end-to-end — from checkout through payment, fulfilment assignment, shipping, and customer notification — without manual intervention on the happy path.

---

## Milestone v0.1 — Demo Requirements

**Goal:** Pre-sales frontend demo to close the client deal. Complete frontend coverage of the full platform vision — storefront, checkout, admin, retailer portal, fulfilment, CRM preview, and affiliate system.

**Source codebases:** puxxireland (storefront/checkout/WorldPay), Blue Pillar (portals/affiliate), TailAdmin Pro (dashboards)

### Multi-Region

- [ ] **REG-01**: Visiting puxxpouches.ca, puxxpouches.co.uk, or puxxpouches.com routes to the same app with the correct regional config (currency, payment method)
- [ ] **REG-02**: Region selector visible on storefront and switches displayed currency between CAD, GBP, and USD

### Products

- [ ] **PROD-01**: Product catalogue displays 12 flavour variants, each with 6 strength options, at correct base pricing
- [ ] **PROD-02**: Individual product detail page with flavour/strength selector, images, and add-to-cart

### Checkout

- [ ] **CHKOUT-01**: Age verification gate appears and blocks checkout until user confirms 18+
- [ ] **CHKOUT-02**: Customer can complete an end-to-end checkout for at least one region (WorldPay UK — already integrated in puxxireland)

### Customer Account

- [ ] **CUST-01**: Customer account page shows order history and current order status
- [ ] **CUST-02**: Customer account page shows their two referral codes (retail + wholesale) and commission earned

### Admin Dashboard

- [ ] **ADMIN-01**: Admin can view and browse orders list with status (TailAdmin Pro layout)
- [ ] **ADMIN-02**: Admin can view customer list
- [ ] **ADMIN-03**: Admin can view and manage product catalogue

### Affiliate Preview

- [ ] **AFF-01**: Affiliate dashboard preview shows referral codes, referred customers, and commission summary (read-only — Blue Pillar components)

### Retailer Portal

- [ ] **RETAIL-01**: Retailer portal has branded PUX login, separate from main storefront
- [ ] **RETAIL-02**: Retailer can browse catalogue with wholesale pricing tiers
- [ ] **RETAIL-03**: Retailer can view order history and invoice list

### Fulfilment View

- [ ] **FULFL-01**: Fulfilment team has separate login and sees pending orders queue
- [ ] **FULFL-02**: Fulfilment team can mark an order as shipped from their dashboard

### CRM Preview

- [ ] **CRM-01**: Customer profile page shows contact info, order timeline, and stubbed communication history (read-only preview)

### Mobile

- [ ] **MOB-01**: All key views (storefront, checkout, customer account, admin, retailer portal, fulfilment) are mobile-responsive

**Coverage:** 18 requirements across 9 areas

---

## v1 Requirements (Post Sign-Off)

The full 6-phase platform build begins when the client pays. All 9 original modules from the Elevateo proposal are included at £2,000/month × 6 months.

Requirements for initial release. Each maps to roadmap phases.

### Audit & Foundation

- [ ] **AUDIT-01**: Full codebase audit across all three sites — inventory plugins, hooks, custom code, divergence between sites
- [ ] **AUDIT-02**: Stand up staging environment for US site (primary development target, then clone to CA/UK)
- [ ] **AUDIT-03**: Revoke previous developer (AJ) access and rotate all credentials before development begins
- [ ] **AUDIT-04**: Replace SiteGround WP-Cron with real server cron for reliable background job execution
- [ ] **AUDIT-05**: Upgrade PHP to 8.3 on all sites (8.1/8.2 EOL December 2025)
- [ ] **AUDIT-06**: Document existing custom code — every hook, plugin, and modification across the three sites

### Payments

- [ ] **PAY-01**: Fix WorldPay integration on UK site — debug 60s timeout, fix callback URL routing, verify with WorldPay tech team
- [ ] **PAY-02**: Integrate gift card payment plugin on CA/US sites — connect friend's dev team API, verify paid status callback
- [ ] **PAY-03**: Bank transfer approval flow — orders pause at "awaiting payment" for manual admin confirmation
- [ ] **PAY-04**: Implement age verification gate at checkout — pre-purchase ID verification (US PACT Act compliance, UK 18+ requirement)
- [ ] **PAY-05**: Research alternative payment solutions for nicotine e-commerce — investigate how snus, nicotine pouch, and vape companies handle payments at scale
- [ ] **PAY-06**: Payment flow must be fully automated on the happy path — no manual steps between customer payment and order processing

### Order Flow

- [ ] **ORD-01**: End-to-end order processing works: checkout → payment confirmation → processing → fulfilment assignment → shipping → tracking → complete
- [ ] **ORD-02**: Automated transactional emails at each order stage (order placed, payment confirmed, shipped with tracking, delivered)
- [ ] **ORD-03**: Fix custom admin dashboard — order click-through to details, sales analytics, clean pending/overdue/completed layout
- [ ] **ORD-04**: Geo-based distributor assignment — auto-assign orders to nearest distributor by postal code with stock availability check
- [ ] **ORD-05**: Order status visible to fulfilment team on their dashboard within their user role
- [ ] **ORD-06**: Fulfilment team can upload tracking number and mark order complete from their dashboard

### Users & Roles

- [ ] **ROLE-01**: Three distinct user roles with scoped access: retail customer, wholesale customer, fulfilment team
- [ ] **ROLE-02**: Wholesale account signup requires business document upload (business ID, trade licence) for verification
- [ ] **ROLE-03**: Custom pricing enabled per wholesale account — replacing coupon code workaround
- [ ] **ROLE-04**: Standardise terminology across entire platform — fix inconsistent language from original dev team
- [ ] **ROLE-05**: Guest checkout available for retail customers who don't want to create an account

### Affiliate & Referral

- [ ] **AFF-01**: Every account auto-issued two separate referral codes on registration: one wholesale, one retail
- [ ] **AFF-02**: Referral codes are randomly generated and permanently link referred customer to referrer (residual for life)
- [ ] **AFF-03**: Two-tier commission: if A refers B and B refers C, A gets commission on C's purchases (but only 2 tiers deep)
- [ ] **AFF-04**: Commission rates adjustable per individual account (for influencer deals, special arrangements)
- [ ] **AFF-05**: Country-specific referral rules — Canada: 100 tins minimum, UK: 50 tins minimum
- [ ] **AFF-06**: Referral dashboard visible to users showing their codes, referred customers, and commission payouts

### Shipping & Fulfilment

- [ ] **SHIP-01**: ShipStation UK integration — direct API, auto-upload tracking numbers on label creation
- [ ] **SHIP-02**: Freightcom CA/US workflow — intermediary approach where shipper cannot see product is nicotine
- [ ] **SHIP-03**: Inventory auto-deducts on purchase across all sites
- [ ] **SHIP-04**: Low-stock alerts at configurable threshold (e.g. 20% remaining)
- [ ] **SHIP-05**: Automatic reorder list — when stock hits threshold, item is added to a reorder list for manual review
- [ ] **SHIP-06**: Uptime monitoring for all sites with alerts (client was previously unaware of 2-day outage)

### CRM

- [ ] **CRM-01**: Basic CRM with customer data storage, email/phone communication capabilities, and full interaction history per customer
- [ ] **CRM-02**: Migrate existing customer data from GoHighLevel (white-label: OpenDoors at app.opendoors.ai)
- [ ] **CRM-03**: Staff access to CRM without WordPress admin access — wife and EA can manage marketing/automations
- [ ] **CRM-04**: Mobile-friendly CRM interface — client does everything on phone
- [ ] **CRM-05**: Contact form submissions and emails route through CRM for timeline/history tracking

### Hosting & Infrastructure

- [ ] **HOST-01**: Host and maintain all Puxx sites (3 e-commerce + dummy sites)
- [ ] **HOST-02**: SSL certificates active and valid on all domains
- [ ] **HOST-03**: Regular backups with ability to restore
- [ ] **HOST-04**: Performance baseline — sites load in under 3 seconds (currently "super slow" per client)

### Retailer Portal (Module 3)

- [ ] **PORTAL-01**: Branded PUX login portal for retail partners with wholesale tier pricing
- [ ] **PORTAL-02**: Product catalogue with images, descriptions, and wholesale pricing tiers
- [ ] **PORTAL-03**: Simple ordering flow — browse, add to cart, confirm
- [ ] **PORTAL-04**: One-click reorder from previous orders
- [ ] **PORTAL-05**: Order history with status tracking per retailer
- [ ] **PORTAL-06**: Multi-location support — one owner manages all their stores under one login

### Smart Reorder Automation (Module 4)

- [ ] **REORDER-01**: Track each retailer's ordering frequency and patterns
- [ ] **REORDER-02**: Predict when a retailer is due to reorder based on order history
- [ ] **REORDER-03**: Automated outreach when reorder is due (email and/or WhatsApp with one-click reorder link)
- [ ] **REORDER-04**: Follow-up automation if no response (configurable: 2 days, 5 days, etc.)
- [ ] **REORDER-05**: Dashboard showing which retailers are overdue, on track, or recently ordered

### Invoicing & Payments (Module 6)

- [ ] **INV-01**: Automatic invoice generation on order confirmation (branded PDF with PUX logo)
- [ ] **INV-02**: Invoice history per retailer
- [ ] **INV-03**: Payment status tracking (paid, pending, overdue)
- [ ] **INV-04**: Overdue payment reminders (automated email/WhatsApp)
- [ ] **INV-05**: Exportable invoices and payment data for accounting (CSV/PDF)

### Communication Hub (Module 8)

- [ ] **COMMS-01**: WhatsApp Business API integration (send and receive messages)
- [ ] **COMMS-02**: Email integration (send and receive) tied to customer CRM records
- [ ] **COMMS-03**: Conversation history tied to retailer accounts in CRM
- [ ] **COMMS-04**: Template messages for common scenarios (order confirmation, reorder prompt, payment reminder)
- [ ] **COMMS-05**: Bulk messaging for announcements (new products, promotions, price changes)

### Reporting & Analytics (Module 9)

- [ ] **REPORT-01**: Sales reports by product, retailer, region, and time period
- [ ] **REPORT-02**: Top retailers and underperformers dashboard
- [ ] **REPORT-03**: Inventory turnover and demand trends
- [ ] **REPORT-04**: Revenue tracking and growth metrics
- [ ] **REPORT-05**: Exportable reports (CSV/PDF) with visual dashboards and KPIs

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Platform Expansion

- **PLAT-01**: Native mobile app (iOS/Android)
- **PLAT-02**: POS integration for retail stores (requires per-store customisation)
- **PLAT-03**: Banking/licensing management platform (paytrion.com)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Stripe integration | Permanently banned for nicotine products — do not attempt |
| Physical payment terminals / kiosks | Not relevant to current operations |
| Direct Freightcom API integration | Shipper must not know product is nicotine — requires intermediary |
| AllayPay CA/US payment in demo | Demo closes on UX/frontend — real payment integration is Phase 1 |
| Real inventory data in demo | Stubbed/seeded data sufficient for demo purposes |

## Traceability — v0.1 Demo

| Requirement | Phase | Status |
|-------------|-------|--------|
| REG-01 | — | Pending |
| REG-02 | — | Pending |
| PROD-01 | — | Pending |
| PROD-02 | — | Pending |
| CHKOUT-01 | — | Pending |
| CHKOUT-02 | — | Pending |
| CUST-01 | — | Pending |
| CUST-02 | — | Pending |
| ADMIN-01 | — | Pending |
| ADMIN-02 | — | Pending |
| ADMIN-03 | — | Pending |
| AFF-01 | — | Pending |
| RETAIL-01 | — | Pending |
| RETAIL-02 | — | Pending |
| RETAIL-03 | — | Pending |
| FULFL-01 | — | Pending |
| FULFL-02 | — | Pending |
| CRM-01 | — | Pending |
| MOB-01 | — | Pending |

**Coverage:**
- v0.1 requirements: 18 total
- Mapped to phases: 0 (roadmapper to populate)
- Unmapped: 18 ⚠️

---
*Requirements defined: 2026-04-08*
*Last updated: 2026-04-09 — v0.1 Demo requirements added (18 requirements across 9 areas)*
