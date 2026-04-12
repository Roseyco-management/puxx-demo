# Retrospective

## Milestone: v0.1 — Demo

**Shipped:** 2026-04-11
**Phases:** 7 | **Plans:** 24

### What Was Built

Multi-region storefront demo for Puxx nicotine pouches across CA/UK/US from a single Next.js app with Supabase backend. Includes admin dashboard (TailAdmin Pro), retailer portal, fulfilment queue, affiliate preview, customer account, CRM stub, age verification, and checkout flow. All deployed to Vercel at puxx-demo.vercel.app.

### What Worked

- **GSD phase orchestration** — 7 phases planned and executed in 3 days with wave-based parallelization
- **Codex adversarial review** — caught 8 rounds of real bugs that the verifier missed, including admin API auth gaps, field mapping crashes, and Drizzle remnants in account routes
- **Supabase REST migration** — pivoting from Drizzle to Supabase REST when Drizzle broke on Vercel was the right call. Clean separation between data layer and UI.
- **Shared mapping helpers** — `lib/utils/order-mapping.ts` and `lib/auth/admin.ts` became single sources of truth used across 10+ files

### What Was Inefficient

- **Drizzle-first then migrating away** — phases 3-4 built with Drizzle, then phase 7 had to rip it all out. If we'd started with Supabase REST, the gap-closure bundle wouldn't have been needed
- **Verifier missed runtime issues** — static code verification passed 7/7 but the actual demo had crashers (field mapping, auth). Codex caught what the verifier couldn't
- **Legacy route group not deleted early** — `app/(account)` was dead code for weeks before Codex round 7 caught it
- **Design quality not validated against reference site** — we built from scratch without comparing to puxxcanada.ca, resulting in a design that's worse than the WordPress original

### Patterns Established

- `getAdminUser()` / `getRetailerUser()` in `lib/auth/admin.ts` — role-based auth helpers with soft-delete filter
- `mapOrder()` in `lib/utils/order-mapping.ts` — snake_case to camelCase mapping for the Order contract
- Admin API routes: all 25 handlers use the same auth guard pattern
- Portal invoice: ownership check via user_id + role guard

### Key Lessons

1. **Always verify against the original site early** — the puxxcanada.ca comparison should have happened in phase 1, not after shipping
2. **Codex adversarial review is essential** — it found bugs the automated verifier, the build, and the typecheck all missed
3. **Don't mark phases complete retroactively without actually checking the code** — round 6 caught me claiming phase 3 was done when two routes still used Drizzle
4. **Seed data must match the real WooCommerce data** — our seeded strengths (4/6/8/12/16/20mg) don't match the WP source (3/6/9/12/16/22mg)
5. **Dark theme with gold accents is the brand identity** — not green. The next milestone should start from the right color palette

### Cost Observations

- Model mix: ~70% Sonnet (executor agents), ~30% Opus (orchestration + Codex review)
- Sessions: 1 very long session for phase 7 execution + gap closure
- Notable: the Codex review loop (8 rounds) was expensive but caught real bugs that would have crashed the demo
