# Requirements: Puxx E-Commerce Platform

**Defined:** 2026-04-08
**Core Value:** The three e-commerce sites must process orders end-to-end — from checkout through payment, fulfilment assignment, shipping, and customer notification — without manual intervention on the happy path.

## v1 Requirements

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

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Growth & Analytics

- **GROW-01**: Predictive reorder analytics based on retailer ordering patterns
- **GROW-02**: POS integration for retail stores (requires per-store customisation)
- **GROW-03**: Advanced email marketing campaigns and automations (wife/EA will manage)
- **GROW-04**: Sales reports by product, retailer, region, and time period
- **GROW-05**: Self-serve wholesale retailer portal with one-click reorder

### Platform Expansion

- **PLAT-01**: Native mobile app (iOS/Android)
- **PLAT-02**: WhatsApp Business API integration for retailer communication
- **PLAT-03**: In-portal card payments (if a non-restricted processor becomes available)
- **PLAT-04**: Banking/licensing management platform (paytrion.com)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Stripe integration | Permanently banned for nicotine products — do not attempt |
| WordPress Multisite | Three independent installs is correct for different currencies, payment gateways, and regulations |
| Physical payment terminals / kiosks | Not relevant to current operations |
| Rebuilding from scratch | Client expects fixes to existing WooCommerce platform, not a replatform |
| Direct Freightcom API integration | Shipper must not know product is nicotine — requires intermediary |
| GoHighLevel ongoing usage | Migrating away — replacing with purpose-built CRM |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| AUDIT-01 | Phase 1 | Pending |
| AUDIT-02 | Phase 1 | Pending |
| AUDIT-03 | Phase 1 | Pending |
| AUDIT-04 | Phase 1 | Pending |
| AUDIT-05 | Phase 1 | Pending |
| AUDIT-06 | Phase 1 | Pending |
| PAY-01 | Phase 2 | Pending |
| PAY-02 | Phase 2 | Pending |
| PAY-03 | Phase 2 | Pending |
| PAY-04 | Phase 2 | Pending |
| PAY-05 | Phase 2 | Pending |
| PAY-06 | Phase 2 | Pending |
| ORD-01 | Phase 2 | Pending |
| ORD-02 | Phase 2 | Pending |
| ORD-03 | Phase 2 | Pending |
| ORD-04 | Phase 2 | Pending |
| ORD-05 | Phase 2 | Pending |
| ORD-06 | Phase 2 | Pending |
| ROLE-01 | Phase 3 | Pending |
| ROLE-02 | Phase 3 | Pending |
| ROLE-03 | Phase 3 | Pending |
| ROLE-04 | Phase 3 | Pending |
| ROLE-05 | Phase 3 | Pending |
| AFF-01 | Phase 3 | Pending |
| AFF-02 | Phase 3 | Pending |
| AFF-03 | Phase 3 | Pending |
| AFF-04 | Phase 3 | Pending |
| AFF-05 | Phase 3 | Pending |
| AFF-06 | Phase 3 | Pending |
| SHIP-01 | Phase 4 | Pending |
| SHIP-02 | Phase 4 | Pending |
| SHIP-03 | Phase 4 | Pending |
| SHIP-04 | Phase 4 | Pending |
| SHIP-05 | Phase 4 | Pending |
| SHIP-06 | Phase 1 | Pending |
| CRM-01 | Phase 5 | Pending |
| CRM-02 | Phase 5 | Pending |
| CRM-03 | Phase 5 | Pending |
| CRM-04 | Phase 5 | Pending |
| CRM-05 | Phase 5 | Pending |
| HOST-01 | Phase 1 | Pending |
| HOST-02 | Phase 1 | Pending |
| HOST-03 | Phase 1 | Pending |
| HOST-04 | Phase 1 | Pending |

**Coverage:**
- v1 requirements: 44 total
- Mapped to phases: 44
- Unmapped: 0

**Client issue coverage (CLIENT-ISSUES.md):**
- Total issues: 53 (A1-J5)
- Actionable issues mapped: 40+
- INFO-only items (A3, C6, E4, F5, J1, J2, J4, J5): acknowledged, no standalone work required

---
*Requirements defined: 2026-04-08*
*Last updated: 2026-04-09 after roadmap creation — traceability populated*
