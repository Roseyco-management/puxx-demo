'use client';

/**
 * LocalBusiness Schema Component
 *
 * Implements LocalBusiness structured data (JSON-LD) for the homepage according to the SEO Plan
 * (lines 372-407).
 *
 * This component provides search engines with local business information, including
 * operating hours, location, and contact details for better local SEO.
 */
export function LocalBusinessSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://puxx.ie';

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    '@id': 'https://puxx.ie',
    name: 'PUXX Ireland',
    description: 'Premium tobacco-free nicotine pouches in Ireland',
    url: 'https://puxx.ie',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dublin',
      addressRegion: 'Dublin',
      addressCountry: 'IE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '53.3498',
      longitude: '-6.2603',
    },
    image: [`${baseUrl}/images/logo/PUXX-LOGO-LONG-WHITE.png`],
    priceRange: '€€',
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
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(localBusinessSchema),
      }}
    />
  );
}
