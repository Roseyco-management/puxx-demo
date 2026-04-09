import { Product as DBProduct, Category } from '@/lib/db/schema';

// Extended product type with categories
export interface ProductWithCategories extends DBProduct {
  categories?: Category[];
}

// Product API response type
export interface ProductAPIResponse {
  success: boolean;
  product?: ProductWithCategories;
  error?: string;
}

// Products list API response type
export interface ProductsAPIResponse {
  success: boolean;
  count: number;
  products: DBProduct[];
  error?: string;
}

// Stock status helper
export function getStockStatus(quantity: number): {
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  label: string;
  className: string;
} {
  if (quantity <= 0) {
    return {
      status: 'out_of_stock',
      label: 'Out of Stock',
      className: 'text-red-600 bg-red-50',
    };
  }
  if (quantity <= 10) {
    return {
      status: 'low_stock',
      label: 'Low Stock',
      className: 'text-amber-600 bg-amber-50',
    };
  }
  return {
    status: 'in_stock',
    label: 'In Stock',
    className: 'text-green-600 bg-green-50',
  };
}

// Format price helper
export function formatPrice(price: string | number): string {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: 'EUR',
  }).format(numPrice);
}

// Get nicotine strength badge color
export function getStrengthBadgeColor(strength: string | null): string {
  if (!strength) return 'bg-gray-100 text-gray-800';

  const strengthNum = parseInt(strength.replace(/\D/g, ''));

  if (strengthNum <= 4) return 'bg-green-100 text-green-800';
  if (strengthNum <= 8) return 'bg-yellow-100 text-yellow-800';
  if (strengthNum <= 12) return 'bg-orange-100 text-orange-800';
  return 'bg-red-100 text-red-800';
}
