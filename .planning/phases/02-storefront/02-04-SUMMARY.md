---
phase: 02-storefront
plan: "04"
subsystem: storefront
tags: [variant-selector, pdp, cart, product-card]
dependency_graph:
  requires: []
  provides: [VariantSelector, ProductCard-addItem]
  affects: [app/[region]/products/[slug]/page.tsx, components/products/product-card.tsx]
tech_stack:
  added: []
  patterns: [zustand-selector, parallel-fetch-useEffect, next-router-push]
key_files:
  created:
    - components/products/VariantSelector.tsx
  modified:
    - app/[region]/products/[slug]/page.tsx
    - components/products/product-card.tsx
decisions:
  - "VariantSelector accepts region as prop (not via useRegion) to avoid context boundary issues in server component tree"
  - "Strength variants sorted by numeric mg parse to handle mixed values like 4mg/8mg/16mg correctly"
  - "ProductCard passes all CartProduct fields including sku — null values passed as-is matching CartProduct interface"
metrics:
  duration: ~8m
  completed_date: "2026-04-09"
  tasks_completed: 2
  files_modified: 3
---

# Phase 02 Plan 04: Variant Selector + ProductCard Cart Wiring Summary

**One-liner:** Interactive flavour/strength variant selector on PDP + ProductCard Add to Cart wired to Zustand cart store.

## What Was Built

### Task 1: VariantSelector component (components/products/VariantSelector.tsx)

A `'use client'` component that:
- Accepts `{ currentSlug, currentFlavor, currentStrength, region }` as props
- Fires two parallel `fetch` calls on mount: `/api/products?flavor=X` and `/api/products?strength=X`
- Renders a "Strength" button group (sorted ascending by numeric mg) when multiple strength variants exist
- Renders a "Flavour" button group when multiple flavour variants exist
- Active button: `bg-gray-900 text-white`; inactive: outlined with hover
- Navigates via `router.push('/' + region + '/products/' + slug)` on click
- Shows `animate-pulse` skeleton (2 rows x 4 boxes) while loading
- Returns `null` if product has no siblings (both groups would have 1 or fewer entries)

### Task 2A: PDP wiring (app/[region]/products/[slug]/page.tsx)

- Added import: `import { VariantSelector } from '@/components/products/VariantSelector'`
- Inserted `<VariantSelector>` between `<ProductInfo product={product} />` and `<AddToCart product={product} />`
- Passes `product.slug`, `product.flavor ?? ''`, `product.nicotineStrength ?? ''`, and `region`

### Task 2B: ProductCard addItem (components/products/product-card.tsx)

- Added import: `import { useCartStore } from '@/lib/store/cart-store'`
- Added selector: `const addItem = useCartStore((s) => s.addItem)`
- Added `onClick` to `<Button>`: calls `addItem` with all `CartProduct` fields (`id, name, slug, price, nicotineStrength, flavor, imageUrl, stockQuantity, sku`)
- `e.preventDefault()` prevents card link navigation from firing; disabled state remains for out-of-stock products

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check

- FOUND: components/products/VariantSelector.tsx
- FOUND commit 8e73c67 (Task 1)
- FOUND commit 54f0f45 (Task 2)
- `npx tsc --noEmit` exits 0

## Self-Check: PASSED
