import { NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/db/supabase';

function mapOrderItem(item: any) {
  return {
    id: item.id,
    orderId: item.order_id,
    productId: item.product_id,
    productName: item.product_name,
    productSku: item.product_sku,
    quantity: item.quantity,
    price: item.price,
    total: item.total,
    imageUrl: item.image_url,
  };
}

function mapOrder(order: any) {
  const items = (order.order_items || []).map(mapOrderItem);
  return {
    id: order.id,
    userId: order.user_id,
    orderNumber: order.order_number,
    status: order.status,
    subtotal: order.subtotal,
    shippingCost: order.shipping_cost,
    tax: order.tax,
    discount: order.discount,
    total: order.total,
    currency: order.currency,
    paymentMethod: order.payment_method,
    paymentStatus: order.payment_status,
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
    itemCount: items.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0),
    customerName: order.shipping_name,
    customerEmail: order.shipping_email,
  };
}

export async function GET() {
  try {
    const supabase = getSupabaseClient();

    const { data: orders, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }

    const result = (orders || []).map(mapOrder);

    return NextResponse.json({ orders: result, total: result.length });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
