'use client';

import { ProductWithCategories } from '@/lib/types/product';
import {
  formatPrice,
  getStockStatus,
  getStrengthBadgeColor,
} from '@/lib/types/product';

interface ProductInfoProps {
  product: ProductWithCategories;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const stockInfo = getStockStatus(product.stockQuantity);
  const strengthColor = getStrengthBadgeColor(product.nicotineStrength);

  return (
    <div className="space-y-4">
      {/* Product Name */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
        {product.name}
      </h1>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {product.flavor && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {product.flavor}
          </span>
        )}
        {product.nicotineStrength && (
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${strengthColor}`}
          >
            {product.nicotineStrength}
          </span>
        )}
        {product.categories && product.categories.length > 0 && (
          <>
            {product.categories.map((category) => (
              <span
                key={category.id}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
              >
                {category.name}
              </span>
            ))}
          </>
        )}
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-4xl font-bold text-green-600">
          {formatPrice(product.price)}
        </span>
        {product.compareAtPrice && (
          <span className="text-xl text-gray-400 line-through">
            {formatPrice(product.compareAtPrice)}
          </span>
        )}
      </div>

      {/* Short Description */}
      {product.description && (
        <p className="text-gray-600 text-lg leading-relaxed">
          {product.description.split('\n\n')[0]}
        </p>
      )}

      {/* Stock Status */}
      <div className="flex items-center gap-2">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${stockInfo.className}`}
        >
          {stockInfo.label}
        </span>
        {stockInfo.status === 'in_stock' && (
          <span className="text-sm text-gray-500">
            ({product.stockQuantity} available)
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="pt-4 border-t space-y-2">
        {product.pouchesPerCan && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Pouches per can:</span>
            <span className="font-medium text-gray-900">
              {product.pouchesPerCan}
            </span>
          </div>
        )}
        {product.sku && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">SKU:</span>
            <span className="font-medium text-gray-900">{product.sku}</span>
          </div>
        )}
      </div>
    </div>
  );
}
