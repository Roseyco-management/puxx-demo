# Feature Research

**Domain:** Multi-region WooCommerce e-commerce — nicotine pouch brand (B2B + B2C), CA/UK/US
**Researched:** 2026-04-08
**Confidence:** HIGH-MEDIUM (core WooCommerce ecosystem well-documented; nicotine-specific compliance varies by jurisdiction and evolves rapidly)

---

## Feature Landscape

### Table Stakes (Operations Fail Without These)

These are non-negotiable. Missing any of these means orders cannot flow end-to-end, customers cannot transact, or the business cannot operate legally.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| End-to-end order flow | Customers expect checkout → payment → confirmation → tracking → delivery without gaps | HIGH | Currently broken across all three sites — this is the primary fix target |
| Payment processing per region | No payment = no sales. Each region needs a working gateway | HIGH | CA/US: gift card workaround (no Stripe); UK: WorldPay (60s timeout bug). These are blockers, not nice-to-haves |
| Multi-currency display | Customers expect prices in their local currency | MEDIUM | CA: CAD, UK: GBP, US: USD. Separate WooCommerce installs handle this by default |
| Age verification gate | Legal requirement for nicotine products in all three jurisdictions. US requires 21+, UK 18+ | HIGH | Must happen before checkout completes. Not a popup — must block purchase. Third-party verification service needed (Token of Trust or equivalent) |
| Transactional email notifications | Customers expect order confirmation, shipping notification, tracking number delivery | MEDIUM | Each order stage needs a triggered email. Currently missing or unreliable |
| User account registration and login | Required for wholesale account management, order history, referral tracking | LOW | WooCommerce core handles this; custom roles are the complexity |
| SSL and PCI compliance | Industry standard; payment processors and browsers require it | LOW | SiteGround provides SSL; compliance is gateway-level |
| Mobile-responsive storefront | Over 60% of e-commerce traffic is mobile; founder manages everything from phone | LOW | Theme-level; existing sites likely have this |
| Order status tracking | Customers expect to know where their order is | MEDIUM | Requires shipping provider integration (ShipStation for UK, Freightcom intermediary for CA/US) |
| Region-appropriate tax calculation | Legal requirement; different VAT/GST/sales tax rules per jurisdiction | MEDIUM | WooCommerce tax classes + region-specific configuration |
| Inventory display accuracy | Customers should not be able to order out-of-stock items | MEDIUM | Needs to reflect actual distributor stock, not just WooCommerce stock field |
| Bank transfer order management | Bank transfer is available in all regions; requires admin approval before processing | MEDIUM | Manual approval workflow — admin receives pending order, approves after payment confirmed |
| Wholesale account document verification | Wholesale customers must prove legitimate business status | HIGH | Upload flow for business ID / trade licence on signup. Currently using ad-hoc process |
| User role management | Retail customer, wholesale customer, fulfilment team — different permissions and pricing | MEDIUM | Roles currently inconsistent/broken from previous dev teams |
| Hosting reliability and uptime monitoring | Sites going down = lost sales and trust damage | LOW | SiteGround + uptime monitoring service (UptimeRobot or equivalent) |
| PACT Act compliance (US) | Federal law for online nicotine sales: age verification pre-checkout, adult signature delivery, carrier registration | HIGH | Non-compliance = carrier blocks, fines, potential shutdown. US-specific but sets the bar |

### Differentiators (Competitive Advantage)

These are the custom features that make Puxx's platform distinctive relative to generic nicotine e-commerce operations.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Two-tier residual affiliate/referral system | Enables a network distribution model — affiliates earn on their direct sales AND on sales made by affiliates they recruit. Creates passive income incentive and viral growth | HIGH | Separate codes and commission rates for wholesale vs retail tracks. AffiliateWP with Sub-Affiliate add-on, or Affiliate for WooCommerce with multi-tier plans, can support this. Verify existing custom system before replacing |
| Custom per-account wholesale pricing | Wholesale customers get negotiated prices unique to their account — not just a blanket discount tier. Protects margins and enables flexible deal-making | HIGH | Current workaround is coupon codes — brittle and not scalable. Replace with role-based pricing + per-account price override capability |
| Geo-based order assignment to nearest distributor | Orders automatically route to the distributor with stock closest to the customer. Reduces shipping time and cost, handles multi-location stock | HIGH | Requires IP/address geolocation + stock check logic. WooCommerce Warehouses plugin or custom implementation. CA/US complexity: Freightcom must not know product is nicotine |
| Shipping privacy layer (CA/US) | Freightcom cannot know the product is nicotine. Requires an intermediary or obfuscated product description in the shipping manifest | HIGH | Bespoke requirement — no off-the-shelf solution. Needs custom intermediary logic between WooCommerce and Freightcom |
| Custom admin dashboard | Consolidated view of orders, analytics, inventory status across all three sites in one place — not WooCommerce's default scattered admin | HIGH | Current custom dashboard is partially built but has click-through bugs and layout issues. Fix rather than rebuild |
| Mobile-first admin and CRM interface | Founder manages everything from his phone. Staff must be able to process orders, view customer data, and respond to enquiries on mobile | MEDIUM | This is genuinely differentiating — most WooCommerce admin workflows are desktop-first |
| CRM with interaction history | Customer-facing team can see full order history, contact log, and notes per customer without needing WordPress admin access | HIGH | Custom build or adaptation of WP ERP / similar. Must keep staff out of WP admin while giving them enough data to serve customers |
| GoHighLevel data migration | Customer data currently in GoHighLevel (white-labelled as OpenDoors). Migration must preserve history and associations | MEDIUM | One-time operation but critical for CRM launch |
| Inventory low-stock alerts and reorder automation | Proactive alerts when stock hits threshold; auto-generated reorder list for distributors | MEDIUM | ATUM or equivalent inventory plugin. "Automation" = notification + list generation, not autonomous purchasing |
| Automated fulfilment workflow | Order assignment to fulfilment team triggers without manual intervention. ShipStation (UK) auto-uploads tracking on label creation | HIGH | ShipStation integration is standard. Freightcom (CA/US) needs intermediary approach |

### Anti-Features (Deliberately Not Building)

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Stripe payment integration | Stripe is the most common WooCommerce gateway | Stripe permanently bans nicotine products. Attempting to use it risks account termination and transaction holds | Gift card workaround (CA/US) + WorldPay (UK) + bank transfer across all regions |
| Native mobile app | "Everything should have an app" | Significant build cost, app store review risk for nicotine products, maintenance overhead. Not needed when storefront is mobile-responsive | Mobile-responsive WooCommerce storefront + mobile-friendly admin/CRM web interfaces |
| POS integration for retail stores | Physical retail expansion is a logical next step | Requires per-store customisation, different payment hardware, inventory sync complexity. Out of scope until core platform is stable | Flag as v2+ when retail expansion is confirmed |
| Advanced email marketing automations | Drip campaigns, abandoned cart sequences, segmented promotions | Wife/EA handle this via separate tooling. Building it in creates duplicate workflows and scope creep | Keep the platform transactional; hand off to dedicated marketing automation tool |
| Predictive reorder analytics | Useful for inventory planning | Requires meaningful historical order data that doesn't exist yet. Building this now produces unreliable outputs | Defer until 12+ months of order data exists |
| Full-featured multi-vendor marketplace | Distributors could theoretically be "vendors" | Over-engineers the fulfilment model. Distributors are fulfilment nodes, not independent sellers with their own storefronts | Geo-routing to distributors is the correct model — not a marketplace |
| Crypto / stablecoin payments | Workaround for payment processor restrictions | Regulatory exposure, operational complexity, customer friction. Not a real solution for a legitimate licensed business | Maintain compliant workarounds: gift card + WorldPay + bank transfer |
| Self-serve wholesale account management portal | Wholesale customers want to manage their own sub-accounts and referral networks | Scope and complexity well beyond current needs. Client needs basics working first | Standard account page + admin-managed wholesale onboarding |
| Real-time cross-site inventory sync | All three sites showing live unified inventory | Technically complex (three separate WooCommerce installs), high risk of sync failures. Each site serves a distinct region with distinct stock | Per-site inventory management with geo-routing handling the regional distribution logic |

---

## Feature Dependencies

```
Age Verification Gate
    └──required before──> Payment Processing
                              └──required before──> Order Creation
                                                        └──triggers──> Geo Order Assignment
                                                                           └──requires──> Inventory Check (per distributor)
                                                                                             └──triggers──> Fulfilment Workflow
                                                                                                               └──triggers──> Shipping Integration
                                                                                                                                 └──triggers──> Tracking Email

User Role Management
    └──required for──> Custom Per-Account Pricing
    └──required for──> Wholesale Account Verification
    └──required for──> Affiliate/Referral System (wholesale vs retail tracks)
    └──required for──> CRM Staff Access (non-WP-admin)

Wholesale Account Verification
    └──gates──> Wholesale Pricing Activation (account must be verified before custom price is applied)

Affiliate/Referral System (Two-Tier)
    └──requires──> User Role Management (to distinguish wholesale vs retail affiliate codes)
    └──requires──> Order Flow (commissions calculated on confirmed orders)

CRM
    └──requires──> GoHighLevel Data Migration (for historical data)
    └──requires──> User Role Management (staff access without WP admin)

Inventory Management
    └──enhances──> Geo Order Assignment (routing uses stock levels per distributor)
    └──triggers──> Low-Stock Alerts → Reorder List

Custom Admin Dashboard
    └──depends on──> Order Flow (needs working orders to display)
    └──depends on──> Inventory Management (for stock widgets)
    └──depends on──> Affiliate/Referral System (for commission reporting)

Payment Processing (Gift Card — CA/US)
    └──depends on──> Friend's Dev Team Plugin (their side built; WooCommerce integration needed)

Payment Processing (WorldPay — UK)
    └──blocks on──> 60-second timeout bug fix (server-side routing issue; WorldPay tech team available)

Shipping Automation (CA/US)
    └──requires──> Shipping Privacy Layer (Freightcom must not know product is nicotine)

Shipping Automation (UK)
    └──uses──> ShipStation direct integration (licensed, auto-upload on label creation)
```

### Dependency Notes

- **Order flow is the root dependency.** Everything else — affiliate commissions, inventory updates, CRM records, shipping triggers — depends on orders processing correctly.
- **Payment processing blocks order flow.** Fix WorldPay timeout (UK) and integrate gift card plugin (CA/US) before anything else in those regions.
- **Age verification must precede payment.** Legal requirement in all regions. Cannot bolt this on later without re-engineering checkout.
- **User roles gate pricing and affiliates.** The wholesale/retail distinction drives pricing, referral codes, and commission rates. Roles must be correct before either system works.
- **Wholesale account verification gates wholesale pricing.** Do not activate custom pricing for an account until verification documents are approved.
- **Geo-routing depends on accurate per-distributor inventory.** Routing to a distributor with no stock is worse than no routing — it creates fulfilment failures.
- **CRM staff access conflicts with WP admin access.** These are mutually exclusive goals — staff need customer data but must not have WordPress admin credentials. Solution is a separate CRM interface or role-scoped access.

---

## MVP Definition

### Launch With (v1) — Unblock Revenue

The minimum state to process orders end-to-end without manual intervention on the happy path.

- [ ] Working checkout and payment on all three sites — gift card (CA/US), WorldPay (UK), bank transfer (all)
- [ ] Age verification gate at checkout — legal requirement, blocks launch without it
- [ ] Correct user roles — retail customer, wholesale customer, fulfilment team
- [ ] Automated transactional emails at each order stage
- [ ] Bank transfer manual approval workflow
- [ ] Hosting stability and uptime monitoring
- [ ] Basic order tracking (ShipStation UK; intermediary approach CA/US)
- [ ] Wholesale account document verification at signup

### Add After Validation (v1.x) — Operational Efficiency

Features that make the working platform faster and less manual to operate.

- [ ] Custom per-account wholesale pricing — removes coupon code workaround once roles are stable
- [ ] Geo-based order assignment to nearest distributor — once order flow is confirmed working
- [ ] Two-tier affiliate/referral system — audit existing system first; fix or replace
- [ ] Inventory management with low-stock alerts
- [ ] Custom admin dashboard fixes (click-through, layout, analytics)
- [ ] Automated fulfilment workflow (Freightcom intermediary; ShipStation auto-upload)

### Future Consideration (v2+) — Growth Features

Features that require the core platform to be stable and producing real data.

- [ ] CRM build and GoHighLevel migration — parallel workstream; can start once access to current system is confirmed
- [ ] Staff CRM access without WP admin — depends on CRM being built
- [ ] Predictive reorder analytics — defer until 12+ months of order history
- [ ] POS integration for retail stores — when retail expansion is confirmed
- [ ] Advanced marketing automations — hand off to wife/EA with dedicated tool

---

## Feature Prioritization Matrix

| Feature | User/Business Value | Implementation Cost | Priority |
|---------|---------------------|---------------------|----------|
| Fix payment processing (all regions) | HIGH — no payment = no revenue | HIGH | P1 |
| Age verification gate | HIGH — legal blocker | HIGH | P1 |
| End-to-end order flow | HIGH — core value of the platform | HIGH | P1 |
| Transactional emails | HIGH — customer expectation + trust | MEDIUM | P1 |
| User role management | HIGH — gates pricing and affiliates | MEDIUM | P1 |
| Bank transfer approval workflow | HIGH — revenue channel | MEDIUM | P1 |
| Hosting / uptime monitoring | HIGH — availability = revenue | LOW | P1 |
| Wholesale account document verification | HIGH — legal/commercial requirement | MEDIUM | P1 |
| Custom per-account pricing | HIGH — removes brittle coupon workaround | HIGH | P2 |
| Geo-based order assignment | HIGH — operational efficiency | HIGH | P2 |
| Two-tier affiliate/referral system | HIGH — growth mechanism | HIGH | P2 |
| Inventory management + alerts | MEDIUM — prevents stockouts | MEDIUM | P2 |
| Custom admin dashboard (fix) | MEDIUM — operational visibility | MEDIUM | P2 |
| Automated fulfilment workflow | HIGH — removes manual steps | HIGH | P2 |
| CRM (basic) | MEDIUM — staff capability | HIGH | P2 |
| GoHighLevel data migration | MEDIUM — historical data | MEDIUM | P2 |
| Staff CRM access | MEDIUM — operational | MEDIUM | P2 |
| Predictive reorder analytics | LOW — nice-to-have | HIGH | P3 |
| POS integration | LOW — future phase | HIGH | P3 |
| Marketing automations | LOW — out of scope | HIGH | P3 |

**Priority key:**
- P1: Must have for launch — operations fail without it
- P2: Add once P1 items are stable
- P3: Future consideration, do not start until P2 is validated

---

## Competitor Feature Analysis

*Note: Direct competitors in the nicotine pouch space (ZYN online, Velo, On!) operate through dedicated DTC e-commerce with standard Shopify/custom stacks. The constraints Puxx faces (Stripe ban, Freightcom privacy, three-region operation, wholesale+retail hybrid) are atypical and mean off-the-shelf playbooks apply only partially.*

| Feature | Standard DTC Nicotine Brands | Puxx Approach |
|---------|------------------------------|---------------|
| Payment | Stripe + PayPal | Gift card workaround (CA/US) + WorldPay (UK) + bank transfer |
| Age verification | Third-party gate (Token of Trust, AgeID) | Must implement — currently absent |
| Shipping | Direct carrier integration | Freightcom intermediary (CA/US), ShipStation (UK) |
| Wholesale | Usually not offered | Two-tier affiliate + per-account pricing — genuine differentiator |
| Geo-routing | Single warehouse | Multi-distributor routing — operationally differentiating |
| CRM | HubSpot / Klaviyo | Custom build from GoHighLevel migration |
| Admin | Shopify admin / default WooCommerce | Custom dashboard — fixing partially-built system |

---

## Sources

- Perplexity research: WooCommerce multi-region features, nicotine payment/compliance, affiliate systems, geo-routing, CRM approaches (2026-04-08)
- WooCommerce official docs: Affiliate for WooCommerce multi-tier setup, User Roles Based Price, HPOS
  - https://woocommerce.com/document/affiliate-for-woocommerce/how-to-set-up-a-multilevel-referral-multi-tier-affiliate-program/
  - https://woocommerce.com/document/user-roles-based-price/
  - https://developer.woocommerce.com/2024/12/12/woocommerce-in-2025/
- Age verification and compliance sources:
  - https://zylopouch.com/what-are-the-new-online-age-verification-rules-for-2026/
  - https://ecigator.com/business/vape-age-verification-retailer-guide/
  - https://tokenoftrust.com/blog/vape-nicotine-state-compliance-2025/
- Geo-routing: https://wordpress.org/plugins/multi-location-product-and-inventory-management/
- PROJECT.md — Puxx project context (validated requirements, constraints, key decisions)

---
*Feature research for: Multi-region WooCommerce e-commerce, nicotine pouch brand, B2B + B2C, CA/UK/US*
*Researched: 2026-04-08*
