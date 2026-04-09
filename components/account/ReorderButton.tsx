'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/stores/cart-store';

interface ReorderButtonProps {
  orderId: number;
  items: Array<{
    orderItem: {
      productId: number;
      productName: string;
      productSku: string | null;
      price: string;
      quantity: number;
    };
    product: {
      id: number;
      name: string;
      imageUrl: string | null;
      flavor?: string | null;
      nicotineStrength?: string | null;
      price: string;
    } | null;
  }>;
}

export default function ReorderButton({ orderId, items }: ReorderButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  const handleReorder = async () => {
    setIsAdding(true);

    try {
      // Add all items from the order to the cart
      items.forEach(({ orderItem, product }) => {
        if (product) {
          addItem({
            productId: product.id,
            name: product.name,
            flavor: product.flavor ?? 'Default',
            nicotineStrength: product.nicotineStrength ?? '0mg',
            price: parseFloat(product.price),
            imageUrl: product.imageUrl ?? undefined,
          });
        }
      });

      // Show success state
      setIsAdded(true);

      // Redirect to cart after a short delay
      setTimeout(() => {
        router.push('/cart');
      }, 1000);
    } catch (error) {
      console.error('Error reordering:', error);
      setIsAdding(false);
    }
  };

  if (isAdded) {
    return (
      <Button
        className="w-full bg-green-600 text-white hover:bg-green-700"
        disabled
      >
        <Check className="mr-2 h-4 w-4" />
        Added to Cart
      </Button>
    );
  }

  return (
    <Button
      onClick={handleReorder}
      disabled={isAdding || items.length === 0}
      className="w-full bg-green-600 text-white hover:bg-green-700"
    >
      <ShoppingCart className="mr-2 h-4 w-4" />
      {isAdding ? 'Adding to Cart...' : 'Reorder Items'}
    </Button>
  );
}
