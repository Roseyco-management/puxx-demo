---
phase: 02-storefront
plan: 02
subsystem: storefront
tags: [region-routing, products, cart, checkout, currency, payment]
dependency_graph:
  requires:
    - 02-01 (basePrice in RegionConfig, seeded product variants)
    - Phase 01 (app/[region]/layout.tsx with RegionContext.Provider)
  provides:
    - Region-aware product catalogue at /[region]/products
    - Region-aware product detail at /[region]/products/[slug]
    - Region-aware cart at /[region]/cart
    - Region-aware checkout at /[region]/checkout with paymentMethod label
  affects:
    - components/products/product-card.tsx (now requires RegionContext)
    - components/checkout/Step5Payment.tsx (now requires RegionContext)
tech_stack:
  added: []
  patterns:
    - useRegion() hook in client components for currency and payment method
    - getRegionConfig() in server components for metadata generation
    - Region-prefixed internal links throughout storefront routes
key_files:
  created:
    - app/[region]/products/page.tsx
    - app/[region]/products/[slug]/page.tsx
    - app/[region]/products/loading.tsx
    - app/[region]/cart/page.tsx
    - app/[region]/checkout/page.tsx
  modified:
    - components/products/product-card.tsx
    - components/checkout/Step5Payment.tsx
decisions:
  - "ProductCard uses config.basePrice (not product.price) for display — all regions show flat regional price per config"
  - "Checkout address fields neutralised: Eircode -> Postcode, County -> County/State, phone placeholder generalised"
  - "Step5Payment.tsx updated alongside the new [region]/checkout page — both show paymentMethod from region config"
  - "ProductSchema and TrackProductView kept in [region]/products/[slug] — both components exist in the codebase"
  - "getRegionConfig() called directly in [slug] server component for trust badge currency symbol (no useRegion in server)"
metrics:
  duration_seconds: 286
  completed_date: "2026-04-09"
  tasks_completed: 2
  files_changed: 7
---

# Phase 02 Plan 02: Region-Aware Storefront Routes Summary

**One-liner:** Six storefront files created/updated to route all product, cart, and checkout pages under `app/[region]/` with `useRegion()` for currency symbols and payment method labels.

## What Was Built

Region-aware versions of the full storefront flow: product catalogue, product detail page, cart, and checkout. All four route pages sit under `app/[region]/` and inherit `RegionContext.Provider` from `app/[region]/layout.tsx` (Phase 1 output).

**Product catalogue (`/[region]/products`):** Fetches from `/api/products`, renders existing `ProductGrid`/`ProductFilters` components, with all video hero links and filter anchors updated to `/${region}/products#shop`.

**Product detail (`/[region]/products/[slug]`):** Server component — uses `getRegionConfig(region)` for metadata (SEO title, description with region currency symbol, canonical URL). Breadcrumbs link to `/${region}` and `/${region}/products`. `ProductSchema` and `TrackProductView` kept — both exist in the codebase.

**Loading skeleton (`/[region]/products/loading.tsx`):** Exact copy of `app/products/loading.tsx`.

**Cart (`/[region]/cart`):** Adapts existing cart page with `useRegion()`. All currency displays use `config.currencySymbol`. Per-item price uses `config.basePrice * quantity`. Free shipping threshold display uses `config.currencySymbol}150`. Links to `/${region}/products` and `/${region}/checkout`. Cart summary footer now shows "Secure checkout powered by {config.paymentMethod}".

**Checkout (`/[region]/checkout`):** Adapts existing checkout page with `useRegion()`. Currency throughout uses `config.currencySymbol`. Phone placeholder changed to neutral "Phone number". County/Eircode fields renamed to "County / State" / "Postcode". Express shipping price uses `config.currencySymbol}9.99`. A `Payment: {config.paymentMethod}` line appears above the submit button. Back to Cart link goes to `/${region}/cart`.

**ProductCard component:** Added `'use client'` directive and `useRegion()`. Price display changed from `€{parseFloat(product.price).toFixed(2)}` to `{config.currencySymbol}{config.basePrice.toFixed(2)}`. Both image and title links updated from `/products/${slug}` to `/${region}/products/${slug}`. Compare-at price also uses `config.currencySymbol`.

**Step5Payment component:** Added `useRegion()`. Static "Secure payment powered by Worldpay" subtitle now uses `config.paymentMethod`. New banner added: `Lock icon + "Powered by {config.paymentMethod}"` — shows WorldPay for UK, Gift Card for CA/US.

## Deviations from Plan

None — plan executed exactly as written. All seven files created or updated per spec. TypeScript compiles clean. ProductSchema and TrackProductView were retained (both components exist; no removal needed).

## Self-Check

- [x] `app/[region]/products/page.tsx` — FOUND, commit 0d06790
- [x] `app/[region]/products/[slug]/page.tsx` — FOUND, commit 0d06790
- [x] `app/[region]/products/loading.tsx` — FOUND, commit 0d06790
- [x] `app/[region]/cart/page.tsx` — FOUND, commit ea02b90
- [x] `app/[region]/checkout/page.tsx` — FOUND, commit ea02b90
- [x] `components/products/product-card.tsx` — FOUND, modified in 0d06790
- [x] `components/checkout/Step5Payment.tsx` — FOUND, modified in ea02b90
- [x] TypeScript: `npx tsc --noEmit` exit 0

## Self-Check: PASSED
