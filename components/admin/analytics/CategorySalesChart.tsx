"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { formatCurrency } from '@/lib/analytics/utils';
import type { CategorySalesData } from '@/lib/analytics/types';

interface CategorySalesChartProps {
  data: CategorySalesData[];
  title?: string;
  subtitle?: string;
}

const COLORS = ['#009A49', '#00A86B', '#00563F', '#10B981', '#059669', '#047857'];

export const CategorySalesChart: React.FC<CategorySalesChartProps> = ({
  data,
  title = 'Sales by Category',
  subtitle = 'Revenue distribution across categories',
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

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-sm font-semibold"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
      </div>

      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data as any}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={CustomLabel}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                padding: '12px',
              }}
              formatter={(value: any, name: string, props: any) => {
                const percentage = ((Number(value) / total) * 100).toFixed(1);
                return [
                  <div key={name}>
                    <div>{formatCurrency(Number(value))}</div>
                    <div className="text-xs text-gray-400">{percentage}% of total</div>
                    <div className="text-xs text-gray-400">{props.payload.orders} orders</div>
                  </div>,
                  props.payload.name,
                ];
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              formatter={(value, entry: any) => {
                const percentage = ((entry.payload.value / total) * 100).toFixed(1);
                return (
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {value} ({percentage}%)
                  </span>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Category breakdown table */}
      <div className="mt-6 space-y-3">
        {data.map((category, index) => {
          const percentage = ((category.value / total) * 100).toFixed(1);
          return (
            <div key={category.name} className="flex items-center justify-between">
              <div className="flex items-center flex-1">
                <div
                  className="w-3 h-3 rounded-full mr-3"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {category.name}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {category.orders} orders
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white min-w-[80px] text-right">
                  {formatCurrency(category.revenue)}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 min-w-[50px] text-right">
                  {percentage}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
