/**
 * Google Analytics 4 Helper Functions
 *
 * This module provides type-safe helper functions for tracking events in Google Analytics 4.
 * All events follow GA4's recommended e-commerce event structure.
 *
 * @see https://developers.google.com/analytics/devguides/collection/ga4/ecommerce
 */

// Extend Window interface to include gtag
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'set',
      targetId: string,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

/**
 * Product item structure for GA4 events
 */
export interface GAProductItem {
  item_id: string;
  item_name: string;
  item_category?: string;
  item_category2?: string;
  item_variant?: string;
  price: number;
  quantity?: number;
  index?: number;
}

/**
 * E-commerce event parameters
 */
interface EcommerceEventParams {
  currency?: string;
  value?: number;
  items?: GAProductItem[];
  transaction_id?: string;
  shipping?: number;
  tax?: number;
  coupon?: string;
}

/**
 * Check if Google Analytics is available
 */
export const isGAAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

/**
 * Send a custom event to Google Analytics
 *
 * @param eventName - Name of the event
 * @param params - Event parameters
 */
export const sendGAEvent = (
  eventName: string,
  params?: Record<string, any>
): void => {
  if (!isGAAvailable()) {
    console.warn('Google Analytics is not available');
    return;
  }

  try {
    window.gtag!('event', eventName, params);
  } catch (error) {
    console.error('Error sending GA event:', error);
  }
};

/**
 * Track page view
 *
 * @param url - Page URL
 * @param title - Page title
 */
export const trackPageView = (url: string, title?: string): void => {
  if (!isGAAvailable()) return;

  try {
    window.gtag!('event', 'page_view', {
      page_path: url,
      page_title: title,
    });
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

/**
 * Track when user views a product
 *
 * @param product - Product details
 */
export const trackViewItem = (product: {
  id: string | number;
  name: string;
  price: string | number;
  category?: string;
  variant?: string;
}): void => {
  if (!isGAAvailable()) return;

  const price = typeof product.price === 'string'
    ? parseFloat(product.price)
    : product.price;

  const items: GAProductItem[] = [
    {
      item_id: String(product.id),
      item_name: product.name,
      item_category: product.category,
      item_variant: product.variant,
      price: price,
      quantity: 1,
    },
  ];

  try {
    sendGAEvent('view_item', {
      currency: 'EUR',
      value: price,
      items,
    });
  } catch (error) {
    console.error('Error tracking view_item:', error);
  }
};

/**
 * Track when user adds item to cart
 *
 * @param product - Product details
 * @param quantity - Quantity added
 */
export const trackAddToCart = (
  product: {
    id: string | number;
    name: string;
    price: string | number;
    category?: string;
    variant?: string;
  },
  quantity: number = 1
): void => {
  if (!isGAAvailable()) return;

  const price = typeof product.price === 'string'
    ? parseFloat(product.price)
    : product.price;

  const items: GAProductItem[] = [
    {
      item_id: String(product.id),
      item_name: product.name,
      item_category: product.category,
      item_variant: product.variant,
      price: price,
      quantity,
    },
  ];

  try {
    sendGAEvent('add_to_cart', {
      currency: 'EUR',
      value: price * quantity,
      items,
    });
  } catch (error) {
    console.error('Error tracking add_to_cart:', error);
  }
};

/**
 * Track when user removes item from cart
 *
 * @param product - Product details
 * @param quantity - Quantity removed
 */
export const trackRemoveFromCart = (
  product: {
    id: string | number;
    name: string;
    price: string | number;
    category?: string;
    variant?: string;
  },
  quantity: number = 1
): void => {
  if (!isGAAvailable()) return;

  const price = typeof product.price === 'string'
    ? parseFloat(product.price)
    : product.price;

  const items: GAProductItem[] = [
    {
      item_id: String(product.id),
      item_name: product.name,
      item_category: product.category,
      item_variant: product.variant,
      price: price,
      quantity,
    },
  ];

  try {
    sendGAEvent('remove_from_cart', {
      currency: 'EUR',
      value: price * quantity,
      items,
    });
  } catch (error) {
    console.error('Error tracking remove_from_cart:', error);
  }
};

/**
 * Track when user views cart
 *
 * @param items - Cart items
 * @param totalValue - Total cart value
 */
export const trackViewCart = (
  items: Array<{
    id: string | number;
    name: string;
    price: string | number;
    quantity: number;
    category?: string;
    variant?: string;
  }>,
  totalValue: number
): void => {
  if (!isGAAvailable()) return;

  const gaItems: GAProductItem[] = items.map((item, index) => ({
    item_id: String(item.id),
    item_name: item.name,
    item_category: item.category,
    item_variant: item.variant,
    price: typeof item.price === 'string' ? parseFloat(item.price) : item.price,
    quantity: item.quantity,
    index,
  }));

  try {
    sendGAEvent('view_cart', {
      currency: 'EUR',
      value: totalValue,
      items: gaItems,
    });
  } catch (error) {
    console.error('Error tracking view_cart:', error);
  }
};

/**
 * Track when user begins checkout
 *
 * @param items - Cart items
 * @param totalValue - Total cart value
 */
export const trackBeginCheckout = (
  items: Array<{
    id: string | number;
    name: string;
    price: string | number;
    quantity: number;
    category?: string;
    variant?: string;
  }>,
  totalValue: number
): void => {
  if (!isGAAvailable()) return;

  const gaItems: GAProductItem[] = items.map((item, index) => ({
    item_id: String(item.id),
    item_name: item.name,
    item_category: item.category,
    item_variant: item.variant,
    price: typeof item.price === 'string' ? parseFloat(item.price) : item.price,
    quantity: item.quantity,
    index,
  }));

  try {
    sendGAEvent('begin_checkout', {
      currency: 'EUR',
      value: totalValue,
      items: gaItems,
    });
  } catch (error) {
    console.error('Error tracking begin_checkout:', error);
  }
};

/**
 * Track checkout progress steps
 *
 * @param step - Checkout step number (1-6)
 * @param stepName - Name of the step
 */
export const trackCheckoutProgress = (
  step: number,
  stepName: string
): void => {
  if (!isGAAvailable()) return;

  try {
    sendGAEvent('checkout_progress', {
      checkout_step: step,
      checkout_step_name: stepName,
    });
  } catch (error) {
    console.error('Error tracking checkout_progress:', error);
  }
};

/**
 * Track when user adds shipping info
 *
 * @param shippingMethod - Selected shipping method
 * @param shippingCost - Shipping cost
 */
export const trackAddShippingInfo = (
  shippingMethod: string,
  shippingCost: number
): void => {
  if (!isGAAvailable()) return;

  try {
    sendGAEvent('add_shipping_info', {
      currency: 'EUR',
      value: shippingCost,
      shipping_tier: shippingMethod,
    });
  } catch (error) {
    console.error('Error tracking add_shipping_info:', error);
  }
};

/**
 * Track when user adds payment info
 *
 * @param paymentMethod - Selected payment method
 */
export const trackAddPaymentInfo = (paymentMethod: string): void => {
  if (!isGAAvailable()) return;

  try {
    sendGAEvent('add_payment_info', {
      payment_type: paymentMethod,
    });
  } catch (error) {
    console.error('Error tracking add_payment_info:', error);
  }
};

/**
 * Track completed purchase
 *
 * @param transactionId - Unique order ID
 * @param items - Purchased items
 * @param totalValue - Order total
 * @param shipping - Shipping cost
 * @param tax - Tax amount
 * @param coupon - Coupon code used (optional)
 */
export const trackPurchase = (
  transactionId: string,
  items: Array<{
    id: string | number;
    name: string;
    price: string | number;
    quantity: number;
    category?: string;
    variant?: string;
  }>,
  totalValue: number,
  shipping: number = 0,
  tax: number = 0,
  coupon?: string
): void => {
  if (!isGAAvailable()) return;

  const gaItems: GAProductItem[] = items.map((item, index) => ({
    item_id: String(item.id),
    item_name: item.name,
    item_category: item.category,
    item_variant: item.variant,
    price: typeof item.price === 'string' ? parseFloat(item.price) : item.price,
    quantity: item.quantity,
    index,
  }));

  try {
    sendGAEvent('purchase', {
      transaction_id: transactionId,
      currency: 'EUR',
      value: totalValue,
      shipping,
      tax,
      coupon,
      items: gaItems,
    });
  } catch (error) {
    console.error('Error tracking purchase:', error);
  }
};

/**
 * Track newsletter signup
 *
 * @param method - Where the signup occurred (footer, popup, checkout, etc.)
 */
export const trackNewsletterSignup = (
  method: 'footer' | 'popup' | 'checkout' | 'other' = 'other'
): void => {
  if (!isGAAvailable()) return;

  try {
    sendGAEvent('newsletter_signup', {
      method,
    });
  } catch (error) {
    console.error('Error tracking newsletter_signup:', error);
  }
};

/**
 * Track search queries
 *
 * @param searchTerm - The search query
 */
export const trackSearch = (searchTerm: string): void => {
  if (!isGAAvailable()) return;

  try {
    sendGAEvent('search', {
      search_term: searchTerm,
    });
  } catch (error) {
    console.error('Error tracking search:', error);
  }
};

/**
 * Track form submissions (contact, support, etc.)
 *
 * @param formName - Name of the form
 * @param formId - ID of the form (optional)
 */
export const trackFormSubmit = (
  formName: string,
  formId?: string
): void => {
  if (!isGAAvailable()) return;

  try {
    sendGAEvent('form_submit', {
      form_name: formName,
      form_id: formId,
    });
  } catch (error) {
    console.error('Error tracking form_submit:', error);
  }
};

/**
 * Track clicks on external links
 *
 * @param url - External URL clicked
 * @param linkText - Link text/label
 */
export const trackOutboundLink = (
  url: string,
  linkText?: string
): void => {
  if (!isGAAvailable()) return;

  try {
    sendGAEvent('click', {
      link_url: url,
      link_text: linkText,
      outbound: true,
    });
  } catch (error) {
    console.error('Error tracking outbound link:', error);
  }
};

/**
 * Track social media interactions
 *
 * @param network - Social network (facebook, instagram, twitter, etc.)
 * @param action - Action taken (share, like, follow, etc.)
 * @param target - URL or content being shared
 */
export const trackSocialInteraction = (
  network: string,
  action: string,
  target?: string
): void => {
  if (!isGAAvailable()) return;

  try {
    sendGAEvent('social_interaction', {
      social_network: network,
      social_action: action,
      social_target: target,
    });
  } catch (error) {
    console.error('Error tracking social_interaction:', error);
  }
};

/**
 * Track file downloads
 *
 * @param fileName - Name of the file
 * @param fileUrl - URL of the file
 */
export const trackFileDownload = (
  fileName: string,
  fileUrl: string
): void => {
  if (!isGAAvailable()) return;

  try {
    sendGAEvent('file_download', {
      file_name: fileName,
      file_url: fileUrl,
    });
  } catch (error) {
    console.error('Error tracking file_download:', error);
  }
};

/**
 * Set user properties (for segmentation)
 *
 * @param properties - User properties
 */
export const setUserProperties = (
  properties: Record<string, string | number | boolean>
): void => {
  if (!isGAAvailable()) return;

  try {
    window.gtag!('set', 'user_properties', properties);
  } catch (error) {
    console.error('Error setting user properties:', error);
  }
};

/**
 * Track exceptions/errors
 *
 * @param description - Error description
 * @param fatal - Whether the error was fatal
 */
export const trackException = (
  description: string,
  fatal: boolean = false
): void => {
  if (!isGAAvailable()) return;

  try {
    sendGAEvent('exception', {
      description,
      fatal,
    });
  } catch (error) {
    console.error('Error tracking exception:', error);
  }
};

/**
 * Track timing/performance
 *
 * @param name - Name of the timing
 * @param value - Time value in milliseconds
 * @param category - Category of the timing
 */
export const trackTiming = (
  name: string,
  value: number,
  category?: string
): void => {
  if (!isGAAvailable()) return;

  try {
    sendGAEvent('timing_complete', {
      name,
      value,
      event_category: category,
    });
  } catch (error) {
    console.error('Error tracking timing:', error);
  }
};

// Export all functions
export default {
  isGAAvailable,
  sendGAEvent,
  trackPageView,
  trackViewItem,
  trackAddToCart,
  trackRemoveFromCart,
  trackViewCart,
  trackBeginCheckout,
  trackCheckoutProgress,
  trackAddShippingInfo,
  trackAddPaymentInfo,
  trackPurchase,
  trackNewsletterSignup,
  trackSearch,
  trackFormSubmit,
  trackOutboundLink,
  trackSocialInteraction,
  trackFileDownload,
  setUserProperties,
  trackException,
  trackTiming,
};
