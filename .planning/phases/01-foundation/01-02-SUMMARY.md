---
phase: 01-foundation
plan: "02"
subsystem: ui
tags: [next.js, react, tailwind, region-selector, header, navigation]

# Dependency graph
requires:
  - phase: 01-foundation plan 01
    provides: REGIONS constant, VALID_REGIONS, RegionCode type, RegionConfig interface from lib/config/regions.ts

provides:
  - RegionSelector client dropdown component (components/region/RegionSelector.tsx)
  - Header updated with RegionSelector in desktop and mobile nav
  - All Header nav links region-prefixed (Shop/About/Blog/Contact/Login/Shop Now)

affects: [02-products, 03-checkout, any phase that modifies Header or adds nav links]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Extract region from pathname: pathname.split('/').filter(Boolean)[0] with VALID_REGIONS guard"
    - "Native <select> for region switcher — no library dependency, accessible by default"
    - "router.push() to switch regions: replace first path segment, preserve rest of path"

key-files:
  created:
    - components/region/RegionSelector.tsx
  modified:
    - components/layout/Header.tsx

key-decisions:
  - "Used native <select> over custom popover — simpler, more accessible, consistent with CONTEXT.md discretion"
  - "Login and Shop Now CTA buttons also region-prefixed to keep all navigation consistent"

patterns-established:
  - "Region extraction from pathname: identical pattern in both RegionSelector and Header — consistent, no shared utility needed at this scale"
  - "Region-prefixed hrefs: all nav links constructed as template literals with /${region}/path"

requirements-completed: [REG-02]

# Metrics
duration: 2min
completed: 2026-04-09
---

# Phase 1 Plan 02: Region Selector Summary

**Native select dropdown in Header reads region from URL path and navigates to equivalent path on selection, with all nav links region-prefixed**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-04-09T05:40:59Z
- **Completed:** 2026-04-09T05:42:24Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- RegionSelector client component reads current region from URL path (no cookies/localStorage), displays flag + currency code, navigates to equivalent path on change
- RegionSelector wired into Header desktop actions (before cart icon) and mobile menu (after nav links)
- All Header nav links (Shop, About, Blog, Contact, Login, Shop Now) updated to /${region}/... pattern

## Task Commits

Each task was committed atomically:

1. **Task 1: Create RegionSelector component** - `5bdc85a` (feat)
2. **Task 2: Wire RegionSelector into Header and fix region-aware nav links** - `a833de9` (feat)

**Plan metadata:** committed with docs commit below

## Files Created/Modified

- `components/region/RegionSelector.tsx` - Client dropdown: reads pathname, extracts region, renders native select with flag+currency options, router.push() on change
- `components/layout/Header.tsx` - Added usePathname + region extraction, imported RegionSelector, wired into desktop and mobile nav, all hrefs region-prefixed

## Decisions Made

- Used native `<select>` element over custom popover/button-group — no external dependency, keyboard accessible by default, matches CONTEXT.md "Claude's discretion" guidance
- Login and Shop Now buttons also region-prefixed for full consistency (plan only specified nav links and the RegionSelector placement)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Region-prefixed Login and Shop Now CTA links**
- **Found during:** Task 2 (wiring RegionSelector into Header)
- **Issue:** Plan specified updating the `navigation` array hrefs and adding RegionSelector, but Login (`/login`) and Shop Now (`/shop`) hardcoded links in desktop actions and mobile menu would still navigate to non-region paths, breaking the region-consistency pattern
- **Fix:** Updated all four hardcoded hrefs (2x Login, 2x Shop Now) to use `/${region}/login` and `/${region}/shop`
- **Files modified:** components/layout/Header.tsx
- **Verification:** TypeScript compiles clean, hrefs visually confirmed in code review
- **Committed in:** a833de9 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (Rule 2 — missing critical consistency)
**Impact on plan:** Necessary for correct region-aware navigation. Login and Shop Now would have landed users on /login and /shop (no region prefix), breaking middleware region detection. No scope creep.

## Issues Encountered

None — TypeScript compiled clean on first attempt for both tasks.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- REG-02 satisfied: RegionSelector visible in Header on all region routes (desktop + mobile)
- Region switching navigates correctly: /uk/shop → /ca/shop etc.
- All storefront nav links are region-aware
- Ready for Phase 2: product catalogue or any phase that adds pages under app/[region]/

---
*Phase: 01-foundation*
*Completed: 2026-04-09*
