---
phase: 07-demo-bugfix
type: uat
status: diagnosed
date: 2026-04-11
reviewer: human (client proxy)
deployment: puxx-demo.vercel.app
reference_site: https://puxxcanada.ca/
gaps:
  - id: UAT-01
    area: storefront
    severity: critical
    title: "Product images missing across the site"
    status: failed
  - id: UAT-02
    area: storefront
    severity: critical
    title: "Product data model wrong — should be flavours as products, nicotine strengths as variants"
    status: failed
  - id: UAT-03
    area: storefront
    severity: critical
    title: "Server Components render error on product pages (production)"
    status: failed
  - id: UAT-04
    area: storefront
    severity: high
    title: "404s for /shop, /login, /contact, /blog, /about — stale nav links to non-existent routes"
    status: failed
  - id: UAT-05
    area: storefront
    severity: high
    title: "Website design significantly below puxxcanada.ca quality — use original as template"
    status: failed
  - id: UAT-06
    area: storefront
    severity: low
    title: "Preload as value warnings in console"
    status: failed
  - id: UAT-07
    area: storefront
    severity: info
    title: "Videos are good — keep and incorporate into improved design"
    status: keep
  - id: UAT-08
    area: admin
    severity: high
    title: "Product images not loading in admin products table"
    status: failed
  - id: UAT-09
    area: admin
    severity: high
    title: "Too many product variations in admin — mirrors the wrong storefront model"
    status: failed
  - id: UAT-10
    area: admin
    severity: high
    title: "Dashboard analytics/revenue/product stats empty — needs mock data"
    status: failed
  - id: UAT-11
    area: admin
    severity: medium
    title: "Google Analytics setup guide showing — remove it for demo"
    status: failed
  - id: UAT-12
    area: admin
    severity: medium
    title: "Traffic page shows integration steps that shouldn't be there — just overview"
    status: failed
  - id: UAT-13
    area: admin
    severity: medium
    title: "Email subscribers section empty — needs mock data"
    status: failed
  - id: UAT-14
    area: admin
    severity: medium
    title: "Settings need simplification — client is not tech-savvy"
    status: failed
  - id: UAT-15
    area: admin
    severity: high
    title: "Three locations with different pricing need to be visible from single dashboard"
    status: failed
  - id: UAT-16
    area: portals
    severity: medium
    title: "Portal URLs not documented — client couldn't find them to verify"
    status: unverified
  - id: UAT-17
    area: portals
    severity: high
    title: "Retailer portal needs sidebar nav like admin, not header nav — looks unpolished vs admin"
    status: failed
  - id: UAT-18
    area: portals
    severity: high
    title: "Retailer portal not using TailAdmin components — should match admin panel polish"
    status: failed
  - id: UAT-19
    area: portals
    severity: critical
    title: "Fulfilment login broken — 'Invalid email or password' with fulfilment@puxx.com / fulfil123"
    status: failed
  - id: UAT-20
    area: portals
    severity: high
    title: "Fulfilment login redirects to /login (storefront login) not a fulfilment-specific login"
    status: failed
  - id: UAT-21
    area: portals
    severity: high
    title: "Customer account /uk/account intermittent — loads briefly then redirects to sign-in URL with 404"
    status: failed
  - id: UAT-22
    area: design
    severity: high
    title: "Color scheme too much green — use original WordPress site color scheme from puxxcanada.ca"
    status: failed
  - id: UAT-23
    area: design
    severity: high
    title: "Overall design quality below WordPress original — use puxxcanada.ca as template, may need WP source code"
    status: failed
---

# Phase 07 — User Acceptance Testing

**Reviewer:** Human (client proxy)
**Date:** 2026-04-11
**Deployment:** puxx-demo.vercel.app
**Reference site:** https://puxxcanada.ca/

## Overview

After completing all 7 phases of the v0.1 Demo milestone and passing 8 rounds of Codex adversarial code review, the live deployment was reviewed in a browser. While the admin portal is structurally sound, the storefront has significant gaps in visual quality, product data modelling, and runtime stability compared to the original WordPress site at puxxcanada.ca.

## Console Errors Observed

```
[Error] <link rel=preload> must have a valid `as` value (x2)
[Error] Failed to load resource: 404 — /shop, /login, /contact, /blog, /about (multiple occurrences)
[Error] Server Components render error (production build, details omitted)
```

## Storefront Findings

### UAT-01: Product images missing (CRITICAL)
No product images are rendering on the storefront product pages or product cards.

### UAT-02: Product data model wrong (CRITICAL)
Currently: 72 separate product cards (12 flavours x 6 strengths).
Expected: 12 flavour products, each with a strength selector/variant picker — matching puxxcanada.ca's model where you select a flavour first, then choose your nicotine strength.

### UAT-03: Server Components render error (CRITICAL)
Clicking into a product detail page produces a Server Components render error in the production build. The digest is stripped in production mode — need to reproduce in dev to get the actual error.

### UAT-04: 404 routes (HIGH)
The navigation references /shop, /login, /contact, /blog, /about — none of these exist in the Next.js route tree. These are likely inherited from the original WordPress site's navigation structure and need to be either:
- Created as real pages
- Redirected to their region-scoped equivalents (e.g., /shop → /uk/products)
- Removed from the navigation

### UAT-05: Design quality gap (HIGH)
The demo site looks significantly different from and worse than puxxcanada.ca. The client's expectation is that the custom-built demo should look at least as polished as the original WordPress site. The videos on the demo are good and should be kept — everything else needs a design pass using puxxcanada.ca as the reference.

### UAT-06: Preload warnings (LOW)
`<link rel=preload>` with invalid `as` value warnings persist in the console.

### UAT-07: Videos are good (KEEP)
The video content on the demo site is the one thing explicitly praised. Incorporate into the improved design.

## Admin Portal Findings

### Overall Assessment: Structurally good

The admin portal's structure and navigation are solid. The client's key selling point — "one dashboard to manage all three locations instead of three WooCommerce instances" — resonates, and the admin panels for orders, customers, and products are well-built.

### UAT-08: Admin product images not loading (HIGH)
Product images in the admin products table are broken/missing.

### UAT-09: Too many admin product variations (HIGH)
Admin products list shows 72 rows — same underlying data model problem as UAT-02.

### UAT-10: Dashboard empty (HIGH)
The admin dashboard overview shows empty analytics, revenue, and product stats. Needs realistic mock data seeded into Supabase to make the demo compelling.

### UAT-11: Google Analytics setup guide (MEDIUM)
The analytics section shows a setup wizard for Google Analytics integration. This is developer-facing and shouldn't be visible in the demo.

### UAT-12: Traffic integration steps (MEDIUM)
Traffic analytics page looks good but shows "integration steps" that are developer-facing. Should show just the data overview.

### UAT-13: Empty email subscribers (MEDIUM)
The email subscribers section is empty. Needs mock subscriber data.

### UAT-14: Settings too complex (MEDIUM)
Settings pages need simplification. Client is older and not tech-savvy. Payments configured via env vars — don't show deep config. Tax settings are worth keeping.

### UAT-15: Three locations not visible (HIGH)
The demo's key differentiator is managing three regions (CA, UK, US) from one dashboard. The admin needs to clearly show different locations with their respective pricing. This is the "instead of 3 WooCommerce instances" pitch.

### UAT-16: Portal URLs not documented (MEDIUM)
Client couldn't find the portal URLs to verify them. Need clear documentation or nav links.
Known portal paths:
- Retailer portal: /portal
- Fulfilment: /fulfilment
- Admin: /admin
- Customer account: /uk/account (region-scoped)

## Portal Sweep Findings (2026-04-12)

Second pass reviewing the portals with correct credentials.

### UAT-17 & UAT-18: Retailer Portal — layout and polish gap

The retailer portal uses a simple header nav (Products | Orders | Username | Logout) instead of a sidebar layout like the admin panel. The admin has a proper TailAdmin-powered sidebar with icons, collapsible menu, and polished styling. The retailer portal looks bare and unfinished by comparison. **Should use sidebar layout matching admin panel and reuse TailAdmin components.**

### UAT-19 & UAT-20: Fulfilment login completely broken

fulfilment@puxx.com / fulfil123 returns "Invalid email or password." The fulfilment route at /fulfilment redirects to /login (the storefront customer login page) instead of having its own login flow or sharing the portal login. Either the seeded fulfilment user email doesn't match, the password is wrong, or the auth flow doesn't recognize the fulfilment role. Needs investigation.

### UAT-21: Customer account intermittent auth failure

/uk/account loaded briefly showing the dashboard, then on subsequent visits redirects to /uk/sign-in which 404s. The sign-in route may not exist under the region-scoped tree, or the session cookie is expiring/failing immediately.

### UAT-22 & UAT-23: Color scheme and overall design quality

Too much green throughout the site. The original WordPress site at puxxcanada.ca has a more refined, darker color scheme with better visual hierarchy. The demo should adopt the original site's color palette and typography. User may provide the WordPress source code again if needed for reference — we also have the option to scrape puxxcanada.ca for the current design.

**Key instruction from user:** "Go back to basics and use the original website on WordPress which looks better than what we have."

## Recommendation

This is beyond a gap-closure phase. The storefront needs a design overhaul using puxxcanada.ca as reference, the product data model needs restructuring, and the admin needs mock data and UX cleanup. Recommend a new milestone (v0.2 Demo Polish) with:

1. **Phase 1: Storefront redesign** — Use puxxcanada.ca as visual template and color scheme, keep videos, fix product model (flavour = product, strength = variant), fix all product images
2. **Phase 2: Portal polish** — Retailer portal sidebar layout using TailAdmin, fix fulfilment login/auth, fix customer account auth redirect, consistent styling
3. **Phase 3: Admin polish** — Seed mock analytics/revenue/subscriber data, remove setup guides, add multi-region dashboard view
4. **Phase 4: Route cleanup** — Fix 404s, create missing pages or redirects, fix preload warnings, fix sign-in route
5. **Phase 5: Color scheme unification** — Apply puxxcanada.ca color palette across all surfaces (storefront, portals, admin)

**Source material needed:** WordPress source code from original puxxcanada.ca site (user to confirm if re-provision needed) OR scrape live site for design reference.
