'use client';

import { useCartStore } from '@/lib/store/cart-store';
import { useRegion } from '@/lib/config/region-context';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, Mail, Truck, Home } from 'lucide-react';

interface Step6ConfirmationProps {
  email: string;
  fullName: string;
  address: string;
  city: string;
  county: string;
  postcode: string;
  shippingMethod: 'standard' | 'express';
  onStartOver?: () => void;
}

const SHIPPING_LABELS: Record<'standard' | 'express', { name: string; estimatedDays: string }> = {
  standard: { name: 'Standard Shipping', estimatedDays: '3-5 business days' },
  express: { name: 'Express Shipping', estimatedDays: '1-2 business days' },
};

export function Step6Confirmation({
  email,
  fullName,
  address,
  city,
  county,
  postcode,
  shippingMethod,
}: Step6ConfirmationProps) {
  const { region, config } = useRegion();
  const clearCart = useCartStore((state) => state.clearCart);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const shipping = useCartStore((state) => state.getShippingCost());
  const total = useCartStore((state) => state.getTotal());

  const orderNumber = `PUXX-${Date.now().toString().slice(-8)}`;
  const shippingLabel = SHIPPING_LABELS[shippingMethod];

  const handleContinueShopping = () => {
    clearCart();
    window.location.href = `/${region}/products`;
  };

  const addressLine = [city, county, postcode].filter(Boolean).join(', ');

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <div className="bg-white rounded-lg border shadow-sm p-8 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
          <CheckCircle className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-3xl font-heading text-foreground mb-2">
          Order Confirmed!
        </h2>
        <p className="text-lg text-muted-foreground mb-6">
          Thank you for your purchase
        </p>
        <div className="inline-block bg-muted rounded-lg px-6 py-3">
          <p className="text-sm text-muted-foreground mb-1">Order Number</p>
          <p className="text-2xl font-bold text-primary">{orderNumber}</p>
        </div>
      </div>

      {/* Order Details */}
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" />
          Order Details
        </h3>
        <div className="space-y-4">
          {/* Email Confirmation */}
          <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
            <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground mb-1">
                Confirmation Email Sent
              </p>
              <p className="text-sm text-muted-foreground">
                We&apos;ve sent an order confirmation to{' '}
                <span className="font-medium text-foreground">{email}</span>
              </p>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
            <Home className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground mb-1">
                Shipping Address
              </p>
              <p className="text-sm text-muted-foreground">{fullName}</p>
              <p className="text-sm text-muted-foreground">{address}</p>
              <p className="text-sm text-muted-foreground">{addressLine}</p>
            </div>
          </div>

          {/* Shipping Method */}
          <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
            <Truck className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground mb-1">
                Delivery Method
              </p>
              <p className="text-sm text-muted-foreground">{shippingLabel.name}</p>
              <p className="text-sm text-muted-foreground">
                Estimated delivery: {shippingLabel.estimatedDays}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h3 className="font-semibold text-foreground mb-4">Order Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">{config.currencySymbol}{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-medium">
              {shipping === 0 ? (
                <span className="text-primary">FREE</span>
              ) : (
                `${config.currencySymbol}${shipping.toFixed(2)}`
              )}
            </span>
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between">
              <span className="font-semibold text-foreground">Total Paid</span>
              <span className="text-2xl font-bold text-primary">
                {config.currencySymbol}{total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* What's Next */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-3">What happens next?</h3>
        <ul className="space-y-2 text-sm text-blue-900">
          <li className="flex items-start gap-2">
            <span className="font-bold text-primary">1.</span>
            <span>You&apos;ll receive a confirmation email with your order details</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-primary">2.</span>
            <span>We&apos;ll prepare your order for shipment</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-primary">3.</span>
            <span>You&apos;ll receive tracking information once your order ships</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-primary">4.</span>
            <span>Your order will arrive in {shippingLabel.estimatedDays}</span>
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button asChild variant="outline" size="lg" className="flex-1">
          <a href={`/${region}/products`}>Continue Shopping</a>
        </Button>
        <Button
          onClick={handleContinueShopping}
          className="gradient-emerald flex-1"
          size="lg"
        >
          Clear Cart &amp; Continue
        </Button>
      </div>

      {/* Support Info */}
      <div className="text-center text-sm text-muted-foreground">
        <p>
          Need help?{' '}
          <a href="/contact" className="text-primary hover:underline font-medium">
            Contact our support team
          </a>
        </p>
      </div>
    </div>
  );
}
