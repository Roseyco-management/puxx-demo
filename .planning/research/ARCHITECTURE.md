# Architecture Research

**Domain:** Multi-region WooCommerce e-commerce platform (brownfield)
**Researched:** 2026-04-08
**Confidence:** HIGH-MEDIUM (WooCommerce patterns verified against official docs and multiple sources; Puxx-specific custom code is unknown until audit)

---

## Standard Architecture

### System Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│                         CUSTOMER-FACING LAYER                        │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐                      │
│  │puxxpouches │  │puxxpouches │  │puxxpouches │   ← Three independent │
│  │    .ca     │  │    .uk     │  │    .com    │     WooCommerce sites  │
│  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘                      │
└────────┼───────────────┼───────────────┼──────────────────────────────┘
         │               │               │
┌────────┴───────────────┴───────────────┴──────────────────────────────┐
│                      WOOCOMMERCE CORE LAYER                            │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  WooCommerce Core (orders, products, customers, cart, checkout)  │  │
│  └──────────┬───────────────────────────────────────────────────────┘  │
│             │ hooks/filters (actions + filters API)                     │
│  ┌──────────┴──────────────────────────────────────────────────────┐   │
│  │                     CUSTOM PLUGIN LAYER                          │   │
│  │  ┌─────────────┐  ┌──────────────┐  ┌───────────────────────┐   │   │
│  │  │Custom Admin │  │ Affiliate /  │  │  Geo-Routing /        │   │   │
│  │  │  Dashboard  │  │ Referral Sys │  │  Stock Management     │   │   │
│  │  └─────────────┘  └──────────────┘  └───────────────────────┘   │   │
│  │  ┌─────────────┐  ┌──────────────┐  ┌───────────────────────┐   │   │
│  │  │Gift Card    │  │ User Roles / │  │  Wholesale Pricing    │   │   │
│  │  │Payment (CA) │  │ Verification │  │  (per-account)        │   │   │
│  │  └─────────────┘  └──────────────┘  └───────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────────┘
         │               │               │               │
┌────────┴───────────────┴───────────────┴───────────────┴────────────────┐
│                       EXTERNAL SERVICES LAYER                            │
│  ┌──────────┐  ┌──────────┐  ┌────────────┐  ┌──────────┐  ┌────────┐  │
│  │WorldPay  │  │Gift Card │  │Freightcom  │  │ShipStn   │  │GHL/OD  │  │
│  │(UK pay)  │  │API (CA)  │  │(CA/US ship)│  │(UK ship) │  │(CRM)   │  │
│  └──────────┘  └──────────┘  └────────────┘  └──────────┘  └────────┘  │
└──────────────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Current State |
|-----------|----------------|---------------|
| WooCommerce Core | Order lifecycle, products, customers, cart, checkout, emails | Inherited — partially working |
| Custom Admin Dashboard | Order management UI, analytics, admin-friendly views | Inherited — broken click-through, layout issues |
| Affiliate / Referral System | Referral tracking, commission calculation, wholesale vs retail codes | Inherited — unknown if AffiliateWP or custom |
| Geo-Routing / Stock Management | Assign orders to nearest distributor, check stock before routing | Inherited — exists, function unknown |
| Gift Card Payment Plugin (CA) | Payment capture via external gift card workaround | Friend's team built — needs WooCommerce-side integration |
| WorldPay Integration (UK) | Payment gateway, redirected hosted payment page flow | Installed — timing out at 60s |
| Wholesale Pricing | Per-account pricing (currently using coupon workaround) | Inherited — needs fixing |
| User Roles / Verification | Retail customer, wholesale customer, fulfilment team roles | Inherited — broken, needs fixing |
| ShipStation Integration (UK) | Auto-upload tracking on label creation | Not yet integrated |
| Freightcom Integration (CA/US) | Shipping via intermediary (product must not appear as nicotine) | Not yet integrated |
| GoHighLevel / OpenDoors CRM | Customer records, interaction history | Needs migration out |

---

## Component Boundaries

### WooCommerce Core vs Custom Plugins

The hard boundary is: **never edit WooCommerce core files**. All custom behaviour must attach via WordPress hooks (actions/filters). This is the single most important architectural rule for maintainability — core updates cannot break custom code if this boundary is respected.

```
WooCommerce Core
    ↑ hooks only (add_action / add_filter)
Custom Plugin Code
    ↑ hooks only (expose your own hooks for others)
Third-Party Plugins (AffiliateWP, ShipStation, etc.)
```

Each custom feature should be its own plugin (or logically isolated include) with a unique namespace prefix. This allows disabling/replacing individual features without cascading failures.

### Correct Custom Plugin Structure (per plugin)

```
puxx-[feature]/
├── puxx-[feature].php          # Bootstrap, activation checks, constants
├── includes/
│   ├── class-admin.php         # Admin UI, menus (loaded on is_admin() only)
│   ├── class-frontend.php      # Hooks for checkout/order display
│   ├── class-api.php           # External service integration
│   └── functions.php           # Shared utilities
├── templates/                  # Override-friendly email/page templates
└── languages/                  # i18n strings
```

All functions/classes prefixed with `puxx_` to avoid collisions with WooCommerce core and third-party plugins.

---

## Data Flow Patterns

### Order Flow (Happy Path)

```
Customer Checkout
    ↓
WooCommerce validates cart + applies pricing
    ↓ (woocommerce_checkout_process)
Payment captured (WorldPay redirect OR gift card API)
    ↓ (payment_complete action)
Order status: Processing
    ↓ (woocommerce_order_status_processing)
Geo-routing logic: check distributor proximity + stock
    ↓
Distributor assigned → Order status: Fulfilment Assigned
    ↓
Shipping label created (ShipStation UK / Freightcom CA via intermediary)
    ↓
Tracking number captured → Order status: Shipped
    ↓ (woocommerce_order_status_completed)
Customer notification email sent
    ↓
Order: Complete
```

### Payment Flow — UK (WorldPay)

```
Customer clicks "Place Order"
    ↓
WooCommerce sends order data to WorldPay (redirect, HTML form POST)
    ↓
Customer on WorldPay hosted payment page (off-site)
    ↓
WorldPay processes card
    ↓
WorldPay POSTs to Payment Response URL (webhook callback) ← TIMEOUT OCCURS HERE
    ↓
WooCommerce receives callback, verifies MD5 signature
    ↓
Order status updated to Processing
    ↓
Customer redirected to thank-you page
```

The 60-second timeout most likely occurs at the Payment Response URL callback step — SiteGround may be timing out before WorldPay's callback reaches it, or there is a server-side firewall/routing rule blocking the inbound POST from WorldPay's IP range. Audit: check SiteGround error logs, verify Payment Response URL is correct in WorldPay Business Manager, confirm WorldPay IPs are not blocked.

### Payment Flow — Canada/US (Gift Card Workaround)

```
Customer completes order on WooCommerce site
    ↓
Gift card payment plugin intercepts checkout
    ↓
Customer uses gift card (pre-loaded via third-party site)
    ↓
Plugin calls gift card API to verify + deduct balance
    ↓
On success → WooCommerce marks payment complete
    ↓
Order proceeds to fulfilment
```

Integration gap: friend's team built the gift card side — WooCommerce needs a custom payment gateway class (extending WC_Payment_Gateway) that calls their API and returns success/failure to WooCommerce's payment complete hook.

### Payment Flow — All Regions (Bank Transfer)

```
Customer selects Bank Transfer at checkout
    ↓
Order status: On Hold (WooCommerce default for BACS)
    ↓
Admin receives notification
    ↓
Admin manually verifies payment received
    ↓
Admin approves → Order status: Processing
    ↓
Normal fulfilment flow
```

### Affiliate / Referral Tracking Flow

```
Referrer shares link or code (wholesale code OR retail code)
    ↓
Customer visits site with ref param OR enters code at checkout
    ↓
AffiliateWP (or custom system) records referral attribution
    ↓
Customer places order
    ↓
Commission calculated (tier 1: direct sale; tier 2: if sub-affiliate)
    ↓
Commission held until order completes
    ↓
Order complete → Commission approved
    ↓
Payout to affiliate
```

Two-tier requirements: AffiliateWP Multi-Tier Commissions addon supports this natively. Wholesale vs retail separation can be achieved via separate affiliate accounts with different commission rules, not separate code types — verify during audit whether the existing custom system does this or should be replaced.

### Geo-Routing / Fulfilment Assignment Flow

```
Order enters Processing status
    ↓
Geo-routing plugin fires (woocommerce_order_status_processing hook)
    ↓
Geocode customer shipping address → region/zone
    ↓
Query distributors in zone → check stock per distributor
    ↓
Assign nearest distributor with sufficient stock
    ↓
If no stock available → escalate to admin alert
    ↓
Distributor notified (email or API call)
    ↓
Distributor ships → tracking uploaded → order complete
```

Freightcom constraint: The intermediary layer means fulfilment team creates labels through an intermediary party (not directly via Freightcom API) to avoid disclosing product type. This cannot be fully automated — a workflow step (email/task to intermediary) is required until a white-label integration is established.

### Shipping Flow — UK (ShipStation)

```
Order assigned to UK distributor
    ↓
ShipStation receives order (via WooCommerce ShipStation plugin webhook)
    ↓
Fulfilment team creates label in ShipStation
    ↓
ShipStation auto-POSTs tracking number back to WooCommerce
    ↓
Order status: Shipped → customer notification sent
```

### CRM Data Flow (GoHighLevel → Custom CRM)

```
Export customer data from GoHighLevel (OpenDoors)
    ↓
Transform to WooCommerce customer format
    ↓
Import via WP All Import or custom script
    ↓
Customer data lives in WordPress user database
    ↓
Interaction history accessible in custom CRM view (staff-facing, no WP admin)
```

---

## Integration Points

### External Services

| Service | Integration Pattern | Direction | Notes |
|---------|---------------------|-----------|-------|
| WorldPay (UK) | Redirect + Payment Response URL callback | Bidirectional | WooCommerce sends order → WorldPay processes → POSTs back. Timeout likely at SiteGround inbound firewall |
| Gift Card API (CA/US) | Custom WC_Payment_Gateway class → REST API call | Outbound from WC | Friend's dev team has API docs; build WooCommerce payment gateway class |
| ShipStation (UK) | Official WooCommerce ShipStation plugin + webhook | Bidirectional | Order pushed to ShipStation; tracking POSTed back on label creation |
| Freightcom (CA/US) | Semi-manual intermediary (email/task trigger) | Outbound (manual step) | Cannot automate directly — nicotine product disclosure risk |
| GoHighLevel / OpenDoors | One-time data migration export → import | Inbound (migration) | CRM replacement; AJ currently has access |

### Internal Component Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| WooCommerce Core ↔ Custom Plugins | WordPress action/filter hooks only | Never edit core files |
| Custom Admin Dashboard ↔ WooCommerce | WC REST API or direct WP_Query | Dashboard should read via API, not custom DB queries |
| Geo-Routing ↔ Order System | Hook on `woocommerce_order_status_processing` | Trigger routing after payment confirmed |
| Affiliate System ↔ Checkout | Hook on `woocommerce_checkout_order_processed` | Record referral attribution at order creation |
| Wholesale Pricing ↔ WooCommerce | `woocommerce_get_price` filter + user role check | Per-account pricing overrides catalog price |
| Gift Card Payment ↔ WooCommerce | Custom `WC_Payment_Gateway` subclass | Standard WooCommerce payment gateway API |

---

## Multi-Site Management Pattern

The three Puxx sites (CA, UK, US) are **separate installs on SiteGround** (not WordPress Multisite). This is the correct approach given:

- Different payment gateways per region
- Different currencies and tax rules
- Different shipping providers
- Different regulatory environments for nicotine products

**Code sharing approach:** Custom plugins should be maintained in a single Git repository and deployed to each site via version-controlled deployment (Git push or SiteGround deploy). Site-specific configuration (API keys, payment gateway credentials, regional settings) lives in wp-config.php or WooCommerce settings per site — never hardcoded in plugin files.

```
puxx-custom-plugins/ (Git repo)
├── puxx-admin-dashboard/
├── puxx-affiliate-system/
├── puxx-geo-routing/
├── puxx-wholesale-pricing/
├── puxx-gift-card-payment/    # CA/US only — deployed to .ca and .com
└── puxx-user-roles/
```

Each plugin is deployed identically to all three sites; site-specific behaviour is controlled by constants/settings, not separate codebases.

---

## Audit and Fix Order (Dependency-Aware)

Fix in this sequence. Each phase unblocks the next.

### 1. Foundation (unblocks everything)
- Secure all credentials, revoke AJ access
- Establish staging environments (SiteGround staging per site)
- Inventory all active plugins and custom code
- Document what exists before touching anything

**Why first:** Cannot safely fix anything without a staging environment and knowing what's there. Cannot audit effectively while AJ still has access.

### 2. Order Flow Core (revenue-critical path)
- Fix WooCommerce order statuses and status transitions
- Fix WorldPay Payment Response URL timeout (UK)
- Integrate gift card payment gateway class (CA/US)
- Verify bank transfer approval flow
- Fix transactional emails at each order stage

**Why second:** Everything else depends on orders processing correctly. Payment and email are the primary customer-facing failures.

### 3. User Roles and Access
- Fix user role assignments (retail, wholesale, fulfilment team)
- Fix wholesale document verification on signup
- Custom admin dashboard click-through and layout fixes
- Staff CRM access (no WP admin required)

**Why third:** Roles gate which pricing, which features, and which admin views apply. Must be correct before fixing pricing or affiliate logic.

### 4. Pricing and Affiliate System
- Implement per-account wholesale pricing (replace coupon workaround)
- Audit existing affiliate system — confirm AffiliateWP vs custom
- Fix or replace two-tier referral system (wholesale vs retail codes)
- Standardise language/terminology across platform

**Why fourth:** Depends on correct user roles. Affiliate attribution depends on orders flowing correctly (step 2).

### 5. Fulfilment and Shipping
- Implement geo-routing distributor assignment (verify or replace existing)
- Integrate ShipStation for UK (official plugin + webhook)
- Establish Freightcom intermediary workflow (CA/US)
- Low-stock alerts and inventory management

**Why fifth:** Shipping depends on orders reaching Processing status correctly (step 2) and distributor assignments being set up (geo-routing depends on roles in step 3).

### 6. CRM and Monitoring
- Migrate customer data from GoHighLevel
- Build basic CRM (customer data, comms history, mobile-friendly)
- Set up uptime monitoring (all three sites)
- Set up hosting maintenance schedule

**Why sixth:** CRM is valuable but not revenue-critical for launch. Monitoring can start after sites are stable.

---

## Architectural Patterns

### Pattern 1: Hook-Driven Extension (Required for WooCommerce)

**What:** All custom behaviour attaches to WooCommerce's action/filter system, never modifying core files.
**When to use:** Every single customisation — checkout fields, order status logic, pricing, emails.
**Trade-offs:** Correct approach for maintainability. Downside: debugging hook order can be opaque; use Query Monitor plugin to inspect during audit.

```php
// Correct: attach via hook
add_action('woocommerce_order_status_processing', 'puxx_trigger_geo_routing', 10, 2);

function puxx_trigger_geo_routing($order_id, $order) {
    // custom routing logic here
}
```

### Pattern 2: WC_Payment_Gateway Subclass (Gift Card Payment)

**What:** Extend WooCommerce's base payment gateway class to add the gift card API as a first-class payment method.
**When to use:** Any new payment method that needs to appear in WooCommerce checkout.
**Trade-offs:** Standard WooCommerce way — supports refunds, order meta, admin UI automatically.

```php
class Puxx_Gift_Card_Gateway extends WC_Payment_Gateway {
    public function process_payment($order_id) {
        // call gift card API
        // return success/failure to WooCommerce
    }
}
```

### Pattern 3: User Role Gate for Wholesale Pricing

**What:** Override the product price via filter, checking current user's role before returning custom price.
**When to use:** Per-account pricing, wholesale vs retail price display.
**Trade-offs:** Simple and reliable. Must cache price lookups per session to avoid repeated DB queries.

```php
add_filter('woocommerce_get_price', 'puxx_wholesale_price_override', 10, 2);

function puxx_wholesale_price_override($price, $product) {
    if (current_user_has_wholesale_account()) {
        return get_user_meta(get_current_user_id(), '_puxx_wholesale_price_' . $product->get_id(), true) ?: $price;
    }
    return $price;
}
```

---

## Anti-Patterns

### Anti-Pattern 1: Editing WooCommerce Core Files

**What people do:** Directly modify files inside `/wp-content/plugins/woocommerce/` to change behaviour.
**Why it's wrong:** Core updates wipe the changes. It also makes debugging impossible and breaks future upgrades.
**Do this instead:** Use the hooks/filters API. Every WooCommerce behaviour that needs changing has a hook for it.

### Anti-Pattern 2: Hardcoded API Keys in Plugin PHP Files

**What people do:** Paste WorldPay Installation IDs, ShipStation API keys, or gift card API secrets directly into plugin code and commit to Git.
**Why it's wrong:** Credentials in version control are a security incident waiting to happen. Multi-site deployments also need different credentials per site.
**Do this instead:** Define credentials in `wp-config.php` as constants (already excluded from Git), or use WooCommerce's settings API to store them in the database per site.

### Anti-Pattern 3: Cross-Site Shared Database

**What people do:** Point all three WooCommerce sites at one shared database to "centralise" data.
**Why it's wrong:** WooCommerce's data model assumes site-exclusive tables. Sharing corrupts order IDs, product IDs, and user data. Currency and tax data conflicts between regions.
**Do this instead:** Keep three independent databases. Synchronise only what genuinely needs syncing (product catalogue) via a purpose-built sync plugin or export/import workflow.

### Anti-Pattern 4: One Monolithic Custom Plugin

**What people do:** Build all customisations (dashboard, affiliate, geo-routing, pricing) into a single `functions.php` or single large plugin.
**Why it's wrong:** Cannot disable a broken feature without disabling everything. Debugging is opaque. Multiple dev teams working on one file causes conflicts.
**Do this instead:** One plugin per feature with clear namespacing. Each can be disabled independently.

### Anti-Pattern 5: Freightcom Direct API Integration Without Intermediary

**What people do:** Integrate Freightcom's API directly so WooCommerce auto-submits shipping details including product descriptions.
**Why it's wrong:** Freightcom must not know the product is nicotine (Canadian/US regulatory concern). Auto-submitted product descriptions would expose this.
**Do this instead:** Fulfilment team uses an intermediary layer — either a neutral product description submitted manually, or a separate fulfilment coordinator who creates labels with sanitised descriptions.

---

## Scaling Considerations

| Scale | Architecture Adjustment |
|-------|-------------------------|
| Current (small volume) | Three independent WP installs on SiteGround — fine |
| 10K orders/month | Add object caching (Redis via SiteGround), review custom plugin query efficiency |
| 100K orders/month | Consider WooCommerce High-Performance Order Storage (HPOS), dedicated DB server |
| High-volume affiliate | AffiliateWP handles this natively — no architecture change needed |

Current scale does not require infrastructure changes. Focus is code quality and reliability, not performance.

---

## Sources

- WooCommerce Official Docs — Multi-Store Patterns: https://woocommerce.com/posts/woocommerce-multiple-stores/
- WooCommerce Official Docs — WorldPay Integration: https://woocommerce.com/document/worldpay/
- WooCommerce Developer Docs — Plugin Best Practices: https://developer.woocommerce.com/docs/extensions/ux-guidelines-extensions/best-practices/
- AffiliateWP Multi-Tier Commissions Addon: https://affiliatewp.com/addons/multi-tier-commissions/
- WooCommerce Warehouses / Geo-Routing Patterns: https://woocommercewarehouses.com/woocommerce-multi-warehouse-order-routing/
- WooCommerce Brownfield Audit Guidance: https://onepix.net/blog/web-development/woo-audit
- Perplexity research queries (2026-04-08) — architecture, plugin patterns, affiliate systems, geo-routing, brownfield audit

---
*Architecture research for: Puxx multi-region WooCommerce platform (brownfield)*
*Researched: 2026-04-08*
