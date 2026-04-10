import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/db/supabase';
import { getAdminUser } from '@/lib/auth/admin';
import { mapOrder } from '@/lib/utils/order-mapping';

export async function GET(request: NextRequest) {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get('status');
    const paymentStatusFilter = searchParams.get('paymentStatus');
    const search = searchParams.get('search');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const supabase = getSupabaseClient();

    let query = supabase
      .from('orders')
      .select('*, order_items(*)')
      .order('created_at', { ascending: false });

    if (statusFilter && statusFilter !== 'all') {
      query = query.eq('status', statusFilter);
    }

    if (paymentStatusFilter && paymentStatusFilter !== 'all') {
      query = query.eq('payment_status', paymentStatusFilter);
    }

    if (startDate) {
      query = query.gte('created_at', startDate);
    }

    if (endDate) {
      // Custom date pickers emit midnight UTC for the selected day.
      // Using .lte would exclude the rest of that day, so roll forward
      // 24 hours and use strict less-than to make endDate inclusive.
      const endInstant = new Date(endDate);
      if (!Number.isNaN(endInstant.getTime())) {
        const nextDay = new Date(endInstant.getTime() + 24 * 60 * 60 * 1000);
        query = query.lt('created_at', nextDay.toISOString());
      }
    }

    const { data: orders, error } = await query;

    if (error) {
      console.error('Error fetching orders:', error);
      return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }

    let result = (orders || []).map(mapOrder);

    if (search) {
      const needle = search.toLowerCase();
      result = result.filter((order) => {
        return (
          order.orderNumber.toLowerCase().includes(needle) ||
          order.customerName.toLowerCase().includes(needle) ||
          order.customerEmail.toLowerCase().includes(needle)
        );
      });
    }

    return NextResponse.json({ orders: result, total: result.length });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
