# Phase 1: Foundation - Context

**Gathered:** 2026-04-09
**Status:** Ready for planning

<domain>
## Phase Boundary

Fork the `puxxireland` codebase into this repo as the demo app scaffold. Add multi-region routing (CA / UK / US) via path-based URL segments and a typed regional config system. Add a visible region selector to the storefront header. The app must run without errors and display the correct currency and payment label for each region.

Everything in this phase is infrastructure — no product catalogue, checkout, or account pages beyond what already exists in puxxireland.

</domain>

<decisions>
## Implementation Decisions

### Starting codebase
- Fork `puxxireland` (Next.js 15 / App Router / Supabase / Drizzle / Tailwind) as the demo app base
- Copy the repo into the Puxx workspace and adapt it — do not try to import it as a package
- Retain all existing routes, components, and lib utilities from puxxireland (they're needed for later phases)
- All existing puxxireland auth/session patterns are kept as-is

### Multi-region routing strategy
- Path-based routing: `/ca/...`, `/uk/...`, `/us/...` (e.g. `/uk/shop`, `/ca/checkout`)
- App Router dynamic segment: `app/[region]/...` wraps all storefront routes
- For the demo, switching regions = navigating to the equivalent `/[region]` path
- In production these regions will map to separate domains — the path approach demonstrates the logic cleanly without requiring three actual domains

### Regional config
- Single source of truth: `lib/config/regions.ts` — a typed config object keyed by region code (`ca`, `uk`, `us`)
- Each region config includes: `currency` (CAD/GBP/USD), `currencySymbol` (CA$/£/$), `locale` (en-CA/en-GB/en-US), `paymentMethod` (label only — "WorldPay" for UK, "Gift Card" for CA/US), `countryCode`
- A `getRegionConfig(region: string)` helper returns the config and throws on unknown region
- Region validation in middleware — invalid region codes redirect to `/uk` as default

### Region selector UX
- Visible dropdown/switcher in the storefront Header (already in PublicLayout → Header)
- Displays current currency symbol + flag emoji (🇨🇦 CAD / 🇬🇧 GBP / 🇺🇸 USD)
- Selecting a region navigates to the same page in that region (e.g. `/uk/shop` → `/ca/shop`)
- No cookie or localStorage for demo — region is fully derived from the URL path

### Middleware
- Extend existing `middleware.ts` to handle `[region]` path prefix
- On request to root `/`, redirect to `/uk` (default demo region)
- Region extracted from path and set as `x-region` request header for server components
- Existing auth/session logic is preserved — runs after region handling

### Claude's Discretion
- Exact dropdown component (select vs popover vs button group)
- Error page if region is invalid
- Whether to add `lang` attribute switching per region

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `components/layout/PublicLayout.tsx` → `Header` and `Footer` — region selector goes in Header
- `components/age-verification/AgeGate.tsx` — already built, reuse in Phase 2
- `lib/stores/cart-store.ts` — Zustand with persist — pattern to follow if region state ever needs a store
- `middleware.ts` — extend for region detection, keep existing session/auth logic

### Established Patterns
- App Router with `app/` directory — all new routes follow this
- Zustand for client-side state (cart, checkout)
- `@/lib/` alias for all lib imports
- `'use client'` directive on interactive components
- `lib/constants/` for centralized config (e.g. images.ts) — `regions.ts` follows this pattern

### Integration Points
- Root `app/layout.tsx` — wraps everything, set `lang` per region here
- `components/layout/Header.tsx` — add region selector component here
- `middleware.ts` — intercept all requests before they hit route handlers
- New `app/[region]/layout.tsx` — regional layout providing `RegionContext` to children

</code_context>

<specifics>
## Specific Ideas

- REG-01 success: visiting `/ca`, `/uk`, or `/us` shows correct currency and payment label — enough for the demo to prove the concept
- REG-02 success: the region selector dropdown in the header visibly changes the currency display on switch
- The `/uk` region should work end-to-end in the demo (WorldPay already integrated in puxxireland)
- The `/ca` and `/us` regions show "Gift Card" as the payment method label but checkout is stubbed

</specifics>

<deferred>
## Deferred Ideas

- IP-based auto-region detection — useful for production, but demo uses explicit path switching
- Full domain mapping (puxxpouches.ca → `/ca`) — production concern, not demo
- AllayPay real integration — explicitly out of scope for v0.1 Demo

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2026-04-09*
