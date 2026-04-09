'use client';

import Link from 'next/link';
import { ShoppingBag, AlertCircle, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatPrice } from '@/lib/types/product';

interface CartSummaryProps {
  subtotal: number;
  itemCount: number;
}

const SHIPPING_COST = 5.99;
const FREE_SHIPPING_THRESHOLD = 150;
const MINIMUM_TINS = 5;

export function CartSummary({ subtotal, itemCount }: CartSummaryProps) {
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = isFreeShipping ? 0 : SHIPPING_COST;
  const total = subtotal + shippingCost;
  const meetsMinimum = itemCount >= MINIMUM_TINS;

  // Calculate progress towards free shipping
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="space-y-4">
      {/* Main Summary Card */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>

          {/* Subtotal */}
          <div className="flex justify-between text-gray-700">
            <span>Subtotal ({itemCount} {itemCount === 1 ? 'tin' : 'tins'})</span>
            <span className="font-semibold">{formatPrice(subtotal)}</span>
          </div>

          {/* Shipping */}
          <div className="flex justify-between items-center text-gray-700 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-gray-500" />
              <span>Shipping</span>
            </div>
            <span className={`font-semibold ${isFreeShipping ? 'text-green-600' : ''}`}>
              {isFreeShipping ? 'FREE' : formatPrice(shippingCost)}
            </span>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center text-lg pt-2">
            <span className="font-bold text-gray-900">Total</span>
            <span className="font-bold text-2xl text-green-600">
              {formatPrice(total)}
            </span>
          </div>

          {/* Free Shipping Progress */}
          {!isFreeShipping && (
            <div className="pt-4 border-t border-gray-200">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    {formatPrice(amountToFreeShipping)} away from FREE shipping
                  </span>
                  <span className="font-semibold text-green-600">
                    {freeShippingProgress.toFixed(0)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Minimum Order Warning */}
          {!meetsMinimum && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-amber-900">Minimum Order Required</p>
                <p className="text-amber-800 mt-1">
                  Please add at least {MINIMUM_TINS - itemCount} more {MINIMUM_TINS - itemCount === 1 ? 'tin' : 'tins'} to meet the minimum order of {MINIMUM_TINS} tins.
                </p>
              </div>
            </div>
          )}

          {/* Checkout Button */}
          <Button
            asChild={meetsMinimum}
            disabled={!meetsMinimum}
            size="lg"
            className="w-full gradient-emerald hover:opacity-90 text-white font-semibold py-6 text-lg transition-all disabled:bg-gray-300 disabled:opacity-50"
          >
            {meetsMinimum ? (
              <Link href="/checkout">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Proceed to Checkout
              </Link>
            ) : (
              <span>
                <ShoppingBag className="w-5 h-5 mr-2" />
                Minimum {MINIMUM_TINS} Tins Required
              </span>
            )}
          </Button>

          {/* Continue Shopping Link */}
          <Link
            href="/shop"
            className="block text-center text-sm text-green-600 hover:text-green-700 font-medium transition-colors"
          >
            Continue Shopping
          </Link>
        </CardContent>
      </Card>

      {/* Free Shipping Banner */}
      {isFreeShipping && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 text-green-800">
              <Truck className="w-6 h-6 text-green-600 flex-shrink-0" />
              <div>
                <p className="font-semibold">Free Shipping Unlocked!</p>
                <p className="text-sm text-green-700">Your order qualifies for free delivery</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Trust Badges */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start gap-3 text-sm">
            <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-semibold text-gray-900">Secure Checkout</p>
              <p className="text-gray-600">Your payment information is protected</p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-semibold text-gray-900">Fast Delivery</p>
              <p className="text-gray-600">Delivered to your door across Ireland</p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-semibold text-gray-900">Quality Guaranteed</p>
              <p className="text-gray-600">Premium nicotine pouches from Sweden</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
