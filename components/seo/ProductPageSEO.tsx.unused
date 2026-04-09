'use client';

import { NextSeo } from 'next-seo';
import { ProductWithCategories } from '@/lib/types/product';

interface ProductPageSEOProps {
  product: ProductWithCategories;
}

/**
 * Product Page SEO Component
 *
 * Implements NextSeo component with product-specific meta tags according to the SEO Plan
 * (lines 187-252 in docs/planning/PUXX-Ireland-SEO-Plan.md):
 * - Title pattern: "{Product Name} Nicotine Pouches {Strength}mg | Buy in Ireland | PUXX"
 * - Meta description with product details
 * - Open Graph product type
 * - Product pricing and availability
 *
 * Uses next-seo's NextSeo component as specified in the SEO plan examples.
 */
export function ProductPageSEO({ product }: ProductPageSEOProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://puxx.ie';
  const productUrl = `${baseUrl}/products/${product.slug}`;

  // Format price
  const priceAmount = typeof product.price === 'string'
    ? parseFloat(product.price)
    : product.price;

  // Determine availability
  const availability = product.stockQuantity > 0 ? 'in stock' : 'out of stock';

  // Prepare images array (main image + gallery)
  const productImages = [
    product.imageUrl,
    ...(product.imageGallery || [])
  ].filter(Boolean);

  // Title pattern from SEO plan (lines 526-528)
  const title = product.metaTitle ||
    `${product.name} Nicotine Pouches ${product.nicotineStrength || ''} | Buy in Ireland | PUXX`;

  // Meta description pattern from SEO plan (lines 537-539)
  const description = product.metaDescription ||
    `Buy ${product.name} nicotine pouches in Ireland. ${product.flavor ? `${product.flavor} flavor. ` : ''}${product.nicotineStrength || ''}. €${priceAmount.toFixed(2)}. Tobacco-free. Free delivery over €150. 18+ only. Shop PUXX.`;

  return (
    <NextSeo
      title={title}
      description={description}
      canonical={productUrl}
      openGraph={{
        type: 'product',
        title: `${product.name} - PUXX Ireland`,
        description: product.description,
        url: productUrl,
        images: productImages.map((url) => ({
          url: url || '',
          width: 800,
          height: 800,
          alt: `${product.name} - ${product.flavor || 'nicotine pouches'}`,
        })),
        product: {
          price: {
            amount: priceAmount.toString(),
            currency: 'EUR',
          },
          availability: availability,
          condition: 'new',
        },
      }}
      twitter={{
        cardType: 'summary_large_image',
        title: `${product.name} - PUXX Ireland`,
        description: product.description,
      }}
    />
  );
}
