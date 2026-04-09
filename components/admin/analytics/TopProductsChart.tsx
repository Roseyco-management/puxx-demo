"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { formatCurrency } from '@/lib/analytics/utils';
import type { TopProduct } from '@/lib/analytics/types';

interface TopProductsChartProps {
  data: TopProduct[];
  title?: string;
  subtitle?: string;
}

const COLORS = ['#009A49', '#00A86B', '#00B074', '#00BA7C', '#00C485', '#10CE8E', '#1FD897', '#2EE2A0'];

export const TopProductsChart: React.FC<TopProductsChartProps> = ({
  data,
  title = 'Top Products',
  subtitle = 'Top 10 products by revenue',
}) => {
  if (data.length === 0) {
    return (
      <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
        </div>
        <div className="flex items-center justify-center h-[300px]">
          <p className="text-sm text-gray-500 dark:text-gray-400">No data available</p>
        </div>
      </div>
    );
  }

  // Take top 10 and reverse for better horizontal bar chart display
  const chartData = data.slice(0, 10).reverse();

  // Truncate long product names
  const formattedData = chartData.map(item => ({
    ...item,
    shortName: item.name.length > 25 ? `${item.name.substring(0, 25)}...` : item.name,
  }));

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
      </div>

      <div className="h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={formattedData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" className="dark:stroke-gray-700" />
            <XAxis
              type="number"
              stroke="#6B7280"
              style={{ fontSize: '12px' }}
              tick={{ fill: '#6B7280' }}
              tickFormatter={(value) => `€${value.toLocaleString()}`}
            />
            <YAxis
              type="category"
              dataKey="shortName"
              stroke="#6B7280"
              style={{ fontSize: '12px' }}
              tick={{ fill: '#6B7280' }}
              width={100}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                padding: '12px',
              }}
              labelStyle={{ color: '#fff', fontWeight: 'bold', marginBottom: '8px' }}
              itemStyle={{ color: '#fff' }}
              formatter={(value: any) => formatCurrency(Number(value))}
              labelFormatter={(label: string) => {
                const product = formattedData.find(p => p.shortName === label);
                return product?.name || label;
              }}
              cursor={{ fill: 'rgba(0, 154, 73, 0.1)' }}
            />
            <Bar dataKey="revenue" radius={[0, 8, 8, 0]}>
              {formattedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Product details table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-t border-gray-200 dark:border-gray-800">
            <tr className="text-left text-gray-500 dark:text-gray-400">
              <th className="py-3 pr-4 font-medium">Product</th>
              <th className="py-3 px-4 font-medium text-right">Revenue</th>
              <th className="py-3 px-4 font-medium text-right">Orders</th>
              <th className="py-3 pl-4 font-medium text-right">Quantity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {data.slice(0, 10).map((product, index) => (
              <tr key={product.id} className="text-gray-900 dark:text-white">
                <td className="py-3 pr-4">
                  <div className="flex items-center">
                    <span className="w-6 h-6 flex items-center justify-center bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded text-xs font-medium mr-3">
                      {index + 1}
                    </span>
                    {product.name}
                  </div>
                </td>
                <td className="py-3 px-4 text-right font-medium">
                  {formatCurrency(product.revenue)}
                </td>
                <td className="py-3 px-4 text-right">{product.orders}</td>
                <td className="py-3 pl-4 text-right">{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
