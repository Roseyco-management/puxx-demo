# Puxx Platform — Detailed Plan & Timeline

**Prepared for:** Fez (Puxx)
**Prepared by:** RoseyCo
**Date:** 9 April 2026

---

## What We Found

We've audited your WordPress site (puxxpouches.com), reviewed every system, and gone through your discovery call in detail. Here's what we're working with:

### Current State

**Your platform has 12 products set up correctly** (all 12 flavours with 6 strength variations each), custom user roles (retailer, wholesale), and a custom admin panel ("Pouches Worldwide") that handles wholesale approvals, referrals, and consignment loans. The bones are there.

**But nothing works end-to-end.** Here's what we found:

| Area | Status | Impact |
|------|--------|--------|
| Credit card payments | Not working on any site | No sales possible via card |
| WorldPay (UK) | Installed but timing out at 60 seconds | UK launch completely blocked |
| Gift card payment plugin | Not installed on any site | Canada/US card payments blocked |
| Order flow | Built but never completed end-to-end | Orders don't auto-progress to fulfilment |
| Fulfilment team dashboard | Partially built, notifications broken | Manual process for every order |
| Referral codes | Single unified code, needs two (retail + wholesale) | Can't differentiate commission structures |
| Custom pricing | Not active — everyone sees the same price ($6) | Coupon workaround not scalable |
| Stock management | OFF on all 12 products | No inventory tracking at all |
| Shipping integrations | None installed | Everything is manual |
| Age verification | None | Legal requirement for nicotine |
| Uptime monitoring | None | Site was down 2 days without you knowing |
| Stripe plugin | Still installed (but banned) | Wasting resources |

**24 active plugins**, a custom "Pouches Worldwide" plugin handling core business logic, built by at least two different dev teams with inconsistent code. WordPress 6.9.4 and WooCommerce 10.6.2 are current. PHP 8.3 is running. The infrastructure is fine — the application layer is what's broken.

### Your Priority List (From Our Call)

We heard you. This is what you said matters, in order:

1. Fix the three e-commerce sites — make them work
2. Credit card payments working (gift card for Canada, WorldPay for UK)
3. Hosting, maintenance, uptime monitoring — no more 2-day outages
4. Affiliate/referral system with two codes, two tiers, adjustable rates
5. Custom pricing per wholesale account
6. Shipping automation — eliminate the manual copy-paste-email process
7. Basic CRM — customer data, communication history, mobile-friendly
8. Inventory management with low-stock alerts

**"The CRM is not the main goal — it's a byproduct. Get the sites working first."** — We agree completely.

---

## Two Paths Forward

We've identified two approaches. Both deliver the same end result. The difference is how we get there and what you're left with.

---

### Path A: Fix Your WordPress Sites

**What:** Take the three existing WooCommerce sites, fix everything that's broken, connect the payment integrations, build out the missing features.

**Timeline:** 6 months

| Month | What Gets Done | You See |
|-------|---------------|---------|
| **Month 1** | Audit all three sites. Revoke previous developer access. Set up staging. Fix WorldPay (UK). Integrate gift card payment (CA/US). Fix order flow end-to-end. Set up uptime monitoring. | Sites accepting payments. Orders flowing to fulfilment. UK ready to launch. |
| **Month 2** | User roles (retail, wholesale, fulfilment). Custom pricing per account. Two-tier affiliate/referral system. Wholesale document verification. Terminology cleanup. | Custom pricing live. Affiliate codes working. Wholesale signup requires business docs. |
| **Month 3** | ShipStation integration (UK). Freightcom intermediary workflow (CA/US). Inventory tracking. Low-stock alerts. | Shipping automated. Stock levels tracking. Reorder list working. |
| **Month 4** | Basic CRM — customer data, communication history. GoHighLevel data migration. Mobile-friendly interface. | Search any customer, see their full history on your phone. |
| **Month 5** | Staff CRM access. Contact form routing. Admin dashboard polish. Sales analytics. | Wife and EA using CRM without WordPress access. Clean dashboard. |
| **Month 6** | Testing, optimization, performance. Edge cases. Documentation. Handover. | Everything polished and stable. |

**Cost:** GBP 2,000/month x 6 months = GBP 12,000

**What you keep:** Three separate WordPress/WooCommerce sites, each with its own backend, managed through WordPress admin.

**Honest assessment:** This works. It gets you live. But you're maintaining three separate systems, dealing with WordPress plugin updates, and every new feature means finding a plugin or writing custom PHP. The admin experience is WordPress — which you've told us you find confusing.

---

### Path B: One Modern Platform for All Regions

**What:** Instead of fixing three broken WordPress sites, we build one modern platform that handles Canada, UK, and US from a single system. Same domains (puxxpouches.ca, .co.uk, .com) — they all point to one platform that automatically shows the right currency, payment methods, and shipping options based on region.

**Built on:** The same technology we used to build [Puxx Ireland](https://puxxireland.com) — which already has a working checkout, age verification, admin dashboard, and WorldPay integration.

**Timeline:** 6 months (same as Path A)

| Month | What Gets Done | You See |
|-------|---------------|---------|
| **Month 1** | Adapt the existing Puxx Ireland platform for multi-region (CA/UK/US). Products, checkout, age verification, WorldPay (UK). Set up domain routing. | A working site you can click through. Checkout works. Age verified. |
| **Month 2** | Payment integration (AllayPay for CA/US — a proper nicotine payment processor, no gift card workaround needed). Bank transfer. Order flow end-to-end. Fulfilment dashboard. | Payments processing. Orders flowing. Fulfilment team has their own view. |
| **Month 3** | Two-tier affiliate/referral system. Custom pricing per account. Wholesale signup with document verification. User roles. | Affiliate codes live. Custom pricing working. Wholesale verification in place. |
| **Month 4** | Shipping integrations (ShipStation UK direct, Freightcom intermediary CA/US). Inventory management. Low-stock alerts. | Shipping automated. Stock tracking. Reorder list. |
| **Month 5** | CRM built into the platform. Customer timeline, communication history, staff access. Mobile-first. GoHighLevel migration. | Full CRM on your phone. Staff access without admin backend. |
| **Month 6** | Analytics dashboard. Performance optimization. Documentation. Handover. | Clean dashboard with sales data. Everything polished. |

**Cost:** GBP 2,000/month x 6 months = GBP 12,000 (same price)

**What you keep:** One modern platform. One login. One place to manage all three regions. Built for mobile. Every feature integrated — not bolted on.

**Key advantages over Path A:**

- **One backend instead of three** — manage all regions from one dashboard
- **No more WordPress admin** — clean, simple interface built for you
- **AllayPay instead of gift card workaround** — proper nicotine payment processor, no middleman hacks
- **Age verification built in** — legal compliance from day one
- **Every feature we add later (analytics, reporting, advanced automations) plugs straight in** — no plugin hunting
- **Mobile-first** — everything works on your phone, not just "responsive"
- **Same domains** — puxxpouches.ca, .co.uk, .com all work, customers see no difference

---

## Our Recommendation

**Path B.** Same price. Same timeline. Better result. You've spent 7 months and thousands of dollars trying to get WordPress to work with two different dev teams. We can fix it — or we can build you something that works properly, from a codebase we already have running for Puxx Ireland.

The WordPress sites don't go anywhere — they stay as a backup. If at any point you're not happy with what we're building, the WordPress option is still there.

---

## What We Need From You to Start

1. **SiteGround hosting credentials** (for domain DNS management and existing site access)
2. **All WordPress admin logins** (CA, UK — we have US)
3. **GoHighLevel/OpenDoors data export** (for CRM migration later)
4. **Gift card payment plugin contact** (third-party dev team, for Path A or as a fallback)
5. **WorldPay tech team intro** (for payment integration)
6. **Brand assets** (logo files, hex colours — or we pull from your existing sites)

---

## Next Steps

1. You review this plan and confirm which path
2. We begin Month 1 immediately
3. You'll see working progress within the first 2 weeks
4. Monthly check-ins to review what was delivered and plan the next month

---

*Prepared by RoseyCo — April 2026*
