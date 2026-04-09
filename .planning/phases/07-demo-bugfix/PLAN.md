# Phase 7 — Demo Bug Fix Plan

**Goal:** Get the demo to a presentable state for client delivery. Every page a client would see must render without errors.

**Constraint:** Direct Postgres/Drizzle connection to Supabase does not work from Vercel functions. All DB reads/writes must go through Supabase REST API (anon key, RLS is off). All auth checks must use `getSession()` not `supabase.auth.getUser()`.

---

## Task 1 — Fix Admin API 500s (Drizzle → Supabase REST)

**Files:** `app/api/admin/products/route.ts`, `app/api/admin/orders/route.ts`, `app/api/admin/customers/route.ts`

For each route: replace `getDb()` Drizzle call with `createClient(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY).from(table).select(...)`.

### 1a. Admin Products API
```ts
// app/api/admin/products/route.ts
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
```

### 1b. Admin Orders API
```ts
const { data, error } = await supabase.from('orders').select('*, users(name, email)').order('created_at', { ascending: false });
```

### 1c. Admin Customers API
```ts
const { data, error } = await supabase.from('users').select('*, profiles(phone, retail_referral_code)').order('created_at', { ascending: false });
```

---

## Task 2 — Fix Admin Settings 401s (auth pattern)

**Files:** `app/api/admin/settings/general/route.ts`, `app/api/admin/settings/payments/route.ts`, `app/api/admin/settings/shipping/route.ts`

Replace:
```ts
const { data: { user } } = await supabase.auth.getUser();
if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
```

With:
```ts
import { getSession } from '@/lib/auth/session';
const session = await getSession();
if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
```

The settings table (`settings`, `shipping_zones`) doesn't exist in the demo DB — return sensible defaults instead of querying. This avoids needing to create more tables for the demo.

### Default responses for settings routes
- `settings/general` → return `{ storeName: 'PUXX Demo', currency: 'GBP', timezone: 'Europe/London' }`
- `settings/payments` → return `{ provider: 'WorldPay', testMode: true }`
- `settings/shipping` → return `{ zones: [{ name: 'UK Standard', rate: 4.99, freeOver: 50 }] }`

---

## Task 3 — Fix Storefront: Show 12 Flavor Cards Not 72

**File:** `app/[region]/products/page.tsx`

The products API returns 72 items. Add deduplication logic client-side to show only the first product per flavor (the 6mg variant as the representative), and display the 6 strengths as variant pills on each card.

```ts
// After fetching products, group by flavor
const flavorMap = new Map<string, Product>();
products.forEach(p => {
  if (!flavorMap.has(p.flavor)) flavorMap.set(p.flavor, p);
});
const featuredProducts = Array.from(flavorMap.values());
```

Update ProductGrid to receive the grouped 12 flavors.

Also update the `ProductCard` to show a strength selector (6 pills: 4mg, 6mg, 8mg, 12mg, 16mg, 20mg) below the product image.

---

## Task 4 — Fix Product Images (Assign per Flavor)

**File:** `app/api/products/route.ts` or products display logic

The 6 SVG files in `/images/graphics/` exist: `image.svg`, `image (1).svg` through `image (5).svg`. Map each of the 12 flavors to one of the 6 SVGs based on flavor category:

```ts
const FLAVOR_IMAGE_MAP: Record<string, string> = {
  'Cool Mint': '/images/graphics/image.svg',
  'Spearmint': '/images/graphics/image (1).svg',
  'Watermelon': '/images/graphics/image (2).svg',
  'Strawberry': '/images/graphics/image (3).svg',
  'Grape': '/images/graphics/image (4).svg',
  'Citrus': '/images/graphics/image (5).svg',
  // remaining flavors cycle through
};
```

Apply this in the `ProductCard` component: if `imageUrl` is the generic placeholder, map to the flavor-specific SVG.

---

## Task 5 — Fix Manifest Redirect

**File:** `middleware.ts`

Add `'manifest.json'`, `'robots.txt'`, `'sitemap.xml'` to the static file bypass, or update the middleware config matcher:

```ts
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|manifest.json|robots.txt|sitemap|images|videos).*)'],
  runtime: 'nodejs'
};
```

---

## Task 6 — Fix Retailer Portal API 500s

**Check files:** `app/api/portal/**/route.ts`, `app/(portal)/portal/orders/page.tsx`

The orders page (`app/(portal)/portal/orders/page.tsx`) already uses `getDb()` (Drizzle). Replace with Supabase REST:

```ts
const supabase = createClient(...);
const { data: retailerOrders } = await supabase
  .from('orders')
  .select('*')
  .eq('user_id', session.user.id)
  .order('created_at', { ascending: false });
```

---

## Task 7 — Fix Customer Account / Phase 3

**Files:** `app/(customer)/account/` or `app/[region]/account/`

Implement a minimal customer account page showing:
1. Order history table (orders from Supabase REST by user_id)
2. Referral code from profile

---

## Task 8 — Fix Preload and Manifest Errors (Cleanup)

- `<link rel=preload> must have valid 'as' value` — find in layout files or `next.config` font/script declarations
- Chart containers: add `style={{ minHeight: 300 }}` wrapper around recharts components in admin dashboard

---

## Success Criteria

When Phase 7 is complete, a client clicking through the demo should see:

- [ ] Shop page: 12 flavor cards with images, logo visible in header
- [ ] Admin panel: All list pages load (orders, customers, products) with seeded data
- [ ] Admin settings: Pages render (with defaults, not errors)
- [ ] Retailer portal: Orders page shows seeded orders
- [ ] Customer account: Order history page renders
- [ ] Zero 500/401 errors in browser console on any demo-path page
- [ ] Manifest valid (no browser warning)

---

## Execution Order

Wave 1 (parallel — independent APIs):
- Task 1: Admin API 500s
- Task 2: Admin settings 401s
- Task 5: Manifest fix (1-line change)

Wave 2 (parallel — frontend fixes):
- Task 3: Products display (12 flavors)
- Task 4: Product images
- Task 6: Portal orders

Wave 3:
- Task 7: Customer account
- Task 8: Cleanup/polish
