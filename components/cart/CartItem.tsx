'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/types/product';

interface CartItem {
  productId: number;
  name: string;
  slug: string;
  price: string;
  imageUrl: string | null;
  quantity: number;
  nicotineStrength: string | null;
  flavor: string | null;
}

interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

export function CartItemComponent({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const lineTotal = parseFloat(item.price) * item.quantity;

  const handleQuantityChange = (delta: number) => {
    const newQuantity = item.quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 50) {
      onUpdateQuantity(item.productId, newQuantity);
    }
  };

  return (
    <div className="flex gap-4 py-6 border-b border-gray-200 last:border-0">
      {/* Product Image */}
      <Link
        href={`/products/${item.slug}`}
        className="relative flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-gray-100 hover:opacity-75 transition-opacity"
      >
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={`${item.name} nicotine pouches ${item.nicotineStrength || ''} - ${item.flavor || 'premium flavor'}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 96px, 128px"
            loading="lazy"
            quality={75}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-200">
            <span className="text-2xl font-bold text-gray-400">PUXX</span>
          </div>
        )}
      </Link>

      {/* Product Details */}
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <Link
                href={`/products/${item.slug}`}
                className="font-semibold text-gray-900 hover:text-green-600 transition-colors line-clamp-2 text-base md:text-lg"
              >
                {item.name}
              </Link>

              {/* Attributes */}
              <div className="flex flex-wrap gap-2 mt-2 text-sm text-gray-600">
                {item.nicotineStrength && (
                  <div className="flex items-center gap-1">
                    <span className="font-medium">Strength:</span>
                    <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded-full text-xs font-semibold">
                      {item.nicotineStrength}
                    </span>
                  </div>
                )}
                {item.flavor && (
                  <div className="flex items-center gap-1">
                    <span className="font-medium">Flavor:</span>
                    <span>{item.flavor}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Price - Desktop */}
            <div className="hidden md:block text-right">
              <p className="text-lg font-bold text-green-600">
                {formatPrice(item.price)}
              </p>
              <p className="text-sm text-gray-500">per tin</p>
            </div>
          </div>

          {/* Price - Mobile */}
          <div className="md:hidden mt-2">
            <p className="text-lg font-bold text-green-600">
              {formatPrice(item.price)}
            </p>
          </div>
        </div>

        {/* Quantity Controls & Remove */}
        <div className="flex items-center justify-between gap-4 mt-4">
          <div className="flex items-center gap-3">
            {/* Quantity Selector */}
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={item.quantity <= 1}
                className="p-2 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-1 font-semibold text-gray-900 min-w-[50px] text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                disabled={item.quantity >= 50}
                className="p-2 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Remove Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(item.productId)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Remove</span>
            </Button>
          </div>

          {/* Line Total */}
          <div className="text-right">
            <p className="text-sm text-gray-600">Subtotal</p>
            <p className="text-xl font-bold text-gray-900">
              {formatPrice(lineTotal)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
