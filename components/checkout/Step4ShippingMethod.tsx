'use client';

import { useState } from 'react';
import { useCheckoutStore, ShippingMethod } from '@/lib/stores/checkout-store';
import { useCartStore } from '@/lib/stores/cart-store';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Truck, Zap, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step4ShippingMethodProps {
  onNext: () => void;
  onPrevious: () => void;
}

const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: 'standard',
    name: 'Standard Delivery',
    price: 5.99,
    estimatedDays: '2-3 business days',
  },
  {
    id: 'express',
    name: 'Express Delivery',
    price: 9.99,
    estimatedDays: '1-2 business days',
  },
];

export function Step4ShippingMethod({ onNext, onPrevious }: Step4ShippingMethodProps) {
  const { checkoutData, setShippingMethod } = useCheckoutStore();
  const { getTotalPrice } = useCartStore();
  const [selectedMethod, setSelectedMethod] = useState<string>(
    checkoutData.shippingMethod?.id || ''
  );

  const subtotal = getTotalPrice();
  const discount = checkoutData.couponDiscount || 0;
  const orderTotal = subtotal - discount;

  // Free shipping over €150
  const qualifiesForFreeShipping = orderTotal >= 150;

  const handleContinue = () => {
    const method = SHIPPING_METHODS.find((m) => m.id === selectedMethod);
    if (!method) return;

    // Apply free shipping if eligible
    const finalMethod = {
      ...method,
      price: selectedMethod === 'standard' && qualifiesForFreeShipping ? 0 : method.price,
    };

    setShippingMethod(finalMethod);
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
            <Truck className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-2xl font-heading text-foreground">
            Shipping Method
          </h2>
        </div>
        <p className="text-muted-foreground ml-13">
          Choose your preferred delivery option
        </p>
      </div>

      {/* Free Shipping Banner */}
      {qualifiesForFreeShipping && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20">
              <Check className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-primary">
                Congratulations! You qualify for free standard shipping
              </p>
              <p className="text-sm text-muted-foreground">
                Your order is over €150
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Not Qualified Banner */}
      {!qualifiesForFreeShipping && orderTotal > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <strong>Free shipping available!</strong> Add{' '}
            <span className="font-bold">
              €{(150 - orderTotal).toFixed(2)}
            </span>{' '}
            more to your order to qualify for free standard delivery.
          </p>
        </div>
      )}

      {/* Shipping Methods */}
      <div className="space-y-4">
        {SHIPPING_METHODS.map((method) => {
          const isSelected = selectedMethod === method.id;
          const isFree = method.id === 'standard' && qualifiesForFreeShipping;
          const displayPrice = isFree ? 0 : method.price;

          return (
            <button
              key={method.id}
              type="button"
              onClick={() => setSelectedMethod(method.id)}
              className={cn(
                'w-full bg-white rounded-lg border-2 shadow-sm p-6 transition-all text-left',
                'hover:shadow-md hover:border-primary/30',
                isSelected
                  ? 'border-primary shadow-md'
                  : 'border-gray-200'
              )}
            >
              <div className="flex items-start gap-4">
                {/* Radio Button */}
                <div className="flex items-center justify-center mt-1">
                  <div
                    className={cn(
                      'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all',
                      isSelected
                        ? 'border-primary bg-primary'
                        : 'border-gray-300'
                    )}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                </div>

                {/* Icon */}
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 flex-shrink-0">
                  {method.id === 'express' ? (
                    <Zap className="h-6 w-6 text-primary" />
                  ) : (
                    <Truck className="h-6 w-6 text-primary" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <h3 className="font-semibold text-foreground">
                      {method.name}
                    </h3>
                    <div className="text-right flex-shrink-0">
                      {isFree ? (
                        <span className="text-lg font-bold text-primary">
                          FREE
                        </span>
                      ) : (
                        <span className="text-lg font-bold text-foreground">
                          €{displayPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Estimated delivery: {method.estimatedDays}
                  </p>
                  {method.id === 'standard' && !isFree && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Free on orders over €150
                    </p>
                  )}
                  {method.id === 'express' && (
                    <p className="text-xs text-primary mt-2">
                      Fastest delivery option available
                    </p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
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
          {selectedMethod && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium">
                {selectedMethod === 'standard' && qualifiesForFreeShipping ? (
                  <span className="text-primary">FREE</span>
                ) : (
                  `€${(SHIPPING_METHODS.find((m) => m.id === selectedMethod)?.price || 0).toFixed(2)}`
                )}
              </span>
            </div>
          )}
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between">
              <span className="font-semibold text-foreground">Total</span>
              <span className="text-2xl font-bold text-primary">
                €
                {selectedMethod
                  ? (
                      orderTotal +
                      (selectedMethod === 'standard' && qualifiesForFreeShipping
                        ? 0
                        : SHIPPING_METHODS.find((m) => m.id === selectedMethod)?.price || 0)
                    ).toFixed(2)
                  : orderTotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          className="min-w-[140px]"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
        <Button
          onClick={handleContinue}
          disabled={!selectedMethod}
          className="gradient-emerald min-w-[200px]"
          size="lg"
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  );
}
