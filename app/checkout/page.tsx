'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Package, CreditCard, Truck, Lock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCartStore, useCartReady } from '@/lib/store/cart-store';

export default function CheckoutPage() {
  const isHydrated = useCartReady();
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const shippingCost = useCartStore((state) => state.getShippingCost());
  const total = useCartStore((state) => state.getTotal());
  const [currentStep, setCurrentStep] = useState(1);

  // Loading state (waiting for hydration)
  if (!isHydrated) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent mb-4"></div>
          <p className="text-lg text-muted-foreground">Loading checkout...</p>
        </div>
      </main>
    );
  }

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-heading mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Add some products before proceeding to checkout
          </p>
          <Button asChild size="lg" className="gradient-emerald">
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b-2">
          <div>
            <h1 className="text-3xl sm:text-4xl font-heading mb-2">Checkout</h1>
            <p className="text-muted-foreground">Complete your purchase securely</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/cart">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Cart
            </Link>
          </Button>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[
              { num: 1, label: 'Information', icon: Package },
              { num: 2, label: 'Shipping', icon: Truck },
              { num: 3, label: 'Payment', icon: CreditCard },
            ].map((step, index) => (
              <div key={step.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`flex items-center justify-center h-12 w-12 rounded-full border-2 transition-colors ${
                      currentStep >= step.num
                        ? 'bg-primary border-primary text-white'
                        : 'bg-white border-muted-foreground/30 text-muted-foreground'
                    }`}
                  >
                    {currentStep > step.num ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <step.icon className="h-6 w-6" />
                    )}
                  </div>
                  <p className="text-xs sm:text-sm font-medium mt-2 text-center">
                    {step.label}
                  </p>
                </div>
                {index < 2 && (
                  <div
                    className={`h-0.5 flex-1 transition-colors ${
                      currentStep > step.num ? 'bg-primary' : 'bg-muted-foreground/30'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border-2 shadow-lg p-6 lg:p-8">
              <h2 className="text-2xl font-heading mb-6">Contact & Shipping Information</h2>

              <form className="space-y-6">
                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">1</span>
                    </div>
                    Contact Information
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" placeholder="+353 ..." required />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="space-y-4 pt-6 border-t">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">2</span>
                    </div>
                    Shipping Address
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="Street address" required />
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" required />
                    </div>
                    <div>
                      <Label htmlFor="county">County</Label>
                      <Input id="county" placeholder="e.g., Dublin" required />
                    </div>
                    <div>
                      <Label htmlFor="eircode">Eircode</Label>
                      <Input id="eircode" placeholder="Optional" />
                    </div>
                  </div>
                </div>

                {/* Shipping Method */}
                <div className="space-y-4 pt-6 border-t">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">3</span>
                    </div>
                    Shipping Method
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer hover:border-primary transition-colors">
                      <div className="flex items-center gap-3">
                        <input type="radio" name="shipping" value="standard" defaultChecked />
                        <div>
                          <p className="font-semibold">Standard Shipping</p>
                          <p className="text-sm text-muted-foreground">3-5 business days</p>
                        </div>
                      </div>
                      <span className="font-bold">
                        {shippingCost === 0 ? (
                          <span className="text-primary">FREE</span>
                        ) : (
                          `€${shippingCost.toFixed(2)}`
                        )}
                      </span>
                    </label>
                    <label className="flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer hover:border-primary transition-colors">
                      <div className="flex items-center gap-3">
                        <input type="radio" name="shipping" value="express" />
                        <div>
                          <p className="font-semibold">Express Shipping</p>
                          <p className="text-sm text-muted-foreground">1-2 business days</p>
                        </div>
                      </div>
                      <span className="font-bold">€9.99</span>
                    </label>
                  </div>
                </div>

                {/* Proceed to Payment Button */}
                <div className="pt-6">
                  <Button type="submit" size="lg" className="w-full gradient-emerald text-lg">
                    <Lock className="mr-2 h-5 w-5" />
                    Proceed to Payment
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-3">
                    Your payment information is encrypted and secure
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Order Summary */}
              <div className="bg-white rounded-xl border-2 shadow-lg p-6">
                <h2 className="text-lg font-heading mb-4">Order Summary</h2>

                {/* Items */}
                <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        {item.product.imageUrl ? (
                          <Image
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <Package className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                        <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="font-medium text-sm truncate">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">{item.product.nicotineStrength}</p>
                        <p className="text-sm font-semibold mt-1">
                          €{(parseFloat(item.product.price) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-3 border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">€{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-semibold">
                      {shippingCost === 0 ? (
                        <span className="text-primary">FREE</span>
                      ) : (
                        `€${shippingCost.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t-2 pt-3">
                    <span>Total</span>
                    <span className="text-primary">€{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="bg-muted/50 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Lock className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">Secure SSL encryption</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">30-day return policy</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Truck className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">Free shipping over €150</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
