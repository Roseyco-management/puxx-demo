// lib/seo/metadata.ts
// Next.js 15 App Router Metadata configuration based on SEO Plan
import { Metadata } from 'next'

export const baseMetadata: Metadata = {
  metadataBase: new URL('https://puxx.ie'),
  title: {
    template: '%s | PUXX Ireland - World\'s Best Nicotine Pouches',
    default: 'PUXX Ireland - Premium Tobacco-Free Nicotine Pouches',
  },
  description: 'Buy premium tobacco-free nicotine pouches in Ireland. 14 flavors, 6mg-22mg strength options. Free delivery over €150. 18+ only. Shop PUXX - the world\'s best pouches.',
  applicationName: 'PUXX Ireland',
  keywords: ['nicotine pouches Ireland', 'tobacco free pouches', 'nicotine pouches buy Ireland', 'best nicotine pouches', 'PUXX Ireland'],
  authors: [{ name: 'PUXX Ireland' }],
  creator: 'PUXX Ireland',
  publisher: 'PUXX Ireland',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
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
    card: 'summary_large_image',
    site: '@puxxireland',
    creator: '@puxxireland',
    title: 'PUXX Ireland - Premium Tobacco-Free Nicotine Pouches',
    description: 'Buy premium tobacco-free nicotine pouches in Ireland. 14 flavors, 6mg-22mg strength options. Free delivery over €150.',
    images: ['https://puxx.ie/og-image.jpg'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'PUXX Ireland',
  },
  alternates: {
    canonical: 'https://puxx.ie',
  },
}
