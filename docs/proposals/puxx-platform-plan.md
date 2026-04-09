# Puxx Platform — Detailed Plan & Timeline

**Prepared for:** Fez (Puxx)
**Prepared by:** Elevateo Co.
**Date:** 9 April 2026
**Version:** 2.0

---

## What We Found

We've audited your WordPress site (puxxpouches.com), reviewed every system, and gone through your discovery call in detail. Here's what we're working with:

### Current State

**Your platform has 12 products set up correctly** (all 12 flavours with 6 strength variations each), custom user roles (retailer, wholesale), and a custom admin panel that handles wholesale approvals, referrals, and consignment loans. The bones are there.

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

**24 active plugins**, a custom plugin handling core business logic, built by at least two different dev teams with inconsistent code. WordPress 6.9.4 and WooCommerce 10.6.2 are current. PHP 8.3 is running. The infrastructure is fine — the application layer is what's broken.

---

## Your Priority List

We heard you. This is what you said matters, in order:

1. Fix the three e-commerce sites — make them work
2. Credit card payments working — AllayPay primary (CA/US), WorldPay for UK
3. Hosting, maintenance, uptime monitoring — no more 2-day outages
4. Affiliate/referral system with two codes, two tiers, adjustable rates
5. Custom pricing per wholesale account
6. Shipping automation — eliminate the manual copy-paste-email process
7. Basic CRM — customer data, communication history, mobile-friendly
8. Inventory management with low-stock alerts

> **"The CRM is not the main goal — it's a byproduct. Get the sites working first."**
> We agree completely. Both paths lead with your e-commerce sites working in Month 1.

---

## Everything That Gets Built — All 9 Modules

Both paths deliver all 9 modules over 6 months.

| Module | Name | What It Covers | Month |
|--------|------|---------------|-------|
| **M1** | E-Commerce Core | Sites live and accepting orders. Payments working (AllayPay primary for CA/US, WorldPay for UK). Full checkout and order flow. Age verification. Uptime monitoring. | 1 |
| **M2** | CRM | Customer data, full communication history, staff access (no admin login required). Mobile-first interface. GoHighLevel migration. | 4 |
| **M3** | Users, Pricing & Affiliate | User roles (retail, wholesale, fulfilment). Custom pricing per account. Two-tier affiliate and referral system with adjustable rates. Wholesale document verification. | 2 |
| **M4** | Shipping Automation | ShipStation for UK. Freightcom intermediary for CA/US. Automated label generation and carrier selection. End to manual copy-paste workflow. | 3 |
| **M5** | Inventory Management | Stock tracking across all three regions. Low-stock alerts. Per-SKU thresholds. | 3 |
| **M6** | Retailer Portal & Invoicing | Wholesale/retailer-facing portal. Invoice generation. Consignment loan tracking. B2B order management. | 2 |
| **M7** | Smart Reorder | Automated reorder suggestions based on velocity and lead time. Supplier alerts. Reorder list dashboard. | 3 |
| **M8** | Communication Hub | Contact form routing. Enquiry assignment. Notification rules. Linked to CRM timeline. | 4 |
| **M9** | Reporting & Analytics | Sales dashboard (revenue, orders, top products by region). Performance optimisation. Documentation and full handover. | 5–6 |

**Payment processors:** We are researching multiple nicotine-friendly payment processors for CA/US. **AllayPay is our primary candidate** — a proper nicotine-compliant processor with no workarounds required. The gift card plugin route remains available as a fallback if needed. WorldPay handles UK with no issues.

---

## Two Paths Forward

Both paths deliver all 9 modules in 6 months at the same price. The difference is how we get there and what you're left with.

---

### Path A: Fix Your WordPress Sites

**What:** Take the three existing WooCommerce sites, fix everything that's broken, connect the payment integrations, build out all 9 modules.

**Timeline:** 6 months

| Month | Modules | What Gets Done | You See |
|-------|---------|---------------|---------|
| **Month 1** | M1 | Fix all three sites. Revoke old dev access. Set up staging. AllayPay for CA/US (gift card as fallback). Fix WorldPay UK. Fix order flow end-to-end. Age verification. Uptime monitoring. | Sites accepting payments. Orders flowing. UK live. |
| **Month 2** | M3, M6 | User roles (retail, wholesale, fulfilment). Custom pricing per account. Two-tier affiliate/referral system. Wholesale document verification. Retailer portal. Invoice generation. | Custom pricing live. Affiliate codes working. B2B portal active. |
| **Month 3** | M4, M5, M7 | ShipStation (UK). Freightcom (CA/US). Inventory tracking across all regions. Low-stock alerts. Smart reorder suggestions. | Shipping automated. Stock levels tracking. Reorder list working. |
| **Month 4** | M2, M8 | CRM — customer data, communication history, staff access. GoHighLevel migration. Mobile-friendly. Contact form routing and enquiry assignment. | Search any customer, see full history on your phone. Staff access live. |
| **Month 5–6** | M9 | Sales analytics dashboard. Performance optimisation. Edge cases. Documentation. Handover. | Clean dashboard with sales data. Everything polished and stable. |

**Cost:** GBP 2,000/month x 6 months = GBP 12,000

**What you keep:** Three separate WordPress/WooCommerce sites, each with its own backend, managed through WordPress admin.

**Honest assessment:** This works. It gets you live in Month 1. But you're maintaining three separate systems, dealing with WordPress plugin updates, and every new feature means finding a plugin or writing custom PHP. The admin experience is WordPress — which you've told us you find confusing.

---

### Path B: One Modern Platform for All Regions (Recommended)

**What:** Instead of fixing three broken WordPress sites, we build one modern platform that handles Canada, UK, and US from a single system. Same domains (puxxpouches.ca, .co.uk, .com) — they all point to one platform that automatically shows the right currency, payment methods, and shipping options based on region.

**Built on:** The same technology we used to build Puxx Ireland — which already has a working checkout, age verification, admin dashboard, and WorldPay integration.

**Timeline:** 6 months (same as Path A)

| Month | Modules | What Gets Done | You See |
|-------|---------|---------------|---------|
| **Month 1** | M1 | Adapt Puxx Ireland platform for multi-region (CA/UK/US). Products, checkout, age verification, WorldPay (UK), AllayPay (CA/US). Domain routing. Uptime monitoring. | Working site you can click through. Checkout live. Age verified. Orders flowing. |
| **Month 2** | M3, M6 | User roles (retail, wholesale, fulfilment). Custom pricing per account. Two-tier affiliate/referral system. Wholesale document verification. Retailer portal. Invoice generation. | Affiliate codes live. Custom pricing working. B2B portal active. |
| **Month 3** | M4, M5, M7 | ShipStation UK direct. Freightcom intermediary CA/US. Inventory management across regions. Low-stock alerts. Smart reorder dashboard. | Shipping automated. Stock tracking. Reorder list live. |
| **Month 4** | M2, M8 | CRM built into the platform. Customer timeline, communication history, staff access. Mobile-first. GoHighLevel migration. Contact form routing and enquiry assignment. | Full CRM on your phone. Staff access without admin backend. |
| **Month 5–6** | M9 | Analytics dashboard. Performance optimisation. Documentation. Handover. | Clean dashboard with sales data. Everything polished. |

**Cost:** GBP 2,000/month x 6 months = GBP 12,000 (same price)

**What you keep:** One modern platform. One login. One place to manage all three regions. Built for mobile. Every feature integrated — not bolted on.

**Key advantages over Path A:**

- **One backend instead of three** — manage all regions from one dashboard
- **No more WordPress admin** — clean, simple interface built for you
- **AllayPay** — proper nicotine payment processor, no workarounds
- **Age verification built in** — legal compliance from day one
- **Mobile-first** — everything works on your phone, not just "responsive"
- **Same domains** — puxxpouches.ca, .co.uk, .com all work, customers see no difference
- **Future features plug straight in** — no plugin hunting

---

## Our Recommendation

**Path B.** Same price. Same timeline. Better result. You've spent 7 months and thousands of dollars trying to get WordPress to work with two different dev teams. We can fix it — or we can build you something that works properly, from a codebase we already have running for Puxx Ireland.

The WordPress sites don't go anywhere — they stay as a backup. If at any point you're not happy with what we're building, the WordPress option is still there.

---

## What We Need From You to Start

1. **SiteGround hosting credentials** — for domain DNS management and existing site access
2. **Gift card payment plugin contact** — third-party dev team (as fallback if AllayPay onboarding takes time)
3. **WorldPay tech team intro** — for payment integration

We already have your brand assets and API access to the sites. No additional logins or data exports needed to get started.

---

## Next Steps

1. You review this plan and confirm which path
2. We begin Month 1 immediately
3. You'll see a working checkout within the first 2 weeks
4. Monthly check-ins to review what was delivered and plan the next month

---

*Prepared by Elevateo Co. — April 2026*
