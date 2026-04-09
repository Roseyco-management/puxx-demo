/**
 * PUXX Ireland Image Components
 *
 * Centralized export for all optimized image components.
 *
 * @example
 * import { LogoImage, HeroImage, ProductImage } from '@/components/images';
 */

export { LogoImage } from './LogoImage';
export type { LogoImageProps } from './LogoImage';

export { HeroImage, HeroImageWithOverlay } from './HeroImage';
export type { HeroImageProps, HeroImageWithOverlayProps } from './HeroImage';

export { ProductImage, ProductImageGrid } from './ProductImage';
export type { ProductImageProps, ProductImageGridProps } from './ProductImage';

export { MarketingImage, MarketingSection } from './MarketingImage';
export type { MarketingImageProps, MarketingSectionProps } from './MarketingImage';

export { BackgroundImage, BackgroundPattern } from './BackgroundImage';
export type { BackgroundImageProps, BackgroundPatternProps } from './BackgroundImage';

// Re-export image constants for convenience
export { IMAGES, IMAGE_ALT_TEXT } from '@/lib/constants/images';
export type {
  LogoVariant,
  LogoSize,
  HeroImage as HeroImageType,
  MarketingImage as MarketingImageType,
  ResponsiveSize,
} from '@/lib/constants/images';
