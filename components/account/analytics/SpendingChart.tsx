'use client';

import { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { format } from 'date-fns';

interface Order {
  id: number;
  total: string;
  createdAt: Date | string;
}

interface SpendingChartProps {
  orders: Order[];
  period?: 'monthly' | 'yearly';
}

export default function SpendingChart({ orders, period = 'monthly' }: SpendingChartProps) {
  const chartData = useMemo(() => {
    // Group orders by month
    const monthlyData = orders.reduce((acc, order) => {
      const date = new Date(order.createdAt);
      const monthKey = format(date, 'MMM yyyy');

      if (!acc[monthKey]) {
        acc[monthKey] = {
          month: monthKey,
          spending: 0,
          orders: 0,
        };
      }

      acc[monthKey].spending += parseFloat(order.total);
      acc[monthKey].orders += 1;

      return acc;
    }, {} as Record<string, { month: string; spending: number; orders: number }>);

    // Convert to array and sort by date
    return Object.values(monthlyData)
      .sort((a, b) => {
        const dateA = new Date(a.month);
        const dateB = new Date(b.month);
        return dateA.getTime() - dateB.getTime();
      })
      .map((item) => ({
        ...item,
        spending: parseFloat(item.spending.toFixed(2)),
      }));
  }, [orders]);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
          <p className="text-sm font-semibold text-gray-900">{payload[0].payload.month}</p>
          <p className="mt-1 text-sm text-gray-600">
            Spending: <span className="font-semibold text-green-600">€{payload[0].value}</span>
          </p>
          <p className="text-sm text-gray-600">
            Orders: <span className="font-semibold">{payload[0].payload.orders}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return (
      <div className="flex h-[300px] items-center justify-center rounded-xl border border-gray-200 bg-gray-50">
        <p className="text-sm text-gray-600">No data available</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="month"
            stroke="#6b7280"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#6b7280"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `€${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              paddingTop: '10px',
            }}
            iconType="circle"
          />
          <Area
            type="monotone"
            dataKey="spending"
            name="Spending"
            stroke="#16a34a"
            strokeWidth={2}
            fill="url(#spendingGradient)"
            activeDot={{ r: 6, fill: '#16a34a' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
