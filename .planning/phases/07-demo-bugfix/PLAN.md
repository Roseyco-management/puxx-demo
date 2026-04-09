# Phase 7 — Demo Bug Fix Plan

**Goal:** Every client-facing page renders without errors. Zero 500s, zero 401s.

**Strategy:** All DB reads go through Supabase REST API (anon key, RLS off). All auth checks use `getSession()` from `lib/auth/session.ts`. Settings tables that don't exist return hardcoded defaults.

**Working pattern to follow:** `app/api/products/route.ts` — uses `createClient()` with anon key, queries via `.from('products').select('*')`, works on Vercel. Also `lib/db/supabase.ts` exports `getSupabaseClient()` which does the same thing.

---

## Wave 1 — Admin API Fixes (8 tasks, parallelizable)

### Task 1.1: Admin Products GET → Supabase REST
**File:** `app/api/admin/products/route.ts` (GET handler only, POST already uses getSupabaseClient)
- Replace `getDb()` + Drizzle query with `getSupabaseClient().from('products').select('*').order('created_at', { ascending: false })`
- Transform snake_case response to match current return shape

### Task 1.2: Admin Orders GET → Supabase REST
**File:** `app/api/admin/orders/route.ts`
- Replace `getDb()` with `getSupabaseClient().from('orders').select('*').order('created_at', { ascending: false })`

### Task 1.3: Admin Customers GET → Supabase REST
**File:** `app/api/admin/customers/route.ts`
- Replace `getDb()` join query with `getSupabaseClient().from('users').select('*, profiles(phone, retail_referral_code)').order('created_at', { ascending: false })`

### Task 1.4: Admin Customer Detail GET → Supabase REST
**File:** `app/api/admin/customers/[id]/route.ts` (GET handler, DELETE already uses getSupabaseClient)
- Replace `getDb()` with `getSupabaseClient().from('users').select('*, profiles(*)').eq('id', customerId).single()`

### Task 1.5: Admin Subscribers → Supabase REST
**File:** `app/api/admin/marketing/subscribers/route.ts` (GET, POST, DELETE)
- Replace all 3 `getDb()` calls with getSupabaseClient() equivalents
- Check if `subscribers` table exists in DB first — if not, return empty array

### Task 1.6: Fix all settings routes (9 files) — auth + defaults
**Files:**
- `app/api/admin/settings/general/route.ts`
- `app/api/admin/settings/payments/route.ts`
- `app/api/admin/settings/shipping/route.ts`
- `app/api/admin/settings/shipping/[id]/route.ts`
- `app/api/admin/settings/taxes/route.ts`
- `app/api/admin/settings/email-templates/route.ts`
- `app/api/admin/settings/email-templates/[slug]/route.ts`

For each:
1. Replace `import { createClient } from "@/lib/supabase/server"` → `import { getSession } from '@/lib/auth/session'`
2. Replace `const { data: { user } } = await supabase.auth.getUser(); if (!user)...` → `const session = await getSession(); if (!session?.user?.id)...`
3. For tables that don't exist (`settings`, `shipping_zones`, `email_templates`): return hardcoded demo defaults instead of querying

### Task 1.7: Fix admin users + activity routes — auth
**Files:**
- `app/api/admin/users/route.ts`
- `app/api/admin/activity/route.ts`
- `app/api/admin/orders/[id]/invoice/route.ts`

Same auth pattern fix as Task 1.6. For activity, return empty array. For users, query via getSupabaseClient. For invoice, return placeholder PDF or error gracefully.

### Task 1.8: Middleware static file fix
**File:** `middleware.ts` line 104
- Update matcher to: `['/((?!api|_next/static|_next/image|favicon.ico|manifest\\.json|robots\\.txt|sitemap|videos|images).*)']`

---

## Wave 2 — Storefront + Portal Fixes (5 tasks)

### Task 2.1: Products page — show 12 flavors not 72
**File:** `app/[region]/products/page.tsx`
- After fetching products, group by `flavor` field
- Show one card per flavor (use lowest-strength variant as representative)
- Display strength as pills/badges on each card

### Task 2.2: Product images — assign per flavor
**File:** `components/products/product-grid.tsx` or `ProductCard`
- Map each flavor to one of the 6 SVGs: `image.svg` through `image (5).svg`
- Apply in the card render: `src={FLAVOR_IMAGE_MAP[product.flavor] || product.imageUrl}`

### Task 2.3: Portal orders page → Supabase REST
**File:** `app/(portal)/portal/orders/page.tsx`
- Replace `getDb()` with getSupabaseClient for orders query
- Keep session-based user ID filter

### Task 2.4: Customer account → Supabase REST
**File:** `app/[region]/account/page.tsx`
- Replace `getDb()` calls with getSupabaseClient for profile + orders

### Task 2.5: Fulfilment order update → Supabase REST
**File:** `app/api/fulfilment/orders/[id]/route.ts`
- Replace `getDb()` PATCH with getSupabaseClient `.update()`

---

## Wave 3 — Polish (3 tasks)

### Task 3.1: Chart dimension fixes
**Files:** Admin dashboard chart components (find recharts usage)
- Wrap in container with `min-h-[300px]` and explicit width

### Task 3.2: Logo verification
- Confirm `PublicLayout` → `Header` renders logo from `/images/logo/PUXX-LOGO-LONG-BLACK.png`

### Task 3.3: Preload cleanup
- Find `<link rel=preload>` without valid `as` attribute in layout files

---

## Success Criteria

- [ ] `https://puxx-demo.vercel.app/uk/products` — 12 flavor cards with images
- [ ] `https://puxx-demo.vercel.app/admin` — dashboard loads, all nav pages render
- [ ] `https://puxx-demo.vercel.app/admin/products` — product list with 72 items
- [ ] `https://puxx-demo.vercel.app/admin/orders` — order list with seeded orders
- [ ] `https://puxx-demo.vercel.app/admin/customers` — customer list
- [ ] `https://puxx-demo.vercel.app/admin/settings` — settings pages render with defaults
- [ ] `https://puxx-demo.vercel.app/portal/orders` — retailer orders visible
- [ ] `https://puxx-demo.vercel.app/uk/account` — customer order history
- [ ] `https://puxx-demo.vercel.app/manifest.json` — valid JSON, no redirect
- [ ] Zero 500/401 errors in browser console on critical path
