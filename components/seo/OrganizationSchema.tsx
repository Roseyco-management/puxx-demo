'use client';

/**
 * Organization Schema Component
 *
 * Implements Organization structured data (JSON-LD) for the homepage according to the SEO Plan
 * (lines 351-370).
 *
 * This component provides search engines with information about PUXX Ireland as an organization,
 * including contact details and social media profiles.
 */
export function OrganizationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://puxx.ie';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://puxx.ie',
    name: 'PUXX Ireland',
    url: 'https://puxx.ie',
    logo: `${baseUrl}/images/logo/PUXX-LOGO-LONG-WHITE.png`,
    sameAs: [
      'https://www.instagram.com/puxxireland',
      'https://www.facebook.com/puxxireland',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'info@puxxireland.ie',
        areaServed: 'IE',
        availableLanguage: ['English'],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationSchema),
      }}
    />
  );
}
