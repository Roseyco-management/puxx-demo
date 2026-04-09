"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { DashboardStats } from "@/components/admin/dashboard/DashboardStats";
import { RevenueChart } from "@/components/admin/dashboard/RevenueChart";
import { RecentOrders } from "@/components/admin/dashboard/RecentOrders";
import { TopProducts } from "@/components/admin/dashboard/TopProducts";
import { LowStockAlerts } from "@/components/admin/dashboard/LowStockAlerts";
import { CategorySalesChart } from "@/components/admin/dashboard/CategorySalesChart";
import { toast } from "sonner";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    todayRevenue: 0,
    todayOrders: 0,
    todayCustomers: 0,
    lowStockCount: 0,
  });
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      const supabase = createClient();

      // Fetch today's stats
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Today's revenue and orders
      const { data: todayOrders } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .gte('created_at', today.toISOString());

      const todayRevenue = todayOrders?.reduce((sum, order) => sum + parseFloat(order.total), 0) || 0;
      const todayOrdersCount = todayOrders?.length || 0;

      // Today's new customers
      const { data: todayCustomers } = await supabase
        .from('profiles')
        .select('id')
        .gte('created_at', today.toISOString())
        .eq('role', 'customer');

      // Low stock products
      const { data: lowStock } = await supabase
        .from('products')
        .select('*')
        .lte('stock_quantity', 'reorder_point')
        .eq('active', true)
        .order('stock_quantity', { ascending: true })
        .limit(5);

      // Recent orders
      const { data: orders } = await supabase
        .from('orders')
        .select('*, profiles(full_name, email)')
        .order('created_at', { ascending: false })
        .limit(5);

      // Top products by revenue (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data: topProductsData } = await supabase
        .from('order_items')
        .select('product_id, quantity, price, products(name, image_url)')
        .gte('created_at', thirtyDaysAgo.toISOString());

      // Group by product and calculate revenue
      const productRevenue = topProductsData?.reduce((acc: any, item: any) => {
        const productId = item.product_id;
        if (!acc[productId]) {
          acc[productId] = {
            id: productId,
            name: item.products?.name || 'Unknown',
            image: item.products?.image_url || '',
            sales: 0,
            revenue: 0,
          };
        }
        acc[productId].sales += item.quantity;
        acc[productId].revenue += item.quantity * parseFloat(item.price);
        return acc;
      }, {});

      const topProductsArray = Object.values(productRevenue || {})
        .sort((a: any, b: any) => b.revenue - a.revenue)
        .slice(0, 5);

      // Revenue data for last 7 days
      const revenueByDay = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        date.setHours(0, 0, 0, 0);

        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + 1);

        const { data: dayOrders } = await supabase
          .from('orders')
          .select('total')
          .gte('created_at', date.toISOString())
          .lt('created_at', nextDate.toISOString());

        const revenue = dayOrders?.reduce((sum, order) => sum + parseFloat(order.total), 0) || 0;

        revenueByDay.push({
          date: date.toLocaleDateString('en-IE', { month: 'short', day: 'numeric' }),
          revenue: revenue,
        });
      }

      // Category sales data
      const { data: categoryOrders } = await supabase
        .from('order_items')
        .select('quantity, price, products(category)')
        .gte('created_at', thirtyDaysAgo.toISOString());

      const categoryRevenue = categoryOrders?.reduce((acc: any, item: any) => {
        const category = item.products?.category || 'Unknown';
        if (!acc[category]) {
          acc[category] = 0;
        }
        acc[category] += item.quantity * parseFloat(item.price);
        return acc;
      }, {});

      const categoryDataArray = Object.entries(categoryRevenue || {}).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value: value as number,
      }));

      setStats({
        todayRevenue,
        todayOrders: todayOrdersCount,
        todayCustomers: todayCustomers?.length || 0,
        lowStockCount: lowStock?.length || 0,
      });

      setRevenueData(revenueByDay as any);
      setRecentOrders(orders || []);
      setTopProducts(topProductsArray as any);
      setLowStockProducts(lowStock || []);
      setCategoryData(categoryDataArray);
      setLoading(false);
    }

    fetchDashboardData();

    // Set up realtime subscription for new orders
    const supabase = createClient();
    const channel = supabase
      .channel('dashboard-updates')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'orders' },
        (payload) => {
          toast.success(`New order received!`, {
            description: `Order #${payload.new.order_number}`,
          });
          // Refresh dashboard data
          fetchDashboardData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Welcome back! Here's what's happening with your store today.
        </p>
      </div>

      {/* Stats Cards */}
      <DashboardStats stats={stats} />

      {/* Revenue Chart & Recent Orders */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart data={revenueData} />
        </div>
        <div>
          <RecentOrders orders={recentOrders} />
        </div>
      </div>

      {/* Top Products & Low Stock */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TopProducts products={topProducts} />
        <LowStockAlerts products={lowStockProducts} />
      </div>

      {/* Category Sales Chart */}
      <CategorySalesChart data={categoryData} />
    </div>
  );
}
