---
phase: 05-portals
plan: "01"
subsystem: auth-seed
tags: [seed, auth, portals, demo-users]
dependency_graph:
  requires: [04-admin-dashboard]
  provides: [portal-demo-users, role-based-redirects]
  affects: [05-02-retailer-portal, 05-03-fulfilment-portal, 05-04-affiliate-portal, 05-05-portal-nav]
tech_stack:
  added: []
  patterns: [delete-before-insert-idempotency, role-based-redirect]
key_files:
  created: []
  modified:
    - lib/db/seed.ts
    - app/(auth)/actions.ts
decisions:
  - Portal users use delete-before-insert idempotency matching existing seed pattern
  - affiliate@puxx.com uses role='member' — falls through to /uk/account where affiliate tab lives
  - daysAgo helper duplicated locally in seedPortalUsers (not extracted) per plan guidance — avoids refactor
  - fulfil@puxx.com (not fulfil**ment**@) is the email as specified in plan
metrics:
  duration: 112s
  completed: 2026-04-09
  tasks_completed: 2
  files_modified: 2
---

# Phase 05 Plan 01: Portal Demo Users & Auth Routing Summary

**One-liner:** Seeded retailer/fulfilment/affiliate demo users via idempotent seedPortalUsers() and extended signIn with role-based redirects to /portal, /fulfilment, /uk/account.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Extend seed.ts with seedPortalUsers() | 5c43338 | lib/db/seed.ts |
| 2 | Update signIn role redirects in actions.ts | a9b1e5c | app/(auth)/actions.ts |

## What Was Built

### seedPortalUsers() — lib/db/seed.ts

New async function called from `seed()` after `seedAdminUser()` that seeds three portal demo users:

1. **retailer@puxx.com** (`role='retailer'`):
   - Profile: ageVerified=true, marketingConsent=false
   - Order PX-RETAIL-001: processing, £48.00, 7 days ago, 8x Mango Ice 4mg
   - Order PX-RETAIL-002: shipped, £96.00, 30 days ago, 16x Mango Ice 4mg

2. **fulfil@puxx.com** (`role='fulfilment'`):
   - Profile: ageVerified=true, marketingConsent=false
   - No orders

3. **affiliate@puxx.com** (`role='member'`):
   - Profile: PUXX-R-AFF1, PUXX-W-AFF1, commissionEarned='12.00'

All three use delete-before-insert for idempotency (matches existing pattern).

### signIn redirects — app/(auth)/actions.ts

Replaced lines 77-81 with four-branch redirect:

```typescript
if (['admin', 'manager', 'support'].includes(foundUser.role)) {
  redirect('/admin');
} else if (foundUser.role === 'retailer') {
  redirect('/portal');
} else if (foundUser.role === 'fulfilment') {
  redirect('/fulfilment');
} else {
  redirect('/uk/account');
}
```

## Verification

- TypeScript: `npx tsc --noEmit` — 0 errors
- seed.ts contains `seedPortalUsers()` called from `seed()` at line 324
- actions.ts contains `redirect('/portal')` at line 80 and `redirect('/fulfilment')` at line 82
- DB seed not executed against live DB (placeholder credentials in .env.local) — seed logic is correct and will run when DB is configured

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check: PASSED

- lib/db/seed.ts: FOUND (modified, seedPortalUsers at line 179)
- app/(auth)/actions.ts: FOUND (modified, role redirects at lines 77-84)
- 5c43338: FOUND in git log
- a9b1e5c: FOUND in git log
