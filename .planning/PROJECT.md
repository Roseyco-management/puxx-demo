# Puxx — Custom E-Commerce Platform

## What This Is

A multi-region e-commerce platform for Puxx, a nicotine pouch brand operating in Canada, UK, and US. Three identical WooCommerce sites (puxxpouches.ca, puxxpouches.uk, puxxpouches.com) with custom features — built by previous developers, partially functional, inherited by RoseyCo. The project covers fixing and launching the sites, building a CRM, and automating fulfilment workflows.

## Current State

**v0.1 Demo shipped 2026-04-11.** Deployed at puxx-demo.vercel.app.

Built: multi-region storefront (CA/UK/US), admin dashboard, retailer portal, fulfilment queue, affiliate preview, customer account, CRM stub. 7 phases, 24 plans, 141 commits, 297 TypeScript files, ~73k lines. 8 rounds of Codex adversarial review.

**UAT findings (2026-04-11):** 16 gaps documented in `.planning/phases/07-demo-bugfix/07-UAT.md`. Critical: storefront design below puxxcanada.ca quality, product data model wrong (should be flavours as products with strength variants), product images missing, Server Components crash on product pages. Admin portal structurally good but needs mock data and UX simplification.

**Next milestone: v0.2 Demo Polish** — not yet defined. Needs storefront redesign using puxxcanada.ca as reference, product model restructure, admin mock data, route cleanup.

## Core Value

The three e-commerce sites must process orders end-to-end — from checkout through payment, fulfilment assignment, shipping, and customer notification — without manual intervention on the happy path.

## Requirements

### Validated

- ✅ Multi-region routing (CA/UK/US) from single Next.js app — v0.1
- ✅ Admin dashboard with orders, customers, products management — v0.1
- ✅ Retailer portal with order history and invoice downloads — v0.1
- ✅ Fulfilment queue with mark-as-shipped workflow — v0.1
- ✅ Customer account with order history and referral codes — v0.1
- ✅ Affiliate preview dashboard — v0.1
- ✅ CRM customer profile stub — v0.1
- ✅ Age verification gate on checkout — v0.1
- ✅ Mobile responsiveness across key views — v0.1
- ⚠️ Product catalogue (12 flavours displayed, but data model needs restructure for v0.2) — v0.1 partial

### Active

- [ ] Fix order flow across all three WooCommerce sites (checkout → payment → processing → fulfilment → tracking → complete)
- [ ] Integrate gift card payment plugin on Canadian site (third-party credit card workaround for nicotine restrictions)
- [ ] Fix WorldPay integration on UK site (60-second timeout issue)
- [ ] Implement two-tier residual referral/affiliate system with separate wholesale and retail codes
- [ ] Enable custom pricing per wholesale account (replace coupon code workaround)
- [ ] Fix user roles (retail customer, wholesale customer, fulfilment team)
- [ ] Standardise language/terminology across platform (inconsistent from original Sri Lankan dev team)
- [ ] Fix custom admin dashboard (order click-through, analytics, clean layout)
- [ ] Wholesale account document verification (business ID, trade licence upload on signup)
- [ ] Geo-based order assignment to nearest distributor with stock checks
- [ ] Bank transfer orders: manual admin approval flow before processing
- [ ] Automated transactional emails at each order stage
- [ ] Set up hosting, maintenance, and uptime monitoring for all sites
- [ ] Build basic CRM (customer data, email/phone comms, interaction history, mobile-friendly)
- [ ] Migrate customer data from GoHighLevel (white-label: OpenDoors)
- [ ] Staff CRM access without WordPress admin access
- [ ] Automate shipping/fulfilment workflow (Freightcom intermediary for CA/US, ShipStation direct for UK)
- [ ] Inventory management with low-stock alerts and reorder list automation

### Out of Scope

- POS integration for retail stores — future phase, requires per-store customisation
- Native mobile app — web-first, mobile-responsive is sufficient for now
- In-portal card payments via Stripe — Stripe permanently banned nicotine products
- Self-serve kiosks / physical payment terminals — not relevant to current operations
- Advanced CRM features (email campaigns, marketing automations) — wife/EA handle this later
- Predictive reorder analytics — nice-to-have, defer until order history data exists
- Banking/licensing management platform (paytrion.com) — placeholder only, not in scope

## Context

**Client situation:** Founder runs the business primarily from his phone. Previous developers (original Sri Lankan team + AJ) spent ~7 months without delivering a working platform. Client has trust issues with developers due to unauthorised spending by original team and broken promises from AJ. Client values transparency, simplicity, and things that just work.

**Technical inheritance:** Three cloned WooCommerce sites with custom dashboard, custom affiliate system, stock management, and geo-routing. Built by at least two different dev teams with inconsistent code quality and terminology. Unknown exactly what works — needs hands-on audit.

**Payment complexity:**
- Canada/US: Stripe banned. Using gift card workaround via third-party site. Plugin built by friend's dev team — their side works, needs integration on WooCommerce side.
- UK: WorldPay approved and set up. Integration timing out at 60s. Client believes server-side routing issue. WorldPay tech team available for direct contact.
- Bank transfer: Available all regions, requires manual admin approval.

**Shipping complexity:**
- Canada/US: Freightcom. Cannot integrate directly — shipper must not know product is nicotine. Needs intermediary approach.
- UK: ShipStation. Can integrate directly — fully licensed, auto-upload tracking on label creation.

**Key people:**
- Client (Fez) — founder, uses phone for everything, non-technical
- Wife + EA — marketing, automations, email campaigns
- Alan (AJ) — previous developer, has current CRM and website access (being transitioned out)
- Friend's dev team — built gift card payment plugin, available for integration support
- WorldPay tech team — available for UK payment integration

**Dummy sites that just need to stay up:**
- PucksCanada.com — legitimacy for banking/corporation
- Upcoming product landing page — AI-generated placeholder
- Payment platform site (paytrion.com) — logo is real, content is placeholder

## Constraints

- **Payment:** Stripe is permanently banned for nicotine — must use gift card workaround (CA/US) and WorldPay (UK)
- **Shipping privacy:** Freightcom must not know product is nicotine (CA/US) — requires intermediary or obfuscation layer
- **Platform:** Built on WooCommerce — client expects fixes to existing platform, not a rebuild
- **Hosting:** All sites on SiteGround (client's account)
- **Mobile:** Client does everything on phone — all admin/CRM interfaces must be mobile-friendly
- **Trust:** Client burned by two previous dev teams — deliver incrementally, communicate clearly, no surprises
- **Regional:** Different currencies, payment methods, shipping providers, and referral rules per country

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Fix existing WooCommerce platform rather than rebuild | Platform is partially built, client wants it working ASAP, rebuild would take too long | — Pending |
| Separate referral codes for wholesale vs retail | Different commission structures and rules per type, single code doesn't work | — Pending |
| AffiliateWP NOT installed — system is fully custom | API audit confirmed no AffiliateWP. "Pouches Worldwide" plugin (Amaan Azkar) handles affiliate, wholesale approvals, consignment loans | — Confirmed |
| Gift card payment workaround for CA/US | Only viable option after Stripe ban, friend's team has built the plugin. Also researching AllayPay as proper nicotine payment processor | — Pending |
| CRM: build custom vs migrate to existing platform | Client wants basics first (data, comms, history), then add features — approach TBD after audit | — Pending |
| Plan A vs Plan B | Plan A = fix WooCommerce (what client asked for). Plan B = custom build using puxxireland stack (Next.js/Supabase). Presenting both to client. | ✅ Plan B chosen — demo built on Next.js/Supabase |
| AllayPay over Tower Payments | Tower has only 13 Trustpilot reviews, poor web presence. AllayPay has better website, explicit nicotine pouch support, API integrations | — Pending |

## Pricing & Commercial

- **Retainer:** £2,000/month for 6 months = £12,000 total
- **Payment:** Installments, first payment after detailed breakdown delivered
- **Original Elevateo proposal:** 9 modules at £28,000 — ALL 9 modules included at reduced price
- **Phase 1 target:** 1-2 weeks for e-commerce sites working
- **Full 9-module delivery:** 6 months
- **Client status:** Not yet paid. Wants detailed breakdown + timeline before committing.

**All 9 original modules are included:**
1. Order Automation (Month 1)
2. CRM & Contact Management (Month 4)
3. Retailer Portal — B2B Ordering (Month 2)
4. Smart Reorder Automation (Month 3)
5. Inventory Management (Month 3)
6. Invoicing & Payments (Month 2)
7. Shipping & Fulfilment Dashboard (Month 3)
8. Communication Hub (Month 4)
9. Reporting & Analytics (Month 5-6)

## Strategic Context

**Two paths under consideration:**
- **Plan A (WooCommerce Fix):** Fix three existing WP sites. Faster perceived start, client has sunk cost. Limited by WP ecosystem, three separate backends.
- **Plan B (Custom Build):** Fork puxxireland (Next.js 15/Supabase/WorldPay). Single backend for all regions, domain routing. Already has age verification, admin dashboard, checkout. Better long-term but needs to be "sold" to client.

**Existing assets:**
- `puxxireland` — production-ready Puxx e-commerce site (Ireland) on Next.js/Supabase. Has age verification, admin dashboard, full checkout, WorldPay integration.
- `Blue Pillar` — multi-tenant e-commerce framework with affiliate system, investor portal, admin portal.
- Both can be adapted for Puxx CA/UK/US.

---
*Last updated: 2026-04-11 after v0.1 Demo milestone shipped*
