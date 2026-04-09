---
phase: 01-foundation
plan: 01
subsystem: infra
tags: [nextjs, multi-region, routing, middleware, react-context, vitest, typescript]

# Dependency graph
requires: []
provides:
  - "Puxx demo app scaffold forked from puxxireland (Next.js 15 / App Router / Supabase / Drizzle / Tailwind)"
  - "lib/config/regions.ts: typed RegionConfig, REGIONS, VALID_REGIONS, getRegionConfig() — single source of truth for CA/UK/US"
  - "lib/config/region-context.tsx: RegionContext and useRegion() hook (client-side)"
  - "app/[region]/layout.tsx: server layout reading region param, providing RegionContext + PublicLayout"
  - "app/[region]/page.tsx: minimal REG-01 proof page showing currency and payment method per region"
  - "middleware.ts: root / -> /uk redirect, unknown segment -> /uk redirect, x-region header forwarding"
  - "vitest test suite for region config (5 tests, all passing)"
affects:
  - 01-02 (region selector in header will use useRegion() and RegionContext)
  - all future [region]/* routes (depend on [region]/layout.tsx providing RegionContext)
  - any component reading currency/payment (use getRegionConfig or useRegion)

# Tech tracking
tech-stack:
  added:
    - "vitest ^4.1.3 (test runner)"
  patterns:
    - "Path-based multi-region routing: /ca/*, /uk/*, /us/*"
    - "RegionContext provided at [region]/layout.tsx level, consumed via useRegion() in client components"
    - "Middleware-first region validation: root redirect, unknown segment redirect, x-region header"
    - "TDD: RED test commit -> GREEN implementation commit"

key-files:
  created:
    - "lib/config/regions.ts"
    - "lib/config/region-context.tsx"
    - "lib/config/regions.test.ts"
    - "app/[region]/layout.tsx"
    - "app/[region]/page.tsx"
    - "vitest.config.ts"
    - ".env.local"
  modified:
    - "middleware.ts (region logic prepended before auth/session logic)"
    - "app/layout.tsx (removed analytics components, set lang=en, removed PublicLayout wrapper)"
    - "package.json (added test script)"
    - ".gitignore (restored credentials and video file exclusions)"

key-decisions:
  - "PublicLayout moved from root layout to [region]/layout.tsx so each region gets header/footer"
  - "Analytics components (GoogleAnalytics, MetaPixel, MicrosoftClarity) removed from root layout for demo — they self-handle missing env vars but clutter the shell"
  - "RegionContext uses separate 'use client' file (region-context.tsx) so server layout can import it without forcing client boundary"
  - "middleware.ts keeps nonRegionPrefixes allowlist (api, _next, login, register, admin, account, dashboard) to prevent false-positive redirects"
  - "generateStaticParams added to [region]/page.tsx for ca/uk/us static pre-rendering"

patterns-established:
  - "Region config: always import from @/lib/config/regions — never hardcode currencies or payment methods"
  - "Region context: server components read params directly; client components use useRegion()"
  - "All storefront routes live under app/[region]/* — non-region routes (admin, auth, api) are exempt from region handling"

requirements-completed:
  - REG-01

# Metrics
duration: 5min
completed: 2026-04-09
---

# Phase 1 Plan 1: Foundation Bootstrap Summary

**puxxireland storefront forked into Puxx demo app with path-based multi-region routing (/ca, /uk, /us), typed RegionConfig, middleware redirect logic, and RegionContext provider — all verified by 5 passing vitest tests**

## Performance

- **Duration:** 5 min
- **Started:** 2026-04-09T05:33:05Z
- **Completed:** 2026-04-09T05:38:55Z
- **Tasks:** 2 (Task 1: scaffold + Task 2: TDD regional config/routing)
- **Files modified:** 14

## Accomplishments
- Forked all puxxireland source code (463 files, app/, components/, lib/, public/) into the Puxx demo repo
- Built typed multi-region config system (CA/GBP/USD with correct currencies and payment labels) with full vitest coverage
- Implemented middleware region handling: root / -> /uk, unknown segments -> /uk, x-region header forwarding
- Created [region]/layout.tsx + [region]/page.tsx proving REG-01: /uk, /ca, /us each resolve with correct config
- Build passes cleanly (pnpm tsc --noEmit and pnpm build both succeed)

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold Puxx demo app from puxxireland** - `3523629` (feat)
2. **Task 2 RED: Failing region config tests** - `4b2c67c` (test)
3. **Task 2 GREEN: Regional config, middleware, [region] layout** - `920d032` (feat)

_TDD task produced two commits (RED test + GREEN implementation)_

## Files Created/Modified
- `lib/config/regions.ts` - RegionCode, RegionConfig, REGIONS, VALID_REGIONS, getRegionConfig()
- `lib/config/region-context.tsx` - RegionContext, useRegion() hook ('use client')
- `lib/config/regions.test.ts` - 5 vitest tests for region config
- `app/[region]/layout.tsx` - Server layout: validates region, provides RegionContext + PublicLayout
- `app/[region]/page.tsx` - REG-01 proof page: shows currency symbol, currency code, payment method
- `middleware.ts` - Region handling prepended: root redirect, unknown segment redirect, x-region header
- `app/layout.tsx` - Simplified to html/body/fonts/AgeGate/ToastProvider/SWRConfig shell only
- `vitest.config.ts` - Vitest config with @ alias
- `package.json` - Added test script and vitest devDependency
- `.gitignore` - Restored credentials and video file exclusions

## Decisions Made
- PublicLayout moved from root layout.tsx into [region]/layout.tsx — this is the correct boundary since header/footer are region-aware
- Analytics components removed from root layout for demo phase (self-handle missing env vars but add noise during development)
- Separate `lib/config/region-context.tsx` file for the context/hook to avoid forcing a client boundary on the server layout file
- `generateStaticParams` added to [region]/page.tsx so /ca, /uk, /us are pre-rendered at build time

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- pnpm lock file not copied initially — resolved by explicitly copying pnpm-lock.yaml before `pnpm install`

## User Setup Required
None - no external service configuration required. .env.local uses placeholder values adequate for demo development.

## Next Phase Readiness
- All region routes active: /uk, /ca, /us each return 200 with correct regional config
- RegionContext is available to all child components of [region]/layout.tsx
- useRegion() hook is ready for Plan 02 (region selector component in Header)
- No blockers — TypeScript clean, build passes, all tests pass

---
*Phase: 01-foundation*
*Completed: 2026-04-09*
