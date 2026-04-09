# Phase 5: Portals - Context

**Gathered:** 2026-04-09
**Status:** Ready for planning

<domain>
## Phase Boundary

Build four distinct authenticated views for different roles: retailer portal (catalogue + orders), fulfilment dashboard (pending orders queue + mark as shipped), affiliate preview (referral codes + commission summary), and CRM customer profile view (contact info + order timeline + stubbed comms). Each view requires its own demo user seeded and role-based auth routing. No actual order creation, payment processing, or CRM integration — all are read/stub-only for demo.

</domain>

<decisions>
## Implementation Decisions

### Auth and role routing (shared across all portals)
- All portals reuse the existing `/login` page (`app/(auth)/login/`) — "separate" means a separate URL destination, not a separate login form
- Update `app/(auth)/actions.ts` `signIn` function's role-based redirect logic:
  - `role === 'retailer'` → redirect to `/portal`
  - `role === 'fulfilment'` → redirect to `/fulfilment`
  - `role === 'affiliate'` → redirect to `/uk/account/affiliate` (or fall through to `/account`)
  - admin/manager/support stays → `/admin`
  - everything else → `/account`
- Seed three new demo users in `lib/db/seed.ts`:
  - `retailer@puxx.com` / `retailer123` with `role = 'retailer'`
  - `fulfil@puxx.com` / `fulfil123` with `role = 'fulfilment'`
  - `affiliate@puxx.com` / `affiliate123` with `role = 'member'` — affiliate shares the customer account area
- Each user gets a profile row (nullable fields are fine for demo)

### Retailer Portal (RETAIL-01, RETAIL-02, RETAIL-03)
- Route group: `app/(portal)/portal/` with layout at `app/(portal)/portal/layout.tsx`
- Pages: `portal/` (redirect to `portal/products`), `portal/products/` (catalogue), `portal/orders/` (order history)
- Auth: layout checks `/api/auth/me` client-side, redirects to `/login` if not `role = 'retailer'`
- Layout: reuse `AdminSidebar`/`AdminHeader` pattern OR use a simpler custom layout — simpler custom sidebar with "Products" and "Orders" links is better (avoids admin styling confusion)
- **Wholesale pricing (RETAIL-02)**: Add `wholesalePrice` to region config or compute as 80% of base price (20% trade discount). Display in product table with both retail and wholesale prices
  - Seed: retailers see `£4.80` per unit (80% of £6.00) — show as "Trade Price: £4.80" next to "RRP: £6.00"
  - Product data: reuse existing products API, compute wholesale price client-side or in API
- **Order history (RETAIL-03)**: retailer@puxx.com has no seeded orders — seed 2 retailer orders in seed.ts linked to retailer user, show in `portal/orders/` using same Drizzle pattern as account orders page
- Invoice list: stub — show orders list with "Download Invoice" button (toast.info stub for demo)

### Fulfilment Dashboard (FULFL-01, FULFL-02)
- Route group: `app/(fulfilment)/fulfilment/` with layout at `app/(fulfilment)/fulfilment/layout.tsx`
- Pages: `fulfilment/` (pending orders queue)
- Auth: layout checks `/api/auth/me`, redirects to `/login` if not `role = 'fulfilment'`
- Layout: simple branded layout (PUXX logo + "Fulfilment Dashboard" heading + logout link — no sidebar nav)
- **Pending orders queue (FULFL-01)**: Drizzle query for orders where `status IN ('pending', 'processing')` — the 2 pending/processing demo orders from Phase 3 seed will appear
- **Mark as shipped (FULFL-02)**: "Mark Shipped" button per order row → calls `PATCH /api/fulfilment/orders/[id]` which updates `orders.status = 'shipped'` in DB. Optimistic UI update. No confirmation modal for demo.
- New API route: `app/api/fulfilment/orders/[id]/route.ts` — PATCH handler using Drizzle

### Affiliate Preview (AFF-01)
- Route: `app/[region]/account/affiliate/page.tsx` — within the existing customer account area (no separate portal needed)
- Accessible when logged in as demo@puxx.com or affiliate@puxx.com (any authenticated user)
- Nav: add "Affiliate" link to AccountNav (alongside Dashboard, Orders, Details, Addresses)
- **Content**: extend ReferralCard approach — three sections:
  1. Referral Codes: retail code + wholesale code with copy buttons (ReferralCard already exists)
  2. Referred Customers: stubbed table — 3 hardcoded rows (names, join date, status) — no real DB query for demo
  3. Commission Summary: £24.50 earned (from seeded commissionEarned) displayed in a stat card
- "Blue Pillar components" in requirement = design inspiration, not literal import — build with existing shadcn/ui Card/Table components

### CRM Preview (CRM-01)
- Route: existing `app/(admin)/admin/customers/[id]/page.tsx` — this is already the admin customer detail page, just needs to be wired with Drizzle + stubbed communication history
- The existing page uses Supabase directly — rewrite to use Drizzle
- **Content**: three sections:
  1. Contact info: from `users` table (name, email) + `profiles` (phone, dateOfBirth)
  2. Order timeline: orders for this user from Drizzle, shown as a chronological list with status badges
  3. Communication history: hardcoded stub — show 2 stub entries ("Welcome email sent", "Order confirmation sent") — no real comms for demo
- API route: `app/api/admin/customers/[id]/route.ts` already exists but uses Supabase — rewrite GET handler to use Drizzle

### Demo user seed additions
- `retailer@puxx.com` / `retailer123` (role='retailer') + 2 stub orders (PX-RETAIL-001, PX-RETAIL-002)
- `fulfil@puxx.com` / `fulfil123` (role='fulfilment') — no orders needed
- `affiliate@puxx.com` / `affiliate123` (role='member') + profile with referral codes PUXX-R-AFF1/PUXX-W-AFF1, commission £12.00

### Shared layout decisions
- All portal layouts follow the same auth-check pattern as `app/(admin)/layout.tsx`: `useEffect` + fetch `/api/auth/me` + redirect
- No full TailAdmin sidebar for non-admin portals — custom lightweight layouts (branded PUXX header + minimal nav)
- STRIPE IS PERMANENTLY BANNED

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `app/(admin)/layout.tsx` — auth-gate pattern via `/api/auth/me` + useEffect + role check → copy this pattern for retailer/fulfilment layouts
- `app/[region]/account/orders/page.tsx` — Drizzle order history → adapt for retailer portal orders
- `components/account/ReferralCard.tsx` (Phase 3) — referral codes display → extend for affiliate preview
- `components/account/tables/OrdersDataTable.tsx` — reuse in retailer portal and fulfilment queue
- `components/account/AccountNav.tsx` — add "Affiliate" link
- `app/(auth)/actions.ts` signIn — extend role redirect logic
- `lib/db/seed.ts` — extend with 3 new demo users + retailer orders

### Established Patterns
- Auth gate: client-side `useEffect` + `fetch('/api/auth/me')` + `router.push('/login')` if not authenticated/wrong role
- Drizzle queries: `getDb()` inside handler, `db.select().from(table).where(eq(...))` pattern
- Server component pages with `getRegionConfig(region)` for currency
- shadcn/ui Card, Badge, Button for UI components
- `hashPassword()` from `lib/auth/session` for seeded passwords

### Integration Points
- `app/(auth)/actions.ts` — add role-based redirect cases (retailer, fulfilment)
- `lib/db/seed.ts` — add `seedPortalUsers()` function
- `lib/db/schema.ts` — no new columns needed (role already on users, profile fields exist)
- `app/(admin)/admin/customers/[id]/page.tsx` + `app/api/admin/customers/[id]/route.ts` — rewrite for CRM view
- `components/account/AccountNav.tsx` — add Affiliate nav link

</code_context>

<specifics>
## Specific Ideas

- Retailer portal login demo flow: `/login` → `retailer@puxx.com` / `retailer123` → `/portal/products` (shows products with trade price £4.80 alongside RRP £6.00)
- Fulfilment demo flow: `/login` → `fulfil@puxx.com` / `fulfil123` → `/fulfilment` (shows 2 orders: pending + processing) → click "Mark Shipped" → status updates to "shipped" in real time
- Affiliate demo flow: `/login` → `demo@puxx.com` / `demo123` → `/uk/account/` → navigate to "Affiliate" tab → see referral codes + 3 stubbed referred customers + £24.50 commission
- CRM demo flow: `/login` → `admin@puxx.com` / `admin123` → `/admin/customers` → click on demo@puxx.com → CRM profile view with contact info, order timeline (4 orders), 2 stub comms
- Wholesale pricing display: "Trade Price: £4.80 | RRP: £6.00" on each product card in the retailer portal

</specifics>

<deferred>
## Deferred Ideas

- Real wholesale pricing tiers based on order quantity (v1)
- Retailer placing orders directly from the portal (v1)
- Fulfilment team assigning orders to specific staff members (v1)
- Real affiliate commission calculation from order data (AFF-06 — v1)
- Referral code sharing via WhatsApp/email (v1)
- Real CRM communication history (CRM-02 through CRM-05 — v1)
- Separate domain per portal (e.g., portal.puxx.com — production concern)
- GoHighLevel/OpenDoors data migration (CRM-02 — v1)

</deferred>

---

*Phase: 05-portals*
*Context gathered: 2026-04-09*
