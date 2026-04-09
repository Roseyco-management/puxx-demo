import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  CartItem,
  CartProduct,
  CartValidation,
  CartErrorType,
  CART_CONSTANTS,
} from './cart-types';

// Cart state interface
interface CartState {
  items: CartItem[];
  isHydrated: boolean;
}

// Cart actions interface
interface CartActions {
  addItem: (product: CartProduct, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getItem: (productId: number) => CartItem | undefined;
  setHydrated: () => void;
}

// Cart computed values interface
interface CartComputed {
  getItemCount: () => number;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getShippingCost: () => number;
  getTotal: () => number;
  validate: () => CartValidation;
  hasMinimumOrder: () => boolean;
  isFreeShipping: () => boolean;
}

// Complete cart store interface
export interface CartStore extends CartState, CartActions, CartComputed {}

// Helper function to calculate price
const parsePrice = (price: string): number => {
  return parseFloat(price) || 0;
};

// Helper function to validate stock
const validateStock = (
  product: CartProduct,
  requestedQuantity: number,
  currentQuantity: number = 0
): { isValid: boolean; error?: { type: CartErrorType; message: string } } => {
  const totalQuantity = requestedQuantity + currentQuantity;

  if (product.stockQuantity <= 0) {
    return {
      isValid: false,
      error: {
        type: CartErrorType.OUT_OF_STOCK,
        message: `${product.name} is currently out of stock`,
      },
    };
  }

  if (totalQuantity > product.stockQuantity) {
    return {
      isValid: false,
      error: {
        type: CartErrorType.INSUFFICIENT_STOCK,
        message: `Only ${product.stockQuantity} units of ${product.name} available`,
      },
    };
  }

  if (totalQuantity > CART_CONSTANTS.MAX_QUANTITY_PER_ITEM) {
    return {
      isValid: false,
      error: {
        type: CartErrorType.MAX_QUANTITY_EXCEEDED,
        message: `Maximum ${CART_CONSTANTS.MAX_QUANTITY_PER_ITEM} units per product`,
      },
    };
  }

  return { isValid: true };
};

// Create the cart store
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      isHydrated: false,

      // Set hydrated flag
      setHydrated: () => {
        set({ isHydrated: true });
      },

      // Add item to cart
      addItem: (product: CartProduct, quantity = 1) => {
        try {
          const { items } = get();
          const existingItem = items.find((item) => item.product.id === product.id);

          // Validate stock
          const stockValidation = validateStock(
            product,
            quantity,
            existingItem?.quantity || 0
          );

          if (!stockValidation.isValid && stockValidation.error) {
            console.error('Stock validation failed:', stockValidation.error.message);
            throw new Error(stockValidation.error.message);
          }

          if (existingItem) {
            // Update existing item
            set({
              items: items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            });
          } else {
            // Add new item
            set({
              items: [...items, { product, quantity }],
            });
          }
        } catch (error) {
          console.error('Error adding item to cart:', error);
          throw error;
        }
      },

      // Remove item from cart
      removeItem: (productId: number) => {
        try {
          const { items } = get();
          set({
            items: items.filter((item) => item.product.id !== productId),
          });
        } catch (error) {
          console.error('Error removing item from cart:', error);
          throw error;
        }
      },

      // Update item quantity
      updateQuantity: (productId: number, quantity: number) => {
        try {
          const { items } = get();
          const item = items.find((item) => item.product.id === productId);

          if (!item) {
            throw new Error('Product not found in cart');
          }

          // Remove item if quantity is 0 or less
          if (quantity <= 0) {
            get().removeItem(productId);
            return;
          }

          // Validate stock for new quantity
          const stockValidation = validateStock(item.product, quantity);

          if (!stockValidation.isValid && stockValidation.error) {
            console.error('Stock validation failed:', stockValidation.error.message);
            throw new Error(stockValidation.error.message);
          }

          // Update quantity
          set({
            items: items.map((item) =>
              item.product.id === productId ? { ...item, quantity } : item
            ),
          });
        } catch (error) {
          console.error('Error updating cart quantity:', error);
          throw error;
        }
      },

      // Clear cart
      clearCart: () => {
        try {
          set({ items: [] });
        } catch (error) {
          console.error('Error clearing cart:', error);
          throw error;
        }
      },

      // Get specific item
      getItem: (productId: number) => {
        const { items } = get();
        return items.find((item) => item.product.id === productId);
      },

      // Get total number of unique items
      getItemCount: () => {
        const { items } = get();
        return items.length;
      },

      // Get total quantity of all items
      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },

      // Get cart subtotal
      getSubtotal: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          const price = parsePrice(item.product.price);
          return total + price * item.quantity;
        }, 0);
      },

      // Get shipping cost
      getShippingCost: () => {
        const subtotal = get().getSubtotal();
        return subtotal >= CART_CONSTANTS.FREE_SHIPPING_THRESHOLD ? 0 : 10; // €10 flat rate or free
      },

      // Get total (subtotal + shipping)
      getTotal: () => {
        const subtotal = get().getSubtotal();
        const shipping = get().getShippingCost();
        return subtotal + shipping;
      },

      // Check if cart meets minimum order requirement
      hasMinimumOrder: () => {
        const totalItems = get().getTotalItems();
        return totalItems >= CART_CONSTANTS.MIN_ORDER_QUANTITY;
      },

      // Check if cart qualifies for free shipping
      isFreeShipping: () => {
        const subtotal = get().getSubtotal();
        return subtotal >= CART_CONSTANTS.FREE_SHIPPING_THRESHOLD;
      },

      // Validate cart
      validate: (): CartValidation => {
        const { items } = get();
        const errors: CartValidation['errors'] = [];
        const warnings: CartValidation['warnings'] = [];

        // Check if cart is empty
        if (items.length === 0) {
          return {
            isValid: false,
            errors: [
              {
                type: CartErrorType.MINIMUM_ORDER,
                message: 'Your cart is empty',
              },
            ],
            warnings: [],
          };
        }

        // Check minimum order quantity
        const totalItems = get().getTotalItems();
        if (totalItems < CART_CONSTANTS.MIN_ORDER_QUANTITY) {
          errors.push({
            type: CartErrorType.MINIMUM_ORDER,
            message: `Minimum order is ${CART_CONSTANTS.MIN_ORDER_QUANTITY} tins. You have ${totalItems} tin${totalItems !== 1 ? 's' : ''}.`,
          });
        }

        // Check stock availability for each item
        items.forEach((item) => {
          if (item.product.stockQuantity <= 0) {
            errors.push({
              type: CartErrorType.OUT_OF_STOCK,
              message: `${item.product.name} is out of stock`,
              productId: item.product.id,
            });
          } else if (item.quantity > item.product.stockQuantity) {
            errors.push({
              type: CartErrorType.INSUFFICIENT_STOCK,
              message: `Only ${item.product.stockQuantity} units of ${item.product.name} available`,
              productId: item.product.id,
            });
          }
        });

        // Add warning if close to free shipping
        const subtotal = get().getSubtotal();
        const freeShippingThreshold = CART_CONSTANTS.FREE_SHIPPING_THRESHOLD;
        if (subtotal > 0 && subtotal < freeShippingThreshold) {
          const remaining = freeShippingThreshold - subtotal;
          warnings.push({
            message: `Add €${remaining.toFixed(2)} more for free shipping!`,
          });
        }

        return {
          isValid: errors.length === 0,
          errors,
          warnings,
        };
      },
    }),
    {
      name: 'puxx-cart-storage',
      storage: createJSONStorage(() => {
        // Use localStorage in browser, return mock in SSR
        if (typeof window !== 'undefined') {
          return localStorage;
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
      // Only persist items, not computed values
      partialize: (state) => ({
        items: state.items,
      }),
      // Set hydrated flag after rehydration
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);

// Hook to check if store is ready (hydrated)
export const useCartReady = () => {
  return useCartStore((state) => state.isHydrated);
};

// Selectors for better performance
export const cartSelectors = {
  items: (state: CartStore) => state.items,
  itemCount: (state: CartStore) => state.getItemCount(),
  totalItems: (state: CartStore) => state.getTotalItems(),
  subtotal: (state: CartStore) => state.getSubtotal(),
  shippingCost: (state: CartStore) => state.getShippingCost(),
  total: (state: CartStore) => state.getTotal(),
  hasMinimumOrder: (state: CartStore) => state.hasMinimumOrder(),
  isFreeShipping: (state: CartStore) => state.isFreeShipping(),
  validation: (state: CartStore) => state.validate(),
};

// Helper function to format currency
export const formatCartPrice = (amount: number): string => {
  return new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
};
