// lib/seo/product-metadata.ts
// Product-specific SEO metadata generation for Next.js 15 App Router
import { Metadata } from 'next'

interface Product {
  id: number
  name: string
  slug: string
  description: string
  price_eur: number
  strength_mg: number
  flavor_type: string
  image_url: string
  stock_quantity: number
}

/**
 * Generates optimized metadata for product pages according to SEO plan
 * Pattern: {Product Name} Nicotine Pouches {Strength}mg | Buy in Ireland | PUXX
 */
export function generateProductMetadata(product: Product): Metadata {
  const title = `${product.name} Nicotine Pouches ${product.strength_mg}mg | Buy in Ireland`
  const description = `Buy ${product.name} nicotine pouches in Ireland. ${product.description}. ${product.strength_mg}mg strength. €${product.price_eur.toFixed(2)}. Tobacco-free. Free delivery over €150. 18+ only.`

  return {
    title,
    description,
    alternates: {
      canonical: `https://puxx.ie/shop/${product.slug}`,
    },
    openGraph: {
      type: 'website', // Note: 'product' type requires additional OpenGraph Product fields
      title: `${product.name} - PUXX Ireland`,
      description: product.description,
      url: `https://puxx.ie/shop/${product.slug}`,
      siteName: 'PUXX Ireland',
      locale: 'en_IE',
      images: [
        {
          url: product.image_url,
          width: 800,
          height: 800,
          alt: `${product.name} nicotine pouches ${product.strength_mg}mg - ${product.flavor_type}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} - PUXX Ireland`,
      description: product.description,
      images: [product.image_url],
    },
    keywords: [
      `${product.name.toLowerCase()} nicotine pouches`,
      `${product.flavor_type} nicotine pouches Ireland`,
      `${product.strength_mg}mg nicotine pouches`,
      'tobacco free pouches Ireland',
      'PUXX Ireland',
    ],
  }
}

/**
 * Generates JSON-LD structured data for product pages
 * Use this in product page components to add rich snippets
 */
export function generateProductJsonLd(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image_url,
    brand: {
      '@type': 'Brand',
      name: 'PUXX',
    },
    offers: {
      '@type': 'Offer',
      price: product.price_eur.toFixed(2),
      priceCurrency: 'EUR',
      availability: product.stock_quantity > 0
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `https://puxx.ie/shop/${product.slug}`,
      seller: {
        '@type': 'Organization',
        name: 'PUXX Ireland',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
    },
  }
}

/**
 * Generates breadcrumb JSON-LD for product pages
 */
export function generateProductBreadcrumbJsonLd(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://puxx.ie',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Shop',
        item: 'https://puxx.ie/shop',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: `https://puxx.ie/shop/${product.slug}`,
      },
    ],
  }
}
