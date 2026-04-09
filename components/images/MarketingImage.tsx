/**
 * MarketingImage Component
 *
 * Optimized marketing material images with responsive support.
 * Designed for promotional content and marketing materials.
 *
 * @example
 * // Why PUXX image
 * <MarketingImage variant="whyPuxx" />
 *
 * @example
 * // Pouches worldwide with custom styling
 * <MarketingImage variant="pouchesWorldwide" className="rounded-lg shadow-xl" />
 *
 * @example
 * // Responsive with custom sizes
 * <MarketingImage variant="whyPoster" responsive />
 */

import Image from 'next/image';
import { MARKETING_IMAGES, IMAGE_ALT_TEXT } from '@/lib/constants/images';

export interface MarketingImageProps {
  /** Marketing image variant */
  variant: 'whyPuxx' | 'whyPoster' | 'pouchesWorldwide';

  /** Custom width */
  width?: number;

  /** Custom height */
  height?: number;

  /** Additional CSS classes */
  className?: string;

  /** Image priority (for above-fold images) */
  priority?: boolean;

  /** Custom alt text */
  alt?: string;

  /** Use responsive sizing */
  responsive?: boolean;

  /** Fill parent container */
  fill?: boolean;
}

const VARIANT_MAP = {
  whyPuxx: 'whyPuxx',
  whyPoster: 'whyPoster',
  pouchesWorldwide: 'pouchesWorldwide',
} as const;

export function MarketingImage({
  variant,
  width = 800,
  height = 600,
  className = '',
  priority = false,
  alt,
  responsive = true,
  fill = false,
}: MarketingImageProps) {
  const imageKey = VARIANT_MAP[variant];
  const marketingImages = MARKETING_IMAGES[imageKey];

  // Get alt text
  const altText = alt || IMAGE_ALT_TEXT.marketing[imageKey];

  // If fill mode, use responsive container
  if (fill) {
    return (
      <div className={`relative w-full h-full ${className}`}>
        <Image
          src={marketingImages.original}
          alt={altText}
          fill
          priority={priority}
          quality={85}
          sizes={responsive
            ? "(max-width: 480px) 100vw, (max-width: 768px) 100vw, 50vw"
            : "100vw"
          }
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
    );
  }

  // Standard sizing
  return (
    <Image
      src={marketingImages.original}
      alt={altText}
      width={width}
      height={height}
      priority={priority}
      quality={85}
      className={className}
      sizes={responsive
        ? "(max-width: 480px) 100vw, (max-width: 768px) 100vw, 50vw"
        : `${width}px`
      }
      style={{
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  );
}

/**
 * MarketingSection Component
 *
 * Pre-styled marketing section with image and content
 *
 * @example
 * <MarketingSection
 *   variant="whyPuxx"
 *   title="Why Choose PUXX?"
 *   description="Premium nicotine pouches..."
 *   imagePosition="left"
 * />
 */

export interface MarketingSectionProps extends Omit<MarketingImageProps, 'fill'> {
  /** Section title */
  title?: string;

  /** Section description */
  description?: string;

  /** Additional content */
  children?: React.ReactNode;

  /** Image position */
  imagePosition?: 'left' | 'right';

  /** Container className */
  containerClassName?: string;

  /** Content className */
  contentClassName?: string;
}

export function MarketingSection({
  variant,
  title,
  description,
  children,
  imagePosition = 'left',
  containerClassName = '',
  contentClassName = '',
  className = '',
  ...imageProps
}: MarketingSectionProps) {
  const flexDirection = imagePosition === 'right' ? 'md:flex-row-reverse' : 'md:flex-row';

  return (
    <section className={`container mx-auto px-4 py-12 ${containerClassName}`}>
      <div className={`flex flex-col ${flexDirection} gap-8 items-center`}>
        {/* Image */}
        <div className="w-full md:w-1/2">
          <MarketingImage
            variant={variant}
            className={`rounded-lg shadow-lg ${className}`}
            {...imageProps}
          />
        </div>

        {/* Content */}
        <div className={`w-full md:w-1/2 ${contentClassName}`}>
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {title}
            </h2>
          )}

          {description && (
            <p className="text-lg text-gray-700 mb-6">
              {description}
            </p>
          )}

          {children}
        </div>
      </div>
    </section>
  );
}

export default MarketingImage;
