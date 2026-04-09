'use client';

import { DashboardStats } from '@/components/admin/dashboard/DashboardStats';
import { RevenueChart } from '@/components/admin/dashboard/RevenueChart';
import { RecentOrders } from '@/components/admin/dashboard/RecentOrders';
import { TopProducts } from '@/components/admin/dashboard/TopProducts';
import { LowStockAlerts } from '@/components/admin/dashboard/LowStockAlerts';
import { CategorySalesChart } from '@/components/admin/dashboard/CategorySalesChart';

const STUB_STATS = {
  todayRevenue: 0,
  todayOrders: 0,
  todayCustomers: 0,
  lowStockCount: 0,
};

const STUB_REVENUE_DATA = [
  { date: 'Apr 3', revenue: 0 },
  { date: 'Apr 4', revenue: 0 },
  { date: 'Apr 5', revenue: 0 },
  { date: 'Apr 6', revenue: 0 },
  { date: 'Apr 7', revenue: 0 },
  { date: 'Apr 8', revenue: 0 },
  { date: 'Apr 9', revenue: 90 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Welcome back! Here's what's happening with your store today.
        </p>
      </div>
      <DashboardStats stats={STUB_STATS} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart data={STUB_REVENUE_DATA} />
        </div>
        <div>
          <RecentOrders orders={[]} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TopProducts products={[]} />
        <LowStockAlerts products={[]} />
      </div>
      <CategorySalesChart data={[]} />
    </div>
  );
}
