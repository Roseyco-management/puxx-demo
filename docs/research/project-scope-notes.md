# Puxx — Project Scope Notes
*Compiled from discovery call — 08 April 2026*

---

## Business Overview

Puxx is a nicotine pouch brand operating across three regions:
- **Canada** (primary / most developed)
- **UK** (licensed, compliant, ready to launch pending payment fix)
- **US** (in development)

Three separate WooCommerce sites with identical architecture, different currencies and payment providers. Custom platform was built (not fully functional) — we are inheriting this from previous developers.

---

## Sites

| Domain | Purpose | Status |
|--------|---------|--------|
| Puxx.ca | Canada e-commerce (main) | Custom platform built, not fully working |
| Puxx.co.uk | UK e-commerce | Custom platform built, WorldPay integration broken |
| Puxx.com | US e-commerce | Custom platform built, not launched |
| PucksCanada.com | Dummy — legitimacy/banking | Must stay up, no changes needed |
| [Upcoming product] | Landing page placeholder | Must stay up |
| [Payment platform] | Logo only, future banking product | Must not be empty |

All e-commerce sites hosted on SiteGround (client's account).

---

## Current Platform Architecture

Built on **WooCommerce** with custom additions:
- Custom admin dashboard (not standard WP admin)
- Custom affiliate/referral system (originally bespoke, AJ was switching to AffiliateWP)
- Custom user roles: retail customer, wholesale customer, fulfilment team
- Stock management — auto-deducts on order, checks distributor stock before assignment
- Geo-routing — assigns orders to nearest distributor by postal code

**Status:** Partially built. Some features exist but are broken or incomplete (e.g. order detail click-through was broken, may now be fixed). Unknown exactly what works — needs audit on first access.

---

## Payment Situation (Complex)

### Canada/US — Gift Card Workaround
Stripe banned nicotine products. Current solution:
- Third-party site sells "gift cards" for Puxx
- Customer pays credit card on Puxx site → routes to third-party → gift card issued → redeems on Puxx site
- Custom plugin built by friend's dev team to handle the communication
- **Problem:** Plugin not integrated on Puxx side. Previous team failed for 3 weeks. Their team has fixed their end — we just need to integrate the plugin on WooCommerce.

### UK — WorldPay
- WorldPay account set up and approved (nicotine is fine in UK — fully licensed)
- Integration timing out at 60 seconds
- WorldPay blames our server routing; previous dev team blamed WorldPay
- Client sides with WorldPay — standard WooCommerce + GBP + UK should work fine
- We take over and fix it, working directly with WorldPay tech team

### Bank Transfer
- Available in all regions
- Comes to admin for manual approval (payment must be confirmed before processing)

---

## Order Flow (Target State)

```
Customer places order
  ↓
Credit card → third-party gift card flow (CA/US) or WorldPay (UK)
  ↓
Payment confirmed → order auto-moves to "Processing"
  ↓
Auto-assigned to nearest distributor with sufficient stock
  ↓
Fulfilment team notified via dashboard
  ↓
Team ships, adds tracking number, marks complete
  ↓
Customer auto-emailed tracking info
```

Bank transfer orders: pause at "awaiting payment" for manual admin approval first.

---

## Referral / Affiliate System (2-Tier)

- Every account auto-issued TWO codes on registration: one wholesale, one retail
- Codes are randomly generated
- When a customer uses a code, they are permanently linked to that referrer (residual for life)
- 2-tier: if Referrer A → Customer B → Customer C, then A gets commission on C too (but only 2 tiers deep)
- Commission rates are **adjustable per account** (e.g. influencer deals get custom rates)
- Rules differ by country:
  - Canada: 100 tins minimum
  - UK: 50 tins minimum
- Previously: one unified code (broken). Needs to be two separate codes with separate logic.

---

## Shipping

| Region | Platform | Integration |
|--------|---------|-------------|
| Canada | Freightcom | Cannot integrate directly — shipper can't know product. Needs intermediary. Freightcom thinks it's a different company. |
| US | Freightcom | Same as Canada |
| UK | ShipStation | Can integrate directly — fully licensed. Auto-upload tracking on label creation. |

Current manual process (Canada): check order → copy name → go to Gmail → find email → reply → go back → copy tracking → paste → send. For every single order.

---

## CRM Requirements

Starting simple — migrating from GoHighLevel (white-label):
- Customer data storage
- Email + phone communication
- Full interaction history per customer (contact forms, emails, calls)
- Mobile-friendly (client primarily uses phone)
- Staff access without WP admin access (wife + EA handle marketing/automations)
- Add-ons later: automations, email campaigns, advanced workflows

---

## Inventory Management

- Auto-deduct on purchase (already partially built in platform)
- Low-stock alerts at configurable threshold (e.g. 20%)
- Auto-reorder trigger (ideal state)
- Eventually: POS integration for retail stores (future phase)
- UK retailers: inventory management is a key selling point — makes reordering from Puxx easier

---

## Key People

| Person | Role |
|--------|------|
| Client | Founder / owner |
| Wife | Marketing (automations, email campaigns, videos) |
| EA | Marketing support |
| Alan (AJ) | Previous developer — has current access to CRM and websites |
| [Friend's dev team] | Built gift card payment plugin — we liaise with them for CA integration |
| WorldPay tech team | UK payment — client will connect us directly |

---

## Priorities (Client's Order)

1. Fix three e-commerce sites — order flow, payments, referral system, custom pricing, user roles, fulfilment
2. Gift card payment integration (Canada)
3. WorldPay integration (UK)
4. Hosting + maintenance + uptime monitoring for all sites
5. CRM — basic setup / migrate from GHL
6. Automate shipping/fulfilment workflow
7. Inventory management with low-stock alerts

---

## Red Flags / Watch Points

- Previous developers spent unauthorised funds (thousands of dollars) — client has trust issues with developers, understandably
- AJ (previous dev) promised "large company" + full tech management — did not deliver over ~7 months
- Platform is partially built by at least two different dev teams — expect inconsistent code quality, mixed terminology, incomplete features
- Need to audit exactly what works before making any promises on timeline
- Gift card payment workaround is legally grey — document carefully, keep Freightcom details separate
- Stripe ban is permanent for nicotine — do not attempt to re-use Stripe
