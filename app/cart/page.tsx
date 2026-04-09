'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore, useCartReady } from '@/lib/store/cart-store';

export default function CartPage() {
  const isHydrated = useCartReady();
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const totalItems = useCartStore((state) => state.getTotalItems());
  const shipping = useCartStore((state) => state.getShippingCost());
  const total = useCartStore((state) => state.getTotal());

  // Loading state (waiting for hydration)
  if (!isHydrated) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent mb-4"></div>
              <p className="text-lg text-muted-foreground">Loading your cart...</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Empty cart state
  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-muted mb-8">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Start shopping to find your perfect nicotine pouches!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-emerald">
                <Link href="/products">
                  Browse Products
                  <ShoppingBag className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/">
                  Back to Home
                  <ArrowLeft className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Cart with items
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-heading mb-2">
            Shopping Cart
          </h1>
          <p className="text-muted-foreground">
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </p>
        </div>

        {/* Cart Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-xl border-2 shadow-sm p-6 hover:border-primary/50 transition-colors"
              >
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-muted">
                      {item.product.imageUrl ? (
                        <Image
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <Package className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-heading text-lg mb-1">
                          <Link
                            href={`/products/${item.product.slug}`}
                            className="hover:text-primary transition-colors"
                          >
                            {item.product.name}
                          </Link>
                        </h3>
                        <div className="flex gap-3 text-sm text-muted-foreground">
                          {item.product.flavor && <span>{item.product.flavor}</span>}
                          {item.product.nicotineStrength && (
                            <>
                              <span>•</span>
                              <span>{item.product.nicotineStrength}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <p className="text-lg font-bold">
                        €{(parseFloat(item.product.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-semibold w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.product.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-xl border-2 shadow-lg p-6">
              <h2 className="text-xl font-heading mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-base">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-primary">FREE</span>
                    ) : (
                      `€${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>

                {!useCartStore.getState().isFreeShipping() && shipping > 0 && (
                  <div className="bg-muted/50 rounded-lg p-3 text-sm">
                    <p className="text-muted-foreground">
                      Add <span className="font-bold text-foreground">€{(150 - subtotal).toFixed(2)}</span> more for FREE shipping!
                    </p>
                  </div>
                )}

                <div className="border-t-2 pt-4 flex justify-between text-lg">
                  <span className="font-heading">Total</span>
                  <span className="font-bold text-primary text-xl">
                    €{total.toFixed(2)}
                  </span>
                </div>
              </div>

              <Button asChild size="lg" className="w-full gradient-emerald mb-4">
                <Link href="/checkout">
                  Proceed to Checkout
                </Link>
              </Button>

              <div className="text-xs text-center text-muted-foreground">
                Secure checkout powered by Worldpay
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
