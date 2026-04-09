"use client";

import { useState, useEffect } from 'react';
import { Download, RefreshCw } from 'lucide-react';
import { MetricCards } from '@/components/admin/analytics/MetricCards';
import { RevenueChart } from '@/components/admin/analytics/RevenueChart';
import { CategorySalesChart } from '@/components/admin/analytics/CategorySalesChart';
import { TopProductsChart } from '@/components/admin/analytics/TopProductsChart';
import { ConversionFunnelChart } from '@/components/admin/analytics/ConversionFunnelChart';
import { TimePeriodSelector } from '@/components/admin/analytics/TimePeriodSelector';
import { exportToCSV } from '@/lib/analytics/utils';
import type { TimePeriod, AnalyticsMetrics, RevenueBreakdown, TopProduct, ConversionFunnelData } from '@/lib/analytics/types';

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<TimePeriod>('month');
  const [customRange, setCustomRange] = useState<{ start: Date; end: Date } | undefined>();
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<AnalyticsMetrics | null>(null);
  const [revenueData, setRevenueData] = useState<RevenueBreakdown | null>(null);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [comparison, setComparison] = useState<{ revenue: number; orders: number } | undefined>();

  useEffect(() => {
    fetchAnalyticsData();
  }, [period, customRange]);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ period });
      if (period === 'custom' && customRange) {
        params.append('startDate', customRange.start.toISOString());
        params.append('endDate', customRange.end.toISOString());
      }

      // Fetch all data in parallel
      const [metricsRes, revenueRes, productsRes] = await Promise.all([
        fetch(`/api/admin/analytics/metrics?${params}`),
        fetch(`/api/admin/analytics/revenue?${params}`),
        fetch(`/api/admin/analytics/products?${params}`),
      ]);

      if (!metricsRes.ok || !revenueRes.ok || !productsRes.ok) {
        throw new Error('Failed to fetch analytics data');
      }

      const metricsData = await metricsRes.json();
      const revenueDataRes = await revenueRes.json();
      const productsData = await productsRes.json();

      setMetrics(metricsData.data);
      setComparison(metricsData.comparison);
      setRevenueData(revenueDataRes.data);
      setTopProducts(productsData.data.topProducts);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePeriodChange = (newPeriod: TimePeriod, range?: { start: Date; end: Date }) => {
    setPeriod(newPeriod);
    setCustomRange(range);
  };

  const handleExportAll = () => {
    if (!metrics || !revenueData) return;

    const exportData = {
      period,
      metrics,
      topProducts: topProducts.slice(0, 10),
      categoryBreakdown: revenueData.byCategory,
    };

    const csvData = [
      {
        'Total Revenue': metrics.totalRevenue,
        'Total Orders': metrics.totalOrders,
        'Average Order Value': metrics.averageOrderValue,
        'Conversion Rate': `${metrics.conversionRate.toFixed(2)}%`,
        'Return Customer Rate': `${metrics.returnCustomerRate.toFixed(2)}%`,
        'Customer Lifetime Value': metrics.customerLifetimeValue,
      },
    ];

    exportToCSV(csvData, `analytics-overview-${new Date().toISOString().split('T')[0]}.csv`);
  };

  // Mock conversion funnel data
  const conversionFunnelData: ConversionFunnelData[] = [
    { stage: 'Visitors', visitors: metrics?.totalOrders ? metrics.totalOrders * 50 : 1000, conversionRate: 100 },
    { stage: 'Product Views', visitors: metrics?.totalOrders ? metrics.totalOrders * 25 : 500, conversionRate: 50 },
    { stage: 'Add to Cart', visitors: metrics?.totalOrders ? metrics.totalOrders * 10 : 200, conversionRate: 40 },
    { stage: 'Checkout', visitors: metrics?.totalOrders ? metrics.totalOrders * 5 : 100, conversionRate: 50 },
    { stage: 'Purchase', visitors: metrics?.totalOrders || 50, conversionRate: metrics?.conversionRate || 2 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Analytics Overview
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Comprehensive insights into your store's performance
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={fetchAnalyticsData}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={handleExportAll}
            disabled={loading || !metrics}
            className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Time Period Selector */}
      <div className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
        <TimePeriodSelector selected={period} onChange={handlePeriodChange} />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600" />
        </div>
      ) : (
        <>
          {/* Metrics Cards */}
          {metrics && (
            <MetricCards
              totalRevenue={metrics.totalRevenue}
              totalOrders={metrics.totalOrders}
              averageOrderValue={metrics.averageOrderValue}
              conversionRate={metrics.conversionRate}
              returnCustomerRate={metrics.returnCustomerRate}
              customerLifetimeValue={metrics.customerLifetimeValue}
              comparison={comparison}
            />
          )}

          {/* Revenue Chart */}
          {revenueData && (
            <RevenueChart
              data={revenueData.byDay}
              title="Revenue Over Time"
              subtitle={`Daily revenue for the selected period`}
              height={400}
            />
          )}

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Sales */}
            {revenueData && revenueData.byCategory.length > 0 && (
              <CategorySalesChart
                data={revenueData.byCategory}
                title="Sales by Category"
                subtitle="Revenue distribution across categories"
              />
            )}

            {/* Top Products */}
            {topProducts.length > 0 && (
              <TopProductsChart
                data={topProducts}
                title="Top Products"
                subtitle="Top 10 products by revenue"
              />
            )}
          </div>

          {/* Conversion Funnel */}
          <ConversionFunnelChart
            data={conversionFunnelData}
            title="Conversion Funnel"
            subtitle="Customer journey from visitor to purchase"
          />

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/admin/analytics/revenue"
              className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors group"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-emerald-600">
                Revenue Analytics
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Detailed revenue breakdowns and trends
              </p>
            </a>
            <a
              href="/admin/analytics/products"
              className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors group"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-emerald-600">
                Product Performance
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Analyze product metrics and conversion rates
              </p>
            </a>
            <a
              href="/admin/analytics/traffic"
              className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors group"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-emerald-600">
                Traffic Analytics
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                View traffic sources and visitor behavior
              </p>
            </a>
          </div>
        </>
      )}
    </div>
  );
}
