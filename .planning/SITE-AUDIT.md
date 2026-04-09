# Puxx US Site Audit (puxxpouches.com)
**Date:** 2026-04-09
**Source:** WooCommerce REST API + WordPress XML Export + Admin Screenshots

---

## System Status

| Component | Version | Notes |
|-----------|---------|-------|
| WordPress | 6.9.4 | Current |
| WooCommerce | 10.6.2 | Current |
| PHP | 8.3.30 | Already on recommended version |
| MySQL | MariaDB 10.11.7 | Fine |
| Server | Apache on Linux | SiteGround |
| Multisite | No | Correct — three separate installs |
| WP Cron | Enabled (pseudo-cron) | Needs real server cron |
| Currency | USD | Correct for US site |
| Tax | Disabled | May need enabling for US compliance |
| PHP max_execution_time | 30s | LOW — may cause WorldPay timeout on UK site |

---

## Active Plugins (24)

| Plugin | Version | Purpose | Assessment |
|--------|---------|---------|------------|
| **WooCommerce** | 10.6.2 | E-commerce engine | Current, good |
| **Elementor** | 4.0.1 | Page builder | Current |
| **Element Pack Pro** | 8.0.1 | Elementor addons | Premium plugin |
| **Pouches Worldwide** | 1.0.0 | Custom admin panel (by Amaan Azkar) | **CUSTOM — the core business logic plugin** |
| **Common Stripe Gateway** | 1.0 | Stripe payment (by "Your Name") | **DISABLED in gateways but ACTIVE as plugin — sloppy, should be deactivated** |
| **Worldpay eCommerce** | 1.2.0 | WorldPay gateway | Active but DISABLED in payment settings. **Also v1.3.1 sitting INACTIVE** |
| **Conditional Payments for WooCommerce** | 3.4.1 | Payment rules | Active — likely for region-specific payment logic |
| **Conditional Shipping for WooCommerce** | 3.6.1 | Shipping rules | Active |
| **WooCommerce Conditional Shipping Pro** | 3.6.0 | Premium shipping rules | Active — redundant with free version? |
| **Discount Rules for WooCommerce** | 2.6.13 | Pricing/discount rules | Active — may be handling tiered pricing |
| **User Role Editor** | 4.64.6 | Custom roles | Active — managing retail/wholesale/fulfilment roles |
| **Secure Custom Fields** | 6.8.2 | Custom fields (ACF fork) | Active |
| **LeadConnector** | 3.0.26 | GoHighLevel CRM integration | Active — **this is the GHL white-label CRM plugin** |
| **WPForms** | 1.9.0.4 | Forms | Active, 5 notifications pending |
| **WP Mail SMTP** | 4.7.1 | Email delivery | Active — good, handling transactional email |
| **Speed Optimizer** | 7.7.8 | SiteGround caching | Active |
| **Site Kit by Google** | 1.176.0 | Google Analytics etc | Active |
| **All-in-One WP Migration** | 7.105 | Backup/migration | Just installed for export |
| **Better Search Replace** | 1.4.10 | Database find/replace | Active — useful for terminology standardisation |
| **Code Snippets** | 3.9.5 | PHP snippet management | Active — custom code may be here |
| **SA theme customizer** | 1.0 | Theme customisation | Active |
| **UiCore Animate** | 2.2.4 | Animations | Theme framework |
| **UiCore Elements** | 1.3.14 | Elements | Theme framework |
| **UiCore Framework** | 6.2.1 | Framework | Theme framework |

## Inactive Plugins

| Plugin | Version | Notes |
|--------|---------|-------|
| Rank Math SEO | 1.0.267 | SEO plugin — inactive |
| Security Optimizer | 1.6.0 | SiteGround security — should be active |
| SiteGround Central | 3.3.3 | SiteGround management |
| User Switching | 1.11.2 | Dev tool for switching users |
| **Worldpay eCommerce** | **1.3.1** | **Newer version sitting INACTIVE while 1.2.0 is active** |

---

## Theme

- **Active:** Search Agenda v2.2.1 (custom/premium theme, no parent)
- Built with Elementor page builder + UiCore framework

---

## Products (12 total)

All products are **variable** type with strength variations (3mg, 6mg, 9mg, 12mg, 16mg, 22mg).

| ID | Product | Price | Stock Managed | Stock |
|----|---------|-------|---------------|-------|
| 817 | PUXX Wintergreen | $6 | No | N/A |
| 798 | PUXX Strawberry | $6 | No | N/A |
| 774 | PUXX Peach | $6 | No | N/A |
| 759 | PUXX Grape | $6 | No | N/A |
| 728 | PUXX Citrus | $6 | No | N/A |
| 345 | PUXX Peppermint | $6 | No | N/A |
| 305 | PUXX Cool Mint | $6 | No | N/A |
| 300 | PUXX Cola | $6 | No | N/A |
| 295 | PUXX Cherry | $6 | No | N/A |
| 290 | PUXX Watermelon | $6 | No | N/A |
| 285 | PUXX Spearmint | $6 | No | N/A |
| 279 | PUXX Apple Mint | $6 | No | N/A |

**Key findings:**
- Stock management is OFF on all products — inventory features won't work until enabled
- All products are $6 (same price for everyone — confirms no custom pricing yet)
- Products have `tiered_pricing` meta data — someone set up tiered pricing structure but it may not be active
- 6 strength variations per product (3mg through 22mg)
- Single category: "Nicotine Pouches"
- Product brand taxonomy exists: "Blue Giant"

---

## Payment Gateways

| Gateway | Enabled | Notes |
|---------|---------|-------|
| **Bank transfer (swift)** | **YES** | Payment to puxxcanada@gmail.com via eTransfer |
| **Consignment Loan** | **YES** | Custom gateway — "receive goods now, pay later" |
| Stripe (Common) | No | Disabled (was banned) |
| WorldPay Checkout | No | **DISABLED** — not yet configured for this site |
| WorldPay HPP (Apple/Google Pay) | No | Disabled |
| Manual Invoice (Card Payments) | No | Stripe invoice — disabled |
| Cash on delivery | No | Disabled |

**Key findings:**
- Only 2 payment methods actually enabled: bank transfer + consignment loans
- No credit card processing active AT ALL on US site
- WorldPay plugin installed (v1.2.0 active, v1.3.1 inactive) but gateway is disabled
- Stripe plugin still installed but disabled
- Gift card payment plugin is NOT installed on this site

---

## Customers (13 total)

| Role | Count | Users |
|------|-------|-------|
| Administrator | 1 | puxxcanada (the admin account) |
| Retailer | 7 | Various test accounts |
| Wholesaler | 4 | Developer Wholesaler, TESTWHOLESALE, reagan.mcknight, kokahen |
| Fulfilment | 0 | **No fulfilment team user exists** |

**Key findings:**
- Custom roles ARE set up: "retailer" and "wholesaler" (not standard WooCommerce roles)
- NO "fulfilment" role exists yet — this needs to be created
- All accounts appear to be test accounts (mailinator, yopmail addresses)
- "john doe" placed most test orders but isn't in the customer list (likely placed as guest or using admin account)

---

## Orders (28 visible)

- Date range: Sept 2025 — Oct 2025 (all test orders, 6+ months old)
- Most are from "john doe" (test account)
- Statuses: mostly on-hold and processing, some cancelled
- All $50-$187 range
- **No completed orders** — order flow never fully tested end-to-end

---

## Shipping

- Only 1 shipping zone configured: "USA"
- No ShipStation, Freightcom, or other shipping integration plugins installed

---

## Custom Admin Panel ("Pouches Worldwide" plugin v1.0.0)

From the screenshot, the custom "Pouches Admin" panel has three tabs:
1. **Wholesale Accounts** — showing 4 wholesale account approval requests
2. **Referrals** — tab exists (content unknown)
3. **Consignment Loans** — tab exists (content unknown)

This is the core custom plugin built by the original developers (credited to "Amaan Azkar"). It handles:
- Wholesale account approvals
- Referral tracking
- Consignment loan management
- Custom admin dashboard

---

## Critical Findings Summary

### What Works
- WordPress and WooCommerce are on current versions (6.9.4 / 10.6.2)
- PHP 8.3 already running (no upgrade needed)
- Products are set up with correct variations
- Custom user roles exist (retailer, wholesaler)
- Custom admin panel exists with wholesale approval workflow
- Bank transfer payment is functional
- WP Mail SMTP configured for email delivery
- Elementor page builder in place

### What's Broken or Missing
1. **NO credit card payment processing** — zero active card gateways
2. **Gift card payment plugin NOT installed** on this site
3. **Stock management OFF** on all products — inventory won't track
4. **No fulfilment team role** created
5. **WorldPay installed but disabled** — also has version conflict (1.2.0 active, 1.3.1 inactive)
6. **Stripe plugin still active** despite being banned — wasting resources
7. **No shipping integrations** installed (no ShipStation, no Freightcom)
8. **No age verification** plugin or gate
9. **No completed orders** — order flow never verified end-to-end
10. **WP-Cron still pseudo-cron** — unreliable for automation
11. **LeadConnector (GHL)** plugin active — will need to be replaced with new CRM
12. **Security Optimizer disabled** — should be activated
13. **Tax calculations disabled** — needs review for US/UK compliance
14. **Tiered pricing metadata exists** on products but unclear if the Discount Rules plugin is handling it correctly

---

*Audit completed: 2026-04-09 via WooCommerce REST API*
