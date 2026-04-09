import { NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/db/supabase';

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

    const result = (orders || []).map((order: any) => ({
      ...order,
      items: order.order_items || [],
      itemCount: (order.order_items || []).reduce((sum: number, item: any) => sum + item.quantity, 0),
      customerName: order.shipping_name,
      customerEmail: order.shipping_email,
    }));

    return NextResponse.json({ orders: result, total: result.length });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
