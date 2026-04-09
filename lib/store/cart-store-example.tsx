/**
 * CART STORE USAGE EXAMPLES
 *
 * This file contains comprehensive examples of how to use the PUXX Ireland cart store.
 * Copy these patterns into your components as needed.
 */

'use client';

import { useCartStore, useCartReady, cartSelectors, formatCartPrice, toCartProduct } from './index';
import type { Product } from '@/lib/db/schema';

// ============================================
// EXAMPLE 1: Add to Cart Button
// ============================================
export function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const getItem = useCartStore((state) => state.getItem);
  const isReady = useCartReady();

  const cartItem = getItem(product.id);
  const quantityInCart = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    try {
      // Convert DB product to cart product format
      const cartProduct = toCartProduct(product);

      // Add 1 unit to cart
      addItem(cartProduct, 1);

      alert(`Added ${product.name} to cart!`);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to add to cart');
    }
  };

  // Don't render until hydrated to avoid hydration mismatch
  if (!isReady) {
    return <button disabled>Loading...</button>;
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handleAddToCart}
        disabled={product.stockQuantity <= 0}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
      >
        {product.stockQuantity <= 0 ? 'Out of Stock' : 'Add to Cart'}
      </button>
      {quantityInCart > 0 && (
        <p className="text-sm text-gray-600 text-center">
          {quantityInCart} in cart
        </p>
      )}
    </div>
  );
}

// ============================================
// EXAMPLE 2: Cart Summary Display
// ============================================
export function CartSummary() {
  const subtotal = useCartStore(cartSelectors.subtotal);
  const shippingCost = useCartStore(cartSelectors.shippingCost);
  const total = useCartStore(cartSelectors.total);
  const isFreeShipping = useCartStore(cartSelectors.isFreeShipping);
  const hasMinimumOrder = useCartStore(cartSelectors.hasMinimumOrder);
  const validation = useCartStore(cartSelectors.validation);
  const isReady = useCartReady();

  if (!isReady) {
    return <div>Loading cart...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-bold">Order Summary</h2>

      {/* Subtotal */}
      <div className="flex justify-between">
        <span className="text-gray-600">Subtotal</span>
        <span className="font-semibold">{formatCartPrice(subtotal)}</span>
      </div>

      {/* Shipping */}
      <div className="flex justify-between">
        <span className="text-gray-600">Shipping</span>
        <span className="font-semibold">
          {isFreeShipping ? (
            <span className="text-green-600">FREE</span>
          ) : (
            formatCartPrice(shippingCost)
          )}
        </span>
      </div>

      {/* Total */}
      <div className="flex justify-between text-lg font-bold pt-4 border-t">
        <span>Total</span>
        <span>{formatCartPrice(total)}</span>
      </div>

      {/* Validation Messages */}
      {validation.warnings.map((warning, index) => (
        <div key={index} className="bg-blue-50 text-blue-700 p-3 rounded text-sm">
          {warning.message}
        </div>
      ))}

      {validation.errors.map((error, index) => (
        <div key={index} className="bg-red-50 text-red-700 p-3 rounded text-sm">
          {error.message}
        </div>
      ))}

      {/* Checkout Button */}
      <button
        disabled={!validation.isValid || !hasMinimumOrder}
        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

// ============================================
// EXAMPLE 3: Cart Item with Quantity Controls
// ============================================
export function CartItemRow({ productId }: { productId: number }) {
  const getItem = useCartStore((state) => state.getItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const isReady = useCartReady();

  const item = getItem(productId);

  if (!isReady || !item) {
    return null;
  }

  const { product, quantity } = item;
  const itemTotal = parseFloat(product.price) * quantity;

  const handleIncrement = () => {
    try {
      updateQuantity(product.id, quantity + 1);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to update quantity');
    }
  };

  const handleDecrement = () => {
    try {
      if (quantity > 1) {
        updateQuantity(product.id, quantity - 1);
      } else {
        removeItem(product.id);
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to update quantity');
    }
  };

  const handleRemove = () => {
    if (confirm(`Remove ${product.name} from cart?`)) {
      removeItem(product.id);
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg">
      {/* Product Image */}
      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-20 h-20 object-cover rounded"
        />
      )}

      {/* Product Info */}
      <div className="flex-1">
        <h3 className="font-semibold">{product.name}</h3>
        {product.nicotineStrength && (
          <p className="text-sm text-gray-600">{product.nicotineStrength}</p>
        )}
        {product.flavor && (
          <p className="text-sm text-gray-600">{product.flavor}</p>
        )}
        <p className="text-sm font-semibold mt-1">{formatCartPrice(parseFloat(product.price))}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleDecrement}
          className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
        >
          −
        </button>
        <span className="w-12 text-center font-semibold">{quantity}</span>
        <button
          onClick={handleIncrement}
          disabled={quantity >= product.stockQuantity}
          className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          +
        </button>
      </div>

      {/* Item Total */}
      <div className="text-right">
        <p className="font-semibold">{formatCartPrice(itemTotal)}</p>
        <button
          onClick={handleRemove}
          className="text-sm text-red-600 hover:text-red-700 mt-1"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

// ============================================
// EXAMPLE 4: Cart Badge (for header/nav)
// ============================================
export function CartBadge() {
  const totalItems = useCartStore(cartSelectors.totalItems);
  const isReady = useCartReady();

  if (!isReady) {
    return <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse" />;
  }

  if (totalItems === 0) {
    return null;
  }

  return (
    <div className="relative">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
        {totalItems > 99 ? '99+' : totalItems}
      </span>
    </div>
  );
}

// ============================================
// EXAMPLE 5: Full Cart Page
// ============================================
export function CartPage() {
  const items = useCartStore(cartSelectors.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalItems = useCartStore(cartSelectors.totalItems);
  const isReady = useCartReady();

  const handleClearCart = () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };

  if (!isReady) {
    return <div>Loading cart...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Add some products to get started!</p>
        <a href="/products" className="bg-blue-600 text-white px-6 py-3 rounded-lg inline-block">
          Browse Products
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Shopping Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
        </h1>
        <button
          onClick={handleClearCart}
          className="text-red-600 hover:text-red-700 text-sm"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItemRow key={item.product.id} productId={item.product.id} />
          ))}
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}

// ============================================
// EXAMPLE 6: Product Quantity Selector
// ============================================
export function ProductQuantitySelector({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = React.useState(1);

  const handleAddToCart = () => {
    try {
      const cartProduct = toCartProduct(product);
      addItem(cartProduct, quantity);
      alert(`Added ${quantity} x ${product.name} to cart!`);
      setQuantity(1); // Reset quantity after adding
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to add to cart');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="font-semibold">Quantity:</label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-8 h-8 rounded border border-gray-300 hover:bg-gray-100"
          >
            −
          </button>
          <input
            type="number"
            min="1"
            max={product.stockQuantity}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-16 text-center border border-gray-300 rounded px-2 py-1"
          />
          <button
            onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
            disabled={quantity >= product.stockQuantity}
            className="w-8 h-8 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
          >
            +
          </button>
        </div>
        <span className="text-sm text-gray-600">
          {product.stockQuantity} available
        </span>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={product.stockQuantity <= 0}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
      >
        Add {quantity} to Cart
      </button>
    </div>
  );
}

// Note: Add 'use client' directive and proper imports when using these examples in your app
import React from 'react';
