// lib/seo/schema.ts
// Schema.org JSON-LD structured data for PUXX Ireland

/**
 * Organization schema for homepage
 * Provides structured data about PUXX Ireland as a business
 */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://puxx.ie',
  name: 'PUXX Ireland',
  url: 'https://puxx.ie',
  logo: 'https://puxx.ie/images/logo/PUXX-LOGO-LONG-WHITE.png',
  sameAs: [
    'https://www.instagram.com/puxxireland',
    'https://www.facebook.com/puxxireland',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'info@puxx.ie',
      areaServed: 'IE',
      availableLanguage: ['English'],
    },
  ],
}

/**
 * Local Business schema for homepage
 * Helps with local SEO in Ireland
 */
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  '@id': 'https://puxx.ie',
  name: 'PUXX Ireland',
  description: 'Premium tobacco-free nicotine pouches in Ireland',
  url: 'https://puxx.ie',
  image: 'https://puxx.ie/og-image.jpg',
  priceRange: '€€',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IE',
    addressLocality: 'Ireland',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
  ],
}

/**
 * Website schema with site navigation
 */
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'PUXX Ireland',
  url: 'https://puxx.ie',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://puxx.ie/shop?search={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

/**
 * FAQ Schema for homepage
 * Helps capture featured snippets in Google
 */
export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are nicotine pouches?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nicotine pouches are small, tobacco-free pouches that contain nicotine and flavoring. They are placed between the lip and gum to deliver nicotine without smoke, vapor, or tobacco.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are nicotine pouches legal in Ireland?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, nicotine pouches are legal in Ireland for adults 18 years and older. PUXX Ireland delivers premium tobacco-free nicotine pouches across Ireland.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I use nicotine pouches?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Place one pouch between your upper lip and gum. Leave it there for 20-60 minutes. You may feel a tingling sensation which is normal. Dispose of the used pouch responsibly.',
      },
    },
    {
      '@type': 'Question',
      name: 'What strengths are available?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PUXX Ireland offers nicotine pouches in 6mg, 16mg, and 22mg strengths to suit different preferences and nicotine tolerance levels.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer free delivery?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, PUXX Ireland offers free delivery on orders over €150. Standard delivery is available for orders under this amount.',
      },
    },
  ],
}
