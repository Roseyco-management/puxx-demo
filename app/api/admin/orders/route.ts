import { NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/db/supabase';
import { mapOrder } from '@/lib/utils/order-mapping';

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
