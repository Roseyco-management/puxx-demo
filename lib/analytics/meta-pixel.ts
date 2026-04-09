/**
 * Meta (Facebook) Pixel helper functions
 * Tracks e-commerce events for Facebook Ads conversion tracking
 */

// Declare fbq on window
declare global {
  interface Window {
    fbq: any
  }
}

/**
 * Track a custom Meta Pixel event
 */
export const trackMetaEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, parameters)
  }
}

/**
 * Track a custom Meta Pixel event (non-standard events)
 */
export const trackMetaCustomEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', eventName, parameters)
  }
}

/**
 * Track product view
 */
export const trackMetaViewContent = (params: {
  content_name: string
  content_ids: string[]
  content_type: 'product' | 'product_group'
  value: number
  currency: string
}) => {
  trackMetaEvent('ViewContent', params)
}

/**
 * Track add to cart
 */
export const trackMetaAddToCart = (params: {
  content_name: string
  content_ids: string[]
  content_type: 'product'
  value: number
  currency: string
}) => {
  trackMetaEvent('AddToCart', params)
}

/**
 * Track initiate checkout
 */
export const trackMetaInitiateCheckout = (params: {
  content_ids: string[]
  contents: Array<{ id: string; quantity: number }>
  value: number
  currency: string
  num_items: number
}) => {
  trackMetaEvent('InitiateCheckout', params)
}

/**
 * Track purchase (conversion)
 */
export const trackMetaPurchase = (params: {
  content_ids: string[]
  contents: Array<{ id: string; quantity: number }>
  value: number
  currency: string
  num_items: number
}) => {
  trackMetaEvent('Purchase', params)
}

/**
 * Track search
 */
export const trackMetaSearch = (searchQuery: string) => {
  trackMetaEvent('Search', {
    search_string: searchQuery,
  })
}

/**
 * Track add payment info
 */
export const trackMetaAddPaymentInfo = () => {
  trackMetaEvent('AddPaymentInfo')
}

/**
 * Track lead (newsletter signup, contact form)
 */
export const trackMetaLead = (params?: { content_name?: string }) => {
  trackMetaEvent('Lead', params)
}
