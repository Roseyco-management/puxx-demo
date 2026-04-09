'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { Product } from '@/lib/db/schema';
import { formatPrice, getStockStatus } from '@/lib/types/product';
import { ProductsAPIResponse } from '@/lib/types/product';

interface RelatedProductsProps {
  currentProductId: number;
  nicotineStrength?: string | null;
  flavor?: string | null;
}

export function RelatedProducts({
  currentProductId,
  nicotineStrength,
  flavor,
}: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRelatedProducts() {
      try {
        // Try to fetch by strength first, then by flavor
        let url = '/api/products?limit=4';

        if (nicotineStrength) {
          url += `&strength=${encodeURIComponent(nicotineStrength)}`;
        } else if (flavor) {
          url += `&flavor=${encodeURIComponent(flavor)}`;
        }

        const response = await fetch(url);
        const data: ProductsAPIResponse = await response.json();

        if (data.success) {
          // Filter out current product and take first 4
          const filtered = data.products
            .filter((p) => p.id !== currentProductId)
            .slice(0, 4);

          // If we don't have enough, fetch more without filters
          if (filtered.length < 4) {
            const fallbackResponse = await fetch('/api/products?limit=8');
            const fallbackData: ProductsAPIResponse =
              await fallbackResponse.json();

            if (fallbackData.success) {
              const moreProd = fallbackData.products
                .filter(
                  (p) =>
                    p.id !== currentProductId &&
                    !filtered.find((f) => f.id === p.id)
                )
                .slice(0, 4 - filtered.length);

              setProducts([...filtered, ...moreProd]);
            } else {
              setProducts(filtered);
            }
          } else {
            setProducts(filtered);
          }
        }
      } catch (error) {
        console.error('Error fetching related products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRelatedProducts();
  }, [currentProductId, nicotineStrength, flavor]);

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">You might also like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-lg mb-3" />
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-6 bg-gray-200 rounded w-20" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">You might also like</h2>
        <Link
          href="/products"
          className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-1 transition-colors"
        >
          View all
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const stockInfo = getStockStatus(product.stockQuantity);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all"
    >
      {/* Product Image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            alt={`${product.name} nicotine pouches ${product.nicotineStrength || ''} - ${product.flavor || 'premium flavor'}`}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, 25vw"
            loading="lazy"
            quality={85}
          />
        )}
        {stockInfo.status === 'out_of_stock' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3 sm:p-4 space-y-2">
        <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2 group-hover:text-green-600 transition-colors">
          {product.name}
        </h3>

        {/* Badges */}
        <div className="flex flex-wrap gap-1">
          {product.flavor && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
              {product.flavor}
            </span>
          )}
          {product.nicotineStrength && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
              {product.nicotineStrength}
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg sm:text-xl font-bold text-green-600">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
