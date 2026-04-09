import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/db/supabase';
import { getDateRangeFromPeriod } from '@/lib/analytics/utils';
import type { TimePeriod, ProductPerformance } from '@/lib/analytics/types';

export async function GET(request: NextRequest) {
  const supabase = getSupabaseClient();
  try {
    const searchParams = request.nextUrl.searchParams;
    const period = (searchParams.get('period') || 'month') as TimePeriod;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    let dateRange;
    if (period === 'custom' && startDate && endDate) {
      dateRange = {
        start: new Date(startDate),
        end: new Date(endDate),
      };
    } else {
      dateRange = getDateRangeFromPeriod(period);
    }

    // Get product sales performance
    const { data: orderItems } = await supabase
      .from('order_items')
      .select(`
        product_id,
        product_name,
        product_sku,
        total,
        quantity,
        order_id,
        orders!inner (
          created_at,
          payment_status
        )
      `)
      .gte('orders.created_at', dateRange.start.toISOString())
      .lte('orders.created_at', dateRange.end.toISOString())
      .eq('orders.payment_status', 'succeeded');

    // Group by product
    const productSalesMap = new Map<number, {
      name: string;
      sku: string;
      revenue: number;
      orderIds: Set<number>;
      quantity: number;
    }>();

    orderItems?.forEach((item: any) => {
      const existing = productSalesMap.get(item.product_id) || {
        name: item.product_name,
        sku: item.product_sku,
        revenue: 0,
        orderIds: new Set(),
        quantity: 0,
      };

      productSalesMap.set(item.product_id, {
        name: item.product_name,
        sku: item.product_sku,
        revenue: existing.revenue + parseFloat(item.total || '0'),
        orderIds: existing.orderIds.add(item.order_id),
        quantity: existing.quantity + (item.quantity || 0),
      });
    });

    const productSales = Array.from(productSalesMap.entries()).map(([productId, data]) => ({
      productId,
      productName: data.name,
      productSku: data.sku,
      revenue: data.revenue,
      orders: data.orderIds.size,
      quantity: data.quantity,
    })).sort((a, b) => b.revenue - a.revenue);

    // Get add to cart data
    const { data: cartItems } = await supabase
      .from('cart_items')
      .select('product_id, user_id')
      .gte('created_at', dateRange.start.toISOString())
      .lte('created_at', dateRange.end.toISOString());

    const addToCartMap = new Map<number, Set<number>>();
    cartItems?.forEach((item: any) => {
      const users = addToCartMap.get(item.product_id) || new Set();
      users.add(item.user_id);
      addToCartMap.set(item.product_id, users);
    });

    // Get all products with stock info
    const { data: allProducts } = await supabase
      .from('products')
      .select('id, name, sku, stock_quantity, price')
      .eq('is_active', true);

    // Combine data into product performance metrics
    const productPerformance: ProductPerformance[] = (allProducts || []).map((product: any) => {
      const sales = productSales.find(s => s.productId === product.id);
      const addToCarts = addToCartMap.get(product.id)?.size || 0;
      const purchases = sales ? sales.orders : 0;

      // Calculate rates (using mock view data - integrate with GA4 for real data)
      const views = Math.max(addToCarts * 3, purchases * 5); // Estimate based on cart adds
      const addToCartRate = views > 0 ? (addToCarts / views) * 100 : 0;
      const purchaseRate = addToCarts > 0 ? (purchases / addToCarts) * 100 : 0;

      return {
        id: product.id,
        name: product.name,
        sku: product.sku || '',
        views,
        addToCartRate,
        purchaseRate,
        revenue: sales ? sales.revenue : 0,
        profitMargin: null, // Would need cost data
        stockQuantity: product.stock_quantity,
      };
    });

    // Sort by revenue descending
    productPerformance.sort((a, b) => b.revenue - a.revenue);

    // Get top products by revenue (for charts)
    const topProducts = productSales.slice(0, 10).map(product => ({
      id: product.productId,
      name: product.productName,
      revenue: product.revenue,
      orders: product.orders,
      quantity: product.quantity,
    }));

    return NextResponse.json({
      data: {
        performance: productPerformance,
        topProducts,
      },
      period,
      dateRange: {
        start: dateRange.start.toISOString(),
        end: dateRange.end.toISOString(),
      },
    });
  } catch (error) {
    console.error('Analytics products error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product analytics' },
      { status: 500 }
    );
  }
}
