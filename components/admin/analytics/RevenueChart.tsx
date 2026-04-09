"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatCurrency, formatDate } from '@/lib/analytics/utils';
import type { RevenueData } from '@/lib/analytics/types';

interface RevenueChartProps {
  data: RevenueData[];
  title?: string;
  subtitle?: string;
  height?: number;
}

export const RevenueChart: React.FC<RevenueChartProps> = ({
  data,
  title = 'Revenue Overview',
  subtitle = 'Revenue and orders over time',
  height = 400,
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

  // Format dates for display
  const formattedData = data.map(item => ({
    ...item,
    displayDate: item.date.includes('T')
      ? formatDate(new Date(item.date), 'short')
      : item.date,
  }));

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
      </div>

      <div style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={formattedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#009A49" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#009A49" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00563F" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00563F" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" className="dark:stroke-gray-700" />
            <XAxis
              dataKey="displayDate"
              stroke="#6B7280"
              style={{ fontSize: '12px' }}
              tick={{ fill: '#6B7280' }}
            />
            <YAxis
              yAxisId="left"
              stroke="#6B7280"
              style={{ fontSize: '12px' }}
              tick={{ fill: '#6B7280' }}
              tickFormatter={(value) => `€${value.toLocaleString()}`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#6B7280"
              style={{ fontSize: '12px' }}
              tick={{ fill: '#6B7280' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                padding: '12px',
              }}
              labelStyle={{ color: '#9CA3AF', marginBottom: '8px' }}
              itemStyle={{ color: '#fff' }}
              formatter={(value: any, name: string) => {
                if (name === 'revenue') {
                  return [formatCurrency(Number(value)), 'Revenue'];
                }
                return [value, 'Orders'];
              }}
            />
            <Legend
              verticalAlign="top"
              height={36}
              iconType="line"
              wrapperStyle={{ paddingBottom: '20px' }}
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              stroke="#009A49"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRevenue)"
              name="Revenue"
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="orders"
              stroke="#00563F"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorOrders)"
              name="Orders"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
