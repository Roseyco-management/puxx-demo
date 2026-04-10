---
phase: 07-demo-bugfix
plan: 05
type: gap_closure
status: complete
commits: 12
tasks: 7
author: claude-opus-4-6
completed: 2026-04-10
---

# Plan 07-05 — Codex-Driven Gap Closure

## What

A second gap-closure pass triggered by four rounds of Codex adversarial review after plan 07-04 completed. 07-04 closed the portal 500 and manifest 404 gaps from 07-VERIFICATION.md, but Codex then found deeper pre-existing bugs in plans 07-01 through 07-03 that the verifier had missed. This plan rolled those fixes up under a shared 07-05 prefix without a dedicated plan directory.

## Why

The gap-closure verification pass succeeded at the plan level but Codex's adversarial review surfaced four classes of live issues:

1. **Admin orders list would crash at runtime** — API spread raw Supabase snake_case rows, UI expected camelCase. `order.paymentStatus.charAt(0)` threw on undefined. Demo-blocking.
2. **Admin products list mis-shaped** — missing category join, wrong field names, missing detail page.
3. **RETAIL-03 overstated** — "Download Invoice" was a toast stub.
4. **Admin API surface was largely unauthenticated** — middleware excludes `/api/*` and 20 routes had no role check.

## Changes

### Shared infrastructure
- `lib/utils/order-mapping.ts` — single source of truth for converting raw Supabase order rows into the `OrderWithItems` contract. Used by admin orders list, detail, admin invoice, and portal invoice.
- `lib/auth/admin.ts` — `getAdminUser()` and `getRetailerUser()` helpers that verify session, query users for role, and enforce `deleted_at IS NULL`.

### Admin orders
- `app/api/admin/orders/route.ts` — map via helper, admin auth guard, wired status/paymentStatus/search/startDate/endDate filters. endDate rolls forward 24h to make the chosen day inclusive.
- `app/api/admin/orders/[id]/route.ts` — admin auth guard on GET + PATCH, uses shared mapper.
- `app/api/admin/orders/[id]/invoice/route.ts` — admin auth guard, uses mapper so PDF fields populate.
- `app/(admin)/admin/orders/[id]/page.tsx` — uses shared mapper.

### Admin products
- `app/api/admin/products/route.ts` — admin auth on GET + POST, maps to UI contract, joins product_categories for category slug.
- `app/api/admin/products/[id]/route.ts` — admin auth on GET/PUT/DELETE, new lightweight PATCH for partial updates (bulk activate/deactivate).
- `app/(admin)/admin/products/[id]/page.tsx` — new read-only detail page (previously 404).
- `app/(admin)/admin/products/[id]/edit/page.tsx` — prefill now reads snake_case from API.
- `app/(admin)/admin/products/page.tsx` — bulk delete/activate/deactivate now call real endpoints.
- `components/admin/products/ProductTable.tsx` — strength cell renders raw value (was appending "mg" on top of "4mg").

### Retailer portal invoice
- `app/api/portal/orders/[id]/invoice/route.ts` — new endpoint with retailer role check + user_id ownership filter.
- `components/portal/InvoiceButton.tsx` — real anchor with download attribute, accepts orderId and orderNumber props.
- `app/(portal)/portal/orders/page.tsx` — passes orderId + orderNumber to the button.

### Admin API auth sweep
20 additional admin routes now use `getAdminUser()`:
- Settings: taxes, general, email-templates (+[slug]), shipping (+[id]), payments
- Users: users, users/[id], activity
- Customers: customers, customers/[id], customers/[id]/notes
- Analytics: metrics, traffic, products, revenue
- Products: products/bulk
- Orders: orders/export
- Marketing: marketing/subscribers

### Misc
- `middleware.ts` matcher includes `site\.webmanifest` negative lookahead.
- `lib/seo/defaultSEO.ts` manifest ref updated to match active emitter.

## Commits

```
9430faa fix(07-04): add site.webmanifest to middleware matcher exclusion
84459d6 fix(07-05): map admin orders API to camelCase for OrderTable contract
1128644 fix(07-05): map order detail fields to camelCase in admin detail page
e4b009c fix(07-05): map admin products API to ProductTable contract
3bc8167 fix(07-05): add admin product detail page
641eb01 fix(07-05): align edit product prefill with snake_case API response
63e6f7f fix(07-05): wire real portal invoice downloads and share order mapping
836df17 fix(07-05): align stale defaultSEO manifest ref with actual filename
39c2fa2 fix(07-05): enforce admin/retailer auth, wire filters, fix strength display
abb848b fix(07-05): third-round Codex gaps — POST auth, PATCH, endDate, soft-delete
0c000b0 fix(07-05): harden auth on all remaining admin API routes
```

## Codex Review Cycle

Four resume-based adversarial reviews. Each cycle surfaced a new layer:

| Round | File | Severity | Outcome |
|-------|------|----------|---------|
| 1 | CODEX-EXEC-REVIEW.md | 1 CRITICAL, 3 IMPORTANT, 2 NICE-TO-HAVE | All fixed in commits 84459d6..836df17 |
| 2 | CODEX-EXEC-REVIEW-2.md | 1 CRITICAL, 3 IMPORTANT, 1 NICE-TO-HAVE | All fixed in commit 39c2fa2 |
| 3 | CODEX-EXEC-REVIEW-3.md | 1 CRITICAL, 2 IMPORTANT, 1 NICE-TO-HAVE | All fixed in commit abb848b |
| 4 | CODEX-EXEC-REVIEW-4.md | 1 CRITICAL (new scope) | All fixed in commit 0c000b0 |
| 5 | CODEX-EXEC-REVIEW-5.md | Clean sign-off | 25/25 admin routes guarded |

## Verification

- `npx tsc --noEmit` clean
- 07-VERIFICATION.md: 7/7 must-haves verified
- Requirement IDs ADMIN-01, ADMIN-02, ADMIN-03, PROD-01, RETAIL-03, FULFL-02, CUST-01 confirmed satisfied
- MOB-01 + runtime PDF/date-picker checks remain on the human-verification list — not code gaps

## Deviation from planned scope

This plan grew beyond the original `--gaps-only` request. The user opted for "option 1: fix everything now" after the first Codex pass, which meant absorbing pre-existing admin-API auth debt that predated phase 07. All changes fall inside the phase 07 goal of "every client-facing page in the demo renders without errors — no 500s, no 401s, no broken UI."
