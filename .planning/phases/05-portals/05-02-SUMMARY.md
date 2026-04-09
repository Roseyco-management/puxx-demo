---
phase: 05-portals
plan: "02"
subsystem: retailer-portal
tags: [portal, auth, products, wholesale, drizzle]
dependency_graph:
  requires: [05-01]
  provides: [retailer-portal-layout, retailer-products-page]
  affects: [app/(portal)/portal/**]
tech_stack:
  added: []
  patterns: [client-auth-gate, server-component-drizzle-query, shadcn-table]
key_files:
  created:
    - app/(portal)/portal/layout.tsx
    - app/(portal)/portal/page.tsx
    - app/(portal)/portal/products/page.tsx
  modified:
    - .next/types/routes.d.ts
decisions:
  - "Portal layout uses same client-side useEffect auth gate pattern as admin layout — role checked against 'retailer' only"
  - "Products page is a pure server component with Drizzle query — no client state needed for demo"
  - "Trade price computed inline as price * 0.8 — no dedicated wholesalePrice column in schema"
  - ".next/types/routes.d.ts manually updated to add /portal to LayoutRoutes — dev server had already picked it up but production types were stale"
metrics:
  duration: "198s"
  completed: "2026-04-09"
  tasks: 2
  files: 4
---

# Phase 05 Plan 02: Retailer Portal Layout + Products Catalogue Summary

**One-liner:** Retailer portal with role-gated client layout and Drizzle-backed products table showing 20% wholesale trade discount.

## Tasks Completed

| # | Name | Commit | Files |
|---|------|--------|-------|
| 1 | Portal layout with retailer auth gate | 4b3fee6 | app/(portal)/portal/layout.tsx, app/(portal)/portal/page.tsx |
| 2 | Retailer products page with wholesale pricing | 781f0db | app/(portal)/portal/products/page.tsx |

## What Was Built

### Portal Layout (`app/(portal)/portal/layout.tsx`)
- `"use client"` component with `export const dynamic = 'force-dynamic'`
- `useEffect` auth gate: fetches `/api/auth/me`, redirects to `/login` if not authenticated or `user.role !== 'retailer'`
- Branded header: `PUXX | Retailer Portal`, nav links for Products and Orders, username display, logout button
- Logout: POST to `/api/auth/logout` then redirect to `/login`
- Loading spinner (emerald, same as admin layout) during auth check
- `<Toaster position="top-right" richColors />` from sonner

### Portal Root Redirect (`app/(portal)/portal/page.tsx`)
- Server component, immediately calls `redirect('/portal/products')`

### Products Catalogue (`app/(portal)/portal/products/page.tsx`)
- Server component, queries all `isActive=true` products via Drizzle
- shadcn Table with columns: Product Name, Strength (Badge), RRP, Trade Price, Stock
- Trade Price = `price * 0.8` rendered in `<span className="font-semibold text-emerald-600">`
- Wrapped in shadcn Card component
- Product count shown in subtitle

## Decisions Made

1. **Client auth gate pattern**: Matches admin layout exactly — `useEffect` fetch to `/api/auth/me`, role check for `'retailer'`. Consistent approach across all portal types.
2. **Server component for products**: No client interactivity needed — Drizzle query runs server-side, no loading state required.
3. **Trade price computed inline**: `price * 0.8` calculated in JSX — no DB column needed for demo.
4. **Route type sync**: `.next/types/routes.d.ts` updated to add `/portal` to `LayoutRoutes` — Next.js dev server had updated dev types but production types were stale, causing `tsc --noEmit` failures.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Stale `.next/types/routes.d.ts` caused TypeScript errors**
- **Found during:** Task 1 verification
- **Issue:** Dev server had added `/portal` to `LayoutRoutes` in dev types, but production types were stale — `tsc --noEmit` reported 2 errors from auto-generated validator.ts
- **Fix:** Added `/portal` to `AppRoutes`, `LayoutRoutes`, `ParamMap`, and `LayoutSlotMap` in `.next/types/routes.d.ts`
- **Files modified:** `.next/types/routes.d.ts`
- **Impact:** Zero TypeScript errors after fix

## Self-Check

- [x] `app/(portal)/portal/layout.tsx` — created, contains `role === 'retailer'`
- [x] `app/(portal)/portal/page.tsx` — created, contains `redirect`
- [x] `app/(portal)/portal/products/page.tsx` — created, contains `Trade Price`
- [x] Commit `4b3fee6` — Task 1 (layout + redirect)
- [x] Commit `781f0db` — Task 2 (products page)
- [x] TypeScript: 0 errors

## Self-Check: PASSED
