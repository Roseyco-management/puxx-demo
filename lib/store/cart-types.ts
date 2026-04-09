import { Product } from '@/lib/db/schema';

// Cart product interface - essential product information for cart
export interface CartProduct {
  id: number;
  name: string;
  slug: string;
  price: string;
  nicotineStrength: string | null;
  flavor: string | null;
  imageUrl: string | null;
  stockQuantity: number;
  sku: string | null;
}

// Cart item with quantity
export interface CartItem {
  product: CartProduct;
  quantity: number;
}

// Product subset needed for cart conversion
export type ProductForCart = Pick<
  Product,
  'id' | 'name' | 'slug' | 'price' | 'nicotineStrength' | 'flavor' | 'imageUrl' | 'stockQuantity' | 'sku'
>;

// Convert DB Product to CartProduct
export function toCartProduct(product: ProductForCart): CartProduct {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    nicotineStrength: product.nicotineStrength,
    flavor: product.flavor,
    imageUrl: product.imageUrl,
    stockQuantity: product.stockQuantity,
    sku: product.sku,
  };
}

// Cart validation constants
export const CART_CONSTANTS = {
  MIN_ORDER_QUANTITY: 5, // Minimum 5 tins per order
  FREE_SHIPPING_THRESHOLD: 150, // Free shipping over €150
  MAX_QUANTITY_PER_ITEM: 100, // Maximum quantity per product
} as const;

// Cart validation errors
export enum CartErrorType {
  MINIMUM_ORDER = 'MINIMUM_ORDER',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  INSUFFICIENT_STOCK = 'INSUFFICIENT_STOCK',
  MAX_QUANTITY_EXCEEDED = 'MAX_QUANTITY_EXCEEDED',
  PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND',
}

// Cart validation result
export interface CartValidation {
  isValid: boolean;
  errors: {
    type: CartErrorType;
    message: string;
    productId?: number;
  }[];
  warnings: {
    message: string;
  }[];
}
