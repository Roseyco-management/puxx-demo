/**
 * PUXX Ireland Image Constants
 *
 * Centralized image path management for type-safe image references.
 * All images are optimized WebP format with responsive sizes.
 *
 * Usage:
 *   import { IMAGES } from '@/lib/constants/images';
 *
 *   <Image src={IMAGES.logo.white} alt="PUXX Logo" />
 *   <LogoImage variant="white" size="md" />
 */

// ============================================================================
// Logo Images
// ============================================================================

export const LOGO_IMAGES = {
  // Primary white logo (for dark backgrounds)
  white: {
    original: '/images/logo/puxx-white.webp',
    small: '/images/logo/puxx-white-sm.webp',
    medium: '/images/logo/puxx-white-md.webp',
    large: '/images/logo/puxx-white-lg.webp',
  },

  // Black logo (for light backgrounds)
  black: {
    original: '/images/logo/puxx-black.webp',
    small: '/images/logo/puxx-black-sm.webp',
    medium: '/images/logo/puxx-black-md.webp',
    large: '/images/logo/puxx-black-lg.webp',
  },

  // Favicon (multiple sizes for different devices)
  favicon: {
    small: '/images/logo/favicon-16x16.png',
    medium: '/images/logo/favicon-32x32.png',
    apple: '/images/logo/favicon-180x180.png',
    android: '/images/logo/favicon-192x192.png',
  },
} as const;

// ============================================================================
// Hero & Banner Images
// ============================================================================

export const HERO_IMAGES = {
  // Fruit banner (primary hero)
  bannerFruit: {
    original: '/images/hero/banner-fruit.webp',
    mobile: '/images/hero/banner-fruit-sm.webp',
    tablet: '/images/hero/banner-fruit-md.webp',
    desktop: '/images/hero/banner-fruit-lg.webp',
  },

  // General banner (secondary hero)
  bannerGeneral: {
    original: '/images/hero/banner-general.webp',
    mobile: '/images/hero/banner-general-sm.webp',
    tablet: '/images/hero/banner-general-md.webp',
    desktop: '/images/hero/banner-general-lg.webp',
  },
} as const;

// ============================================================================
// Marketing Materials
// ============================================================================

export const MARKETING_IMAGES = {
  // Why PUXX promotional image
  whyPuxx: {
    original: '/images/marketing/why-puxx.webp',
    mobile: '/images/marketing/why-puxx-sm.webp',
    tablet: '/images/marketing/why-puxx-md.webp',
    desktop: '/images/marketing/why-puxx-lg.webp',
  },

  // Why PUXX poster
  whyPoster: {
    original: '/images/marketing/why-poster.webp',
    mobile: '/images/marketing/why-poster-sm.webp',
    tablet: '/images/marketing/why-poster-md.webp',
    desktop: '/images/marketing/why-poster-lg.webp',
  },

  // Worldwide pouches marketing
  pouchesWorldwide: {
    original: '/images/marketing/pouches-worldwide.webp',
    mobile: '/images/marketing/pouches-worldwide-sm.webp',
    tablet: '/images/marketing/pouches-worldwide-md.webp',
    desktop: '/images/marketing/pouches-worldwide-lg.webp',
  },
} as const;

// ============================================================================
// Graphics & Icons
// ============================================================================

export const GRAPHIC_IMAGES = {
  // SVG graphics (no responsive sizes needed)
  graphic1: '/images/graphics/graphic-1.svg',
  graphic2: '/images/graphics/graphic-2.svg',
  graphic3: '/images/graphics/graphic-3.svg',
  graphic4: '/images/graphics/graphic-4.svg',
  graphic5: '/images/graphics/graphic-5.svg',
  graphic6: '/images/graphics/graphic-6.svg',
} as const;

// ============================================================================
// Background Images
// ============================================================================

export const BACKGROUND_IMAGES = {
  // Trading platform background
  tradingPlatform: {
    original: '/images/backgrounds/trading-platform.webp',
    tablet: '/images/backgrounds/trading-platform-md.webp',
    desktop: '/images/backgrounds/trading-platform-lg.webp',
  },
} as const;

// ============================================================================
// Placeholder Images
// ============================================================================

export const PLACEHOLDER_IMAGES = {
  // Product placeholder (for loading states)
  product: '/images/placeholders/product-placeholder.webp',
} as const;

// ============================================================================
// Consolidated Export
// ============================================================================

export const IMAGES = {
  logo: LOGO_IMAGES,
  hero: HERO_IMAGES,
  marketing: MARKETING_IMAGES,
  graphics: GRAPHIC_IMAGES,
  backgrounds: BACKGROUND_IMAGES,
  placeholders: PLACEHOLDER_IMAGES,
} as const;

// ============================================================================
// Type Definitions
// ============================================================================

export type LogoVariant = keyof typeof LOGO_IMAGES;
export type LogoSize = 'small' | 'medium' | 'large' | 'original';
export type HeroImage = keyof typeof HERO_IMAGES;
export type MarketingImage = keyof typeof MARKETING_IMAGES;
export type GraphicImage = keyof typeof GRAPHIC_IMAGES;
export type BackgroundImage = keyof typeof BACKGROUND_IMAGES;
export type ResponsiveSize = 'mobile' | 'tablet' | 'desktop' | 'original';

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get logo image path by variant and size
 */
export function getLogoImage(variant: LogoVariant, size: LogoSize = 'original'): string {
  const logoVariant = LOGO_IMAGES[variant] as any;
  return logoVariant[size] || logoVariant.original || logoVariant.small;
}

/**
 * Get hero image path by name and responsive size
 */
export function getHeroImage(name: HeroImage, size: ResponsiveSize = 'original'): string {
  const heroImage = HERO_IMAGES[name] as any;
  return heroImage[size] || heroImage.original || heroImage.desktop;
}

/**
 * Get marketing image path by name and responsive size
 */
export function getMarketingImage(name: MarketingImage, size: ResponsiveSize = 'original'): string {
  const marketingImage = MARKETING_IMAGES[name] as any;
  return marketingImage[size] || marketingImage.original || marketingImage.desktop;
}

/**
 * Get background image path by name and responsive size
 */
export function getBackgroundImage(name: BackgroundImage, size: ResponsiveSize = 'desktop'): string {
  const backgroundImage = BACKGROUND_IMAGES[name] as any;
  return backgroundImage[size] || backgroundImage.desktop || backgroundImage.original;
}

/**
 * Get responsive image sources for picture element
 */
export function getResponsiveSources(imageSet: { mobile?: string; tablet?: string; desktop?: string; original: string }) {
  return [
    { media: '(max-width: 480px)', srcSet: imageSet.mobile || imageSet.original },
    { media: '(max-width: 768px)', srcSet: imageSet.tablet || imageSet.original },
    { media: '(min-width: 769px)', srcSet: imageSet.desktop || imageSet.original },
  ];
}

// ============================================================================
// Image Metadata (for SEO and Accessibility)
// ============================================================================

export const IMAGE_ALT_TEXT = {
  logo: {
    white: 'PUXX Ireland - Premium Nicotine Pouches',
    black: 'PUXX Ireland Logo',
  },
  hero: {
    bannerFruit: 'PUXX Nicotine Pouches with Fresh Fruit Flavors',
    bannerGeneral: 'PUXX Ireland Premium Product Range',
  },
  marketing: {
    whyPuxx: 'Why Choose PUXX - Benefits and Features',
    whyPoster: 'PUXX Ireland Marketing Poster',
    pouchesWorldwide: 'PUXX Pouches Available Worldwide',
  },
  placeholders: {
    product: 'Product Image Loading',
  },
} as const;

/**
 * Get alt text for an image
 */
export function getImageAltText(category: keyof typeof IMAGE_ALT_TEXT, name: string): string {
  const categoryAlt = IMAGE_ALT_TEXT[category] as Record<string, string>;
  return categoryAlt[name] || '';
}

// ============================================================================
// Default Export
// ============================================================================

export default IMAGES;
