---
phase: 05-portals
plan: "03"
subsystem: portals
tags: [retailer-portal, fulfilment, orders, drizzle]
dependency_graph:
  requires: [05-01]
  provides: [retailer-orders-page, fulfilment-route-group, fulfilment-patch-api]
  affects: [portal-layout, admin-orders]
tech_stack:
  added: []
  patterns: [server-component-with-client-child, drizzle-inarray-query, optimistic-update]
key_files:
  created:
    - app/(portal)/portal/orders/page.tsx
    - app/api/fulfilment/orders/[id]/route.ts
    - components/portal/InvoiceButton.tsx
    - app/(fulfilment)/fulfilment/layout.tsx
    - app/(fulfilment)/fulfilment/page.tsx
    - components/fulfilment/FulfilmentQueue.tsx
  modified: []
decisions:
  - "(05-03): portal/orders is a server component querying Drizzle via getSession().user.id — no extra API route needed"
  - "(05-03): InvoiceButton is a standalone client component so orders page remains a server component"
  - "(05-03): FulfilmentQueue is a client component receiving initialOrders from server page — hybrid server/client pattern"
  - "(05-03): Stale .next/types cache cleared (known Next.js issue when new route groups added)"
metrics:
  duration: 129s
  completed_date: "2026-04-09"
  tasks_completed: 2
  files_created: 6
  files_modified: 0
---

# Phase 05 Plan 03: Retailer Orders Page + Fulfilment Dashboard Summary

Retailer order history with stub invoice download, fulfilment layout with role gate, pending orders queue with Mark Shipped action via PATCH API.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Retailer orders page + fulfilment API route | eeafc65 | portal/orders/page.tsx, InvoiceButton.tsx, api/fulfilment/orders/[id]/route.ts |
| 2 | Fulfilment layout + pending orders page | 6aaec46 | fulfilment/layout.tsx, fulfilment/page.tsx, FulfilmentQueue.tsx |

## What Was Built

**Retailer orders page** (`app/(portal)/portal/orders/page.tsx`):
- Server component — uses `getSession()` + Drizzle to query `orders WHERE userId = session.user.id`
- Table columns: Order #, Date, Total (£), Status (colour-coded badge), Invoice
- `InvoiceButton` client component calls `toast.info('Invoice download coming in v1')` on click

**PATCH API** (`app/api/fulfilment/orders/[id]/route.ts`):
- Updates `orders.status = 'shipped'` and `orders.updatedAt = new Date()` via Drizzle
- Returns `{ success: true }` on success, `{ success: false, error }` with 500 on failure

**Fulfilment layout** (`app/(fulfilment)/fulfilment/layout.tsx`):
- Client component with `role === 'fulfilment'` auth gate — redirects to `/login` if check fails
- Emerald spinner on loading state, PUXX header with Fulfilment Dashboard label, Logout button

**Fulfilment page** (`app/(fulfilment)/fulfilment/page.tsx`):
- Server component queries `orders WHERE status IN ('pending', 'processing')` ordered by `createdAt ASC`
- Passes `initialOrders` to `FulfilmentQueue` client component

**FulfilmentQueue** (`components/fulfilment/FulfilmentQueue.tsx`):
- Client component with local `orders` state for optimistic updates
- Mark Shipped: calls `PATCH /api/fulfilment/orders/{id}`, updates local state, shows `toast.success`
- Disabled on already-shipped rows; empty state when no pending orders

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Stale .next type cache for new route group**
- **Found during:** Task 2 TypeScript check
- **Issue:** `.next/dev/types/validator.ts` contained stale route types that didn't include `/fulfilment` — caused TS2344 errors
- **Fix:** Deleted `.next/types` and `.next/dev/types` directories; re-check returned zero errors
- **Files modified:** None (build cache only)
- **Commit:** N/A (cache deletion, not committed)

## Self-Check

### Files exist:
- [x] `app/(portal)/portal/orders/page.tsx` — FOUND
- [x] `app/api/fulfilment/orders/[id]/route.ts` — FOUND
- [x] `components/portal/InvoiceButton.tsx` — FOUND
- [x] `app/(fulfilment)/fulfilment/layout.tsx` — FOUND
- [x] `app/(fulfilment)/fulfilment/page.tsx` — FOUND
- [x] `components/fulfilment/FulfilmentQueue.tsx` — FOUND

### Commits exist:
- [x] eeafc65 — feat(05-03): retailer orders page + fulfilment PATCH API
- [x] 6aaec46 — feat(05-03): fulfilment layout, pending orders page, FulfilmentQueue

## Self-Check: PASSED
