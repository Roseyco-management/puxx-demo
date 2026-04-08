# Puxx UK — Discovery Call Transcript
**Date:** 08 April 2026
**Video:** `PUXX-Meeting-08-04-2026.mp4` (see `/docs/meetings/` — gitignored)

---

You can start getting things across — emails, stuff like that. I'll explain the whole situation. The easiest way is for me to share my screen.

There are a bunch of sites which I believe are all hosted on SiteGround, which is my account, so that shouldn't be an issue. A few of them are just dummy sites — they don't need much done to them, they just need to stay up. They don't get huge traffic or anything.

One is for our upcoming product. We just have a landing page there — it's basically just an AI-generated placeholder. We'll be launching in the next three to six months; we just needed to secure the domain and not leave it empty. I'll put these domains in the chat so you can see them.

So that domain is hosted on, say, Patreon.com, but in terms of the actual website, it's probably not being produced there — it's hosted somewhere else by the people who designed it. What they'll do is change the name servers. We'll basically need to speak to the ones who produced the website, get the files off them, and re-upload them to our system so they can be hosted there.

Before, I had the name servers changed — or moved, rather. Basically, wherever you host a domain, you own it. Like GoDaddy — that's where you're hosting the domain. But where they produce the website, they allow you to still point to the actual domain via name servers. Technically, you don't have access to what they've produced yet because it's just connected through the name servers.

So the task is straightforward: we'll need to take the website files off the designers, but they're not connected to AJ anymore — I had everything transferred to AJ when I took it over, just like I would have it transferred to you guys. Obviously the original designers aren't going to keep doing anything. But everything was transferred over.

The next dummy site is PucksCanada.com. That's literally just a dummy site that needs to stay up — it's there for legitimacy purposes, for our banking and corporation setup. Best way I can put it.

The site we're currently using is a basic WordPress site. It was supposed to be temporary. I had a whole other platform built, which I'll explain in a second. I was told it was ready in August, but then I fired the old developers. I took whatever they had done, gave it to AJ, and said make sure it's ready to go live — testing, order flow, all of that.

I had a built-in affiliate system — we made our own. It's a bit involved because we have two tiers, separate commission structures for wholesale and retail, and each one goes up two tiers. It's a residual commission model, meaning once you're attached to a customer, it's for life. When somebody uses your code, that attachment is permanent.

My old developers told me that AffiliateWP doesn't offer all the options I need, which is why we went the custom build route. Since then, AJ took four months and came back to me in December saying AffiliateWP actually does offer everything I need and he could just integrate that instead. He had taken over the project on September 1st, keep in mind. I said fine — as long as the site works, I don't care how it's built.

So we had one platform built, and then I had the old developers clone it twice because it's an identical model — just different currencies. It's the same product, but you can't have one website serving multiple countries. How do you coordinate distribution, fulfilment, payments, and funding across regions? So we built it for Canada, then cloned a UK site and a US site. None of those three are live yet. They all have the same name, just different endings: .ca, .co.uk, .com. It's easy to tell them apart, and it's better for online presence if the names are consistent.

The sites need basic order flow management. A customer goes on, fills out their cart, goes to checkout, enters their information, and has the option to create an account or check out as a guest. If they create an account, they can check out and pay either by credit card — whichever options are available in that region, since we have different payment options per country — or by bank transfer.

If they pay by credit card, it processes and kicks back a confirmation that payment was received. That then automatically moves the order to the next stage, generates the processing notification, and kicks it to the fulfilment team. The fulfilment team receives it on their dashboard within their user role, fulfils the order, uploads the tracking number, and marks it as completed. Automated emails go to the customer at each stage.

On the back end, there are supposed to be user roles for wholesale customers, retail customers, and fulfilment. We didn't make a separate role for sales reps because my original developers said they can just use a wholesale account — the functionality is identical, they're just not buying. No point creating extra complexity.

Every account created on our platform is automatically issued a referral code. There'll be one for wholesale and one for retail, since they have different parameters and logic. They're randomly generated and automatically assigned upon account creation. When a sales rep goes to a store and signs them up, they give their code. When the customer signs up, they enter it. This allows us to have customised pricing per user account.

Right now, our temporary site doesn't have customised pricing — I've had to give out coupon codes, which isn't a real model and can't scale. That's why each account needs to be automatically assigned codes within their dashboard when they log in.

Let me show you this so you can see it. Okay, so from a retail perspective, this is just a basic dashboard — current orders, history, that kind of thing. You can see they're given both a retail referral code and a wholesale referral code, so it can be automatically attributed within the system. It's transparent and pretty standard. They can also request or view payouts from there.

As you can see, the servers are quite slow. But it works. All three sites are the same, so it's straightforward to manage. From the admin side, I can see all current orders and the user roles — retail customers, wholesalers, and distributors. Everyone is assigned those codes, and the order flow is supposed to work automatically.

The way the site is supposed to work: if payment is confirmed by credit card, it moves to processing and auto-assigns to the closest geographical fulfilment location based on the customer's address. Right now we only have one per country, so it's straightforward — it goes to them, sends them a notification that there's an order to fulfil, they add the tracking number and mark it completed. If it's a bank transfer order, it comes to me as admin for manual approval since payment has to be confirmed first.

Regarding Stripe — they don't accept my product. It's a nicotine product. I was using Stripe up until about three weeks ago via a PHP redirect through one of the dummy sites, which I had approved. But I got shut down recently. I could keep trying that approach, but it's part of the reason I'm moving on from the current developers.

I have another payment solution in place that a friend has put together. They've built what they call a plugin for payment processing, but it's been about three weeks and the current team still can't integrate it. At one point they got it working, but it wasn't communicating the paid status back correctly.

The way it works is through a third-party site that sells various products. We found a loophole in the terms — my friends figured it out. Essentially, this third-party site sells gift cards for my site. When a customer goes to pay by credit card on my site, it actually processes through this third-party site, which provides them a gift card, and that gift card redeems on my site. Gift cards aren't a restricted product, so the payment processor has no issue with it. It doesn't matter what the gift card is for.

There's custom tech built on the back end to connect the two systems and handle the communication. The issue was that it wasn't kicking back the confirmation status — they've since fixed that on their side, but my current team hasn't been able to integrate it on my side yet. I paid them to create a generic plugin for this, and it's still not integrated. There is a dev team on their side that you would have communication with.

So the full credit card order flow should be: customer pays by credit card, the third-party site confirms payment, the site automatically changes the order to processing, assigns it to the fulfilment team, and sends them a notification. They see it on their dashboard, ship it out, add the tracking info, and mark it completed. The site then automatically emails the tracking information to the customer. It's all pretty standard — there are just a lot of moving pieces that need to be connected.

The current temporary site is a basic WooCommerce site. The new platform is also built on WooCommerce but with custom features added. The issue with the current site is that I can't have custom pricing per account — everyone sees the same price, and I have to give out specific discount vouchers, which people sometimes abuse. The new platform is supposed to fix that.

I had a custom dashboard built because I find the standard WooCommerce backend confusing — too many options. I just need basic sales analytics, orders, and payments in a clean, CRM-style dashboard. Something that shows me pending, overdue, and completed orders organised by date. That's why you see it laid out the way it is — simple and user-friendly, both for me as admin and for the team.

There's also an internal stock management system built in. Every time somebody buys, it subtracts from inventory. When an order is assigned to a distributor, it checks internally that the distributor has sufficient stock before sending it to them — you're not going to assign an order to someone who can't fulfil it. When there are multiple distributors in a region, it kicks the order to the nearest one based on postal codes and stock availability. Canada is a big country — if someone orders in BC, we don't want to ship from Toronto. The US will be even more important for this since it's massive.

Now, a few things that are built but not fully working. For example, I can see order numbers in the dashboard but couldn't previously click on them to view the order details — not very useful. I believe that's been fixed, but I'm not sure. There are a number of things like this that are built but incomplete.

The reason I fired the original developers is because they spent money they weren't supposed to have access to. It wasn't a small amount — it was thousands of dollars. We had agreed on a price, and if there was something additional needed, they should have come to me. They didn't. That's a breach of trust. I happened to meet AJ around that time — he was introduced to me by someone in my network, someone I trusted. AJ supposedly had a large company and promised to handle tech management, social media, SEO, website work — everything. He claimed to have built apps for major companies. So I thought I could hand it all off and focus on scaling the business. That clearly didn't work out.

The referral code system also had issues. Originally it was one unified code, which doesn't work — retail and wholesale need separate codes because they have different rules and commission structures. The rules also need to be adjustable, not static. You might make a deal with an influencer or a company that gets a specific commission rate — that has to be changeable. It can't be one fixed number forever.

There are also language inconsistencies throughout the platform. The original developers were from Sri Lanka and used different terminology in different sections — for example, the same thing is called "distributor commission" in one place and something else in another. The language needs to be standardised throughout.

Custom pricing needs to be enabled on all wholesale accounts. Ideally, there should be a clean admin portal — not the standard WooCommerce or WordPress admin — that just pulls in the information I need to see or change.

The two-tier commission system needs to work as follows: when someone uses a referral code, that customer is linked to that person permanently — residual commission for life. If that person then refers someone else, the commission splits between them and the person who referred them. We only go two tiers deep — if the next person refers someone, the original person doesn't get a cut. We can't go on forever. The codes need to be separate with different values, and the rules differ by country — in Canada it's 100 tins, in the UK it's 50 tins.

Regarding the other sites: PucksCanada.com just needs to stay up. The upcoming product landing page just needs to stay up. The payment platform site — the logo is real and it will eventually be a banking platform, but right now the content on it isn't live or real. It just needs to not be empty.

For the CRM — I'm currently using what I've been told is a white-label version of GoHighLevel. I don't use most of the functions yet. We haven't launched in the UK because the payment processing isn't sorted, and we haven't done any major advertising push. To start, I just need the basics: customer data storage, email and phone communication capabilities, and a record of all customer interactions. When someone fills out a contact form or sends an email, it should come through the CRM so there's a timeline for each customer's journey. I should be able to look up a customer and see their full history.

This will also be important for staff — they need to be able to use the CRM without having admin access to the website itself. My wife and my EA handle the marketing side — automations, videos, email campaigns, that kind of thing. I'll put you in touch with them for that. To start, just get the basics working and we'll add on from there. It also needs to work on mobile, since I use my phone for everything.

For shipping — in Canada and likely the US, I'm using Freightcom. In the UK, I'm using ShipStation, which does have an API integration. However, in Canada and the US, we can't integrate the shipping platform directly into the site because the shipper can't know what we're shipping. So right now I'm doing everything manually, which is unsustainable.

The current manual process is: I check orders, look up the customer name, copy it, go to Gmail, search for the order, reply to the email, come back, copy the tracking number, go back to Gmail, paste it into the email, type it up, and send it. For every single order. That can't continue, especially when we scale to multiple countries.

The goal is to automate this — ideally the site communicates with the shipping platform through a third-party intermediary so the shipper doesn't see what's being shipped. There should be a way to do this. Freightcom thinks this is a different company — it needs to stay that way since they won't support nicotine products.

I also want inventory management built into the CRM with automatic low-stock alerts. At minimum, when stock drops to a set threshold — say 20% — it gets added to a reorder list automatically. Ideally it would trigger an automatic reorder, which is standard practice in the UK retail sector. For the supply chain side of the business, this is actually one of the incentives we're offering stores — an inventory management system that makes it easier for them to reorder from us. Eventually we'll look at POS integration, but that's a separate phase.

In the UK, the shipping integration is cleaner since we're fully licensed and compliant there — ShipStation can be integrated directly and will automatically upload tracking numbers once a label is created. That removes the manual step entirely.

Regarding WorldPay for the UK site — I have it set up but it's timing out after 60 seconds without confirming the transaction. WorldPay says it's a routing or server issue on my team's side. My team says it's WorldPay. I believe WorldPay since they're a large company with thousands of integrations — it doesn't make sense for it not to work on a standard UK WooCommerce site in GBP. I'd put you in touch with the WorldPay tech team and you'd just implement it correctly. It should be straightforward.

So to summarise the priorities:

1. Fix the three e-commerce sites (Canada, UK, US) so they're ready to launch — order flow, payment integration, affiliate/referral system, custom pricing per account, user roles, and fulfilment workflow all working correctly.
2. Integrate the gift card payment workaround on the Canadian site.
3. Integrate WorldPay on the UK site.
4. Set up hosting and maintenance for all sites — including uptime monitoring so I'm not finding out from customers that the site's been down for two days.
5. Build out or migrate to a basic CRM with customer data, communication history, and mobile usability.
6. Automate the shipping/fulfilment workflow so it's not being done manually.
7. Inventory management with low-stock alerts or automatic reordering.

Once the sites are working, we launch the UK. After that, we focus on automation. I'll get you the login details for the US site — it's identical to the others, I just need to find my login for the UK one. Alan already has access to the CRM and the website. Let me know if there's anything you need from me to get started.
