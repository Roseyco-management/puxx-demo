"use client";

import { Download, TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency, formatNumber, exportToCSV } from '@/lib/analytics/utils';
import type { RevenueBreakdown } from '@/lib/analytics/types';

interface RevenueReportProps {
  data: RevenueBreakdown;
  title?: string;
}

export const RevenueReport: React.FC<RevenueReportProps> = ({
  data,
  title = 'Revenue Breakdown',
}) => {
  const handleExportByProduct = () => {
    exportToCSV(
      data.byProduct.map(p => ({
        Product: p.productName,
        Revenue: p.revenue,
        Orders: p.orders,
        'Avg Order Value': p.orders > 0 ? (p.revenue / p.orders).toFixed(2) : 0,
      })),
      `revenue-by-product-${new Date().toISOString().split('T')[0]}.csv`
    );
  };

  const handleExportByCategory = () => {
    exportToCSV(
      data.byCategory.map(c => ({
        Category: c.name,
        Revenue: c.revenue,
        Orders: c.orders,
        'Avg Order Value': c.orders > 0 ? (c.revenue / c.orders).toFixed(2) : 0,
      })),
      `revenue-by-category-${new Date().toISOString().split('T')[0]}.csv`
    );
  };

  const totalRevenue = data.byProduct.reduce((sum, p) => sum + p.revenue, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</p>
            <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(totalRevenue)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Products</p>
            <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
              {data.byProduct.length}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Categories</p>
            <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
              {data.byCategory.length}
            </p>
          </div>
        </div>
      </div>

      {/* Revenue by Product */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-base font-semibold text-gray-900 dark:text-white">
              Revenue by Product
            </h4>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Top {data.byProduct.length} products
            </p>
          </div>
          <button
            onClick={handleExportByProduct}
            className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-y border-gray-200 dark:border-gray-800">
              <tr className="text-left text-gray-500 dark:text-gray-400">
                <th className="py-3 pr-4 font-medium">Product</th>
                <th className="py-3 px-4 font-medium text-right">Revenue</th>
                <th className="py-3 px-4 font-medium text-right">Orders</th>
                <th className="py-3 px-4 font-medium text-right">Avg Order</th>
                <th className="py-3 pl-4 font-medium text-right">% of Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {data.byProduct.slice(0, 10).map((product, index) => {
                const percentage = (product.revenue / totalRevenue) * 100;
                const avgOrder = product.orders > 0 ? product.revenue / product.orders : 0;
                return (
                  <tr key={index} className="text-gray-900 dark:text-white">
                    <td className="py-3 pr-4">
                      <div className="flex items-center">
                        <span className="w-6 h-6 flex items-center justify-center bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded text-xs font-medium mr-3">
                          {index + 1}
                        </span>
                        {product.productName}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-medium">
                      {formatCurrency(product.revenue)}
                    </td>
                    <td className="py-3 px-4 text-right">{product.orders}</td>
                    <td className="py-3 px-4 text-right">{formatCurrency(avgOrder)}</td>
                    <td className="py-3 pl-4 text-right">
                      <div className="flex items-center justify-end">
                        <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mr-2">
                          <div
                            className="h-full bg-emerald-600 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span>{percentage.toFixed(1)}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revenue by Category */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-base font-semibold text-gray-900 dark:text-white">
              Revenue by Category
            </h4>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              All categories
            </p>
          </div>
          <button
            onClick={handleExportByCategory}
            className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>

        <div className="space-y-4">
          {data.byCategory.map((category) => {
            const percentage = (category.revenue / totalRevenue) * 100;
            const avgOrder = category.orders > 0 ? category.revenue / category.orders : 0;
            return (
              <div
                key={category.name}
                className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-gray-900 dark:text-white">{category.name}</h5>
                  <span className="text-lg font-bold text-emerald-600">
                    {formatCurrency(category.revenue)}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Orders:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">
                      {category.orders}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Avg Order:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">
                      {formatCurrency(avgOrder)}
                    </span>
                  </div>
                  <div className="flex items-center justify-end">
                    <span className="text-gray-500 dark:text-gray-400 mr-2">Share:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="mt-3 w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div
                    className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Revenue by Customer Segment */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
        <div className="mb-6">
          <h4 className="text-base font-semibold text-gray-900 dark:text-white">
            Revenue by Customer Segment
          </h4>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            New vs Returning customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.byCustomerSegment.map((segment) => {
            const segmentTotal = data.byCustomerSegment.reduce((sum, s) => sum + s.revenue, 0);
            const percentage = segmentTotal > 0 ? (segment.revenue / segmentTotal) * 100 : 0;
            const avgPerCustomer = segment.customers > 0 ? segment.revenue / segment.customers : 0;

            return (
              <div
                key={segment.segment}
                className="p-5 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/10 dark:to-gray-900 border border-emerald-200 dark:border-emerald-800 rounded-lg"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white">
                      {segment.segment}
                    </h5>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {formatNumber(segment.customers)} customers
                    </p>
                  </div>
                  {segment.segment === 'Returning Customers' ? (
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {formatCurrency(segment.revenue)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Avg per Customer</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatCurrency(avgPerCustomer)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">% of Total</span>
                    <span className="font-medium text-emerald-600">
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
