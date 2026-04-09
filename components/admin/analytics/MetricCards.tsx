"use client";

import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Percent, Heart, Wallet } from 'lucide-react';
import { formatCurrency, formatPercentage, formatNumber } from '@/lib/analytics/utils';

interface MetricCardProps {
  title: string;
  value: string;
  change?: number;
  isPositive?: boolean;
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, isPositive, icon }) => {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
          {change !== undefined && (
            <div className="flex items-center mt-2">
              {isPositive ? (
                <TrendingUp className="w-4 h-4 text-emerald-600 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
              )}
              <span
                className={`text-sm font-medium ${
                  isPositive ? 'text-emerald-600' : 'text-red-600'
                }`}
              >
                {isPositive ? '+' : '-'}
                {formatPercentage(Math.abs(change))}
              </span>
              <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">vs last period</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-emerald-50 rounded-lg dark:bg-emerald-900/20">
          {icon}
        </div>
      </div>
    </div>
  );
};

interface MetricCardsProps {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  conversionRate: number;
  returnCustomerRate: number;
  customerLifetimeValue: number;
  comparison?: {
    revenue: number;
    orders: number;
  };
}

export const MetricCards: React.FC<MetricCardsProps> = ({
  totalRevenue,
  totalOrders,
  averageOrderValue,
  conversionRate,
  returnCustomerRate,
  customerLifetimeValue,
  comparison,
}) => {
  const revenueTrend = comparison
    ? ((totalRevenue - comparison.revenue) / comparison.revenue) * 100
    : undefined;
  const ordersTrend = comparison
    ? ((totalOrders - comparison.orders) / comparison.orders) * 100
    : undefined;

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <MetricCard
        title="Total Revenue"
        value={formatCurrency(totalRevenue)}
        change={revenueTrend}
        isPositive={revenueTrend !== undefined && revenueTrend >= 0}
        icon={<DollarSign className="w-6 h-6 text-emerald-600" />}
      />
      <MetricCard
        title="Total Orders"
        value={formatNumber(totalOrders)}
        change={ordersTrend}
        isPositive={ordersTrend !== undefined && ordersTrend >= 0}
        icon={<ShoppingCart className="w-6 h-6 text-emerald-600" />}
      />
      <MetricCard
        title="Average Order Value"
        value={formatCurrency(averageOrderValue)}
        icon={<Wallet className="w-6 h-6 text-emerald-600" />}
      />
      <MetricCard
        title="Conversion Rate"
        value={formatPercentage(conversionRate)}
        icon={<Percent className="w-6 h-6 text-emerald-600" />}
      />
      <MetricCard
        title="Return Customer Rate"
        value={formatPercentage(returnCustomerRate)}
        icon={<Heart className="w-6 h-6 text-emerald-600" />}
      />
      <MetricCard
        title="Customer Lifetime Value"
        value={formatCurrency(customerLifetimeValue)}
        icon={<Users className="w-6 h-6 text-emerald-600" />}
      />
    </div>
  );
};
