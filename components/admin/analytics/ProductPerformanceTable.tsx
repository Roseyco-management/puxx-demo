"use client";

import { useState } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, Download } from 'lucide-react';
import { formatCurrency, formatPercentage, formatNumber, exportToCSV } from '@/lib/analytics/utils';
import type { ProductPerformance } from '@/lib/analytics/types';

interface ProductPerformanceTableProps {
  data: ProductPerformance[];
  title?: string;
  subtitle?: string;
}

type SortField = keyof ProductPerformance;
type SortDirection = 'asc' | 'desc';

export const ProductPerformanceTable: React.FC<ProductPerformanceTableProps> = ({
  data,
  title = 'Product Performance',
  subtitle = 'Detailed metrics for all products',
}) => {
  const [sortField, setSortField] = useState<SortField>('revenue');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (aValue === null) return 1;
    if (bValue === null) return -1;

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    const aNum = Number(aValue);
    const bNum = Number(bValue);
    return sortDirection === 'asc' ? aNum - bNum : bNum - aNum;
  });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4" />;
    }
    return sortDirection === 'asc' ? (
      <ArrowUp className="w-4 h-4" />
    ) : (
      <ArrowDown className="w-4 h-4" />
    );
  };

  const handleExport = () => {
    const exportData = sortedData.map(product => ({
      Product: product.name,
      SKU: product.sku,
      Views: product.views,
      'Add to Cart Rate': `${product.addToCartRate.toFixed(2)}%`,
      'Purchase Rate': `${product.purchaseRate.toFixed(2)}%`,
      Revenue: product.revenue,
      'Profit Margin': product.profitMargin ? `${product.profitMargin.toFixed(2)}%` : 'N/A',
      Stock: product.stockQuantity,
    }));

    exportToCSV(exportData, `product-performance-${new Date().toISOString().split('T')[0]}.csv`);
  };

  if (data.length === 0) {
    return (
      <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
        </div>
        <div className="flex items-center justify-center h-[200px]">
          <p className="text-sm text-gray-500 dark:text-gray-400">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-y border-gray-200 dark:border-gray-800">
            <tr className="text-left text-gray-500 dark:text-gray-400">
              <th className="py-3 pr-4">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 font-medium hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <span>Product</span>
                  <SortIcon field="name" />
                </button>
              </th>
              <th className="py-3 px-4">
                <button
                  onClick={() => handleSort('sku')}
                  className="flex items-center space-x-1 font-medium hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <span>SKU</span>
                  <SortIcon field="sku" />
                </button>
              </th>
              <th className="py-3 px-4 text-right">
                <button
                  onClick={() => handleSort('views')}
                  className="flex items-center justify-end space-x-1 font-medium hover:text-gray-900 dark:hover:text-white transition-colors w-full"
                >
                  <span>Views</span>
                  <SortIcon field="views" />
                </button>
              </th>
              <th className="py-3 px-4 text-right">
                <button
                  onClick={() => handleSort('addToCartRate')}
                  className="flex items-center justify-end space-x-1 font-medium hover:text-gray-900 dark:hover:text-white transition-colors w-full"
                >
                  <span>Add to Cart</span>
                  <SortIcon field="addToCartRate" />
                </button>
              </th>
              <th className="py-3 px-4 text-right">
                <button
                  onClick={() => handleSort('purchaseRate')}
                  className="flex items-center justify-end space-x-1 font-medium hover:text-gray-900 dark:hover:text-white transition-colors w-full"
                >
                  <span>Purchase Rate</span>
                  <SortIcon field="purchaseRate" />
                </button>
              </th>
              <th className="py-3 px-4 text-right">
                <button
                  onClick={() => handleSort('revenue')}
                  className="flex items-center justify-end space-x-1 font-medium hover:text-gray-900 dark:hover:text-white transition-colors w-full"
                >
                  <span>Revenue</span>
                  <SortIcon field="revenue" />
                </button>
              </th>
              <th className="py-3 px-4 text-right">
                <button
                  onClick={() => handleSort('stockQuantity')}
                  className="flex items-center justify-end space-x-1 font-medium hover:text-gray-900 dark:hover:text-white transition-colors w-full"
                >
                  <span>Stock</span>
                  <SortIcon field="stockQuantity" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {sortedData.map((product) => (
              <tr
                key={product.id}
                className="text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <td className="py-3 pr-4 font-medium">{product.name}</td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                  {product.sku || '-'}
                </td>
                <td className="py-3 px-4 text-right">{formatNumber(product.views)}</td>
                <td className="py-3 px-4 text-right">
                  <span
                    className={
                      product.addToCartRate >= 30
                        ? 'text-emerald-600'
                        : product.addToCartRate >= 15
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }
                  >
                    {formatPercentage(product.addToCartRate)}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <span
                    className={
                      product.purchaseRate >= 50
                        ? 'text-emerald-600'
                        : product.purchaseRate >= 25
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }
                  >
                    {formatPercentage(product.purchaseRate)}
                  </span>
                </td>
                <td className="py-3 px-4 text-right font-medium">
                  {formatCurrency(product.revenue)}
                </td>
                <td className="py-3 px-4 text-right">
                  <span
                    className={
                      product.stockQuantity === 0
                        ? 'text-red-600'
                        : product.stockQuantity < 10
                        ? 'text-yellow-600'
                        : 'text-gray-900 dark:text-white'
                    }
                  >
                    {product.stockQuantity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Showing {sortedData.length} products
      </div>
    </div>
  );
};
