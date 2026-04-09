---
phase: 05-portals
plan: "05"
subsystem: admin-crm
tags: [drizzle, crm, admin, customer-profile, order-timeline]
dependency_graph:
  requires: [05-01]
  provides: [crm-customer-profile-view]
  affects: [admin-customers]
tech_stack:
  added: []
  patterns: [drizzle-select, client-component-fetch]
key_files:
  created: []
  modified:
    - app/api/admin/customers/[id]/route.ts
    - app/(admin)/admin/customers/[id]/page.tsx
decisions:
  - GET handler rewrites to Drizzle; DELETE stays on Supabase (soft delete, demo scope)
  - orders array added to API response so page can render timeline without extra fetch
  - CustomerProfile component preserved; CustomerOrderHistory + CustomerNotes replaced inline
metrics:
  duration: 97s
  completed: "2026-04-09"
  tasks: 2
  files: 2
---

# Phase 05 Plan 05: CRM Customer Profile View Summary

**One-liner:** Drizzle-backed GET handler + CRM profile page with real order timeline and 2-entry stub communication history.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Rewrite GET /api/admin/customers/[id] to Drizzle | 36e162d | app/api/admin/customers/[id]/route.ts |
| 2 | Rewrite customer detail page as CRM profile view | 7fee95a | app/(admin)/admin/customers/[id]/page.tsx |

## What Was Built

**Task 1 — API route rewrite:**
- Replaced Supabase queries with three Drizzle selects: `users`, `profiles`, `orders`
- Computed `ordersCount`, `totalSpent`, `averageOrderValue`, `lastOrderDate` from Drizzle results
- Added `orders` array to response (id, orderNumber, status, total, currency, createdAt)
- Kept DELETE handler unchanged (Supabase soft delete — demo scope)

**Task 2 — CRM page rewrite:**
- Removed `CustomerOrderHistory` and `CustomerNotes` imports and usages
- Added `customerOrders` state, populated via `data.customer.orders` in `fetchCustomer`
- Added inline Order Timeline section: rows per order with date, amount, status badge
- Added inline Communication History section: 2 hardcoded stub entries
- `statusColours` map and `STUB_COMMS` constant defined at module level
- Preserved: `CustomerProfile`, Saved Addresses section, header, Send Email + Delete buttons

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check: PASSED

- [x] `app/api/admin/customers/[id]/route.ts` — exists, contains `getDb()`, no Supabase in GET
- [x] `app/(admin)/admin/customers/[id]/page.tsx` — exists, contains `Communication History`
- [x] Commit 36e162d exists
- [x] Commit 7fee95a exists
- [x] TypeScript: zero source-file errors (`npx tsc --noEmit` — only `.next/` build artifact errors from other wave executors)
