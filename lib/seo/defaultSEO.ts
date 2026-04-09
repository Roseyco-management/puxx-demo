// lib/seo/defaultSEO.ts
// NOTE: This is a reference configuration from the SEO Plan (lines 106-164)
// The actual implementation uses Next.js 15 Metadata API in metadata.ts
// This file is kept for reference and compatibility with next-seo if needed

interface DefaultSEOConfig {
  titleTemplate: string
  defaultTitle: string
  description: string
  canonical: string
  openGraph: {
    type: string
    locale: string
    url: string
    siteName: string
    title: string
    description: string
    images: Array<{
      url: string
      width: number
      height: number
      alt: string
    }>
  }
  twitter: {
    handle: string
    site: string
    cardType: string
  }
  additionalMetaTags: Array<{
    name: string
    content: string
  }>
  additionalLinkTags: Array<{
    rel: string
    href: string
    sizes?: string
  }>
}

export const defaultSEO: DefaultSEOConfig = {
  titleTemplate: '%s | PUXX Ireland - World\'s Best Nicotine Pouches',
  defaultTitle: 'PUXX Ireland - Premium Tobacco-Free Nicotine Pouches',
  description: 'Buy premium tobacco-free nicotine pouches in Ireland. 14 flavors, 6mg-22mg strength options. Free delivery over €150. 18+ only. Shop PUXX - the world\'s best pouches.',
  canonical: 'https://puxx.ie',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://puxx.ie',
    siteName: 'PUXX Ireland',
    title: 'PUXX Ireland - Premium Tobacco-Free Nicotine Pouches',
    description: 'Buy premium tobacco-free nicotine pouches in Ireland. 14 flavors, 6mg-22mg strength options. Free delivery over €150.',
    images: [
      {
        url: 'https://puxx.ie/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PUXX Ireland - World\'s Best Nicotine Pouches',
      },
    ],
  },
  twitter: {
    handle: '@puxxireland',
    site: '@puxxireland',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'nicotine pouches Ireland, tobacco free pouches, nicotine pouches buy Ireland, best nicotine pouches, PUXX Ireland',
    },
    {
      name: 'author',
      content: 'PUXX Ireland',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180'
    },
    {
      rel: 'manifest',
      href: '/manifest.json'
    },
  ],
}
