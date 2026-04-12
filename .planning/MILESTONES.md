# Milestones

## v0.1 Demo (Shipped: 2026-04-11)

**Phases:** 7 | **Plans:** 24 | **Commits:** 141 | **Files:** 297 TypeScript | **Timeline:** 2026-04-08 to 2026-04-11
**Deployment:** puxx-demo.vercel.app | **Tag:** v0.1

**Key accomplishments:**
- Multi-region storefront (CA/UK/US) from single Next.js app with regional routing, currency, and config switching
- Admin dashboard (TailAdmin Pro) with orders, customers, products management — 25 API routes hardened with role-based auth
- Retailer portal with order history and real PDF invoice downloads
- Fulfilment queue with mark-as-shipped workflow
- Customer account with order history, referral codes, and affiliate dashboard
- Full Drizzle-to-Supabase REST migration (Drizzle was broken on Vercel due to Postgres pooler DNS)
- 8 rounds of Codex adversarial code review across the gap-closure bundle
- Age verification gate, checkout flow, mobile responsiveness

**Known gaps at ship (23 UAT items for v0.2):**
- Storefront design quality below puxxcanada.ca WordPress original
- Product data model wrong (should be flavours as products with strength variants)
- Product images missing, Server Components crash on product pages
- Admin dashboard needs mock analytics/revenue data
- Retailer portal needs sidebar layout matching admin
- Fulfilment login broken, customer account auth intermittent
- Color scheme too green — should match puxxcanada.ca dark theme

**Full UAT:** `.planning/phases/07-demo-bugfix/07-UAT.md`
**Design reference for v0.2:** `.planning/design-reference.md`

---
