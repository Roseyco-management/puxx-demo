/**
 * HeroImage Component
 *
 * Optimized hero/banner image component with responsive image support,
 * lazy loading, and blur placeholder for better UX.
 *
 * @example
 * // Fruit banner (default)
 * <HeroImage />
 *
 * @example
 * // General banner with custom height
 * <HeroImage variant="general" height={600} />
 *
 * @example
 * // Priority loading for above-fold content
 * <HeroImage priority />
 */

import Image from 'next/image';
import { HERO_IMAGES, IMAGE_ALT_TEXT } from '@/lib/constants/images';

export interface HeroImageProps {
  /** Hero image variant */
  variant?: 'fruit' | 'general';

  /** Custom width (defaults to full container width) */
  width?: number;

  /** Custom height (defaults to aspect ratio) */
  height?: number;

  /** Additional CSS classes */
  className?: string;

  /** Image priority (set true for above-fold images) */
  priority?: boolean;

  /** Custom alt text */
  alt?: string;

  /** Object fit style */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

  /** Object position */
  objectPosition?: string;
}

const HERO_VARIANTS = {
  fruit: 'bannerFruit',
  general: 'bannerGeneral',
} as const;

export function HeroImage({
  variant = 'fruit',
  width = 1920,
  height = 600,
  className = '',
  priority = false,
  alt,
  objectFit = 'cover',
  objectPosition = 'center',
}: HeroImageProps) {
  const heroKey = HERO_VARIANTS[variant];
  const heroImages = HERO_IMAGES[heroKey];

  // Get alt text
  const altText = alt || IMAGE_ALT_TEXT.hero[heroKey];

  return (
    <div className={`relative w-full ${className}`} style={{ height }}>
      <Image
        src={heroImages.original}
        alt={altText}
        fill
        priority={priority}
        quality={90}
        sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, 1920px"
        style={{
          objectFit,
          objectPosition,
        }}
        placeholder="blur"
        blurDataURL="data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA="
      />
    </div>
  );
}

/**
 * HeroImageWithOverlay Component
 *
 * Hero image with optional gradient overlay and content
 *
 * @example
 * <HeroImageWithOverlay>
 *   <h1>Welcome to PUXX Ireland</h1>
 *   <p>Premium Nicotine Pouches</p>
 * </HeroImageWithOverlay>
 */

export interface HeroImageWithOverlayProps extends HeroImageProps {
  /** Content to display over the hero image */
  children?: React.ReactNode;

  /** Overlay opacity (0-1) */
  overlayOpacity?: number;

  /** Overlay gradient direction */
  overlayGradient?: 'to-bottom' | 'to-top' | 'to-right' | 'to-left' | 'none';
}

export function HeroImageWithOverlay({
  children,
  overlayOpacity = 0.4,
  overlayGradient = 'to-bottom',
  ...heroProps
}: HeroImageWithOverlayProps) {
  const gradientClass = overlayGradient !== 'none'
    ? `bg-gradient-${overlayGradient} from-black/60 to-transparent`
    : '';

  return (
    <div className="relative">
      <HeroImage {...heroProps} />

      {/* Overlay */}
      {overlayOpacity > 0 && (
        <div
          className={`absolute inset-0 ${gradientClass}`}
          style={overlayGradient === 'none' ? { backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` } : {}}
        />
      )}

      {/* Content */}
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-white text-center">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export default HeroImage;
