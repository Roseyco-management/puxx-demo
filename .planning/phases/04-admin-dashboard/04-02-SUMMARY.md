---
plan: 04-02
phase: 04-admin-dashboard
status: complete
completed: 2026-04-09
---

# Plan 04-02 Summary: Admin API Routes + Page Rewrites

## What Was Built

Rewrote three admin API routes from Supabase to Drizzle ORM, and updated the orders and products admin pages to fetch from the API routes instead of calling Supabase client directly.

## Key Files Modified

- `app/api/admin/orders/route.ts` — Full GET handler rewrite using Drizzle join (orders + orderItems), groups items by order, returns `{ orders, total }` shape
- `app/api/admin/customers/route.ts` — Full GET handler rewrite using Drizzle query on users + profiles + orders, returns `{ success, count, customers }` with ordersCount per customer
- `app/api/admin/products/route.ts` — GET handler rewritten using Drizzle (POST handler left unchanged — uses Supabase for creation, deferred to v1)
- `app/(admin)/admin/orders/page.tsx` — fetchOrders() rewritten to fetch from /api/admin/orders; Supabase client import removed
- `app/(admin)/admin/products/page.tsx` — fetchProducts() rewritten to fetch from /api/admin/products; Supabase client import removed; mutation handlers (handleDelete, handleBulkActivate, handleBulkDeactivate) stubbed with toast.info

## Commits

- feat(04-02): rewrite admin API routes to use Drizzle ORM
- feat(04-02): update orders/products pages to fetch from API routes

## Self-Check

- No Supabase references remain in orders route, customers route, orders page, or products page
- Products route POST handler kept intact (still uses Supabase for creation — deferred)
- All three GET handlers use getDb() from @/lib/db/drizzle
- Admin orders and products pages fetch from API routes with no Supabase client calls
- Seeded data (4 orders, 72 products, demo@puxx.com) will be visible via Drizzle queries once DB is migrated and seeded
