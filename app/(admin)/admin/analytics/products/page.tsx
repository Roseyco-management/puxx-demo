"use client";

import { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw, Package, TrendingUp, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { ProductPerformanceTable } from '@/components/admin/analytics/ProductPerformanceTable';
import { TopProductsChart } from '@/components/admin/analytics/TopProductsChart';
import { TimePeriodSelector } from '@/components/admin/analytics/TimePeriodSelector';
import { formatCurrency, formatNumber, formatPercentage } from '@/lib/analytics/utils';
import type { TimePeriod, ProductPerformance, TopProduct } from '@/lib/analytics/types';

export default function ProductAnalyticsPage() {
  const [period, setPeriod] = useState<TimePeriod>('month');
  const [customRange, setCustomRange] = useState<{ start: Date; end: Date } | undefined>();
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState<{
    performance: ProductPerformance[];
    topProducts: TopProduct[];
  } | null>(null);

  useEffect(() => {
    fetchProductData();
  }, [period, customRange]);

  const fetchProductData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ period });
      if (period === 'custom' && customRange) {
        params.append('startDate', customRange.start.toISOString());
        params.append('endDate', customRange.end.toISOString());
      }

      const response = await fetch(`/api/admin/analytics/products?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product data');
      }

      const result = await response.json();
      setProductData(result.data);
    } catch (error) {
      console.error('Failed to fetch product data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePeriodChange = (newPeriod: TimePeriod, range?: { start: Date; end: Date }) => {
    setPeriod(newPeriod);
    setCustomRange(range);
  };

  const getTotalRevenue = () => {
    if (!productData) return 0;
    return productData.performance.reduce((sum, p) => sum + p.revenue, 0);
  };

  const getAverageConversion = () => {
    if (!productData || productData.performance.length === 0) return 0;
    const total = productData.performance.reduce((sum, p) => sum + p.purchaseRate, 0);
    return total / productData.performance.length;
  };

  const getTotalProducts = () => {
    if (!productData) return 0;
    return productData.performance.filter(p => p.revenue > 0).length;
  };

  const getBestPerformer = () => {
    if (!productData || productData.performance.length === 0) return null;
    return productData.performance.reduce((best, current) =>
      current.revenue > best.revenue ? current : best
    );
  };

  const bestPerformer = getBestPerformer();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/analytics"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Product Performance
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Analyze product metrics and conversion rates
            </p>
          </div>
        </div>
        <button
          onClick={fetchProductData}
          disabled={loading}
          className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Time Period Selector */}
      <div className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
        <TimePeriodSelector selected={period} onChange={handlePeriodChange} />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600" />
        </div>
      ) : productData ? (
        <>
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/20 dark:to-gray-900 border border-emerald-200 dark:border-emerald-800 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                  Total Revenue
                </h3>
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(getTotalRevenue())}
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                From all products
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-900 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-blue-700 dark:text-blue-400">
                  Active Products
                </h3>
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {getTotalProducts()}
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                With sales
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-900 border border-purple-200 dark:border-purple-800 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-purple-700 dark:text-purple-400">
                  Avg Conversion
                </h3>
                <ShoppingCart className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {formatPercentage(getAverageConversion())}
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Purchase rate
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-orange-50 to-white dark:from-orange-900/20 dark:to-gray-900 border border-orange-200 dark:border-orange-800 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-orange-700 dark:text-orange-400">
                  Best Performer
                </h3>
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
              {bestPerformer ? (
                <>
                  <p className="text-lg font-bold text-gray-900 dark:text-white truncate">
                    {bestPerformer.name}
                  </p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {formatCurrency(bestPerformer.revenue)} revenue
                  </p>
                </>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">No data</p>
              )}
            </div>
          </div>

          {/* Top Products Chart */}
          {productData.topProducts.length > 0 && (
            <TopProductsChart
              data={productData.topProducts}
              title="Top Performing Products"
              subtitle="Top 10 products by revenue"
            />
          )}

          {/* Product Performance Table */}
          <ProductPerformanceTable
            data={productData.performance}
            title="All Products Performance"
            subtitle="Detailed metrics for all products in your catalog"
          />

          {/* Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Low Stock Alert
              </h3>
              <div className="space-y-3">
                {productData.performance
                  .filter(p => p.stockQuantity < 10 && p.stockQuantity > 0)
                  .slice(0, 5)
                  .map(product => (
                    <div key={product.id} className="flex items-center justify-between">
                      <span className="text-sm text-gray-900 dark:text-white">
                        {product.name}
                      </span>
                      <span className="text-sm font-medium text-orange-600">
                        {product.stockQuantity} left
                      </span>
                    </div>
                  ))}
                {productData.performance.filter(p => p.stockQuantity < 10 && p.stockQuantity > 0).length === 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    All products have adequate stock
                  </p>
                )}
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Out of Stock
              </h3>
              <div className="space-y-3">
                {productData.performance
                  .filter(p => p.stockQuantity === 0)
                  .slice(0, 5)
                  .map(product => (
                    <div key={product.id} className="flex items-center justify-between">
                      <span className="text-sm text-gray-900 dark:text-white">
                        {product.name}
                      </span>
                      <span className="text-sm font-medium text-red-600">
                        Out of stock
                      </span>
                    </div>
                  ))}
                {productData.performance.filter(p => p.stockQuantity === 0).length === 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No products out of stock
                  </p>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-500 dark:text-gray-400">No product data available</p>
        </div>
      )}
    </div>
  );
}
