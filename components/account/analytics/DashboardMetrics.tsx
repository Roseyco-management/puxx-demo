'use client';

import { Package, ShoppingBag, TrendingUp, DollarSign } from 'lucide-react';

interface MetricData {
  id: string;
  title: string;
  value: string;
  change?: string;
  direction?: 'up' | 'down';
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
}

interface DashboardMetricsProps {
  totalOrders: number;
  recentOrders: number;
  totalSpent: number;
  avgOrderValue: number;
  previousPeriodSpent?: number;
}

export default function DashboardMetrics({
  totalOrders,
  recentOrders,
  totalSpent,
  avgOrderValue,
  previousPeriodSpent = 0,
}: DashboardMetricsProps) {
  // Calculate spending change percentage
  const spendingChange = previousPeriodSpent > 0
    ? (((totalSpent - previousPeriodSpent) / previousPeriodSpent) * 100).toFixed(1)
    : '0';
  const spendingDirection = totalSpent >= previousPeriodSpent ? 'up' : 'down';

  const metrics: MetricData[] = [
    {
      id: 'total-orders',
      title: 'Total Orders',
      value: totalOrders.toString(),
      icon: <Package className="h-6 w-6" />,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      id: 'recent-orders',
      title: 'Recent Orders',
      value: recentOrders.toString(),
      icon: <ShoppingBag className="h-6 w-6" />,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      id: 'total-spent',
      title: 'Total Spent',
      value: `€${totalSpent.toFixed(2)}`,
      change: previousPeriodSpent > 0 ? `${spendingChange}%` : undefined,
      direction: spendingDirection,
      icon: <DollarSign className="h-6 w-6" />,
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    {
      id: 'avg-order',
      title: 'Avg. Order Value',
      value: `€${avgOrderValue.toFixed(2)}`,
      icon: <TrendingUp className="h-6 w-6" />,
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">{metric.title}</p>
              <div className="mt-2 flex items-baseline gap-2">
                <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
                {metric.change && (
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      metric.direction === 'up'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {metric.direction === 'up' ? '↑' : '↓'} {metric.change}
                  </span>
                )}
              </div>
            </div>
            <div className={`flex h-12 w-12 items-center justify-center rounded-full ${metric.bgColor}`}>
              <div className={metric.iconColor}>{metric.icon}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
