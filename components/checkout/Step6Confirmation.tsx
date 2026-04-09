'use client';

import { useEffect } from 'react';
import { useCheckoutStore } from '@/lib/stores/checkout-store';
import { useCartStore } from '@/lib/stores/cart-store';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, Mail, Truck, Home } from 'lucide-react';

interface Step6ConfirmationProps {
  onStartOver?: () => void;
}

export function Step6Confirmation({ onStartOver }: Step6ConfirmationProps) {
  const { checkoutData, resetCheckout } = useCheckoutStore();
  const { clearCart, getTotalPrice } = useCartStore();

  const subtotal = getTotalPrice();
  const discount = checkoutData.couponDiscount || 0;
  const shipping = checkoutData.shippingMethod?.price || 0;
  const total = subtotal - discount + shipping;

  // Mock order number - in production this would come from the backend
  const orderNumber = `PUXX-${Date.now().toString().slice(-8)}`;

  // Clear cart and reset checkout on mount (simulating successful payment)
  useEffect(() => {
    // In production, this would only happen after successful payment confirmation
    // For now, we'll just simulate it
  }, []);

  const handleContinueShopping = () => {
    clearCart();
    resetCheckout();
    window.location.href = '/products';
  };

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
          {checkoutData.customerInfo && (
            <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
              <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground mb-1">
                  Confirmation Email Sent
                </p>
                <p className="text-sm text-muted-foreground">
                  We've sent an order confirmation to{' '}
                  <span className="font-medium text-foreground">
                    {checkoutData.customerInfo.email}
                  </span>
                </p>
              </div>
            </div>
          )}

          {/* Shipping Address */}
          {checkoutData.shippingAddress && (
            <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
              <Home className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground mb-1">
                  Shipping Address
                </p>
                <p className="text-sm text-muted-foreground">
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
            </div>
          )}

          {/* Shipping Method */}
          {checkoutData.shippingMethod && (
            <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
              <Truck className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground mb-1">
                  Delivery Method
                </p>
                <p className="text-sm text-muted-foreground">
                  {checkoutData.shippingMethod.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  Estimated delivery: {checkoutData.shippingMethod.estimatedDays}
                </p>
              </div>
            </div>
          )}
        </div>
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
              <span className="font-semibold text-foreground">Total Paid</span>
              <span className="text-2xl font-bold text-primary">
                €{total.toFixed(2)}
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
            <span>
              You'll receive a confirmation email with your order details
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-primary">2.</span>
            <span>We'll prepare your order for shipment</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-primary">3.</span>
            <span>
              You'll receive tracking information once your order ships
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-primary">4.</span>
            <span>
              Your order will arrive in {checkoutData.shippingMethod?.estimatedDays || '2-3 business days'}
            </span>
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button
          asChild
          variant="outline"
          size="lg"
          className="flex-1"
        >
          <a href="/account/orders">View Order History</a>
        </Button>
        <Button
          onClick={handleContinueShopping}
          className="gradient-emerald flex-1"
          size="lg"
        >
          Continue Shopping
        </Button>
      </div>

      {/* Support Info */}
      <div className="text-center text-sm text-muted-foreground">
        <p>
          Need help?{' '}
          <a
            href="/contact"
            className="text-primary hover:underline font-medium"
          >
            Contact our support team
          </a>
        </p>
      </div>
    </div>
  );
}
