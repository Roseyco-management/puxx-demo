# Phase 6: Polish - Context

**Gathered:** 2026-04-09
**Status:** Ready for planning

<domain>
## Phase Boundary

Make all key views mobile-responsive at 375px width (iPhone SE / standard mobile baseline). The 6 view groups are: storefront (product listing + detail), checkout flow, customer account area, admin dashboard, retailer portal, and fulfilment dashboard. No new features — only responsive layout fixes using Tailwind responsive classes.

</domain>

<decisions>
## Implementation Decisions

### Scope
- Target viewport: 375px width (iPhone SE / standard mobile baseline)
- Tailwind responsive approach: audit existing components, add `sm:` / `md:` breakpoint classes where needed
- No layout architecture changes — only add/adjust responsive classes and fix overflow issues
- Tables that cannot shrink: convert to card-per-row layout on mobile
- Sidebars: collapse to hamburger or hidden nav on mobile (admin sidebar already has mobile state — verify it works)

### Priority order (highest traffic in a demo)
1. Storefront (homepage / product listing / product detail) — visitors see this first
2. Checkout flow — age verification + checkout page
3. Customer account (/account/orders, /account/details, /account/affiliate)
4. Admin dashboard (orders list, customers list, products list)
5. Retailer portal (/portal/products, /portal/orders)
6. Fulfilment dashboard (/fulfilment)

### Common issues to address
- Overflow: `overflow-x-hidden` on body if needed; `w-full max-w-full` on containers
- Tables → stacked cards on mobile using `hidden md:block` / `block md:hidden` pattern
- Horizontal nav → vertical or hamburger
- Grid columns: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` pattern
- Font sizes: ensure headings don't overflow on small viewports
- Buttons: full-width on mobile (`w-full sm:w-auto`)
- Form inputs: ensure they don't cause horizontal scroll

### Out of scope
- Tablet-specific breakpoints (768px) — demo only needs 375px to pass
- Dark mode fixes — not part of MOB-01
- Performance optimisation — deferred to v1
- Testing on real devices — visual check at 375px viewport in browser is sufficient for demo

</decisions>

<code_context>
## Existing Code Insights

### Key files to audit
- `app/[region]/page.tsx` — storefront homepage
- `app/[region]/products/page.tsx` or product listing components
- `app/[region]/checkout/page.tsx` — checkout flow
- `app/[region]/account/layout.tsx` + account pages
- `app/(admin)/admin/layout.tsx` — admin sidebar (check mobile collapse)
- `app/(admin)/admin/orders/page.tsx` — OrderTable (likely needs mobile cards)
- `app/(portal)/portal/layout.tsx` + portal pages
- `app/(fulfilment)/fulfilment/layout.tsx` + page
- `components/` — shared components used across views

### Established patterns
- Tailwind CSS: all styling uses Tailwind classes
- Responsive prefix pattern: `sm:` at 640px, `md:` at 768px, `lg:` at 1024px
- Grid pattern already in use: some pages use `grid-cols-1 md:grid-cols-X`

</code_context>

<specifics>
## Specific Ideas

- Admin OrderTable: has many columns — convert to card list on mobile (show order number, status, amount; hide customer/date columns)
- Portal products table: similar to admin — card-per-product on mobile
- AccountNav: horizontal tabs that may overflow — convert to scrollable or vertical on mobile
- Header/nav: ensure logo + nav links don't overflow; mobile hamburger if needed

</specifics>

<deferred>
## Deferred Ideas

- Tablet-specific (768px) responsive tweaks — v1
- Native mobile app — post-sign-off
- Dark mode responsive issues — v1
- Print stylesheet — v1

</deferred>

---

*Phase: 06-polish*
*Context gathered: 2026-04-09 (auto — no discuss-phase)*
