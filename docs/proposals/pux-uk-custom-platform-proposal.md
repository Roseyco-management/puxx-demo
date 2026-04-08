# Software Development Proposal

**Client:** PUX UK
**Prepared by:** Elevateo Holdings
**Date:** 16 March 2026
**Version:** 1.0

---

## Executive Summary

PUX UK is a nicotine pouch brand that manufactures and distributes to a growing network of convenience stores across the UK and beyond. As the business scales, the current workflow — manual order processing, copy-pasting between platforms, and individual emails — cannot keep up with demand.

We propose building a custom business platform that consolidates PUX's operations into one system: from the moment a retailer places an order, through fulfillment and shipping, to proactive re-engagement when it's time to reorder. Every feature below is priced independently so you can choose exactly what you need now, and add more later.

---

## Current Workflow & Pain Points

| Step | Current Process | Problem |
|------|----------------|---------|
| 1 | Order comes in via WooCommerce | No centralised order management |
| 2 | Manually copy order details | Time-consuming, error-prone |
| 3 | Paste into Freightcom for shipping | Repetitive manual data entry |
| 4 | Go to Gmail, send confirmation email | No automation, easy to forget |
| 5 | Retailer reorders via WhatsApp/email | No tracking, no reminders, orders slip through |
| 6 | Stock levels tracked manually | No visibility on when to manufacture more |

---

## Proposed Solution

A custom-built, multi-tenant business platform with the following modules. Each module is priced individually — choose what you need now, add the rest later.

---

## Feature Modules & Pricing

### Module 1 — Order Automation (WooCommerce + Freightcom + Email)
> *The quick win. Automates your most painful daily workflow.*

- Automatic sync of new WooCommerce orders into the platform
- Auto-submission of order & shipping details to Freightcom via their API
- Automated confirmation emails to customers upon order placement and dispatch
- Order status tracking in one dashboard

**One-time build:** £500

---

### Module 2 — CRM & Contact Management
> *Your entire network — retailers, team, sales reps — in one place.*

- Retailer account management (store details, contacts, locations, notes)
- Multi-tenancy: separate access for PUX employees, external sales team, and retailers
- Sales pipeline for onboarding new retail partners
- Activity logging (calls, emails, meetings, notes per account)
- Role-based permissions (admin, sales rep, retailer, viewer)

**One-time build:** £4,000

---

### Module 3 — Retailer Portal (B2B Ordering)
> *A branded portal where your stores place orders in seconds.*

- Branded PUX login portal for retail partners
- Product catalogue with images, descriptions, pricing (wholesale tiers)
- Simple ordering flow — browse, add to cart, confirm
- One-click reorder from previous orders
- Order history with status tracking
- Multi-location support (one owner manages all their stores under one login)
- Mobile-responsive design

**One-time build:** £6,500

---

### Module 4 — Smart Reorder Automation
> *The killer feature. Proactively drives repeat orders without you lifting a finger.*

- Tracks each retailer's ordering frequency and patterns
- Predicts when a retailer is due to reorder based on their history
- Automated outreach when a reorder is likely due:
  - *"Hi [Name], it's been 4 weeks since your last PUX order — ready for a restock? Tap here to reorder."*
  - Delivered via WhatsApp and/or email
  - Includes one-click reorder link
- Follow-up automation if no response (configurable: 2 days, 5 days, etc.)
- Dashboard showing which retailers are overdue, on track, or recently ordered
- Improves over time as more order data is collected

**One-time build:** £4,500

---

### Module 5 — Inventory Management (PUX Warehouse)
> *Always know what you have, what's moving, and what's running low.*

- Real-time stock levels for all PUX products
- Automatic stock deduction when orders are placed
- Low stock alerts (configurable thresholds per product)
- Demand forecasting based on retailer order trends
- Restock suggestions: "Based on current demand, you'll run out of [product] in ~2 weeks"
- Stock history and movement logs

**One-time build:** £4,000

---

### Module 6 — Invoicing & Payments
> *Professional invoices and payment tracking, built in.*

- Automatic invoice generation on order confirmation
- PDF invoices (branded with PUX logo and details)
- Invoice history per retailer
- Payment status tracking (paid, pending, overdue)
- Payment details / bank info displayed on retailer portal
- Overdue payment reminders (automated email/WhatsApp)
- Exportable for accounting (CSV/PDF)
- *Future upgrade: in-portal card payments via Stripe or similar*

**One-time build:** £3,500

---

### Module 7 — Shipping & Fulfillment Dashboard
> *Beyond basic automation — full visibility on every shipment.*

- Freightcom integration for rate comparison and label generation
- Shipment tracking dashboard (all active deliveries in one view)
- Automated tracking updates to retailers (dispatch, in transit, delivered)
- Delivery confirmation logging
- Shipping cost reporting per order / per retailer

**One-time build:** £3,000

---

### Module 8 — Communication Hub
> *All retailer conversations in one place.*

- WhatsApp Business API integration (send and receive)
- Email integration (send and receive)
- Conversation history tied to retailer accounts in CRM
- Template messages for common scenarios (order confirmation, reorder prompt, payment reminder)
- Bulk messaging for announcements (new products, promotions, price changes)

**One-time build:** £3,500

---

### Module 9 — Reporting & Analytics
> *Data-driven decisions on sales, stock, and retailer performance.*

- Sales reports (by product, by retailer, by region, by time period)
- Top retailers and underperformers
- Inventory turnover and demand trends
- Revenue tracking and growth metrics
- Order volume and frequency analysis
- Exportable reports (CSV/PDF)
- Visual dashboards with charts and KPIs

**One-time build:** £3,000

---

## Pricing Summary

| # | Module | Price |
|---|--------|-------|
| 1 | Order Automation (WooCommerce + Freightcom + Email) | £500 |
| 2 | CRM & Contact Management | £4,000 |
| 3 | Retailer Portal (B2B Ordering) | £6,500 |
| 4 | Smart Reorder Automation | £4,500 |
| 5 | Inventory Management | £4,000 |
| 6 | Invoicing & Payments | £3,500 |
| 7 | Shipping & Fulfillment Dashboard | £3,000 |
| 8 | Communication Hub | £3,500 |
| 9 | Reporting & Analytics | £3,000 |
| | | |
| | **All Modules** | **£32,500** |
| | **Full Platform Discount (all 9)** | **£28,000** |

### Monthly Retainer
| Service | Monthly |
|---------|---------|
| Hosting, maintenance, support & updates | £1,000/month |

---

## Recommended Build Order

We recommend building in waves so PUX sees value immediately:

**Wave 1 — Immediate Impact (Weeks 1-3)**
- Module 1: Order Automation *(already quoted, quick win)*
- Module 2: CRM & Contact Management

**Wave 2 — Retailer Growth Engine (Weeks 4-8)**
- Module 3: Retailer Portal
- Module 4: Smart Reorder Automation
- Module 6: Invoicing & Payments

**Wave 3 — Full Operations (Weeks 9-12)**
- Module 5: Inventory Management
- Module 7: Shipping & Fulfillment Dashboard
- Module 8: Communication Hub
- Module 9: Reporting & Analytics

---

## What's Included

- Custom-built software, designed and branded for PUX
- Multi-tenant architecture (PUX team, sales reps, and retailers)
- Built for scale — handles 10 stores or 10,000
- Mobile-responsive across all modules
- WooCommerce and Freightcom API integrations
- WhatsApp Business API and email integration
- Secure hosting and SSL
- Training and onboarding support

## What's Not Included (Future Add-Ons)

- POS system integrations (can be scoped separately if needed)
- Self-serve kiosks
- Physical payment terminals
- In-portal card payment processing (Stripe etc. — can be added to Module 6)
- Native mobile app (iOS/Android — current build is mobile-responsive web)
- Banking & licensing management for retailers

---

## Next Steps

1. Review this proposal and select the modules you'd like to proceed with
2. We'll confirm scope, timeline, and payment schedule
3. Kick off development

---

*Prepared by Elevateo Holdings — Software, Automation & Growth Solutions*
