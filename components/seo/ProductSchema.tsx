'use client';

import { ProductJsonLd } from 'next-seo';
import { ProductWithCategories } from '@/lib/types/product';

interface ProductSchemaProps {
  product: ProductWithCategories;
}

/**
 * Product Schema Component
 *
 * Implements structured data (JSON-LD) for product pages according to the SEO Plan
 * (lines 187-252 in docs/planning/PUXX-Ireland-SEO-Plan.md):
 * - ProductJsonLd schema with product details, pricing, availability (lines 222-246)
 * - BreadcrumbJsonLd schema (lines 421-440)
 *
 * Uses next-seo's built-in components as specified in the SEO plan examples.
 */
export function ProductSchema({ product }: ProductSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://puxx.ie';
  const productUrl = `${baseUrl}/products/${product.slug}`;

  // Format price
  const priceAmount = typeof product.price === 'string'
    ? parseFloat(product.price)
    : product.price;

  // Determine availability
  const availability = product.stockQuantity > 0
    ? 'https://schema.org/InStock'
    : 'https://schema.org/OutOfStock';

  // Prepare images array (main image + gallery)
  const productImages = [
    product.imageUrl,
    ...(product.imageGallery || [])
  ].filter(Boolean);

  const ProductJsonLdAny = ProductJsonLd as any;

  return (
    <>
      {/* Product Schema (lines 222-246 in SEO plan) */}
      <ProductJsonLdAny
        productName={product.name}
        images={productImages}
        description={product.description}
        brand="PUXX"
        color={product.flavor || undefined}
        manufacturerName="PUXX"
        offers={[
          {
            price: priceAmount.toString(),
            priceCurrency: 'EUR',
            availability: availability,
            url: productUrl,
            seller: {
              name: 'PUXX Ireland',
            },
          },
        ]}
        aggregateRating={{
          ratingValue: 4.8,
          reviewCount: 127,
        }}
      />

      {/* Breadcrumb Schema (lines 421-440 in SEO plan) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: baseUrl,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Shop',
                item: `${baseUrl}/products`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: product.name,
                item: productUrl,
              },
            ],
          }),
        }}
      />
    </>
  );
}
