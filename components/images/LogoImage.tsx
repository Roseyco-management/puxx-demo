/**
 * LogoImage Component
 *
 * Optimized PUXX logo component with support for different variants and sizes.
 * Automatically handles responsive images and proper Next.js Image optimization.
 *
 * @example
 * // White logo (default)
 * <LogoImage />
 *
 * @example
 * // Black logo for light backgrounds
 * <LogoImage variant="black" />
 *
 * @example
 * // Custom size
 * <LogoImage size="small" width={200} height={60} />
 *
 * @example
 * // As a link to homepage
 * <LogoImage href="/" />
 */

import Image from 'next/image';
import Link from 'next/link';
import { LOGO_IMAGES, IMAGE_ALT_TEXT } from '@/lib/constants/images';

export interface LogoImageProps {
  /** Logo variant - white for dark backgrounds, black for light backgrounds */
  variant?: 'white' | 'black';

  /** Logo size preset */
  size?: 'small' | 'medium' | 'large' | 'original';

  /** Custom width (overrides size preset) */
  width?: number;

  /** Custom height (overrides size preset) */
  height?: number;

  /** Optional link destination (e.g., "/" for homepage) */
  href?: string;

  /** Additional CSS classes */
  className?: string;

  /** Image priority (for above-fold logos) */
  priority?: boolean;

  /** Custom alt text */
  alt?: string;
}

// Size presets (width x height)
const SIZE_PRESETS = {
  small: { width: 200, height: 60 },
  medium: { width: 400, height: 120 },
  large: { width: 600, height: 180 },
  original: { width: 1024, height: 307 },
} as const;

export function LogoImage({
  variant = 'white',
  size = 'medium',
  width,
  height,
  href,
  className = '',
  priority = false,
  alt,
}: LogoImageProps) {
  // Get dimensions from preset or use custom values
  const dimensions = width && height
    ? { width, height }
    : SIZE_PRESETS[size];

  // Get image source based on size
  const getImageSrc = () => {
    if (size === 'original' || (width && width > 600)) {
      return LOGO_IMAGES[variant].original;
    }
    if (size === 'large' || (width && width > 400)) {
      return LOGO_IMAGES[variant].large;
    }
    if (size === 'medium' || (width && width > 200)) {
      return LOGO_IMAGES[variant].medium;
    }
    return LOGO_IMAGES[variant].small;
  };

  // Get alt text
  const altText = alt || IMAGE_ALT_TEXT.logo[variant];

  // Logo image element
  const logoElement = (
    <Image
      src={getImageSrc()}
      alt={altText}
      width={dimensions.width}
      height={dimensions.height}
      priority={priority}
      className={className}
      quality={95}
      style={{
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  );

  // Wrap in link if href is provided
  if (href) {
    return (
      <Link href={href} className="inline-block">
        {logoElement}
      </Link>
    );
  }

  return logoElement;
}

export default LogoImage;
