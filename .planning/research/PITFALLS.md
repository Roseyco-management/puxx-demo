# Pitfalls Research

**Domain:** Inherited WooCommerce multi-region e-commerce (nicotine products)
**Researched:** 2026-04-08
**Confidence:** HIGH-MEDIUM (web-grounded via Perplexity with citations; specific edge cases are MEDIUM)

---

## Critical Pitfalls

### Pitfall 1: Treating the Inherited Codebase as Trustworthy

**What goes wrong:**
The team assumes that because code exists and some things appear to work, the underlying logic is sound. Custom hooks, action overrides, and bespoke dashboard code written by two different dev teams will conflict with each other in ways that only surface under specific conditions — specific roles, specific order states, specific product combinations. Fixes applied to the surface break something else silently.

**Why it happens:**
Previous developers wrote ad-hoc solutions without documenting intent. Two teams means two conflicting approaches to the same problem (e.g., user roles defined one way by the Sri Lankan team, modified another way by AJ). No test coverage means failures are invisible until a customer hits them.

**How to avoid:**
- Treat the audit phase as a teardown, not a spot-check. Document every custom hook, filter, and plugin interaction before touching anything.
- Stand up a staging environment on SiteGround before modifying production. Make no live changes without a tested staging version first.
- Use Query Monitor and WP Debug log to map what fires during checkout — the critical path. Do not assume any step works until you have watched it succeed end-to-end on staging.
- Prioritise by revenue impact: checkout flow first, affiliate system second, admin dashboard third.

**Warning signs:**
- Plugin list contains plugins with identical or overlapping purposes (two pricing plugins, two affiliate plugins)
- Database contains orphaned custom tables with no corresponding active plugin
- `functions.php` in a child theme contains more than 200 lines of custom business logic
- `wp_options` table has transients from deactivated plugins still accumulating

**Phase to address:** Audit phase (before any feature work begins)

---

### Pitfall 2: WorldPay 60-Second Timeout Is Not Just a PHP Limit

**What goes wrong:**
The instinct is to increase `max_execution_time` in PHP ini and call it done. This solves the symptom if the timeout is server-side, but does nothing if the root cause is SiteGround's proxy/firewall terminating idle connections, WorldPay's callback URL not being reachable, or the WooCommerce IPN endpoint returning a non-200 before WorldPay finishes processing.

**Why it happens:**
WorldPay's CNP-API documentation recommends a 20-second timeout for transaction requests, but the gateway itself can take longer on declined cards, 3DS redirects, or network congestion. SiteGround shared/cloud hosting imposes connection timeouts at the nginx/proxy layer that are separate from PHP's `max_execution_time`. Both layers can silently drop the connection while PHP is still executing.

**How to avoid:**
- Enable WorldPay debug logging in WooCommerce > Settings > Payments > WorldPay before any investigation — do not attempt blind fixes.
- Confirm the callback/IPN URL is publicly accessible (test with a request bin or WorldPay's test tools before touching server config).
- Check SiteGround's nginx proxy timeout settings via Site Tools; PHP execution time and proxy idle timeout are separate knobs.
- Contact WorldPay tech team (they are available) with the raw log output — they can confirm whether the timeout is on their side or the merchant's.
- Test with a real card in WorldPay sandbox mode before touching production.

**Warning signs:**
- Timeout occurs consistently at exactly 60 seconds (suggests proxy layer, not PHP)
- Timeout only occurs on 3DS-authenticated cards (suggests IPN callback flow issue)
- WooCommerce order status goes to "pending" but never "processing" (IPN not received)
- WorldPay dashboard shows transaction as "authorised" but WooCommerce shows "failed" (callback URL unreachable)

**Phase to address:** Payment integration fix phase

---

### Pitfall 3: Gift Card Payment Workaround Has No Fallback and Unclear Failure Modes

**What goes wrong:**
The gift card workaround for CA/US (where Stripe is banned) depends on a third-party plugin built by a friend's dev team. If that plugin has a bug, a WooCommerce version incompatibility, or a connectivity issue with the external gift card system, the CA/US sites have no payment path at all. There is no fallback. The failure mode is invisible to the customer — the checkout just breaks.

**Why it happens:**
The workaround was built to solve a real problem (Stripe ban on nicotine) but was likely built for a specific WooCommerce version and tested minimally. Plugin integration points (hooks, REST endpoints) break between WooCommerce minor versions. The external gift card system is also a dependency that can fail independently.

**How to avoid:**
- Before integrating on the WooCommerce side, document the full flow: what the plugin sends, what the external gift card system returns, and what WooCommerce needs to receive to mark a payment complete.
- Test the full flow end-to-end in staging with the friend's dev team involved before touching production.
- Add explicit error handling: if the gift card system returns anything other than a success, surface a clear message to the customer rather than a PHP error or blank screen.
- Establish a monitoring alert on the CA/US checkout page — if the payment step fails more than X times in Y minutes, alert immediately.
- Document the friend's dev team contact and escalation path in case of failures post-launch.

**Warning signs:**
- Plugin has not been updated since the WooCommerce version currently running on the sites
- No error logging in the plugin (silent failures)
- The external gift card system has no status page or uptime monitoring
- Testing only done with the plugin in isolation, not with the full WooCommerce order flow

**Phase to address:** Payment integration fix phase

---

### Pitfall 4: Cloned Multi-Region Sites Will Silently Diverge Over Time

**What goes wrong:**
Three sites were cloned from a single source. Any change made to one site (plugin update, settings change, custom code fix) is not automatically replicated. Within weeks of active development, the three sites will be in different states. Debugging a problem on the UK site will not transfer to CA because CA has a different plugin version. AJ may have made undocumented changes to one site but not the others.

**Why it happens:**
WooCommerce Multisite does not sync orders, products, plugin versions, or settings between network sites automatically. With three separate installs (not even a multisite network), there is no built-in sync mechanism. The previous developers almost certainly made ad-hoc fixes to specific sites without documenting what changed.

**How to avoid:**
- Before any development work, document the current state of all three sites: WordPress version, WooCommerce version, active plugins and versions, theme and child theme files. Do this via WP-CLI or a plugin like Health Check — a spreadsheet with version numbers per site is the minimum.
- Establish a deployment protocol: changes are tested on staging, then deployed to all three production sites in the same deployment window. No ad-hoc production edits.
- Maintain a shared `functions.php` base in version control. Region-specific customisations are isolated in separate conditional blocks, not separate files scattered across three dashboards.
- Flag AJ's access revocation as an immediate task — he currently has access to all three sites and may make undocumented changes during the transition.

**Warning signs:**
- Plugin version numbers differ between sites (check WP-CLI `plugin list` on each)
- `wp_options` settings for shared plugins have different values across sites
- Any site has "Needs update" plugins that others do not
- AJ still has admin access after transition begins

**Phase to address:** Audit phase (document divergence), then all subsequent phases need deployment protocol enforced

---

### Pitfall 5: AffiliateWP Two-Tier Referral May Not Support the Wholesale/Retail Split Natively

**What goes wrong:**
AJ claimed AffiliateWP handles everything. AffiliateWP's core product supports single-tier referrals. Two-tier (referrer gets commission on referee's sales) requires the "Affiliate Referrals" add-on. The wholesale vs retail distinction (different commission rates and rules for wholesale codes vs retail codes) is not standard AffiliateWP functionality — it may require custom development or a separate plugin. Building on an assumption that AffiliateWP supports this natively leads to discovering the limitation mid-build.

**Why it happens:**
AffiliateWP is widely recommended and the claim "it covers all needs" is easy to make without testing the specific requirement. Two-tier and role-based commission structures are edge cases that require premium add-ons or custom code.

**How to avoid:**
- First access to the sites must include a hands-on test of the existing affiliate system: what plugin is installed, what version, what add-ons are active, and whether two-tier tracking actually fires end-to-end.
- Document the exact commission rules: wholesale code A generates X% for the referrer and Y% for the mid-tier. Retail code B generates Z%. Map this to AffiliateWP's data model before writing a line of code.
- If AffiliateWP cannot support the model without significant custom code, evaluate alternatives (Solid Affiliate, YITH WooCommerce Affiliates) at this point — not after building.
- Caching plugins will break AffiliateWP cookie tracking unless explicitly configured to exclude affiliate URLs and the affiliate area pages.

**Warning signs:**
- AffiliateWP is installed without the "Affiliate Referrals" add-on (two-tier won't work)
- Commission rules in the current system are implemented via coupon codes rather than AffiliateWP's native referral tracking
- No test transactions exist in the AffiliateWP referral log
- Custom PHP in functions.php that appears to patch AffiliateWP behaviour

**Phase to address:** Audit phase (verify what is installed), affiliate system phase (build or fix)

---

### Pitfall 6: SiteGround WP-Cron Unreliability Breaking Background Processes

**What goes wrong:**
WooCommerce relies heavily on WP-Cron for scheduled tasks: order status transitions, inventory checks, low-stock alerts, email queueing, Action Scheduler jobs. SiteGround's default setup runs WP-Cron only when a page is visited. On low-traffic periods (overnight, between orders), cron jobs don't run. Action Scheduler jobs pile up in the database. Orders get stuck in "processing" without triggering fulfilment automation. Low-stock alerts fire hours late.

**Why it happens:**
WordPress's WP-Cron is pseudo-cron: it fires on HTTP requests, not on a real system timer. This is a known weakness that most hosting guides gloss over. SiteGround's shared/cloud infrastructure also imposes PHP execution time limits that cause long-running cron tasks to die silently partway through.

**How to avoid:**
- Disable WP-Cron (`define('DISABLE_WP_CRON', true)` in `wp-config.php`) on all three sites.
- Set up a real server cron via SiteGround Site Tools (Devs > Cron Jobs) using curl: `* * * * * curl -s https://site.com/wp-cron.php?doing_wp_cron >/dev/null 2>&1`
- Use WP Crontrol plugin to inspect what jobs are pending and detect backlogs.
- For the fulfilment workflow specifically, use Action Scheduler (bundled with WooCommerce) which has retry logic and a UI for monitoring stuck jobs.

**Warning signs:**
- WooCommerce > Status > Scheduled Actions shows hundreds of "pending" items
- Order status emails are delayed or not sending
- Low-stock alerts are inconsistent
- Any Action Scheduler task shows "in-progress" for more than 5 minutes without completing

**Phase to address:** Hosting/infrastructure setup phase (fix before any automation is built on top of it)

---

### Pitfall 7: Freightcom Privacy Requirement Is a Fragile Manual Process

**What goes wrong:**
The shipping flow for CA/US cannot send product details (nicotine) to Freightcom. Without a technical intermediary, this requires manual intervention on every order: someone must translate the order into non-identifying shipping details before submitting to Freightcom. Any automation that auto-submits orders to Freightcom risks exposing product identity and potentially losing the Freightcom account.

**Why it happens:**
Standard WooCommerce-to-shipping-provider integrations send product name, description, and sometimes SKU to the carrier. There is no built-in "sanitise product details" layer. Previous developers may have assumed a plugin would handle this or left it as a manual step without flagging the risk.

**How to avoid:**
- Do not integrate WooCommerce directly with Freightcom via any plugin that sends product metadata.
- Design the CA/US fulfilment flow to generate sanitised shipping labels: generic product description (e.g., "Consumer Goods"), weight, dimensions — no product name, no SKU that identifies the product.
- The intermediary layer (whether manual or automated) must be tested and confirmed before any automated fulfilment is built on top of it.
- Treat this as a compliance risk, not just a technical detail — flag to the client if the current system accidentally sends identifying information.

**Warning signs:**
- Any WooCommerce Freightcom integration plugin is active (these will send product data)
- Order export to Freightcom includes product name field
- Current process is undocumented (manual steps not written down anywhere)

**Phase to address:** Fulfilment automation phase (design before building)

---

### Pitfall 8: Client Trust Re-Burned by Delivering "Working" Features That Break in Production

**What goes wrong:**
The client has been burned twice by developers who demonstrated things working in controlled conditions that then failed in production. Delivering a feature that works on staging but fails for a real customer — especially a payment failure — will immediately damage the relationship beyond repair. The client is not technical; he will interpret any production failure as the same pattern he experienced before.

**Why it happens:**
Staging environments on SiteGround are not identical to production: different PHP config, different caching, different SSL certificates, different database contents. A payment flow that works on staging may fail in production because the WorldPay callback URL is different, the staging site has no real payment credentials, or a plugin behaves differently under production load.

**How to avoid:**
- Never mark a payment feature as "done" without a real transaction test in production (even a £1 test order).
- Communicate incremental progress with evidence: screenshots, screen recordings of successful test orders — not just "it's fixed."
- Define explicit acceptance criteria for each feature before building it. "Payment works" is not a criterion. "Test order placed with WorldPay test card succeeds, order status moves to Processing, email received" is a criterion.
- Keep a live "status board" (even a simple shared doc) showing what works, what is in progress, and what is broken. Client can check this without asking.

**Warning signs:**
- Any feature being called "done" without an end-to-end test on the production environment
- Payment features only tested with plugin's built-in test mode, not with a real gateway sandbox
- No explicit acceptance criteria defined before starting a feature

**Phase to address:** Every phase — this is a delivery discipline issue, not a technical one

---

### Pitfall 9: User Role Proliferation Causing Permission Chaos

**What goes wrong:**
Two dev teams working independently on user roles results in a confusing mix: roles defined in the database that no plugin references, plugins that create their own roles on activation, custom capabilities attached to wrong roles, and wholesale users accidentally getting admin capabilities (or losing access to things they need). The fix-as-you-go approach adds new roles rather than consolidating existing ones, making the mess worse.

**Why it happens:**
WordPress user roles are additive by default — plugins create new roles on activation without checking whether a similar role already exists. When two teams implement different wholesale user flows, you end up with `wholesale_customer`, `wholesale_user`, `b2b_customer`, and `woo_wholesale_lead` all meaning approximately the same thing but with different capabilities and different plugin dependencies.

**How to avoid:**
- During audit, run a full role inventory: list every role in the database, what capabilities each has, and what plugin created it. Use User Role Editor plugin for visibility.
- Consolidate to exactly three roles before building new features: retail customer (default `customer`), wholesale customer (one custom role), fulfilment team (one custom role with limited WooCommerce access). Do not deviate.
- Document the capability set for each role and what it controls. No undocumented custom capabilities.
- Test role-based access as part of every feature delivery: log in as each role and verify the experience.

**Warning signs:**
- More than 4 custom roles in the database beyond WordPress defaults
- Role names that don't match what the client calls these users
- Wholesale customers can access WP admin (they should not)
- Fulfilment team members have access to financial data or customer PII they don't need

**Phase to address:** Audit phase (inventory), user roles fix phase (consolidate before building anything role-dependent)

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Leaving previous custom code in place and patching around it | Faster to ship | Debugging becomes impossible; each patch creates new failure modes | Never — audit and remove or rewrite |
| Coupon codes as a substitute for wholesale pricing | Quick to set up | Coupons are visible in cart, can be shared publicly, don't enforce per-account pricing | Never for wholesale — use proper role-based pricing |
| Manual order fulfilment steps without documentation | Avoids automation complexity | Founder-dependency; breaks when staff change | Acceptable as MVP only if explicitly time-boxed |
| Using WP-Cron without real server cron | Default setup, zero config | Background jobs silently fail under load or low traffic | Never on SiteGround — always replace with real cron |
| Making production fixes without staging test | Ships faster | Breaks live checkout; erodes client trust | Never for payment or checkout flows |
| Three separate plugin stacks across three sites | Regional flexibility | Version drift, inconsistent bugs, triple maintenance burden | Never — shared core, regional overrides only |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| WorldPay + WooCommerce | Only increasing PHP `max_execution_time` to fix timeout | Enable debug logging first; check proxy/nginx timeout separately; verify IPN callback URL is reachable; contact WorldPay with logs |
| AffiliateWP + WooCommerce | Assuming two-tier is built-in | Two-tier requires "Affiliate Referrals" add-on; verify before committing to AffiliateWP |
| Caching plugins + AffiliateWP | Caching affiliate referral pages and tracking URLs | Exclude affiliate URL parameters, the affiliate area, and cookie-reading pages from cache |
| Gift card plugin + WooCommerce checkout | Testing plugin in isolation | Test the full order flow: product → cart → checkout → payment → order confirmation → fulfilment trigger |
| ShipStation + WooCommerce (UK) | Auto-uploading before testing label format | Test with one real order before enabling auto-upload; confirm tracking number format WooCommerce accepts |
| Freightcom + WooCommerce (CA/US) | Direct plugin integration | Do not use any direct WooCommerce-Freightcom integration — product data will be sent. Build sanitised export layer |
| GoHighLevel/OpenDoors CRM export | Assuming clean data | GHL exports often contain duplicates, blank fields, and inconsistent phone/email formats. Clean before import to custom CRM |

---

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Unoptimised WooCommerce database from abandoned orders | Slow admin, slow order queries | Run `wp post delete` for test/failed orders; use WP-Optimize or similar to clean transients | After ~5,000 orders or years of accumulated test data |
| Too many active plugins making external API calls on every page | Slow checkout, high TTFB | Audit plugin API calls; move to async where possible; cache external responses | Immediately visible if 3+ plugins call external APIs synchronously |
| WP-Cron running on page load without real server cron | Checkout slowdown on first request after cron fires | Replace with real SiteGround cron (see Pitfall 6) | Any time a heavy cron job fires during a customer page load |
| Custom dashboard loading all orders for analytics without pagination | Admin dashboard times out | Add date-range filters and pagination before displaying order data; never `get_posts()` without limits | After ~1,000 orders |
| Three sites hitting the same SiteGround resource limits simultaneously | Slow sites during peak hours | Distribute cron schedules; use SiteGround's built-in cache (SuperCacher) correctly | On any traffic spike across all three regions |

---

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| AJ retains admin access during transition | Undocumented changes, deliberate or accidental breakage, data exfiltration | Revoke AJ's access on Day 1 of engagement; change all shared credentials; audit recent `wp_posts` and `wp_options` changes |
| Nicotine product listed with direct product name in Freightcom shipment | Loss of Freightcom account; regulatory exposure | Build sanitised shipping label export that strips product identity |
| Wholesale customer account created without document verification | Fraudulent wholesale pricing access | Implement document verification gate (business ID, trade licence) before role is assigned — manual approval flow |
| Age verification not enforced at checkout | Regulatory exposure in CA, UK, US | Implement mandatory age verification (checkbox minimum, ID verification for compliance) — required by most nicotine-specific payment processors |
| Gift card payment system tokens or API keys hardcoded in plugin | Exposed credentials if plugin file is read | Audit friend's plugin for hardcoded secrets; move credentials to `wp-config.php` or environment variables |
| Previous plugin vulnerabilities not patched | SQL injection, file upload RCE, data exposure | Run WPScan or Wordfence audit on all three sites during audit phase; update or remove vulnerable plugins immediately |

---

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Admin dashboard not mobile-friendly | Founder (Fez) cannot manage orders from phone, defeating the primary use case | Design custom admin views mobile-first; test on actual phone before delivery |
| Order status emails using generic WooCommerce copy | Confusing for customers who don't know what "processing" means in this context | Customise all transactional emails with plain-language descriptions of what happens next |
| Inconsistent terminology across three sites (inherited from two dev teams) | Customer confusion; staff confusion when handling cross-region orders | Audit and standardise all UI text, email copy, and admin labels in a single terminology pass before launch |
| Wholesale signup requiring too many steps | Legitimate wholesale customers abandon onboarding | Keep signup short; document verification can be async (submit docs, get approved later) not a blocking gate |
| Bank transfer order requiring admin approval with no customer feedback | Customer doesn't know if their order is received or stuck | Send immediate "order received, awaiting payment verification" email; surface status in order history |

---

## "Looks Done But Isn't" Checklist

- [ ] **WorldPay integration:** Appears to load checkout form — verify a real test transaction completes and order status moves to "processing" in WooCommerce
- [ ] **Gift card payment:** Plugin is active — verify full flow: gift card applied, order placed, fulfilment trigger fires, WooCommerce order created with correct total
- [ ] **Affiliate system:** Dashboard shows referrals — verify cookie tracking fires on referral link click, commission is recorded on referred order completion, two-tier payout calculates correctly
- [ ] **Geo-routing:** Logic exists in code — verify it correctly assigns to nearest distributor WITH stock checks (not just nearest distributor regardless of stock)
- [ ] **Transactional emails:** Emails are configured — verify each email sends at the correct order status transition, not just on "order complete"
- [ ] **ShipStation auto-upload (UK):** Plugin connected — verify tracking number is written back to WooCommerce order and customer notification fires
- [ ] **Wholesale pricing:** Role exists — verify wholesale prices actually display to wholesale role (not retail), and retail prices display to retail (not wholesale)
- [ ] **User roles:** Roles created — verify fulfilment team cannot access financial reports or customer payment data; wholesale users cannot access WP admin
- [ ] **Bank transfer approval flow:** Order state exists — verify admin receives notification, can approve, and order moves to processing with customer email sent
- [ ] **Low-stock alerts:** Alert configured — verify alert actually fires when stock drops below threshold (requires real cron, not WP-Cron)

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Discovered AffiliateWP can't support two-tier wholesale/retail split | HIGH | Evaluate Solid Affiliate or custom plugin; budget 2–3 extra weeks; migrate any existing affiliate data |
| WorldPay timeout unfixable without server infrastructure change | MEDIUM | Request SiteGround support for nginx timeout increase; if denied, consider Cloudflare proxy with longer timeout settings |
| Gift card plugin incompatible with current WooCommerce version | HIGH | Engage friend's dev team immediately; may require WooCommerce version pin or plugin rewrite |
| AJ access revocation causes undiscovered dependencies to break | MEDIUM | Audit all API keys, webhook endpoints, and plugin licenses registered to AJ's accounts before revoking; have rollback plan |
| Discovered sites are more diverged than expected | MEDIUM-HIGH | Freeze all three sites, re-audit divergence points, establish single canonical version, re-deploy to all three from baseline |
| Freightcom discovers product identity from shipment data | HIGH | Immediately suspend CA/US automated fulfilment; revert to fully manual process; rebuild sanitised export layer |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Inherited codebase is untrusted | Phase 1: Audit | Plugin inventory complete; divergence documented; custom hooks mapped |
| WorldPay timeout | Phase 2: Payment fixes | Real test transaction completes end-to-end on production |
| Gift card workaround failure modes | Phase 2: Payment fixes | Full order flow tested on staging with friend's dev team present |
| Multi-site divergence | Phase 1: Audit + every subsequent phase | Deployment protocol enforced; no ad-hoc production edits |
| AffiliateWP two-tier limitation | Phase 1: Audit (verify), Phase 3: Affiliate build | End-to-end commission tracking tested before marking done |
| SiteGround WP-Cron unreliability | Phase 1: Hosting/infrastructure setup | Real server cron confirmed running; Action Scheduler shows no stuck jobs |
| Freightcom privacy risk | Phase 4: Fulfilment automation | Sanitised export verified — no product name or identifying SKU in Freightcom submission |
| Client trust re-burned | Every phase | Every feature has explicit acceptance criteria; real transaction tests before sign-off |
| User role proliferation | Phase 1: Audit + Phase 2: Role consolidation | Exactly 3 custom roles; role access matrix tested for each role |
| AJ access / transition risk | Phase 1: Day 1 | AJ access revoked; all credentials rotated; audit log reviewed |

---

## Sources

- onepix.net — WooCommerce inherited codebase audit (web-grounded, cited)
- WorldPay CNP-API documentation on timeout recommendations (official: support.worldpay.com)
- SiteGround cron job management and WP-Cron replacement (official: siteground.com/kb)
- WooCommerce Developer Advisory: Session management and cron changes in 10.1 (official: developer.woocommerce.com)
- AffiliateWP troubleshooting and caching conflict documentation (official: affiliatewp.com)
- Perplexity web research: WooCommerce multi-site sync pitfalls, wholesale plugin conflicts, nicotine payment compliance (2026, cited sources)
- taskerpaymentgateways.com — Nicotine pouch payment processing updates 2025
- Tower Payments / PRNewswire — Nicotine pouch processor availability 2026

---
*Pitfalls research for: Inherited WooCommerce multi-region e-commerce (nicotine products)*
*Researched: 2026-04-08*
