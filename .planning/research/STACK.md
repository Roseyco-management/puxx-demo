# Stack Research

**Domain:** Multi-region WooCommerce e-commerce platform (nicotine products, CA/UK/US)
**Researched:** 2026-04-08
**Confidence:** HIGH-MEDIUM (core WooCommerce stack HIGH; geo-routing and CRM MEDIUM due to custom requirements)

---

## Recommended Stack

### Core Platform

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| WordPress | 6.8+ | CMS/platform base | Required for WooCommerce; 6.8 adds PHP 8.3 full compatibility |
| WooCommerce | Latest stable (9.x+) | E-commerce engine | Already installed; fix in place rather than rebuild |
| PHP | **8.3** | Runtime | WooCommerce officially recommends 8.3+; PHP 8.1 EOL Nov 2025, 8.2 EOL Dec 2025; 8.3 active until Dec 2027; ~13% faster than 7.4 |
| MySQL | 8.0+ | Database | Standard on SiteGround; required for WooCommerce performance |
| SiteGround | Existing | Hosting | Client's existing account; SiteGround supports PHP 8.3 via dashboard toggle |

**Confidence: HIGH** — PHP version sourced from official WooCommerce docs (woocommerce.com/document/update-php-wordpress/)

---

### Payment Gateways

| Plugin/Integration | Version | Region | Why |
|--------------------|---------|--------|-----|
| WorldPay (existing WooCommerce plugin) | Latest | UK | Already configured; fix the 60s timeout via PHP `max_execution_time = 90` in php.ini and WorldPay dashboard timeout set to 60s for card network processing. WorldPay recommends 20s for API but 60s+ before resubmit. Contact WorldPay tech team for server-side routing diagnosis. |
| Gift card plugin (friend's dev team) | Existing | CA/US | Only viable workaround post Stripe ban for nicotine; integration work needed on WooCommerce side |
| WooCommerce BACS (built-in) | Core | All regions | Bank transfer built into WooCommerce core; requires order approval plugin layered on top |
| Order Approval for WooCommerce | Free (core) / Pro | All regions | Intercepts BACS orders before Processing; adds "Awaiting Approval" status; admin approve/reject buttons; updated Oct 2025. Plugin: `order-approval-woocommerce` on wordpress.org |

**What NOT to use:** Stripe — permanently banned for nicotine products. PayPal — verify separately for nicotine compliance before considering.

**Confidence: HIGH-MEDIUM** — WorldPay fix approach is standard PHP/server config. Gift card plugin is bespoke; integration approach TBD on audit.

---

### Affiliate / Referral System

| Plugin | Version | Purpose | Why |
|--------|---------|---------|-----|
| AffiliateWP | Latest (verify on audit) | Core affiliate tracking | Already claimed to be installed (per AJ); one-click WooCommerce integration; coupon + referral link tracking; dashboard management |
| AffiliateWP Multi-Tier (WooNinjas Sub Affiliates add-on) | Latest | Two-tier commission structure | Required for wholesale-recruits-retail commission chains; purchased separately from WooNinjas |

**Decision guidance:** If AJ's existing AffiliateWP setup is intact and licensed, extend it. If it's a mess or unlicensed, a fresh AffiliateWP install with the WooNinjas add-on is the correct path. Do NOT build a custom affiliate system from scratch — the two-tier requirement is exactly what the WooNinjas add-on solves.

**Separate codes:** AffiliateWP supports assigning WooCommerce coupons to affiliates. Wholesale accounts get one coupon code; retail affiliates get referral links or separate coupon codes. This maintains clean separation without a custom system.

**Confidence: HIGH-MEDIUM** — AffiliateWP two-tier capability verified via WooNinjas documentation and multiple comparison sources.

---

### Wholesale / Custom Pricing

| Plugin | Version | Purpose | Why |
|--------|---------|---------|-----|
| Wholesale Suite (WooCommerce official) | Latest | Per-account wholesale pricing | Role-based pricing without coupon workarounds; official WooCommerce marketplace plugin; supports tiered discounts per role, product-level pricing, min order quantities |
| OR: B2B King | Latest | Alternative if Wholesale Suite conflicts | More B2B-focused; handles document verification, account approval, custom pricing — covers multiple requirements in one plugin |

**Recommendation:** Start by auditing what exists. If the site already has a wholesale pricing plugin, fix it rather than replace. If starting fresh, **B2B King** covers more requirements (custom pricing + account approval + document upload) in one purchase versus multiple plugins from Wholesale Suite.

**Confidence: MEDIUM** — Plugin selection depends on what's already installed; B2B King's document verification capability is relevant to the wholesale signup requirement but needs verification on current WooCommerce version compatibility.

---

### Shipping Integrations

| Integration | Region | Purpose | Implementation |
|-------------|--------|---------|----------------|
| ShipStation (official WooCommerce plugin) | UK | Auto-upload tracking on label creation | Free plugin from wordpress.org (`woocommerce-shipstation-integration`); connects to ShipStation account; pulls orders automatically; tracking syncs back to WooCommerce and customer on label creation. Version 4.9.8+ has inventory API and status hooks (2025). |
| Freightcom | CA/US | Shipping fulfilment | Cannot integrate directly — product must not be identified as nicotine to carrier. Requires intermediary approach: manual label creation or a neutral product description layer in any API call. Do not use automated Freightcom plugin that would expose product details. |

**Freightcom constraint:** No off-the-shelf WooCommerce plugin should be used for Freightcom automation without a deliberate obfuscation layer. Orders must be exported to fulfilment team who create labels manually via Freightcom portal, OR a custom webhook that strips product identifiers before sending to Freightcom API.

**Confidence: HIGH** for ShipStation (official plugin, verified 2025). **MEDIUM** for Freightcom approach — manual workaround is safest; custom integration needs careful design.

---

### User Roles & Access Control

| Plugin | Version | Purpose | Why |
|--------|---------|---------|-----|
| User Role Editor | Free | Define and manage custom roles (retail customer, wholesale customer, fulfilment team) | Standard WordPress role management; allows restricting wp-admin capabilities per role |
| Members (MemberPress) | Free tier | Capability-based role control | More granular than built-in roles; allows fulfilment team to see only order management, not settings |
| WooCommerce core roles | Core | Built-in customer/shop manager roles | Extend rather than replace; add wholesale_customer and fulfilment_team roles on top |

**Pattern:** Create three custom roles beyond WooCommerce defaults: `wholesale_customer` (sees wholesale pricing, bulk ordering), `retail_customer` (standard checkout), `fulfilment_team` (order management only, no product editing, no settings). Restrict wp-admin access for fulfilment team to WooCommerce orders section only.

**Confidence: HIGH** — Standard WordPress role management pattern, well-documented.

---

### CRM

| Option | Version | Purpose | Decision |
|--------|---------|---------|----------|
| FluentCRM | Free ($103/year Pro) | Self-hosted CRM inside WordPress | WooCommerce native integration; customer data, interaction history, email comms; responsive in WP but no standalone mobile app |
| HubSpot (free CRM) | Free tier | External CRM with mobile app | Strong standalone mobile app; staff log in without WP access; auto-syncs WooCommerce orders via plugin |
| Custom lightweight CRM (React/Next.js app) | Build | Bespoke staff tool | Full control; mobile-first design; staff access without any WP exposure; higher build cost |

**Recommendation for this project:** Given the client uses his phone for everything and needs staff access without WordPress admin, **HubSpot free CRM** is the most viable off-the-shelf option for Phase 1. It has a proper mobile app, staff can log in independently, and it syncs with WooCommerce via official plugin. Migrate GoHighLevel/OpenDoors data into HubSpot.

**However:** If CRM requirements stay simple (view customer data, log calls/emails, see order history), a lightweight custom tool built as a mobile-responsive web app may be better long-term. Assess after GoHighLevel data migration scope is understood.

**Do NOT use:** GoHighLevel/OpenDoors (current) — needs to be migrated away from. Alan still has access; transition must revoke his credentials.

**Confidence: MEDIUM** — CRM selection depends on data migration complexity from GoHighLevel; HubSpot is well-evidenced for WooCommerce integration but custom build may be needed if staff access patterns are complex.

---

### Admin Dashboard & Monitoring

| Plugin/Tool | Version | Purpose | Why |
|-------------|---------|---------|-----|
| WooCommerce Admin (built-in) | Core | Order management base | Already included; custom dashboard layered on top |
| Custom admin dashboard (existing) | Existing | Order click-through, analytics | Fix rather than rebuild; audit what's broken before replacing |
| WP Crontrol | Free | Debug WP cron jobs | Essential for diagnosing automated email and order processing issues |
| Query Monitor | Free | Performance debugging | Identifies slow database queries in the custom dashboard; essential for inherited brownfield code |
| Better Search Replace | Free | Database find/replace | Standardising terminology across platform (inconsistent language from original dev team) |
| ManageWP or MainWP | Paid | Multi-site management, backups, uptime monitoring | Manage all three WooCommerce sites from one dashboard; automated backups; uptime alerts |
| UptimeRobot | Free tier | Uptime monitoring | Simple external uptime check for all three sites plus dummy sites |

**Confidence: HIGH** for diagnostic/maintenance tools. **MEDIUM** for multi-site management tool selection (ManageWP vs MainWP depends on SiteGround compatibility).

---

### Transactional Email

| Tool | Version | Purpose | Why |
|------|---------|---------|-----|
| WooCommerce core emails | Core | Order stage notifications | Already included; customise templates per order status |
| FluentSMTP | Free | SMTP relay | Routes WordPress emails through reliable SMTP (SendGrid, Mailgun, or SES) instead of PHP mail(); prevents deliverability issues |
| SendGrid or Mailgun | Free tier / Pay-as-go | SMTP provider | Reliable transactional email delivery; free tiers sufficient for current volume |

**Confidence: HIGH** — Standard WooCommerce email pattern.

---

### Geo-Routing (Order Assignment to Nearest Distributor)

**Finding:** No off-the-shelf WooCommerce plugin provides complete geo-based order routing with stock checks in 2025. This is a custom build requirement.

**Recommended approach:**
- WooCommerce order hook (`woocommerce_checkout_order_processed`) to trigger routing logic
- MaxMind GeoIP2 (free GeoLite2 database, or paid) for customer IP-to-location resolution
- Custom PHP function: query distributors by distance using Haversine formula, check WooCommerce product stock per distributor (using custom meta or separate stock tables), assign distributor meta to order
- Admin UI: simple order meta display showing assigned distributor + override capability

**This is genuinely custom work.** Budget accordingly — it cannot be solved with a plugin combination. Estimate 2-4 days of development once distributor data model is designed.

**Confidence: HIGH** that no plugin exists. **MEDIUM** on implementation approach — depends on how distributor/stock data is currently structured in the existing platform.

---

### Document Verification (Wholesale Signup)

| Plugin | Version | Purpose | Why |
|--------|---------|---------|-----|
| WooCommerce Customer / Order / Coupon Export | Existing/WC | Data export for review | Secondary tool |
| Registration for WooCommerce (YITH) or WooCommerce Registration Form | Free/Paid | Custom registration fields | Add business ID and trade licence upload fields to wholesale registration |
| User Approval for WooCommerce | Free | Hold new wholesale accounts pending admin review | Standard pattern: new wholesale signup → admin notified → reviews uploaded documents → approves account → role assigned |

**Alternative:** If B2B King is selected for wholesale pricing, it includes account approval and custom registration fields — eliminates need for separate registration plugin.

**Confidence: MEDIUM** — Plugin selection depends on wholesale pricing plugin chosen.

---

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| AffiliateWP + WooNinjas add-on | Custom affiliate system | Only if AffiliateWP is unlicensed and the two-tier requirement evolves to be more complex than standard multi-tier |
| Wholesale Suite / B2B King | WooCommerce coupons (current workaround) | Never — coupons are not a pricing system; they break when applied across different user types and don't scale |
| HubSpot free CRM | FluentCRM | If staff access without WP admin is not critical (i.e., all CRM users have WP logins anyway) |
| Custom geo-routing logic | GeoTargetingPro or similar plugins | GeoTargetingPro handles content display, not order assignment — wrong tool for this job |
| ShipStation official plugin | PluginHive or other carriers | Only if ShipStation plan cost is a constraint; official plugin is more reliable |
| PHP 8.3 | PHP 8.2 | Only as a temporary step during upgrade; PHP 8.2 reached EOL December 2025 |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Stripe | Permanently banned for nicotine products | Gift card workaround (CA/US) + WorldPay (UK) |
| PHP 8.1 or 8.2 | Both EOL by December 2025 — no security updates | PHP 8.3 |
| Freightcom direct API integration | Must not expose product as nicotine to carrier | Manual label creation via Freightcom portal or neutral intermediary layer |
| GoHighLevel / OpenDoors | Being transitioned out; Alan still has access | HubSpot or custom CRM after data migration |
| Custom-built affiliate system from scratch | AffiliateWP + WooNinjas add-on already solves two-tier requirements | AffiliateWP |
| Generic geolocation plugins (GeoTargetingPro, Yellow Tree) | They filter content by location, not route orders to distributors | Custom WooCommerce hook + MaxMind GeoIP2 |
| WordPress Multisite | Overkill and a significant migration risk — existing three separate installs are already working independently | Keep three separate WooCommerce installs, manage via ManageWP |

---

## Stack Patterns by Variant

**If existing AffiliateWP installation is intact and licensed:**
- Audit commission structures configured by AJ
- Add WooNinjas Sub Affiliates add-on for two-tier
- Do not reinstall from scratch — preserve existing affiliate data

**If existing AffiliateWP is broken, unlicensed, or missing:**
- Fresh install of AffiliateWP (annual license ~$299/year for Plus)
- Purchase WooNinjas Sub Affiliates add-on separately
- Rebuild affiliate accounts from client's records

**If B2B King is chosen for wholesale pricing:**
- Eliminates need for separate User Approval plugin and custom registration form plugin
- One purchase covers: custom pricing per account, account approval workflow, document upload on registration
- Verify compatibility with existing WooCommerce version before purchase

**If HubSpot CRM is chosen:**
- Install official HubSpot for WooCommerce plugin (free, wordpress.org)
- Configure WooCommerce sync for orders, customers, abandoned carts
- Export GoHighLevel contacts as CSV, import to HubSpot
- Revoke Alan's access to GoHighLevel immediately on transition

**If custom CRM is chosen instead:**
- Build as standalone mobile-responsive web app (Next.js + Supabase is a reasonable lightweight stack)
- Authenticate staff via separate user table — no WP login required
- Pull order data from WooCommerce via REST API
- This is a Phase 2+ decision after GoHighLevel migration scope is understood

---

## Version Compatibility Notes

| Component | Compatible With | Notes |
|-----------|-----------------|-------|
| WooCommerce 9.x | PHP 8.3 | Fully compatible; PHP 8.3 is the official recommendation |
| AffiliateWP | WooCommerce 8.x/9.x | Verify on audit — AffiliateWP maintains WooCommerce compatibility; check their changelog |
| ShipStation plugin 4.9.8 | WooCommerce 8.x/9.x | Verified 2025; inventory API added in 4.6.0 |
| Order Approval for WooCommerce | WooCommerce core | Updated Oct 2025; verify against installed WC version |
| MaxMind GeoLite2 | PHP 8.x | Free database; requires `geoip2/geoip2` Composer package |
| B2B King (if selected) | WooCommerce 7.x+ | Verify against exact WooCommerce version on site before purchase |

---

## Sources

- WooCommerce official docs (woocommerce.com/document/update-php-wordpress/) — PHP 8.3 recommendation, BACS setup. **HIGH confidence.**
- Perplexity search: "WooCommerce multi-region plugins 2025" — multi-site patterns. **HIGH-MEDIUM confidence.**
- Perplexity search: "AffiliateWP two-tier wholesale retail 2025" — WooNinjas add-on for multi-tier. **HIGH-MEDIUM confidence.**
- Perplexity search: "WooCommerce wholesale pricing per account 2025" — Wholesale Suite, B2B King comparison. **MEDIUM confidence** (plugin selection depends on audit findings).
- Perplexity search: "WooCommerce WorldPay timeout fix 2025" — PHP max_execution_time fix, WorldPay API timeout settings. **MEDIUM confidence** (client believes server-side routing issue; contact WorldPay tech team for definitive diagnosis).
- Perplexity search: "ShipStation WooCommerce UK 2025" — official plugin version 4.9.8, tracking auto-upload. **HIGH confidence.**
- Perplexity search: "WooCommerce CRM FluentCRM HubSpot mobile 2025" — HubSpot standalone mobile app advantage. **MEDIUM confidence** (CRM selection deferred to post-audit).
- Perplexity search: "WooCommerce geo-routing nearest distributor 2025" — confirmed no off-the-shelf solution exists. **HIGH confidence** that this requires custom development.
- Perplexity search: "WooCommerce bank transfer manual approval 2025" — Order Approval for WooCommerce plugin, updated Oct 2025. **HIGH confidence.**
- WorldPay support docs (support.worldpay.com/support/CNP-API/content/notesontime.htm) — API timeout recommendations. **HIGH confidence** for timeout values.

---

*Stack research for: Puxx multi-region WooCommerce platform (CA/UK/US)*
*Researched: 2026-04-08*
