import type { OrderItem, OrderStatus, PaymentStatus, OrderWithItems } from '@/lib/types/orders';

export function mapOrderItem(item: any): OrderItem {
  return {
    id: item.id,
    orderId: item.order_id,
    productId: item.product_id,
    productName: item.product_name,
    productSku: item.product_sku,
    quantity: item.quantity,
    price: item.price,
    total: item.total,
    imageUrl: item.image_url ?? item.products?.image_url,
  };
}

export function mapOrder(order: any): OrderWithItems {
  const items = (order.order_items || []).map(mapOrderItem);
  return {
    id: order.id,
    userId: order.user_id,
    orderNumber: order.order_number,
    status: order.status as OrderStatus,
    subtotal: order.subtotal,
    shippingCost: order.shipping_cost,
    tax: order.tax,
    discount: order.discount,
    total: order.total,
    currency: order.currency,
    paymentMethod: order.payment_method,
    paymentStatus: order.payment_status as PaymentStatus,
    stripePaymentIntentId: order.stripe_payment_intent_id,
    shippingName: order.shipping_name,
    shippingEmail: order.shipping_email,
    shippingPhone: order.shipping_phone,
    shippingAddress: order.shipping_address,
    shippingCity: order.shipping_city,
    shippingPostcode: order.shipping_postcode,
    shippingCountry: order.shipping_country,
    notes: order.notes,
    createdAt: order.created_at,
    updatedAt: order.updated_at,
    completedAt: order.completed_at,
    items,
    itemCount: items.reduce((sum: number, item: OrderItem) => sum + (item.quantity || 0), 0),
    customerName: order.shipping_name,
    customerEmail: order.shipping_email,
  };
}
