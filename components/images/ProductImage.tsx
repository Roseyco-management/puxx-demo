/**
 * ProductImage Component
 *
 * Optimized product image component for PUXX products.
 * Supports both Supabase URLs and local fallbacks.
 *
 * Features:
 * - Lazy loading for better performance
 * - Placeholder blur effect
 * - Error handling with fallback image
 * - Responsive sizing
 *
 * @example
 * // Basic usage with Supabase URL
 * <ProductImage src={product.image_url} alt={product.name} />
 *
 * @example
 * // Custom size
 * <ProductImage src={product.image_url} alt={product.name} size="large" />
 *
 * @example
 * // With fallback
 * <ProductImage src={product.image_url} alt={product.name} fallback="/images/placeholder.webp" />
 */

import Image from 'next/image';
import { useState } from 'react';
import { PLACEHOLDER_IMAGES } from '@/lib/constants/images';

export interface ProductImageProps {
  /** Image source URL (Supabase or local) */
  src: string;

  /** Alt text for accessibility */
  alt: string;

  /** Image size preset */
  size?: 'thumbnail' | 'small' | 'medium' | 'large';

  /** Custom width */
  width?: number;

  /** Custom height */
  height?: number;

  /** Additional CSS classes */
  className?: string;

  /** Image priority (for above-fold products) */
  priority?: boolean;

  /** Fallback image on error */
  fallback?: string;

  /** Show loading skeleton */
  showSkeleton?: boolean;
}

// Size presets
const SIZE_PRESETS = {
  thumbnail: { width: 150, height: 150 },
  small: { width: 300, height: 300 },
  medium: { width: 600, height: 600 },
  large: { width: 800, height: 800 },
} as const;

export function ProductImage({
  src,
  alt,
  size = 'medium',
  width,
  height,
  className = '',
  priority = false,
  fallback = PLACEHOLDER_IMAGES.product,
  showSkeleton = true,
}: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Get dimensions from preset or use custom values
  const dimensions = width && height
    ? { width, height }
    : SIZE_PRESETS[size];

  const handleError = () => {
    setHasError(true);
    setImgSrc(fallback);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading skeleton */}
      {showSkeleton && isLoading && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ width: dimensions.width, height: dimensions.height }}
        />
      )}

      {/* Image */}
      <Image
        src={imgSrc}
        alt={alt}
        width={dimensions.width}
        height={dimensions.height}
        priority={priority}
        quality={85}
        loading={priority ? undefined : 'lazy'}
        onError={handleError}
        onLoad={handleLoad}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
        placeholder="blur"
        blurDataURL="data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA="
      />

      {/* Error indicator */}
      {hasError && (
        <div className="absolute bottom-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          Fallback
        </div>
      )}
    </div>
  );
}

/**
 * ProductImageGrid Component
 *
 * Grid layout for multiple product images
 *
 * @example
 * <ProductImageGrid products={products} columns={3} />
 */

export interface ProductImageGridProps {
  /** Array of products with image URLs */
  products: Array<{ image_url: string; name: string; id: string }>;

  /** Number of columns */
  columns?: 2 | 3 | 4;

  /** Image size */
  size?: 'thumbnail' | 'small' | 'medium' | 'large';

  /** Additional CSS classes */
  className?: string;

  /** Callback when product image is clicked */
  onProductClick?: (productId: string) => void;
}

export function ProductImageGrid({
  products,
  columns = 3,
  size = 'medium',
  className = '',
  onProductClick,
}: ProductImageGridProps) {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-4 ${className}`}>
      {products.map((product) => (
        <div
          key={product.id}
          className={`${onProductClick ? 'cursor-pointer hover:scale-105 transition-transform' : ''}`}
          onClick={() => onProductClick?.(product.id)}
        >
          <ProductImage
            src={product.image_url}
            alt={product.name}
            size={size}
            showSkeleton={true}
          />
          <p className="mt-2 text-sm text-center font-medium">{product.name}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductImage;
