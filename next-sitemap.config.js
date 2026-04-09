/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://puxxnicotine.ie',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
    '/admin/*',
    '/api/*',
    '/checkout/success',
    '/checkout/cancel',
    '/dashboard/*',
    '/sign-in',
    '/sign-up',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api', '/checkout/success', '/checkout/cancel', '/dashboard', '/sign-in', '/sign-up'],
      },
    ],
    additionalSitemaps: [
      'https://puxxnicotine.ie/sitemap.xml',
      'https://puxxnicotine.ie/products-sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    // Custom priority for different page types
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      }
    }

    if (path.startsWith('/shop/') || path.startsWith('/products/')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      }
    }

    if (path === '/shop' || path === '/products') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      }
    }

    // Local SEO landing pages - high priority for local search
    if (path.startsWith('/nicotine-pouches-')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.85,
        lastmod: new Date().toISOString(),
      }
    }

    // Default
    return {
      loc: path,
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }
  },
};
