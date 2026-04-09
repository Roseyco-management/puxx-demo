"use client";

import { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw, TrendingUp, Calendar } from 'lucide-react';
import Link from 'next/link';
import { RevenueChart } from '@/components/admin/analytics/RevenueChart';
import { RevenueReport } from '@/components/admin/analytics/RevenueReport';
import { TimePeriodSelector } from '@/components/admin/analytics/TimePeriodSelector';
import { formatCurrency, formatPercentage } from '@/lib/analytics/utils';
import type { TimePeriod, RevenueBreakdown } from '@/lib/analytics/types';

export default function RevenueAnalyticsPage() {
  const [period, setPeriod] = useState<TimePeriod>('month');
  const [customRange, setCustomRange] = useState<{ start: Date; end: Date } | undefined>();
  const [loading, setLoading] = useState(true);
  const [revenueData, setRevenueData] = useState<RevenueBreakdown | null>(null);
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');

  useEffect(() => {
    fetchRevenueData();
  }, [period, customRange]);

  const fetchRevenueData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ period });
      if (period === 'custom' && customRange) {
        params.append('startDate', customRange.start.toISOString());
        params.append('endDate', customRange.end.toISOString());
      }

      const response = await fetch(`/api/admin/analytics/revenue?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch revenue data');
      }

      const result = await response.json();
      setRevenueData(result.data);
    } catch (error) {
      console.error('Failed to fetch revenue data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePeriodChange = (newPeriod: TimePeriod, range?: { start: Date; end: Date }) => {
    setPeriod(newPeriod);
    setCustomRange(range);
  };

  const getChartData = () => {
    if (!revenueData) return [];
    switch (viewMode) {
      case 'week':
        return revenueData.byWeek;
      case 'month':
        return revenueData.byMonth;
      default:
        return revenueData.byDay;
    }
  };

  const getTotalRevenue = () => {
    if (!revenueData) return 0;
    return revenueData.byProduct.reduce((sum, p) => sum + p.revenue, 0);
  };

  const getTotalOrders = () => {
    if (!revenueData) return 0;
    return revenueData.byProduct.reduce((sum, p) => sum + p.orders, 0);
  };

  const getGrowthRate = () => {
    const data = getChartData();
    if (data.length < 2) return 0;

    const recent = data[data.length - 1].revenue;
    const previous = data[data.length - 2].revenue;

    if (previous === 0) return 100;
    return ((recent - previous) / previous) * 100;
  };

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
              Revenue Analytics
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Detailed revenue breakdowns and trends
            </p>
          </div>
        </div>
        <button
          onClick={fetchRevenueData}
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
      ) : revenueData ? (
        <>
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                For selected period
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-900 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-blue-700 dark:text-blue-400">
                  Total Orders
                </h3>
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {getTotalOrders()}
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Completed orders
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-900 border border-purple-200 dark:border-purple-800 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-purple-700 dark:text-purple-400">
                  Growth Rate
                </h3>
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {formatPercentage(getGrowthRate())}
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Period over period
              </p>
            </div>
          </div>

          {/* Revenue Chart with View Mode Selector */}
          <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Revenue Trends
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  View revenue by different time periods
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('day')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    viewMode === 'day'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
                  }`}
                >
                  Daily
                </button>
                <button
                  onClick={() => setViewMode('week')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    viewMode === 'week'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
                  }`}
                >
                  Weekly
                </button>
                <button
                  onClick={() => setViewMode('month')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    viewMode === 'month'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>

            <RevenueChart
              data={getChartData()}
              title=""
              subtitle=""
              height={400}
            />
          </div>

          {/* Revenue Report */}
          <RevenueReport data={revenueData} />
        </>
      ) : (
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-500 dark:text-gray-400">No revenue data available</p>
        </div>
      )}
    </div>
  );
}
