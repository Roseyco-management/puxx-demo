'use client';

import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts';

interface OrderStatusData {
  status: string;
  count: number;
  total: number;
}

interface OrderStatsChartProps {
  orders: Array<{
    id: number;
    status: string;
    total: string;
  }>;
}

const STATUS_COLORS: Record<string, string> = {
  pending: '#f59e0b',
  processing: '#3b82f6',
  shipped: '#6366f1',
  delivered: '#22c55e',
  cancelled: '#ef4444',
  refunded: '#dc2626',
};

export default function OrderStatsChart({ orders }: OrderStatsChartProps) {
  const chartData = useMemo(() => {
    const statusData = orders.reduce((acc, order) => {
      const status = order.status;
      if (!acc[status]) {
        acc[status] = {
          status: status.charAt(0).toUpperCase() + status.slice(1),
          count: 0,
          total: 0,
        };
      }
      acc[status].count += 1;
      acc[status].total += parseFloat(order.total);
      return acc;
    }, {} as Record<string, OrderStatusData>);

    return Object.values(statusData).map((item) => ({
      ...item,
      total: parseFloat(item.total.toFixed(2)),
    }));
  }, [orders]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
          <p className="text-sm font-semibold text-gray-900">{payload[0].payload.status}</p>
          <p className="mt-1 text-sm text-gray-600">
            Orders: <span className="font-semibold">{payload[0].value}</span>
          </p>
          <p className="text-sm text-gray-600">
            Total: <span className="font-semibold text-green-600">€{payload[0].payload.total}</span>
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
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="status"
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
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              paddingTop: '10px',
            }}
            iconType="circle"
          />
          <Bar
            dataKey="count"
            name="Orders"
            fill="#22c55e"
            radius={[8, 8, 0, 0]}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={STATUS_COLORS[entry.status.toLowerCase()] || '#22c55e'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
