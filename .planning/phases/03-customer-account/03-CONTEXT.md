# Phase 3: Customer Account - Context

**Gathered:** 2026-04-09
**Status:** Ready for planning

<domain>
## Phase Boundary

Add a customer account page (accessible when logged in) that shows order history with current order status, and displays the customer's two referral codes (retail and wholesale) with a commission earned summary. This phase does not add order management, address management, or profile editing — only the order list and referral display.

</domain>

<decisions>
## Implementation Decisions

### Route structure
- Adapt existing `app/(account)/account/` route group to work under `app/[region]/account/` prefix
- Account routes become: `/[region]/account/` (dashboard/overview), `/[region]/account/orders/` (order history), `/[region]/account/orders/[id]/` (order detail)
- Use existing `(account)` layout pattern but nest under `[region]` layout so RegionContext is available
- The `app/(account)/account/` group can remain as-is (it redirects or stays for backwards compat) — Claude's discretion

### Order history (CUST-01)
- Reuse existing `app/(account)/account/orders/page.tsx` logic (Drizzle query: `orders` + `orderItems`)
- Reuse `components/account/tables/OrdersDataTable.tsx` component as-is
- For demo: seed 3–5 stub orders for the demo test user with varying statuses (pending, processing, shipped, delivered)
- Order status display: use existing `<Badge>` component with status-based colour (pending=yellow, processing=blue, shipped=purple, delivered=green)
- Currency displayed in order totals should use region config (use `useRegion()` for currencySymbol)

### Referral codes (CUST-02)
- Add two new columns to `profiles` Drizzle schema: `retailReferralCode varchar(20)` and `wholesaleReferralCode varchar(20)`
- Generate via Drizzle migration (`pnpm db:generate && pnpm db:migrate`)
- Seed demo user's profile with pre-set codes: retail = "PUXX-R-DEMO1", wholesale = "PUXX-W-DEMO1"
- Build new `components/account/ReferralCard.tsx` component — shows both codes in a card with copy-to-clipboard buttons
- Commission earned: static stub value seeded in profile as `commissionEarned numeric` (seed: 24.50 GBP equivalent) — no real calculation for demo
- ReferralCard placed on the account overview/dashboard page below order summary

### Demo test user
- Seed one demo customer account: email `demo@puxx.com`, password `demo123` (bcrypt hashed)
- Seed their profile with referral codes and commission
- Seed 4 stub orders (pending / processing / shipped / delivered) linked to demo user
- Login via existing `/[region]/sign-in` or `/sign-in` route (already in puxxireland)

### Account layout
- Existing `AccountNav.tsx` component used as-is — shows nav links for Dashboard, Orders, Details, Addresses
- For demo, only Dashboard and Orders need to work; other nav links can lead to existing placeholder pages
- Region context available via the wrapping `[region]/layout.tsx`

### Claude's Discretion
- Whether to keep or remove the top-level `(account)` route group
- Exact bcrypt hash generation for demo password
- Whether to add a "Copy" button or just display the referral codes as static text

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets (already in demo app)
- `app/(account)/account/orders/page.tsx` — full order history with Drizzle queries
- `app/(account)/account/orders/[id]/page.tsx` — individual order detail
- `app/(account)/account/dashboard/page.tsx` — dashboard with analytics widgets
- `app/(account)/account/layout.tsx` — account layout with AccountNav sidebar
- `components/account/AccountNav.tsx` — sidebar navigation
- `components/account/tables/OrdersDataTable.tsx` — orders table with status badges
- `components/account/Skeleton.tsx` — loading skeleton
- `lib/db/queries.ts` — `getUser()` helper for auth check
- `lib/db/schema.ts` — orders, orderItems, profiles tables (extend profiles with referral fields)
- `lib/db/seed.ts` — extend with demo user + orders + referral codes

### Established Patterns
- Server components + `getUser()` redirect pattern for auth-gated pages
- Drizzle ORM for all DB queries
- `useRegion()` for currency display in client components
- shadcn/ui Card, Badge, Button components

### Integration Points
- `app/[region]/layout.tsx` (Phase 1) — provides RegionContext
- `lib/db/schema.ts` — add referral columns to profiles table
- `lib/db/seed.ts` — extend with demo user, orders, referral data
- Existing auth routes (`sign-in`, `register`) — demo user logs in here

</code_context>

<specifics>
## Specific Ideas

- CUST-01 demo: 4 seeded orders covering all statuses so the demo shows a rich order history
- CUST-02 demo: ReferralCard shows retail code, wholesale code, and "£24.50 earned" — simple and clear
- The demo login flow: visitor goes to `/uk/sign-in`, logs in as demo@puxx.com / demo123, lands on `/uk/account/`

</specifics>

<deferred>
## Deferred Ideas

- Real referral code generation on registration (v1 requirement AFF-01)
- Commission calculation from actual order data (v1 requirement AFF-06)
- Referral code sharing via WhatsApp/email (communication hub, v1)
- Address management and profile editing (not in scope for demo)

</deferred>

---

*Phase: 03-customer-account*
*Context gathered: 2026-04-09*
