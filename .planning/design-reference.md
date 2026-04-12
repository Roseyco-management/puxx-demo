# Design Reference: puxxcanada.ca

Scraped 2026-04-12 from the live WordPress site. This is the visual target for v0.2.

## Color Palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Primary background | Black | #000000 | Hero sections, header, footer, age gate modal |
| Secondary background | White | #FFFFFF | Shop page, product detail content area |
| Accent 1 | Gold/Amber | #CCA20C / #f6bb06 | "Minimum Order" banner bar, CTA highlights, icon accents |
| Accent 2 | Orange | #ff6900 | Secondary highlights, hover states |
| Text primary | White | #FFFFFF | On dark backgrounds |
| Text primary | Dark | #1A2C37 | On white backgrounds |
| Text secondary | Gray | #808A90 | Subtitles, descriptions |
| Footer text | Light gray | #D1D5D7 | Footer links and descriptions |
| Teal/Cyan | Teal | ~#00C9B7 | "Taste the PUXX Difference" section gradient accent |

**Key insight:** The site uses a **dark theme** (black backgrounds with white text) for hero/header/footer, and **white backgrounds** for product listing and detail pages. This is the OPPOSITE of our current demo which is all light green.

## Typography

- Logo: Custom "PUXX" wordmark with "WORLD'S BEST POUCHES" tagline
- Headings: Bold, uppercase, wide letter-spacing (e.g., "SHOP", "FREQUENTLY ASKED QUESTIONS")
- Body: Clean sans-serif
- Product names: Title case with brand prefix (e.g., "PUXX Cherry", "PUXX Blueberry")

## Navigation

- Header: Simple horizontal nav — Home | Shop | My account | Contact | Cart icon
- Gold/amber banner bar below header: "Minimum Order Quantity 5 | Free Delivery for Orders above CAD 150"
- Red warning banner at very top: "WARNING: This product contains nicotine..."
- Footer: 4-column layout — Brand description | Pages | Sales (Affiliate Login/Register) | Connect

## WordPress Source Data (puxxpouches.com WXR export)

**Export file:** `/Users/arnispiekus/Downloads/puxxpouches.WordPress.2026-04-09.xml`
**Backup file:** `/Users/arnispiekus/Downloads/puxxpouches-com-20260409-005028-iu1yeyq8wgsq.wpress`
**Site:** puxxpouches.com (WordPress 6.9.4, WooCommerce)

## Product Structure (CRITICAL for v0.2)

**12 flavour products** (from WooCommerce export, puxxpouches.com):
1. PUXX Apple Mint
2. PUXX Cherry
3. PUXX Citrus
4. PUXX Cola
5. PUXX Cool Mint
6. PUXX Grape
7. PUXX Peach
8. PUXX Peppermint
9. PUXX Spearmint
10. PUXX Strawberry
11. PUXX Watermelon
12. PUXX Wintergreen

(puxxcanada.ca shows 14 — likely Blueberry and Raspberry added later)

**Each product = 1 flavour** with a strength variant selector:
- Strengths available: 3mg, 6mg, 9mg, 12mg, 16mg, 22mg (6 options per flavour, 72 variations total)
- puxxcanada.ca shows 4 options (6, 9, 12, 16mg) — some strengths may be hidden per region
- Price: $6 per variation (from WP export), CAD$15 on puxxcanada.ca — regional pricing differs
- Category: "Nicotine Pouches"
- Brand: "PUXX"

**Product detail page layout:**
- Left: Large product image (can of pouches with flavour-specific design)
- Right: Product name, price, strength dropdown, quantity selector, add to cart
- Below: Additional Information tab (shows strength options), Reviews tab
- Below that: Related Products grid (4 products)

**This means our data model needs to change from:**
- 72 rows (12 flavours x 6 strengths as separate products)

**To:**
- ~14 rows (1 per flavour), each with a `strengths` array or variant table
- Strengths: 6mg, 9mg, 12mg, 16mg (4 options, not 6)
- Price: single price per product, not per variant

## Product Images

Each flavour has a distinct can design:
- Black can with flavour-specific colored accents and imagery
- Large product images showing the can from front and angled views
- The product images on puxxcanada.ca are high-quality renders/photos

**Product image URLs from WooCommerce export** (download these for v0.2):
- Apple Mint: https://puxxpouches.com/wp-content/uploads/2025/03/Medium-Puxx-Applemint-6mg.jpg + https://puxxpouches.com/wp-content/uploads/2025/03/UK-Apple-Mint-16mg.jpg
- Cherry: https://puxxpouches.com/wp-content/uploads/2025/03/UK-Chery-16mg.jpg
- Citrus: https://puxxpouches.com/wp-content/uploads/2025/08/UK-Citrus-16mg.jpg
- Cola: https://puxxpouches.com/wp-content/uploads/2025/03/UK-Cola-16mg.jpg
- Cool Mint: https://puxxpouches.com/wp-content/uploads/2025/03/UK-Cool-Mint-16mg.jpg
- Grape: https://puxxpouches.com/wp-content/uploads/2025/08/UK-Grape-16mg.jpg
- Peppermint: https://puxxpouches.com/wp-content/uploads/2025/03/UK-Peppermint-16mg.jpg
- Spearmint: https://puxxpouches.com/wp-content/uploads/2025/03/UK-Apple-Mint-16mg-1.jpg
- Strawberry: https://puxxpouches.com/wp-content/uploads/2025/08/UK-Strawberry-16mg.jpg
- Watermelon: https://puxxpouches.com/wp-content/uploads/2025/03/UK-PUXX-Watermelon-16mg.jpg
- Wintergreen: https://puxxpouches.com/wp-content/uploads/2025/08/UK-Wintergreen-16mg.jpg
- Peach: (no direct attachment found in export — source from puxxcanada.ca)

**Note:** Spearmint image URL is "UK-Apple-Mint-16mg-1.jpg" — likely a duplicate/mislabel in WP. May need the correct Spearmint image.

## Page Structure

| Page | Path | Notes |
|------|------|-------|
| Home | / | Age gate modal, hero with product imagery, "Taste the Difference" section, FAQ, footer |
| Shop | /shop/ | Grid of flavour products, 12 per page, pagination |
| Product Detail | /product/{slug}/ (redirects to /shop/{slug}/) | Image gallery, strength selector, add to cart, related products |
| My Account | /my-account/ | Customer login/account |
| Contact | /contact/ | Contact form |
| Terms | /terms-conditions/ | Legal |
| Affiliate Login | (linked from footer) | |
| Affiliate Register | (linked from footer) | |

## Age Verification

- Modal overlay on first visit
- "Are you over 19 years of age?" (19 for Canada)
- Yes / No buttons
- "Remember me" checkbox
- Dark overlay with PUXX branding

## Key Design Differences vs Our Current Demo

| Aspect | puxxcanada.ca | Our demo | Action needed |
|--------|---------------|----------|---------------|
| Color scheme | Black/dark theme with gold accents | Green/white, too much emerald green | Adopt dark theme + gold accents |
| Product model | 14 flavours, strength as variant dropdown | 72 separate product cards | Restructure to flavour-based with variant picker |
| Product images | High-quality can renders per flavour | Missing/broken | Source or download product images |
| Header | Clean, minimal, dark background | Region-specific with selector | Keep region selector but adopt dark styling |
| Price | CAD$15.00 flat per product | Variable | Align with regional pricing config |
| Strength options | 6 options (3, 6, 9, 12, 16, 22mg) per WP export; CA site shows 4 | 6 options (4, 6, 8, 12, 16, 20mg) seeded | Align with WooCommerce source — 3/6/9/12/16/22mg |
| Shop layout | Clean grid, product name + price only | Cluttered with 72 cards | Match the clean grid with fewer cards |
| Footer | Dark, 4-column, brand + links | Simple | Match the dark footer layout |
| Warning banner | Red top bar | Missing | Add nicotine warning banner |
