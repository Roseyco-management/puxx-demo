# Phase 2: Storefront - Context

**Gathered:** 2026-04-09
**Status:** Ready for planning

<domain>
## Phase Boundary

Adapt the existing puxxireland product catalogue, product detail, age gate, and checkout flow to work under the `app/[region]/` route structure established in Phase 1. Add region-aware pricing display (currency symbol from region config). Seed the demo with 12 flavour variants × 6 strength options. Ensure checkout completes end-to-end for UK region (WorldPay, already wired in puxxireland — placeholder shown for demo). CA/US checkout shows "Gift Card" stub and completes to a success screen.

This phase does NOT add new features beyond what puxxireland already has — it adapts and re-routes existing components.

</domain>

<decisions>
## Implementation Decisions

### Route structure
- Move `app/products/` → `app/[region]/products/` (catalogue + `[slug]` detail)
- Move `app/checkout/` → `app/[region]/checkout/`
- Move `app/cart/` → `app/[region]/cart/`
- Keep existing top-level routes as redirects (e.g. `/products` → `/uk/products`) or remove — Claude's discretion
- `app/shop/` already redirects to `/products` — update to redirect to `/[region]/products` via middleware

### Product data for demo
- Seed 12 named flavour variants (e.g. Mango Ice, Fresh Mint, Citrus Burst, etc.) × 6 strength options (4mg, 6mg, 8mg, 12mg, 16mg, 20mg)
- Use the existing Supabase/Drizzle setup with `db:seed` script — extend seed to include all 72 product variants
- Base price: £6 for UK, CA$6.50 for CA, $4.99 for US — all derived from region config (add `basePrice` to RegionConfig in regions.ts)
- Product images: use placeholder images (existing public/ images from puxxireland) — no new assets required

### Age gate behaviour
- AgeGate already wraps the root layout — it covers all routes including [region] routes
- No changes needed: the existing `isAgeVerified()` localStorage check persists across regions
- Verify it does NOT block admin and account routes (already handled in puxxireland by isAdminRoute/isAccountRoute check in AgeGate)

### Product catalogue layout
- Reuse existing `components/products/product-grid.tsx` and `product-card.tsx` as-is
- Update ProductCard to show region-correct currency using `useRegion()` hook (add currency display)
- Product filters (existing `product-filters.tsx`) — keep for demo, filter by flavour/strength
- No pagination for demo — show all products in a grid (72 variants is manageable)

### Product detail page
- Reuse existing `app/products/[slug]/page.tsx` adapted to `app/[region]/products/[slug]/page.tsx`
- ProductInfo, ProductImage, AddToCart, ProductTabs, RelatedProducts all carry over
- AddToCart stores items with region context (price shown in correct currency)
- Flavour/strength selector: already in ProductInfo component

### Checkout flow
- Reuse existing `app/checkout/page.tsx` multi-step flow (Steps 1–6) adapted to `app/[region]/checkout/`
- UK region: Step5Payment shows "Powered by WorldPay" — existing placeholder is sufficient for demo
- CA/US regions: Step5Payment shows "Powered by Gift Card" — update payment label from region config
- Checkout completes to Step6Confirmation — existing success screen, no changes needed
- Cart persists via Zustand (localStorage) — already working

### Pricing in region config
- Add `basePrice` (number, in region currency) and `currencySymbol` already exists
- Pricing decision: UK £6.00, CA CA$6.50, US $4.99 per unit base price (reasonable demo pricing)
- Cart total calculation uses region's basePrice × quantity

### Claude's Discretion
- Exact flavour names for the 12 variants (use realistic-sounding nicotine pouch flavours)
- Whether to keep or remove the top-level `/products` route
- Exact placeholder image reuse strategy
- Loading skeleton design

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets (already in demo app from puxxireland copy)
- `components/products/product-card.tsx` — Card with image, name, strength badge, Add to Cart — add currency display
- `components/products/product-grid.tsx` — Grid layout for product listing
- `components/products/product-filters.tsx` — Flavour/strength filter sidebar
- `components/products/AddToCart.tsx` — Add to cart button with quantity
- `components/products/ProductInfo.tsx` — Flavour/strength selector + price + add to cart
- `components/products/ProductImage.tsx` — Product image with lightbox
- `components/products/ProductTabs.tsx` — Description/ingredients/shipping tabs
- `components/checkout/CheckoutProgress.tsx` + `Step1` through `Step6` — full multi-step checkout
- `components/age-verification/AgeGate.tsx` + `AgeVerificationModal.tsx` — already working
- `app/checkout/page.tsx` — full checkout page, move to [region]
- `app/products/[slug]/page.tsx` — full PDP, move to [region]/products/[slug]
- `lib/stores/cart-store.ts` — Zustand cart with persist
- `lib/stores/checkout-store.ts` — Zustand checkout state

### Established Patterns
- App Router dynamic segments already established by `app/[region]/`
- `useRegion()` hook from Phase 1 for accessing region config
- Seeding via `lib/db/seed.ts` + `pnpm db:seed`
- `getRegionConfig(region)` helper for server components

### Integration Points
- `app/[region]/layout.tsx` (Phase 1) — already provides RegionContext.Provider, product pages slot in here
- `lib/config/regions.ts` (Phase 1) — extend with `basePrice` per region
- `middleware.ts` (Phase 1) — already handles `/[region]/` prefix, checkout/products routes inherit this
- `components/layout/Header.tsx` — already has Cart icon and nav links pointing to `/${region}/...`

</code_context>

<specifics>
## Specific Ideas

- The existing checkout multi-step flow from puxxireland is the right UX — preserve it exactly for the demo
- For the demo, "completing checkout" means reaching Step6Confirmation — no real payment processing needed for CA/US
- The age gate localStorage approach is fine for demo — a real production build would use server-side verification
- 12 flavours suggested: Mango Ice, Fresh Mint, Citrus Burst, Berry Blast, Watermelon Chill, Tropical Storm, Spearmint, Cool Menthol, Blueberry Rush, Apple Crisp, Passion Fruit, Blackcurrant Freeze

</specifics>

<deferred>
## Deferred Ideas

- Real WorldPay payment processing (only the demo placeholder is in scope)
- AllayPay integration for CA/US (explicitly out of scope for v0.1 Demo)
- Age verification via ID document upload (demo uses self-declaration only)
- Product reviews and ratings
- Product search/autocomplete

</deferred>

---

*Phase: 02-storefront*
*Context gathered: 2026-04-09*
