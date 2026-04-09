# Phase 4: Admin Dashboard - Context

**Gathered:** 2026-04-09
**Status:** Ready for planning

<domain>
## Phase Boundary

Wire up the existing admin dashboard (`app/(admin)/admin/`) so an admin user can browse orders, customers, and products in the demo. The admin section is fully built in puxxireland — layout, sidebar, components, pages. The only work is: seed an admin demo user, and replace Supabase client data-fetching with Drizzle-based API routes so seeded data shows up. No new UI components. No editing functionality required for the demo — browsable lists are sufficient.

</domain>

<decisions>
## Implementation Decisions

### Admin route structure
- Keep existing `app/(admin)/admin/` route group unchanged — full structure already exists
- Admin layout (`app/(admin)/layout.tsx`) already does auth via `/api/auth/me` → uses Drizzle's `getUser()` → works as-is
- Role check already in layout: requires `admin`, `manager`, or `support` role
- Login flow: demo admin logs in at `/login` (existing `app/(auth)/login/` using `signIn` action)

### Demo admin user
- Seed `admin@puxx.com` / `admin123` (bcrypt hashed) with `role = 'admin'` in `lib/db/seed.ts`
- Extend the existing `seedDemoAccount()` or add a separate `seedAdminUser()` function — idempotent (delete-before-insert on email)
- Demo login flow: navigate to `/login`, use `admin@puxx.com` / `admin123`, land on `/admin`

### Data fetching — replace Supabase with Drizzle (ADMIN-01, ADMIN-02, ADMIN-03)
- **ADMIN-01 (orders):** `app/(admin)/admin/orders/page.tsx` currently fetches directly from Supabase client — replace with fetch to `/api/admin/orders` which is rewritten to use Drizzle. Query: `db.select().from(orders).leftJoin(orderItems, ...).orderBy(desc(orders.createdAt))`
- **ADMIN-02 (customers):** `app/(admin)/admin/customers/page.tsx` already fetches from `/api/admin/customers` (good pattern) — rewrite that route to use Drizzle. Query: `db.select().from(users).where(eq(users.role, 'customer'))` with order count join
- **ADMIN-03 (products):** `app/(admin)/admin/products/page.tsx` fetches directly from Supabase client — replace with fetch to `/api/admin/products` (route already exists at `app/api/admin/products/route.ts`) rewritten to use Drizzle

### API routes to rewrite (Supabase → Drizzle)
- `app/api/admin/orders/route.ts` — GET handler only, Drizzle join on orderItems, return same shape OrderWithItems type
- `app/api/admin/customers/route.ts` — GET handler only, Drizzle query on users + order count, return same shape as existing
- `app/api/admin/products/route.ts` — GET handler only, Drizzle query on products table, return same shape as existing

### Admin dashboard overview page
- `app/(admin)/admin/page.tsx` uses Supabase client for analytics widgets — for demo, simplify to static stub values or remove analytics calls; keep the page structure but show hardcoded placeholder stats
- DashboardStats, RevenueChart etc. — either disable or stub with static data

### Auth note
- The admin layout's auth check calls `/api/auth/me` (Drizzle) and checks `user.role`. The `users` table has a `role` column — admin user seeded with `role = 'admin'` satisfies this check.
- No need to touch auth middleware or add new auth routes

### Claude's Discretion
- Exact shape of Drizzle queries (joins, filters, order)
- Whether to keep or simplify the dashboard overview widget calls
- Admin login redirect behavior after login (existing `signIn` action handles this)

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets (fully built — no new UI needed)
- `app/(admin)/admin/orders/page.tsx` — full orders page with OrderTable, OrderFilters; just needs data source swapped
- `app/(admin)/admin/customers/page.tsx` — customer list; already uses API route fetch pattern
- `app/(admin)/admin/products/page.tsx` — product list; needs API route fetch instead of Supabase client
- `app/(admin)/admin/page.tsx` — dashboard overview with DashboardStats, RevenueChart, etc.
- `components/admin/orders/OrderTable.tsx`, `OrderFilters.tsx`, `OrderStatusBadge.tsx` — reuse as-is
- `components/admin/customers/CustomerTable.tsx` — reuse as-is
- `components/admin/products/ProductTable.tsx` — reuse as-is
- `components/admin/AdminSidebar.tsx`, `AdminHeader.tsx` — reuse as-is
- `app/(admin)/layout.tsx` — auth gate via `/api/auth/me`, role check — works as-is

### Established Patterns
- `/api/auth/me` uses `getUser()` from `lib/db/queries.ts` (Drizzle) — same pattern for new admin API routes
- `db` import from `lib/db/drizzle.ts`, schema imports from `lib/db/schema.ts`
- `desc`, `eq`, `leftJoin` from `drizzle-orm` for query building
- Admin layout already uses `useEffect` + fetch pattern for client components

### Integration Points
- `lib/db/seed.ts` — extend to add admin user seed (alongside existing `seedDemoAccount()`)
- `app/api/admin/orders/route.ts` — rewrite GET handler to use Drizzle
- `app/api/admin/customers/route.ts` — rewrite GET handler to use Drizzle
- `app/api/admin/products/route.ts` — rewrite GET handler to use Drizzle
- `app/(admin)/admin/orders/page.tsx` — change fetch source from Supabase client to `/api/admin/orders`
- `app/(admin)/admin/products/page.tsx` — change fetch source from Supabase client to `/api/admin/products`

### Data available from prior phases
- 4 stub orders (PX-DEMO-0001 to 0004) seeded in Phase 3 — will appear in admin orders list
- 72 products (12 flavours × 6 strengths) seeded in Phase 2 — will appear in admin products list
- demo@puxx.com customer seeded in Phase 3 — will appear in admin customers list

</code_context>

<specifics>
## Specific Ideas

- Admin login demo flow: `/login` → `admin@puxx.com` / `admin123` → `/admin` (dashboard overview) → navigate via sidebar to Orders, Customers, Products
- For the demo, the three lists just need to render the seeded data — no pagination, no complex filters required to work
- The admin overview page can show stub/zeroed stats rather than breaking on missing Supabase data

</specifics>

<deferred>
## Deferred Ideas

- Admin order editing / status updates (v1 — ADMIN-01 only requires view for demo)
- Admin customer profile editing (v1)
- Admin product CRUD (editing/creating — ProductForm exists but out of scope for demo view)
- Admin settings pages (payments, shipping, taxes — out of scope for demo)
- Admin analytics (revenue charts — real data not needed for demo)

</deferred>

---

*Phase: 04-admin-dashboard*
*Context gathered: 2026-04-09*
