'use client';

import Script from 'next/script';

/**
 * Google Analytics 4 Component
 *
 * This component loads the GA4 tracking script and initializes Google Analytics.
 * It should be included in the root layout to track all pages.
 *
 * Environment Variables Required:
 * - NEXT_PUBLIC_GA_MEASUREMENT_ID: Your GA4 Measurement ID (format: G-XXXXXXXXXX)
 *
 * @see https://developers.google.com/analytics/devguides/collection/ga4
 */
export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  // Don't render anything if measurement ID is not set
  if (!measurementId) {
    console.warn('Google Analytics Measurement ID is not set. Set NEXT_PUBLIC_GA_MEASUREMENT_ID in your .env file.');
    return null;
  }

  return (
    <>
      {/* Load GA4 script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />

      {/* Initialize GA4 */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
            send_page_view: true
          });
        `}
      </Script>
    </>
  );
}
