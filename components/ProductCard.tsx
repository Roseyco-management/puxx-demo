'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Check } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart-store';
import { toCartProduct } from '@/lib/store/cart-types';
import { useToast } from '@/lib/utils/toast';

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  compareAtPrice: string | null;
  nicotineStrength: string | null;
  flavor: string | null;
  imageUrl: string | null;
  stockQuantity: number;
  sku: string | null;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const { showToast } = useToast();

  const price = parseFloat(product.price);
  const isInStock = product.stockQuantity > 0;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isInStock || isAdding) return;

    setIsAdding(true);

    try {
      const cartProduct = toCartProduct(product);
      addItem(cartProduct, 1);

      setShowSuccess(true);
      showToast(`${product.name} added to cart!`, 'success');

      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      showToast(error instanceof Error ? error.message : 'Failed to add item to cart', 'error');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="group relative bg-card rounded-xl border border-border overflow-hidden hover-lift transition-all duration-300">
      <Link href={`/products/${product.slug}`} className="block">
        {/* Product Image */}
        <div className="relative aspect-square bg-muted overflow-hidden">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={`${product.name} nicotine pouches ${product.nicotineStrength || ''} - ${product.flavor || 'premium flavor'}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              loading="lazy"
              quality={85}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-emerald">
              <span className="text-4xl font-heading text-white">PUXX</span>
            </div>
          )}

          {/* Stock indicator */}
          {!isInStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-3">
          {/* Flavor & Strength */}
          <div className="flex items-center justify-between text-xs">
            {product.flavor && (
              <span className="px-2 py-1 rounded-full bg-accent/10 text-accent font-medium">
                {product.flavor}
              </span>
            )}
            {product.nicotineStrength && (
              <span className="px-2 py-1 rounded-full bg-primary/10 text-primary font-bold">
                {product.nicotineStrength}
              </span>
            )}
          </div>

          {/* Product Name */}
          <h3 className="font-heading text-lg leading-tight text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-heading text-primary">
              €{price.toFixed(2)}
            </span>
            {product.compareAtPrice && parseFloat(product.compareAtPrice) > price && (
              <span className="text-sm text-muted-foreground line-through">
                €{parseFloat(product.compareAtPrice).toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div className="px-4 pb-4">
        <Button
          className="w-full gradient-emerald hover:opacity-90 transition-all"
          disabled={!isInStock || isAdding}
          onClick={handleAddToCart}
        >
          {isAdding ? (
            <>
              <div className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Adding...
            </>
          ) : showSuccess ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Added!
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" />
              {isInStock ? 'Add to Cart' : 'Out of Stock'}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
