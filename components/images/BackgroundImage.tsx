/**
 * BackgroundImage Component
 *
 * Optimized background image component with overlay support.
 * Perfect for section backgrounds and full-width layouts.
 *
 * @example
 * // Simple background
 * <BackgroundImage variant="tradingPlatform">
 *   <h1>Content over background</h1>
 * </BackgroundImage>
 *
 * @example
 * // With overlay for better text readability
 * <BackgroundImage variant="tradingPlatform" overlay={0.6}>
 *   <div className="text-white">
 *     <h1>Better Contrast</h1>
 *   </div>
 * </BackgroundImage>
 */

import Image from 'next/image';
import { BACKGROUND_IMAGES } from '@/lib/constants/images';

export interface BackgroundImageProps {
  /** Background image variant */
  variant: 'tradingPlatform';

  /** Content to display over background */
  children?: React.ReactNode;

  /** Overlay opacity (0-1) */
  overlay?: number;

  /** Overlay color */
  overlayColor?: string;

  /** Additional CSS classes for container */
  className?: string;

  /** Image priority */
  priority?: boolean;

  /** Minimum height */
  minHeight?: string;

  /** Object position */
  objectPosition?: string;

  /** Parallax effect */
  parallax?: boolean;
}

export function BackgroundImage({
  variant,
  children,
  overlay = 0,
  overlayColor = 'black',
  className = '',
  priority = false,
  minHeight = '500px',
  objectPosition = 'center',
  parallax = false,
}: BackgroundImageProps) {
  const backgroundImages = BACKGROUND_IMAGES[variant];

  return (
    <section
      className={`relative w-full ${className}`}
      style={{ minHeight }}
    >
      {/* Background Image */}
      <div className={`absolute inset-0 ${parallax ? 'fixed' : ''}`}>
        <Image
          src={backgroundImages.original}
          alt=""
          fill
          priority={priority}
          quality={85}
          sizes="100vw"
          style={{
            objectFit: 'cover',
            objectPosition,
            zIndex: -1,
          }}
        />
      </div>

      {/* Overlay */}
      {overlay > 0 && (
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: `${overlayColor}`,
            opacity: overlay,
          }}
        />
      )}

      {/* Content */}
      {children && (
        <div className="relative z-10 h-full">
          {children}
        </div>
      )}
    </section>
  );
}

/**
 * BackgroundPattern Component
 *
 * Creates a repeating pattern background with an image
 *
 * @example
 * <BackgroundPattern variant="tradingPlatform" opacity={0.1}>
 *   <div>Content here</div>
 * </BackgroundPattern>
 */

export interface BackgroundPatternProps {
  /** Background image variant */
  variant: 'tradingPlatform';

  /** Content to display over pattern */
  children?: React.ReactNode;

  /** Pattern opacity (0-1) */
  opacity?: number;

  /** Additional CSS classes */
  className?: string;

  /** Pattern size */
  patternSize?: string;
}

export function BackgroundPattern({
  variant,
  children,
  opacity = 0.1,
  className = '',
  patternSize = '300px',
}: BackgroundPatternProps) {
  const backgroundImages = BACKGROUND_IMAGES[variant];

  return (
    <div className={`relative ${className}`}>
      {/* Pattern Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${backgroundImages.original})`,
          backgroundRepeat: 'repeat',
          backgroundSize: patternSize,
          opacity,
          zIndex: -1,
        }}
      />

      {/* Content */}
      {children}
    </div>
  );
}

export default BackgroundImage;
