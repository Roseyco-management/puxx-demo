**CRITICAL**
- I would not sign this off as fully clean yet. The specific findings from the last review are resolved, but there is still a broader admin API auth gap outside that set. `/api` is excluded from middleware in [middleware.ts:105](/Users/arnispiekus/Work/Github/Puxx/middleware.ts#L105), so each admin route must enforce role checks itself. At least these routes still do not:
- [app/api/admin/customers/route.ts:4](/Users/arnispiekus/Work/Github/Puxx/app/api/admin/customers/route.ts#L4) has no auth check and returns customer/order-derived data.
- [app/api/admin/analytics/metrics/route.ts:6](/Users/arnispiekus/Work/Github/Puxx/app/api/admin/analytics/metrics/route.ts#L6) has no auth check and returns revenue/order analytics.
- [app/api/admin/products/bulk/route.ts:18](/Users/arnispiekus/Work/Github/Puxx/app/api/admin/products/bulk/route.ts#L18) has no auth check and can mutate products.
- [app/api/admin/users/route.ts:5](/Users/arnispiekus/Work/Github/Puxx/app/api/admin/users/route.ts#L5) only checks for any session, not admin role.
- [app/api/admin/settings/general/route.ts:4](/Users/arnispiekus/Work/Github/Puxx/app/api/admin/settings/general/route.ts#L4) only checks for any session, not admin role.

**IMPORTANT**
- The prior findings you asked me to re-check are resolved:
- `POST /api/admin/products` now enforces admin auth at [app/api/admin/products/route.ts:112](/Users/arnispiekus/Work/Github/Puxx/app/api/admin/products/route.ts#L112).
- Soft-deleted users are excluded in both helpers at [lib/auth/admin.ts:20](/Users/arnispiekus/Work/Github/Puxx/lib/auth/admin.ts#L20) and [lib/auth/admin.ts:42](/Users/arnispiekus/Work/Github/Puxx/lib/auth/admin.ts#L42).
- Bulk activate/deactivate now correctly uses partial `PATCH` at [app/api/admin/products/[id]/route.ts:249](/Users/arnispiekus/Work/Github/Puxx/app/api/admin/products/[id]/route.ts#L249), and the page calls that path at [app/(admin)/admin/products/page.tsx:62](/Users/arnispiekus/Work/Github/Puxx/app/(admin)/admin/products/page.tsx#L62).
- The custom `endDate` logic is now correct at [app/api/admin/orders/route.ts:39](/Users/arnispiekus/Work/Github/Puxx/app/api/admin/orders/route.ts#L39).
- The portal invoice route still has both retailer-role and ownership checks at [app/api/portal/orders/[id]/invoice/route.ts:14](/Users/arnispiekus/Work/Github/Puxx/app/api/portal/orders/[id]/invoice/route.ts#L14) and [app/api/portal/orders/[id]/invoice/route.ts:36](/Users/arnispiekus/Work/Github/Puxx/app/api/portal/orders/[id]/invoice/route.ts#L36).

No regressions stood out in the targeted fixes themselves. Static review says your last-round findings are closed, but there is a broader unresolved authorization problem on other `/api/admin/*` routes that still blocks a clean sign-off. I did not run live HTTP/browser verification in this sandbox.
