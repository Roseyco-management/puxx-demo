"use client";

import { TrendingUp, TrendingDown, ShoppingCart, Users, DollarSign, AlertTriangle } from "lucide-react";

interface Stats {
  todayRevenue: number;
  todayOrders: number;
  todayCustomers: number;
  lowStockCount: number;
}

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  trend?: 'up' | 'down';
  color: 'green' | 'blue' | 'purple' | 'orange';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, trend, color }) => {
  const colorClasses = {
    green: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
    orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
          {change !== undefined && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${
              trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span>{Math.abs(change)}%</span>
              <span className="text-gray-500 dark:text-gray-400">vs yesterday</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export const DashboardStats: React.FC<{ stats: Stats }> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Today's Revenue"
        value={`€${stats.todayRevenue.toFixed(2)}`}
        icon={<DollarSign size={24} />}
        color="green"
      />
      <StatCard
        title="Today's Orders"
        value={stats.todayOrders}
        icon={<ShoppingCart size={24} />}
        color="blue"
      />
      <StatCard
        title="New Customers"
        value={stats.todayCustomers}
        icon={<Users size={24} />}
        color="purple"
      />
      <StatCard
        title="Low Stock Items"
        value={stats.lowStockCount}
        icon={<AlertTriangle size={24} />}
        color="orange"
      />
    </div>
  );
};
