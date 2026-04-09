'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/db/schema';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRegion } from '@/lib/config/region-context';
import { useCartStore } from '@/lib/store/cart-store';

interface ProductCardProps {
  product: Product;
}

const FLAVOR_IMAGE_MAP: Record<string, string> = {
  'Cool Mint': '/images/graphics/image.svg',
  'Spearmint': '/images/graphics/image (1).svg',
  'Peppermint': '/images/graphics/image (2).svg',
  'Cherry': '/images/graphics/image (3).svg',
  'Watermelon': '/images/graphics/image (4).svg',
  'Strawberry': '/images/graphics/image (5).svg',
  'Raspberry': '/images/graphics/image.svg',
  'Blueberry': '/images/graphics/image (1).svg',
  'Grape': '/images/graphics/image (2).svg',
  'Citrus': '/images/graphics/image (3).svg',
  'Cola': '/images/graphics/image (4).svg',
  'Wintergreen': '/images/graphics/image (5).svg',
};

export function ProductCard({ product }: ProductCardProps) {
  const { region, config } = useRegion();
  const addItem = useCartStore((s) => s.addItem);
  const resolvedImageUrl = FLAVOR_IMAGE_MAP[product.flavor || ''] || product.imageUrl || '/images/graphics/image.svg';

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/${region}/products/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {resolvedImageUrl ? (
            <Image
              src={resolvedImageUrl}
              alt={`${product.name} nicotine pouches - ${product.flavor || 'premium flavor'}`}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
              quality={85}
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-200">
              <span className="text-4xl font-bold text-gray-400">PUXX</span>
            </div>
          )}

          {/* Featured badge */}
          {product.isFeatured && (
            <div className="absolute top-2 left-2">
              <Badge variant="info" className="shadow-md">
                Featured
              </Badge>
            </div>
          )}

          {/* Stock status */}
          {product.stockQuantity <= 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <Badge variant="destructive" className="text-sm">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>
      </Link>

      <CardContent className="space-y-3 p-4">
        <div className="space-y-1">
          <Link href={`/${region}/products/${product.slug}`}>
            <h3 className="font-semibold text-base line-clamp-2 hover:text-green-600 transition-colors">
              {product.name}
            </h3>
          </Link>

          {product.flavor && (
            <p className="text-sm text-muted-foreground">
              {product.flavor}
            </p>
          )}
        </div>

        {/* Strengths badge */}
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            Available in 6 strengths
          </Badge>
        </div>

        {/* Price and action */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="text-xl font-bold text-green-600">
              {config.currencySymbol}{config.basePrice.toFixed(2)}
            </p>
            {product.compareAtPrice && parseFloat(product.compareAtPrice) > parseFloat(product.price) && (
              <p className="text-xs text-muted-foreground line-through">
                {config.currencySymbol}{parseFloat(product.compareAtPrice!).toFixed(2)}
              </p>
            )}
          </div>

          <Button
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white"
            disabled={product.stockQuantity <= 0}
            onClick={(e) => {
              e.preventDefault();
              addItem({
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                nicotineStrength: product.nicotineStrength,
                flavor: product.flavor,
                imageUrl: product.imageUrl,
                stockQuantity: product.stockQuantity,
                sku: product.sku,
              });
            }}
          >
            {product.stockQuantity <= 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>

        {/* Additional info */}
        {product.pouchesPerCan && (
          <p className="text-xs text-muted-foreground border-t pt-2">
            {product.pouchesPerCan} pouches per can
          </p>
        )}
      </CardContent>
    </Card>
  );
}
