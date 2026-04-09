'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Plus, Minus, Trash2, ShoppingCart, X, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/store/cart-store';
import { CART_CONSTANTS } from '@/lib/store/cart-types';

const FREE_SHIPPING_THRESHOLD = CART_CONSTANTS.FREE_SHIPPING_THRESHOLD;

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const total = useCartStore((state) => state.getTotal());
  const shippingCost = useCartStore((state) => state.getShippingCost());
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  if (!isOpen) {
    return null;
  }

  const amountUntilFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  console.log('CartDrawer - items:', items);
  console.log('CartDrawer - items.length:', items.length);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 9999
    }} onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          right: 0,
          top: 0,
          width: '500px',
          height: '100vh',
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-2px 0 10px rgba(0,0,0,0.1)'
        }}
      >
        {/* Header */}
        <div style={{
          backgroundColor: '#16a34a',
          padding: '24px',
          color: 'white',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ShoppingBag style={{ width: '24px', height: '24px' }} />
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>Shopping Cart</h2>
                <p style={{ fontSize: '14px', margin: '4px 0 0 0' }}>
                  {items.length === 0
                    ? 'Your cart is empty'
                    : `${items.length} ${items.length === 1 ? 'item' : 'items'}`}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                padding: '8px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                color: 'white'
              }}
            >
              <X style={{ width: '20px', height: '20px' }} />
            </button>
          </div>

          {/* Free Shipping Progress */}
          {subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD && (
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: '8px',
              padding: '12px',
              border: '1px solid rgba(255,255,255,0.4)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
                <span>Free shipping progress</span>
                <span style={{ fontWeight: 'bold' }}>€{amountUntilFreeShipping.toFixed(2)} to go</span>
              </div>
              <div style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '9999px', height: '8px', overflow: 'hidden' }}>
                <div
                  style={{
                    backgroundColor: 'white',
                    height: '100%',
                    borderRadius: '9999px',
                    width: `${Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%`,
                    transition: 'width 0.5s'
                  }}
                />
              </div>
            </div>
          )}

          {subtotal >= FREE_SHIPPING_THRESHOLD && (
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: '8px',
              padding: '12px',
              border: '1px solid rgba(255,255,255,0.4)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShoppingCart style={{ width: '16px', height: '16px' }} />
                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>You qualify for FREE shipping!</span>
              </div>
            </div>
          )}
        </div>

        {/* Cart Items */}
        <div style={{
          flex: 1,
          backgroundColor: '#fafafa',
          overflowY: 'auto',
          padding: '20px'
        }}>
          {items.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              color: '#6b7280'
            }}>
              <ShoppingBag style={{ width: '48px', height: '48px', margin: '0 auto 16px', opacity: 0.5 }} />
              <p style={{ margin: 0, fontSize: '16px' }}>Your cart is empty</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {items.map((item) => {
                const itemTotal = parseFloat(item.product.price) * item.quantity;

                return (
                  <div
                    key={item.product.id}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      backgroundColor: 'white',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                      alignItems: 'center'
                    }}
                  >
                    {/* Product Image */}
                    <div style={{
                      position: 'relative',
                      width: '60px',
                      height: '60px',
                      flexShrink: 0,
                      borderRadius: '6px',
                      overflow: 'hidden',
                      backgroundColor: '#f3f4f6'
                    }}>
                      {item.product.imageUrl ? (
                        <Image
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="60px"
                        />
                      ) : (
                        <div style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Package style={{ width: '24px', height: '24px', color: '#9ca3af' }} />
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{
                        margin: 0,
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#111827',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {item.product.name}
                      </h4>
                      <p style={{
                        margin: '4px 0 0 0',
                        fontSize: '13px',
                        color: '#6b7280'
                      }}>
                        {item.product.nicotineStrength && `${item.product.nicotineStrength}`}
                        {item.product.flavor && ` • ${item.product.flavor}`}
                      </p>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginTop: '8px'
                      }}>
                        {/* Quantity Controls */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          backgroundColor: '#f9fafb',
                          borderRadius: '6px',
                          padding: '4px 8px',
                          border: '1px solid #e5e7eb'
                        }}>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer',
                              padding: '2px',
                              display: 'flex',
                              alignItems: 'center',
                              opacity: item.quantity <= 1 ? 0.4 : 1
                            }}
                          >
                            <Minus style={{ width: '14px', height: '14px', color: '#374151' }} />
                          </button>
                          <span style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            minWidth: '20px',
                            textAlign: 'center',
                            color: '#111827'
                          }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              padding: '2px',
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            <Plus style={{ width: '14px', height: '14px', color: '#374151' }} />
                          </button>
                        </div>

                        <span style={{
                          fontSize: '15px',
                          fontWeight: '700',
                          color: '#111827'
                        }}>
                          €{itemTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.product.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ef4444',
                        flexShrink: 0
                      }}
                      title="Remove item"
                    >
                      <Trash2 style={{ width: '18px', height: '18px' }} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer with totals */}
        <div style={{
          borderTop: '1px solid #d1d5db',
          backgroundColor: 'white',
          padding: '24px',
          flexShrink: 0
        }}>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#6b7280' }}>Subtotal</span>
              <span style={{ fontWeight: '500' }}>€{subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#6b7280' }}>Shipping</span>
              {shippingCost === 0 ? (
                <span style={{ fontWeight: 'bold', color: '#16a34a' }}>FREE</span>
              ) : (
                <span style={{ fontWeight: '500' }}>€{shippingCost.toFixed(2)}</span>
              )}
            </div>
            <div style={{ height: '1px', backgroundColor: '#e5e7eb', margin: '8px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Total</span>
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#16a34a' }}>
                €{total.toFixed(2)}
              </span>
            </div>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <Button
              asChild
              className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-base font-semibold"
              onClick={onClose}
            >
              <Link href="/checkout">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Checkout Now
              </Link>
            </Button>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <Button
              asChild
              variant="outline"
              className="w-full h-11 border-2 border-gray-300"
              onClick={onClose}
            >
              <Link href="/cart">View Full Cart</Link>
            </Button>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontSize: '12px',
            color: '#6b7280',
            paddingTop: '8px'
          }}>
            <svg
              style={{ width: '16px', height: '16px' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span>Secure checkout powered by Stripe</span>
          </div>
        </div>
      </div>
    </div>
  );
}
