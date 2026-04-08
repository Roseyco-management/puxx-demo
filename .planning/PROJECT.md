# Puxx — Custom E-Commerce Platform

## What This Is

A multi-region e-commerce platform for Puxx, a nicotine pouch brand operating in Canada, UK, and US. Three identical WooCommerce sites (puxxpouches.ca, puxxpouches.uk, puxxpouches.com) with custom features — built by previous developers, partially functional, inherited by RoseyCo. The project covers fixing and launching the sites, building a CRM, and automating fulfilment workflows.

## Core Value

The three e-commerce sites must process orders end-to-end — from checkout through payment, fulfilment assignment, shipping, and customer notification — without manual intervention on the happy path.

## Requirements

### Validated

(None yet — ship to validate)

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
| Use AffiliateWP vs custom affiliate system | AJ claimed AffiliateWP covers all needs — needs verification on first access | — Pending |
| Gift card payment workaround for CA/US | Only viable option after Stripe ban, friend's team has built the plugin | — Pending |
| CRM: build custom vs migrate to existing platform | Client wants basics first (data, comms, history), then add features — approach TBD after audit | — Pending |

---
*Last updated: 2026-04-08 after initialization*
