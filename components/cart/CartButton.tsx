'use client';

import * as React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore, cartSelectors } from '@/lib/store/cart-store';
import { cn } from '@/lib/utils';

interface CartButtonProps {
  variant?: 'default' | 'outline' | 'ghost';
  className?: string;
  showBadge?: boolean;
  onClick?: () => void;
}

export function CartButton({
  variant = 'ghost',
  className,
  showBadge = true,
  onClick,
}: CartButtonProps) {
  const itemCount = useCartStore(cartSelectors.itemCount);

  return (
    <Button
      variant={variant}
      size="icon"
      className={cn('relative', className)}
      onClick={onClick}
      aria-label={`Shopping cart with ${itemCount} items`}
    >
      <ShoppingCart className="h-5 w-5" />
      {showBadge && itemCount > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs font-bold bg-primary hover:bg-primary pointer-events-none"
        >
          {itemCount > 99 ? '99+' : itemCount}
        </Badge>
      )}
    </Button>
  );
}
