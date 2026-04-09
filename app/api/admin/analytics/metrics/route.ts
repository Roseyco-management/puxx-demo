import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/db/supabase';
import { getDateRangeFromPeriod } from '@/lib/analytics/utils';
import type { TimePeriod, AnalyticsMetrics } from '@/lib/analytics/types';

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
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

    // Get total revenue and orders for period
    const { data: periodOrders } = await supabase
      .from('orders')
      .select('id, total, created_at, user_id')
      .gte('created_at', dateRange.start.toISOString())
      .lte('created_at', dateRange.end.toISOString())
      .eq('payment_status', 'succeeded');

    const totalRevenue = periodOrders?.reduce((sum, order) => {
      return sum + parseFloat(order.total || '0');
    }, 0) || 0;

    const totalOrders = periodOrders?.length || 0;
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Get customer metrics
    const { data: allSuccessfulOrders } = await supabase
      .from('orders')
      .select('id, user_id, total')
      .eq('payment_status', 'succeeded');

    // Group by user to calculate customer metrics
    const customerOrdersMap = new Map<number, { count: number; total: number }>();

    allSuccessfulOrders?.forEach(order => {
      if (!order.user_id) return;

      const existing = customerOrdersMap.get(order.user_id) || { count: 0, total: 0 };
      customerOrdersMap.set(order.user_id, {
        count: existing.count + 1,
        total: existing.total + parseFloat(order.total || '0'),
      });
    });

    const customerOrders = Array.from(customerOrdersMap.values());
    const returningCustomers = customerOrders.filter(c => c.count > 1).length;
    const totalCustomers = customerOrders.length;
    const returnCustomerRate = totalCustomers > 0
      ? (returningCustomers / totalCustomers) * 100
      : 0;

    const customerLifetimeValue = totalCustomers > 0
      ? customerOrders.reduce((sum, c) => sum + c.total, 0) / totalCustomers
      : 0;

    // Calculate conversion rate (orders / unique visitors)
    // Note: This requires GA4 integration for real visitor data
    // Using estimated conversion rate based on orders
    const estimatedVisitors = totalOrders * 50; // Assume 2% conversion
    const conversionRate = estimatedVisitors > 0
      ? (totalOrders / estimatedVisitors) * 100
      : 0;

    // Get comparison data for previous period
    const periodLength = dateRange.end.getTime() - dateRange.start.getTime();
    const previousStart = new Date(dateRange.start.getTime() - periodLength);
    const previousEnd = new Date(dateRange.start);

    const { data: previousOrders } = await supabase
      .from('orders')
      .select('id, total')
      .gte('created_at', previousStart.toISOString())
      .lte('created_at', previousEnd.toISOString())
      .eq('payment_status', 'succeeded');

    const previousRevenue = previousOrders?.reduce((sum, order) => {
      return sum + parseFloat(order.total || '0');
    }, 0) || 0;

    const previousOrdersCount = previousOrders?.length || 0;

    const metrics: AnalyticsMetrics = {
      totalRevenue,
      totalOrders,
      averageOrderValue: avgOrderValue,
      conversionRate,
      returnCustomerRate,
      customerLifetimeValue,
    };

    return NextResponse.json({
      data: metrics,
      period,
      dateRange: {
        start: dateRange.start.toISOString(),
        end: dateRange.end.toISOString(),
      },
      comparison: {
        revenue: previousRevenue,
        orders: previousOrdersCount,
      },
    });
  } catch (error) {
    console.error('Analytics metrics error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics metrics' },
      { status: 500 }
    );
  }
}
