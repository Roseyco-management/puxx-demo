'use client';

import { useEffect } from 'react';
import { trackViewItem } from '@/lib/analytics/google-analytics';

/**
 * Product View Tracking Component
 *
 * This component automatically tracks when a user views a product page.
 * It should be included on product detail pages.
 *
 * @param product - Product information to track
 */

interface TrackProductViewProps {
  product: {
    id: number;
    name: string;
    price: string;
    category?: string;
    variant?: string | null;
  };
}

export function TrackProductView({ product }: TrackProductViewProps) {
  useEffect(() => {
    // Track product view when component mounts
    trackViewItem({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category || 'Nicotine Pouches',
      variant: product.variant || undefined,
    });
  }, [product.id, product.name, product.price, product.category, product.variant]);

  // This component doesn't render anything - it only tracks events
  return null;
}
