# Client Issues — Exhaustive Extraction from Discovery Call
**Source:** 2026-04-08 discovery call with Fez/Bez (client) + Alan (team)
**Extracted:** 2026-04-08

---

## A. PAYMENTS

### A1. Gift card payment plugin not integrated on Canadian site
- **Type:** BROKEN — was partially working, now stuck
- **Region:** Canada (priority), eventually US
- **Priority:** CRITICAL — blocking Canadian credit card sales right now
- **Detail:** A third-party site sells gift cards for Puxx. When a customer pays by credit card on Puxx, the payment routes through this third-party site, which issues a gift card that auto-redeems on the Puxx site. Custom tech exists on the third-party side. The previous team got it partially working but "it wasn't communicating the paid status back" — the third-party dev team has since fixed their side, but the Puxx-side plugin integration is still not done after 3+ weeks. Client paid the previous team to build a "generic plugin" for this. There IS a dev team on the third-party side to coordinate with.
- **Client words:** "I paid them before to create a generic plugin for me... still not integrated. I don't know what the fuck they're doing. It's been weeks."

### A2. WorldPay integration timing out on UK site
- **Type:** BROKEN — set up but not functional
- **Region:** UK only
- **Priority:** CRITICAL — blocking UK launch entirely
- **Detail:** WorldPay is configured on the UK WooCommerce site but times out after 60 seconds without confirming the transaction. WorldPay says it's a routing/server issue on the Puxx side. The previous team blamed WorldPay. Client believes WorldPay ("they're a big fucking company and they have thousands of sites"). Client has a WorldPay tech team contact to hand over. This is a standard WooCommerce integration in GBP — no workarounds needed since nicotine products are legal and licensed in the UK.
- **Client words:** "It's not confirming a transaction within the 60 seconds, after 60 seconds it times out... WorldPay is saying it's because of my team, the way it's routing or the servers."

### A3. Stripe shut down — PHP redirect workaround no longer viable
- **Type:** BROKEN — was working for about a year, shut down ~3 weeks ago
- **Region:** Was used for Canada via a dummy site redirect
- **Priority:** INFO — replaced by gift card workaround (A1), not to be revived
- **Detail:** Client was using Stripe via a PHP redirect through one of the dummy sites that had been approved. Stripe eventually caught on and shut it down. Nicotine products are not accepted by Stripe. Client says "I could keep trying that approach" but it's not the path forward.

### A4. Credit card payment confirmation not triggering order status change
- **Type:** BROKEN — payment goes through but order doesn't auto-progress
- **Region:** All three e-commerce sites (CA, UK, US)
- **Priority:** HIGH — core order flow dependency
- **Detail:** When credit card payment is confirmed, the site is supposed to automatically change the order status to "processing" and assign it to the fulfilment team. This automatic progression is not reliably working. The gift card plugin (A1) specifically was not "kicking back the paid status" — even after the third-party fixed their end.

### A5. Bank transfer orders need manual admin approval flow
- **Type:** MISSING — needs to be verified/completed
- **Region:** All (Canada has e-transfers; UK/US have standard bank transfers)
- **Priority:** MEDIUM
- **Detail:** Bank transfer orders must come to admin for manual payment confirmation before moving to processing. Canada also has "e-transfers" (email money transfers) which function like bank transfers. This flow needs to work: order placed with bank transfer > admin notified > admin confirms payment > order moves to processing > assigned to fulfilment.

### A6. Different payment methods per region not fully configured
- **Type:** MISSING — partially built
- **Region:** All
- **Priority:** MEDIUM
- **Detail:** Each country needs different payment options enabled. Canada: gift card credit card workaround + e-transfers + bank transfer. UK: WorldPay (direct credit card) + bank transfer. US: gift card credit card workaround (same as Canada) + bank transfer. These need to be separately configured per site.

---

## B. ORDER FLOW

### B1. Full order-to-fulfilment pipeline not working end-to-end
- **Type:** BROKEN — built but incomplete/untested
- **Region:** All three e-commerce sites
- **Priority:** CRITICAL — nothing can launch without this
- **Detail:** The complete flow that must work: Customer adds to cart > checkout (guest or account) > payment (credit card or bank transfer) > payment confirmed > status auto-changes to "processing" > auto-assigns to nearest fulfilment location > fulfilment team gets dashboard notification > fulfilment team ships and adds tracking number > marks completed > customer gets automated email with tracking info. Client says "there's a lot of things that are built but they're not fully working."
- **Client words:** "I don't know why this is not working, like why it's not already live to be honest. It's been six months since I took it from the last ones."

### B2. Order detail view was not clickable from dashboard
- **Type:** BROKEN — was reported, may have been fixed
- **Region:** All
- **Priority:** HIGH
- **Detail:** Admin/fulfilment users could see order numbers (e.g., "1502") in the dashboard but could not click on them to view the actual order details. Client says "I think they fixed it" but is not sure. Even after clicking, the order detail view may be missing information — "There should be a lot more information. Where is it? Because I can't see it."
- **Client words:** "Before, I couldn't click on this and see the order... Like, well, not very useful."

### B3. Automated emails at each order stage
- **Type:** MISSING — needs verification
- **Region:** All
- **Priority:** HIGH
- **Detail:** Automated emails must go to the customer at each stage: order received, payment confirmed, processing, shipped (with tracking number and courier name), completed. These need to be tested end-to-end.

### B4. Auto-assignment to nearest fulfilment location based on geography
- **Type:** MISSING/BROKEN — logic exists but untested
- **Region:** All (most important for US due to size)
- **Priority:** MEDIUM (currently only one fulfilment location per country)
- **Detail:** When multiple distributors exist in a region, orders should be assigned to the nearest one based on postal/zip codes AND stock availability. System should check that the assigned distributor has sufficient stock before sending the order. Currently only one distributor per country, so geographic routing isn't critical yet, but the stock-check logic matters.
- **Client words:** "Canada's a big country... somebody's ordering in BC, we don't want to ship from Toronto because it takes a fucking week. And then the States will be massive."

### B5. Fulfilment team dashboard and notification system
- **Type:** BROKEN — partially built
- **Region:** All
- **Priority:** HIGH
- **Detail:** Fulfilment team needs their own dashboard within their user role showing: pending orders to fulfil, ability to view order details, field to enter tracking number, button to mark as completed. They need to receive notifications when a new order is assigned to them. This was built but needs to be verified working.

---

## C. AFFILIATE / REFERRAL SYSTEM

### C1. Two separate referral codes per account (retail + wholesale)
- **Type:** BROKEN — was unified, needs to be split
- **Region:** All
- **Priority:** HIGH
- **Detail:** Originally built with one unified referral code per account. Client requires TWO separate codes: one for retail referrals and one for wholesale referrals, because they have different commission structures and rules. Codes must be randomly generated and automatically assigned when an account is created.
- **Client words:** "It was one unified code, which doesn't work because... for retail, there has to be a separate retail code and a separate wholesale code."

### C2. Referral codes must create permanent (residual) customer linkage
- **Type:** MISSING — needs verification
- **Region:** All
- **Priority:** HIGH
- **Detail:** When a customer uses someone's referral code, that customer is linked to the referrer PERMANENTLY — "for life." The referrer earns commission on every future purchase by that customer, not just the first one. Once linked, the customer never needs to re-enter the code.

### C3. Two-tier commission structure
- **Type:** MISSING — needs to be built/verified
- **Region:** All
- **Priority:** HIGH
- **Detail:** Commission goes two tiers deep only. If Person A refers Customer B, Person A gets commission on B's purchases forever. If Customer B then refers Customer C, the commission on C's purchases splits between B and the person who originally referred B (Person A). But if C refers D, A gets nothing from D — only two tiers deep, not infinite.

### C4. Commission rules must be adjustable per account, not static
- **Type:** MISSING — previous team tried to make it static
- **Region:** All
- **Priority:** HIGH
- **Detail:** Commission rates and rules cannot be a single fixed number. They need to be adjustable per account — e.g., an influencer deal might get a specific rate, a company partnership might get a different rate. Admin must be able to change commission rules for individual accounts.
- **Client words:** "You make a deal with the company or an influencer, let's say, and they get X amount... It has to be changed. The rules for the code, right? It can't be one static number forever."

### C5. Commission rules differ by country
- **Type:** MISSING — needs configuration
- **Region:** All (rules vary per country)
- **Priority:** MEDIUM
- **Detail:** Wholesale referral thresholds differ by country. In Canada, the wholesale threshold is 100 tins. In the UK, it's 50 tins. The system must support per-country rule configuration.

### C6. AffiliateWP integration vs. custom build decision
- **Type:** REQUEST — client doesn't care which approach
- **Region:** All
- **Priority:** INFO
- **Detail:** Original devs said AffiliateWP couldn't handle the requirements, so they built custom. AJ then said (after 4 months) that AffiliateWP actually can handle everything and offered to integrate it instead. Client's position: "As long as the site works, I don't give a shit how you build it."

### C7. Payout request/view from customer dashboard
- **Type:** MISSING — needs verification
- **Region:** All
- **Priority:** MEDIUM
- **Detail:** Customers should be able to request payouts and view their payout history from their dashboard. This was shown in the demo but needs to be verified as functional.

---

## D. CUSTOM PRICING & USER ROLES

### D1. Custom pricing per user account (wholesale)
- **Type:** MISSING — the whole reason for the new platform
- **Region:** All
- **Priority:** CRITICAL
- **Detail:** The current temporary site shows everyone the same price, forcing the client to use coupon codes (which get abused). The new platform must support custom/tiered pricing per individual user account, especially for wholesale customers. This is the core differentiator between the current temp site and the new platform.
- **Client words:** "I can't get custom pricing per account. Everybody sees the exact same price... I have to give them specific discount vouchers and people abuse the discount voucher sometimes."

### D2. User roles: retail customer, wholesale customer, fulfilment/distributor
- **Type:** BROKEN — partially built
- **Region:** All
- **Priority:** HIGH
- **Detail:** Three user roles needed: retail customer, wholesale customer, and fulfilment/distributor. Sales reps use wholesale accounts (no separate role needed — "the functionality is identical, they're just not buying"). Each role has different dashboard views, pricing, and permissions.

### D3. Wholesale account requires business document verification
- **Type:** MISSING — was supposed to be added
- **Region:** All
- **Priority:** MEDIUM
- **Detail:** Wholesale account signup must prompt the applicant to upload business documents: ID and trade license. This is how wholesale pricing access is gated — you must be a verified business. Client told the previous team to add this but noted "I don't even see here so I don't know what's going on with that" — unclear if it was built.
- **Client words:** "If you qualify for a wholesale account, you have to be a business. So they're supposed to upload their ID, trade license, that's how you get the wholesale pricing."

### D4. UK-specific discount rules (volume-based)
- **Type:** REQUEST — new feature for UK site
- **Region:** UK only
- **Priority:** LOW (post-launch)
- **Detail:** UK site should have volume-based discounts, e.g., "buy 10 tins, get 10% off." This will not be on the Canadian site. Basic promotional rule configuration per region.

---

## E. SHIPPING & FULFILMENT

### E1. Freightcom cannot know what is being shipped — need intermediary
- **Type:** REQUEST — critical automation blocker
- **Region:** Canada, likely US
- **Priority:** HIGH
- **Detail:** Freightcom is the shipping aggregator for Canada (and likely US). However, Freightcom cannot be directly integrated with the Puxx site because they cannot know they are shipping nicotine products — they would drop the account. Freightcom currently thinks it's a different company. Need a third-party intermediary or workaround so the site can communicate with Freightcom without exposing product details.
- **Client words:** "They think this is our company. This is what Freightcom thinks. It has to stay that way. They won't support nicotine."
- **Constraint:** "Freightcom thinks this is a different company — it needs to stay that way."

### E2. Current manual shipping process is unsustainable
- **Type:** BROKEN (process, not tech) — manual workflow that cannot scale
- **Region:** Canada (currently), will apply to US
- **Priority:** HIGH
- **Detail:** Current process for EVERY order: Check orders > look up customer name > copy it > go to Gmail > search for the order email > reply to email > go back to site > copy tracking number > go back to Gmail > paste tracking number > type up email > send. This is done for every single order, every day.
- **Client words:** "This is why I'm not even trying to push it right now because this is mental. I'm not going to be able to... I'm scared to scale it because what happens when we have a thousand orders a day?"

### E3. ShipStation integration for UK (direct, clean)
- **Type:** REQUEST — new integration
- **Region:** UK only
- **Priority:** HIGH (needed for UK launch)
- **Detail:** ShipStation is the UK shipping platform. It has an API integration. Because Puxx is fully licensed and compliant in the UK, ShipStation CAN be directly integrated — no intermediary needed. When a shipping label is created in ShipStation, the tracking number should automatically upload to the Puxx site. This removes the manual tracking number step entirely.

### E4. Freightcom has an integration API (QuickShip) but cannot be used directly
- **Type:** INFO — constraint
- **Region:** Canada, US
- **Detail:** Freightcom has an API integration product called "QuickShip" (different name, same company). However, it cannot be used directly because it would expose that Puxx is shipping nicotine. Any integration must go through an intermediary layer.

### E5. Auto-fill shipping details for fulfilment team
- **Type:** REQUEST
- **Region:** All
- **Priority:** MEDIUM
- **Detail:** The site should automatically pre-fill shipping information (customer address, order details) for the fulfilment team so they don't have to manually enter it into the shipping platform.
- **Client words:** "We can somehow figure out that it would automatically fill in all this sh-... because it'll communicate things."

---

## F. CRM

### F1. Basic CRM needed with customer data + communication history
- **Type:** REQUEST — build new or migrate from current
- **Region:** All (single CRM for all regions)
- **Priority:** HIGH
- **Detail:** Currently using what Alan identified as a white-label GoHighLevel CRM. Client doesn't use most features. Needs: customer data storage, email communication capability, phone communication capability, record of all interactions/conversations, timeline for each customer's journey, ability to look up any customer and see full history.
- **Client words:** "I just need the basics: customer data storage, email and phone communication, and a record of all customer interactions."

### F2. Contact form and email submissions must flow into CRM
- **Type:** REQUEST
- **Region:** All
- **Priority:** HIGH
- **Detail:** When someone fills out a contact form on the website or sends an email, it must come through the CRM so there's a timeline/record for that customer. Admin should be able to look up any customer and see their full communication and purchase history.

### F3. CRM must work on mobile
- **Type:** REQUEST — hard requirement
- **Region:** N/A
- **Priority:** HIGH
- **Detail:** Client uses his phone for everything. Does not use laptop except for Zoom. CRM must be fully usable on mobile.
- **Client words:** "It needs to be usable on the phone also. I don't use my laptop ever... I prefer to use my phone for everything."

### F4. Staff CRM access without website admin access
- **Type:** REQUEST
- **Region:** All
- **Priority:** MEDIUM
- **Detail:** Staff members need to use the CRM to view customer data and communicate, but they should NOT have admin access to the website itself. Role-based access: CRM usage without WordPress/WooCommerce backend access.
- **Client words:** "I don't want to give everybody admin access to my fucking site either. They should be able to use the same thing."

### F5. Wife and EA handle marketing side — connect them for automations
- **Type:** INFO — stakeholder note
- **Region:** N/A
- **Priority:** LOW (post-basics)
- **Detail:** Client's wife and EA handle marketing: automations, videos, email campaigns. Client will make introductions. Marketing features are second phase after basics are working.

### F6. Migrate existing CRM data
- **Type:** REQUEST
- **Region:** All
- **Priority:** MEDIUM
- **Detail:** Whatever customer data exists in the current GoHighLevel white-label CRM needs to be exported and migrated to the new solution. Alan already has access to the current CRM.

---

## G. INVENTORY MANAGEMENT

### G1. Internal stock management system (site-level)
- **Type:** BROKEN — built but needs verification
- **Region:** All
- **Priority:** HIGH
- **Detail:** An internal stock management system was built into the platform. When someone buys, it subtracts from inventory. When an order is assigned to a distributor, it checks that the distributor has sufficient stock before sending. Needs end-to-end verification.

### G2. Low-stock alerts with automatic reorder list
- **Type:** REQUEST — new feature
- **Region:** All
- **Priority:** MEDIUM
- **Detail:** When stock drops to a configurable threshold (e.g., 20% of original quantity), the item should automatically be added to a reorder list. At minimum: a list that someone can check Monday morning to see what's low. Ideally: automatic reorder trigger. The threshold must be configurable per product.
- **Client words:** "When it gets to X amount of stock, you've got a list... instead of having to go through one by one."

### G3. Inventory management as a feature for retail customers (future)
- **Type:** REQUEST — future phase
- **Region:** UK initially, then others
- **Priority:** LOW (future incentive for supply chain partners)
- **Detail:** Part of the business model is offering stores an inventory management system that makes it easier for them to reorder from Puxx. In the UK, automatic reordering from suppliers is standard practice. This is an incentive for stores to join the Puxx supply chain. Eventually will need POS integration (separate phase, Android-based).

---

## H. ADMIN / DASHBOARD

### H1. Custom admin dashboard (not standard WooCommerce backend)
- **Type:** BROKEN — built but incomplete
- **Region:** All
- **Priority:** HIGH
- **Detail:** Client had a custom CRM-style dashboard built because standard WooCommerce "confuses the shit out of me — too many options." Needs: basic sales analytics, orders view, payments view, clean layout showing pending/overdue/completed orders organized by date. Should be simple and user-friendly for both admin and team members.
- **Client words:** "I don't need an option, I'm not running fucking Microsoft here... I just need the basic sales analytics, orders, payments."

### H2. Language/terminology inconsistencies throughout platform
- **Type:** BROKEN — built with inconsistent labels
- **Region:** All
- **Priority:** MEDIUM
- **Detail:** The original Sri Lankan developers used different terminology in different sections. The same concept is called "distributor commission" in one place and something else in another. Field labels are confusing or inaccurate. Missing field labels. Language needs to be standardized throughout the entire platform.
- **Client words:** "The language is different in different sections... their English wasn't the best... they used different terminology."

### H3. Admin portal should pull only needed info (not full WP/Woo backend)
- **Type:** REQUEST
- **Region:** All
- **Priority:** MEDIUM
- **Detail:** Client wants a clean admin portal that just shows the information he needs to see or change — not the full WordPress or WooCommerce admin with all its options. Should be a simplified, purpose-built view.

### H4. Page rendering/layout issues on the e-commerce sites
- **Type:** BROKEN
- **Region:** All (specifically noted on one site)
- **Priority:** LOW
- **Detail:** Client noted "this needs to be fucking fixed too — the renderings they haven't done." Page scrolling was also broken during the demo ("For some reason I can't fucking scroll this fucking page").

---

## I. SITES / HOSTING

### I1. Three e-commerce sites need to be fixed and launched
- **Type:** BROKEN — built but not launch-ready
- **Region:** .ca (Canada), .co.uk (UK), .com (US)
- **Priority:** CRITICAL
- **Detail:** All three are WooCommerce sites, cloned from the original Canadian build. All identical in structure, differing only in currency, payment methods, and some regional rules. None are live yet. All hosted on SiteGround (client's account). Each has separate hosting/backend.

### I2. Current temporary WooCommerce site needs to stay up until transition
- **Type:** MISSING — maintenance needed
- **Region:** Canada
- **Priority:** HIGH
- **Detail:** The current live site (basic WooCommerce, no custom features) is being used for Canadian operations. It must stay up and functional until the new .ca platform is ready. After transition, it gets deleted.

### I3. Dummy site: PucksCanada.com — just keep it up
- **Type:** MISSING — hosting/maintenance only
- **Region:** Canada
- **Priority:** LOW
- **Detail:** Dummy site for legitimacy/banking/corporation purposes. Just needs to stay online. No functionality needed.

### I4. Dummy site: Upcoming product landing page — just keep it up
- **Type:** MISSING — hosting/maintenance only
- **Region:** N/A
- **Priority:** LOW
- **Detail:** AI-generated placeholder landing page for a product launching in 3-6 months. Just needs to stay up. Domain was secured to not be empty.

### I5. Dummy site: Payment platform site — just keep it up
- **Type:** MISSING — hosting/maintenance only
- **Region:** N/A
- **Priority:** LOW
- **Detail:** Has a real logo, will eventually be a banking platform, but current content is placeholder/not real. Just needs to not be empty.

### I6. Website files need to be retrieved from original designers
- **Type:** MISSING — one-time task
- **Region:** One of the dummy sites (hosted via nameservers by original designers)
- **Priority:** LOW
- **Detail:** One site is currently hosted via nameservers pointing to the original designers' server. The actual files need to be obtained from them and re-uploaded to the Puxx hosting (SiteGround) so everything is under client control. The designers are no longer involved — everything was supposedly transferred to AJ, but the files may not have been actually moved.

### I7. Uptime monitoring — sites going down without anyone knowing
- **Type:** BROKEN — no monitoring in place
- **Region:** All sites
- **Priority:** HIGH
- **Detail:** Sites have gone down multiple times without the client knowing. One time the site was down for TWO DAYS before a customer emailed to report it. This happens roughly every couple of months, possibly related to server cache needing refresh or periodic updates. Client had asked previous team to set up proactive monitoring/refreshes but it was never done properly.
- **Client words:** "Three different times I've gone, and I don't know how many customers I lose. And I randomly get an email saying, hey, you know, why is your site down? That's how I find out... One time it was down for two days and I didn't know."

### I8. Servers are slow
- **Type:** BROKEN — performance issue
- **Region:** All three e-commerce sites
- **Priority:** MEDIUM
- **Detail:** Client noted during the demo that "the servers are super fucking slow." Pages take a long time to load. May be a SiteGround configuration issue or a code/plugin performance issue.

---

## J. OTHER

### J1. UK launch is blocked by payment processing
- **Type:** INFO — dependency
- **Region:** UK
- **Priority:** CRITICAL context
- **Detail:** The UK has not launched specifically because WorldPay integration doesn't work (see A2). Once WorldPay is fixed and the order flow works, UK launches. Client has bank transfer as a fallback option but says "we need credit cards" because "if credit cards aren't working, people are just going to be annoyed."

### J2. Client decision: "I don't care how it's built as long as it works"
- **Type:** INFO — constraint/freedom
- **Detail:** Client has explicitly stated multiple times that he does not care about the technical approach (custom vs. plugin, specific tech stack, etc.) as long as the end result functions correctly. Direct quote: "As long as the site works, I don't give a shit how you build it."

### J3. Hosting and all digital services to be taken over
- **Type:** REQUEST
- **Region:** All sites
- **Priority:** HIGH
- **Detail:** Client wants new team to host and maintain all sites, handle all digital/technical services. Full takeover from previous developer (AJ).

### J4. Login credentials situation
- **Type:** INFO — access blocker
- **Detail:** Client will provide US site login (identical to others). UK site login needs to be located. Alan already has CRM access and has been given website access. Freightcom access — new team can use their own account initially.

### J5. Previous developers' context
- **Type:** INFO — background
- **Detail:** Original developers (Sri Lankan team, possibly "Marley Powell") built the platform relatively quickly and cheaply. Client fired them for unauthorized spending (thousands of dollars). AJ was brought in September 1st, promised full tech management, social media, SEO, etc. AJ took 4 months to assess the existing build, then suggested switching from custom affiliate system to AffiliateWP in December. Six months later (April), sites still not launch-ready. Client is now moving away from AJ as well.
- **Client words on AJ:** "He convinced me to fire Marley Powell, which I should never have done. They built all this shit for me in not that long... and they did it fucking pretty cheap too."

---

## SUMMARY: CLIENT-STATED PRIORITY ORDER

Per the client's own summary at the end of the call:

1. **Fix the three e-commerce sites** — order flow, payments, affiliate/referral, custom pricing, user roles, fulfilment workflow all working
2. **Integrate gift card payment** on Canadian site (credit card workaround)
3. **Integrate WorldPay** on UK site (direct credit card)
4. **Hosting + maintenance** for all sites, including uptime monitoring
5. **Basic CRM** — customer data, communication history, mobile-friendly
6. **Automate shipping/fulfilment** — eliminate manual process
7. **Inventory management** — low-stock alerts or automatic reordering

**Client's sequencing logic:** "Get everything working, THEN we worry about automation." Fix sites first > launch UK > then focus on CRM and automation.

---

## KEY CONSTRAINTS & WARNINGS

| Constraint | Detail |
|---|---|
| Freightcom must not know product type | They think it's a different company shipping non-nicotine products. Any integration must use an intermediary. |
| Stripe is not an option | Nicotine products are banned. Previous PHP redirect workaround was shut down. |
| UK is fully licensed/compliant | No workarounds needed for UK payments or shipping. Direct integrations are fine. |
| Canada/US need payment workarounds | Gift card system is the approved approach for credit card processing. |
| Sites are on SiteGround (client account) | All hosting is on client's SiteGround account. |
| Current CRM is white-label GoHighLevel | May need data export/migration. |
| Client prefers phone over laptop | CRM and any admin tools must be mobile-friendly. |
| Three identical WooCommerce sites | Cloned from same base, differ only in currency, payment methods, and regional rules. |
| Client has no technical knowledge | Wants simple dashboards, not full WP/Woo admin panels. All terminology must be clear. |
