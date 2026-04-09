/**
 * CART STORE INTEGRATION TEST
 *
 * This file demonstrates the cart store functionality and can be used for testing.
 * Run this in a Node.js environment or browser console to verify the store works correctly.
 */

import { useCartStore, CART_CONSTANTS, CartErrorType, toCartProduct } from './index';
import type { Product } from '@/lib/db/schema';

// Mock products for testing
const mockProducts: Product[] = [
  {
    id: 1,
    name: 'PUXX Ice Cool Mint 12mg',
    slug: 'puxx-ice-cool-mint-12mg',
    description: 'Premium nicotine pouches with refreshing mint flavor',
    price: '8.99',
    compareAtPrice: null,
    sku: 'PUXX-ICM-12',
    nicotineStrength: '12mg',
    flavor: 'Ice Cool Mint',
    pouchesPerCan: 20,
    ingredients: 'Plant fibers, nicotine, flavorings',
    usageInstructions: 'Place one pouch under your upper lip',
    imageUrl: '/images/products/ice-cool-mint.jpg',
    imageGallery: [],
    stockQuantity: 100,
    isActive: true,
    isFeatured: true,
    metaTitle: null,
    metaDescription: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'PUXX Berry Blast 6mg',
    slug: 'puxx-berry-blast-6mg',
    description: 'Delicious berry flavor with smooth nicotine delivery',
    price: '7.99',
    compareAtPrice: null,
    sku: 'PUXX-BB-6',
    nicotineStrength: '6mg',
    flavor: 'Berry Blast',
    pouchesPerCan: 20,
    ingredients: 'Plant fibers, nicotine, flavorings',
    usageInstructions: 'Place one pouch under your upper lip',
    imageUrl: '/images/products/berry-blast.jpg',
    imageGallery: [],
    stockQuantity: 50,
    isActive: true,
    isFeatured: false,
    metaTitle: null,
    metaDescription: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: 'PUXX Citrus Fresh 9mg',
    slug: 'puxx-citrus-fresh-9mg',
    description: 'Zesty citrus flavor for a refreshing experience',
    price: '8.49',
    compareAtPrice: '9.99',
    sku: 'PUXX-CF-9',
    nicotineStrength: '9mg',
    flavor: 'Citrus Fresh',
    pouchesPerCan: 20,
    ingredients: 'Plant fibers, nicotine, flavorings',
    usageInstructions: 'Place one pouch under your upper lip',
    imageUrl: '/images/products/citrus-fresh.jpg',
    imageGallery: [],
    stockQuantity: 0, // Out of stock
    isActive: true,
    isFeatured: false,
    metaTitle: null,
    metaDescription: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

/**
 * Test Suite: Basic Cart Operations
 */
export function testBasicOperations() {
  console.log('=== Testing Basic Cart Operations ===\n');

  const store = useCartStore.getState();

  // Clear cart before testing
  store.clearCart();
  console.log('✓ Cart cleared');

  // Test 1: Add item to cart
  const product1 = toCartProduct(mockProducts[0]);
  store.addItem(product1, 2);
  console.log(`✓ Added 2x ${product1.name}`);
  console.log(`  Cart items: ${store.getItemCount()}`);
  console.log(`  Total quantity: ${store.getTotalItems()}`);

  // Test 2: Add another item
  const product2 = toCartProduct(mockProducts[1]);
  store.addItem(product2, 3);
  console.log(`✓ Added 3x ${product2.name}`);
  console.log(`  Cart items: ${store.getItemCount()}`);
  console.log(`  Total quantity: ${store.getTotalItems()}`);

  // Test 3: Update quantity
  store.updateQuantity(product1.id, 5);
  console.log(`✓ Updated ${product1.name} quantity to 5`);
  const item = store.getItem(product1.id);
  console.log(`  Current quantity: ${item?.quantity}`);

  // Test 4: Remove item
  store.removeItem(product2.id);
  console.log(`✓ Removed ${product2.name}`);
  console.log(`  Cart items: ${store.getItemCount()}`);

  console.log('\n');
}

/**
 * Test Suite: Cart Validation
 */
export function testValidation() {
  console.log('=== Testing Cart Validation ===\n');

  const store = useCartStore.getState();
  store.clearCart();

  // Test 1: Minimum order validation (need 5 tins)
  const product1 = toCartProduct(mockProducts[0]);
  store.addItem(product1, 2);
  let validation = store.validate();
  console.log(`Added 2 tins - Valid: ${validation.isValid}`);
  console.log(`  Errors: ${validation.errors.map(e => e.message).join(', ')}`);

  // Test 2: Add more to meet minimum
  store.addItem(product1, 3);
  validation = store.validate();
  console.log(`\nAdded 3 more (total 5) - Valid: ${validation.isValid}`);
  console.log(`  Has minimum order: ${store.hasMinimumOrder()}`);

  // Test 3: Out of stock validation
  try {
    const outOfStockProduct = toCartProduct(mockProducts[2]);
    store.addItem(outOfStockProduct, 1);
    console.log('\n✗ Should have thrown out of stock error');
  } catch (error) {
    console.log(`\n✓ Out of stock validation works: ${(error as Error).message}`);
  }

  // Test 4: Stock quantity validation
  const product2 = toCartProduct(mockProducts[1]);
  store.addItem(product2, 30); // Only 50 in stock
  try {
    store.updateQuantity(product2.id, 51); // Try to exceed stock
    console.log('✗ Should have thrown insufficient stock error');
  } catch (error) {
    console.log(`✓ Stock validation works: ${(error as Error).message}`);
  }

  console.log('\n');
}

/**
 * Test Suite: Pricing and Shipping
 */
export function testPricingAndShipping() {
  console.log('=== Testing Pricing and Shipping ===\n');

  const store = useCartStore.getState();
  store.clearCart();

  const product1 = toCartProduct(mockProducts[0]); // €8.99
  const product2 = toCartProduct(mockProducts[1]); // €7.99

  // Test 1: Cart under free shipping threshold
  store.addItem(product1, 5); // €44.95
  console.log(`Cart subtotal: €${store.getSubtotal().toFixed(2)}`);
  console.log(`Shipping cost: €${store.getShippingCost().toFixed(2)}`);
  console.log(`Total: €${store.getTotal().toFixed(2)}`);
  console.log(`Free shipping: ${store.isFreeShipping()}`);

  const validation = store.validate();
  if (validation.warnings.length > 0) {
    console.log(`Warnings: ${validation.warnings[0].message}`);
  }

  // Test 2: Cart over free shipping threshold
  store.addItem(product1, 12); // Total 17 × €8.99 = €152.83
  console.log(`\nAdded more items...`);
  console.log(`Cart subtotal: €${store.getSubtotal().toFixed(2)}`);
  console.log(`Shipping cost: €${store.getShippingCost().toFixed(2)}`);
  console.log(`Total: €${store.getTotal().toFixed(2)}`);
  console.log(`Free shipping: ${store.isFreeShipping()}`);

  console.log('\n');
}

/**
 * Test Suite: Edge Cases
 */
export function testEdgeCases() {
  console.log('=== Testing Edge Cases ===\n');

  const store = useCartStore.getState();
  store.clearCart();

  const product1 = toCartProduct(mockProducts[0]);

  // Test 1: Update quantity to 0 (should remove)
  store.addItem(product1, 5);
  console.log(`Added item, cart has ${store.getItemCount()} items`);
  store.updateQuantity(product1.id, 0);
  console.log(`✓ Updated to 0, cart has ${store.getItemCount()} items (should be 0)`);

  // Test 2: Remove non-existent item
  store.removeItem(999);
  console.log('✓ Removing non-existent item doesn\'t crash');

  // Test 3: Get non-existent item
  const item = store.getItem(999);
  console.log(`✓ Getting non-existent item returns: ${item === undefined ? 'undefined' : 'something'}`);

  // Test 4: Add same item multiple times
  store.clearCart();
  store.addItem(product1, 2);
  store.addItem(product1, 3);
  const finalItem = store.getItem(product1.id);
  console.log(`✓ Adding same item twice: quantity is ${finalItem?.quantity} (should be 5)`);

  // Test 5: Maximum quantity validation
  try {
    store.clearCart();
    store.addItem(product1, CART_CONSTANTS.MAX_QUANTITY_PER_ITEM + 1);
    console.log('✗ Should have thrown max quantity error');
  } catch (error) {
    console.log(`✓ Max quantity validation: ${(error as Error).message}`);
  }

  console.log('\n');
}

/**
 * Run All Tests
 */
export function runAllTests() {
  console.log('\n');
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║     PUXX IRELAND CART STORE - INTEGRATION TESTS           ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('\n');

  testBasicOperations();
  testValidation();
  testPricingAndShipping();
  testEdgeCases();

  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║                    ALL TESTS COMPLETED                     ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('\n');

  // Final state
  const store = useCartStore.getState();
  console.log('Final Cart State:');
  console.log(`  Items: ${store.getItemCount()}`);
  console.log(`  Total Quantity: ${store.getTotalItems()}`);
  console.log(`  Subtotal: €${store.getSubtotal().toFixed(2)}`);
  console.log(`  Shipping: €${store.getShippingCost().toFixed(2)}`);
  console.log(`  Total: €${store.getTotal().toFixed(2)}`);
  console.log(`  Valid: ${store.validate().isValid}`);
  console.log('\n');
}

// Export for use in browser console or Node.js
if (typeof window !== 'undefined') {
  (window as any).testCart = {
    runAllTests,
    testBasicOperations,
    testValidation,
    testPricingAndShipping,
    testEdgeCases,
    store: useCartStore,
  };
  console.log('Cart tests available via: window.testCart.runAllTests()');
}
