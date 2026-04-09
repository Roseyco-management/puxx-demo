import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/db/schema';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

// Helper function to get strength badge variant
function getStrengthBadgeVariant(strength: string | null): 'success' | 'warning' | 'destructive' {
  if (!strength) return 'success';
  const mg = parseInt(strength.replace('mg', ''));
  if (mg <= 6) return 'success';
  if (mg <= 16) return 'warning';
  return 'destructive';
}

// Helper function to get strength label
function getStrengthLabel(strength: string | null): string {
  if (!strength) return 'Mild';
  const mg = parseInt(strength.replace('mg', ''));
  if (mg <= 6) return 'Mild';
  if (mg <= 16) return 'Medium';
  return 'Strong';
}

export function ProductCard({ product }: ProductCardProps) {
  const strengthVariant = getStrengthBadgeVariant(product.nicotineStrength);
  const strengthLabel = getStrengthLabel(product.nicotineStrength);

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={`${product.name} nicotine pouches ${product.nicotineStrength || ''} - ${product.flavor || 'premium flavor'}`}
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
          <Link href={`/products/${product.slug}`}>
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

        {/* Strength badge */}
        {product.nicotineStrength && (
          <div className="flex items-center gap-2">
            <Badge variant={strengthVariant} className="text-xs">
              {product.nicotineStrength}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {strengthLabel}
            </span>
          </div>
        )}

        {/* Price and action */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="text-xl font-bold text-green-600">
              €{parseFloat(product.price).toFixed(2)}
            </p>
            {product.compareAtPrice && parseFloat(product.compareAtPrice) > parseFloat(product.price) && (
              <p className="text-xs text-muted-foreground line-through">
                €{parseFloat(product.compareAtPrice).toFixed(2)}
              </p>
            )}
          </div>

          <Button
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white"
            disabled={product.stockQuantity <= 0}
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
