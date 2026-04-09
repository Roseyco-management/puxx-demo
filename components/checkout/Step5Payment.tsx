'use client';

import { useCheckoutStore } from '@/lib/stores/checkout-store';
import { useCartStore } from '@/lib/stores/cart-store';
import { Button } from '@/components/ui/button';
import { ChevronLeft, CreditCard, Shield, Lock, AlertCircle } from 'lucide-react';

interface Step5PaymentProps {
  onNext: () => void;
  onPrevious: () => void;
}

export function Step5Payment({ onNext, onPrevious }: Step5PaymentProps) {
  const { checkoutData } = useCheckoutStore();
  const { getTotalPrice } = useCartStore();

  const subtotal = getTotalPrice();
  const discount = checkoutData.couponDiscount || 0;
  const shipping = checkoutData.shippingMethod?.price || 0;
  const total = subtotal - discount + shipping;

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
            <CreditCard className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-2xl font-heading text-foreground">
            Payment Details
          </h2>
        </div>
        <p className="text-muted-foreground ml-13">
          Secure payment powered by Worldpay
        </p>
      </div>

      {/* Payment Integration Placeholder */}
      <div className="bg-white rounded-lg border shadow-sm p-8">
        <div className="text-center space-y-6">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-100">
            <AlertCircle className="h-10 w-10 text-amber-600" />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">
              Payment Integration Pending
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              The Worldpay payment integration will be implemented by our payment specialist.
              This is a placeholder for the secure payment form.
            </p>
          </div>

          {/* What will be included */}
          <div className="bg-muted/50 rounded-lg p-6 text-left max-w-md mx-auto">
            <h4 className="font-semibold text-foreground mb-3">
              Payment Integration Will Include:
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Shield className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Secure Worldpay payment processing</span>
              </li>
              <li className="flex items-start gap-2">
                <CreditCard className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Credit/debit card payment form</span>
              </li>
              <li className="flex items-start gap-2">
                <Lock className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>PCI-compliant secure checkout</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>3D Secure authentication</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Security Badges */}
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-primary" />
            <span>SSL Encrypted</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span>PCI Compliant</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-primary" />
            <span>Worldpay Secure</span>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h3 className="font-semibold text-foreground mb-4">Order Summary</h3>
        <div className="space-y-3">
          {/* Customer Info */}
          {checkoutData.customerInfo && (
            <div className="pb-3 border-b">
              <p className="text-xs text-muted-foreground mb-1">Email</p>
              <p className="text-sm font-medium">{checkoutData.customerInfo.email}</p>
            </div>
          )}

          {/* Shipping Address */}
          {checkoutData.shippingAddress && (
            <div className="pb-3 border-b">
              <p className="text-xs text-muted-foreground mb-1">Shipping to</p>
              <p className="text-sm font-medium">
                {checkoutData.shippingAddress.fullName}
              </p>
              <p className="text-sm text-muted-foreground">
                {checkoutData.shippingAddress.addressLine1}
                {checkoutData.shippingAddress.addressLine2 &&
                  `, ${checkoutData.shippingAddress.addressLine2}`}
              </p>
              <p className="text-sm text-muted-foreground">
                {checkoutData.shippingAddress.city}
                {checkoutData.shippingAddress.county &&
                  `, ${checkoutData.shippingAddress.county}`}
                {checkoutData.shippingAddress.eircode &&
                  ` ${checkoutData.shippingAddress.eircode}`}
              </p>
            </div>
          )}

          {/* Shipping Method */}
          {checkoutData.shippingMethod && (
            <div className="pb-3 border-b">
              <p className="text-xs text-muted-foreground mb-1">Shipping Method</p>
              <p className="text-sm font-medium">
                {checkoutData.shippingMethod.name} - €
                {checkoutData.shippingMethod.price.toFixed(2)}
              </p>
            </div>
          )}

          {/* Price Breakdown */}
          <div className="space-y-2 pt-2">
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
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium">
                {shipping === 0 ? (
                  <span className="text-primary">FREE</span>
                ) : (
                  `€${shipping.toFixed(2)}`
                )}
              </span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between">
                <span className="font-semibold text-foreground">Total</span>
                <span className="text-2xl font-bold text-primary">
                  €{total.toFixed(2)}
                </span>
              </div>
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
          onClick={onNext}
          className="gradient-emerald min-w-[200px]"
          size="lg"
        >
          <Lock className="h-4 w-4 mr-2" />
          Proceed to Confirmation
        </Button>
      </div>
    </div>
  );
}
