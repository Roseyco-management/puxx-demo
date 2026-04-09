'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/stores/cart-store';
import { useCheckoutStore } from '@/lib/stores/checkout-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Minus, Plus, Trash2, Tag, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Step1CartReviewProps {
  onNext: () => void;
}

export function Step1CartReview({ onNext }: Step1CartReviewProps) {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore();
  const { checkoutData, setCouponCode } = useCheckoutStore();
  const [couponInput, setCouponInput] = useState(checkoutData.couponCode || '');
  const [couponError, setCouponError] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const subtotal = getTotalPrice();
  const discount = checkoutData.couponDiscount || 0;
  const total = subtotal - discount;

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

    setIsApplyingCoupon(true);
    setCouponError('');

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock coupon validation
      const mockCoupons: Record<string, number> = {
        'WELCOME10': 10,
        'SAVE15': 15,
        'FIRSTORDER': 20,
      };

      const upperCode = couponInput.toUpperCase();
      if (mockCoupons[upperCode]) {
        setCouponCode(upperCode, mockCoupons[upperCode]);
        setCouponError('');
      } else {
        setCouponError('Invalid coupon code');
      }
    } catch (error) {
      setCouponError('Failed to apply coupon');
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponCode('', 0);
    setCouponInput('');
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
          <ShoppingCart className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="text-2xl font-heading text-foreground mb-4">
          Your cart is empty
        </h3>
        <p className="text-muted-foreground mb-8">
          Add some products to get started!
        </p>
        <Button asChild className="gradient-emerald">
          <a href="/products">Browse Products</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading text-foreground mb-2">
          Review Your Cart
        </h2>
        <p className="text-muted-foreground">
          Verify your items before proceeding to checkout
        </p>
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg border shadow-sm p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex gap-4">
              {/* Product Image */}
              <div className="flex-shrink-0 w-20 h-20 bg-muted rounded-lg overflow-hidden">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <ShoppingCart className="h-8 w-8" />
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground mb-1 truncate">
                  {item.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {item.flavor} • {item.nicotineStrength}
                </p>
                <p className="text-lg font-bold text-primary">
                  €{item.price.toFixed(2)}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2 bg-muted rounded-lg">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 hover:bg-background rounded-lg transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-background rounded-lg transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-destructive hover:text-destructive/80 transition-colors p-2"
                  aria-label="Remove item"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Coupon Code */}
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Tag className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">Have a coupon code?</h3>
        </div>

        {checkoutData.couponCode ? (
          <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
            <div>
              <p className="text-sm font-medium text-primary mb-1">
                Coupon Applied: {checkoutData.couponCode}
              </p>
              <p className="text-sm text-muted-foreground">
                You saved €{discount.toFixed(2)}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemoveCoupon}
              className="text-primary hover:text-primary/80"
            >
              Remove
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponInput}
                  onChange={(e) => {
                    setCouponInput(e.target.value.toUpperCase());
                    setCouponError('');
                  }}
                  className={cn(couponError && 'border-destructive')}
                />
              </div>
              <Button
                onClick={handleApplyCoupon}
                disabled={isApplyingCoupon}
                className="gradient-emerald"
              >
                {isApplyingCoupon ? 'Applying...' : 'Apply'}
              </Button>
            </div>
            {couponError && (
              <p className="text-sm text-destructive">{couponError}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Try: WELCOME10, SAVE15, or FIRSTORDER
            </p>
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h3 className="font-semibold text-foreground mb-4">Order Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">€{subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Discount</span>
              <span className="font-medium text-primary">
                -€{discount.toFixed(2)}
              </span>
            </div>
          )}
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between">
              <span className="font-semibold text-foreground">Total</span>
              <span className="text-2xl font-bold text-primary">
                €{total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Shipping calculated at next step
        </p>
      </div>

      {/* Next Button */}
      <div className="flex justify-end pt-4">
        <Button
          onClick={onNext}
          size="lg"
          className="gradient-emerald min-w-[200px]"
        >
          Continue to Checkout
        </Button>
      </div>
    </div>
  );
}
