"use client";

import { useState, useEffect } from "react";
import { Download, RefreshCw } from "lucide-react";
import { OrderTable } from "@/components/admin/orders/OrderTable";
import { OrderFilters } from "@/components/admin/orders/OrderFilters";
import { toast } from "sonner";
import { OrderWithItems, OrderFilters as OrderFiltersType } from "@/lib/types/orders";

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<OrderFiltersType>({
    status: 'all',
    paymentStatus: 'all',
    dateRange: 'all',
    search: '',
  });

  useEffect(() => {
    fetchOrders();
  }, [filters]);

  async function fetchOrders() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.status && filters.status !== 'all') params.append('status', filters.status);
      if (filters.paymentStatus && filters.paymentStatus !== 'all') params.append('paymentStatus', filters.paymentStatus);
      if (filters.search) params.append('search', filters.search);
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);

      const response = await fetch(`/api/admin/orders?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to load orders');
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      toast.error('Failed to load orders');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const exportToCSV = async () => {
    try {
      // Build query params
      const params = new URLSearchParams();

      if (filters.status && filters.status !== 'all') {
        params.append('status', filters.status);
      }

      if (filters.paymentStatus && filters.paymentStatus !== 'all') {
        params.append('paymentStatus', filters.paymentStatus);
      }

      if (filters.search) {
        params.append('search', filters.search);
      }

      if (filters.startDate) {
        params.append('startDate', filters.startDate);
      }

      if (filters.endDate) {
        params.append('endDate', filters.endDate);
      }

      // Download the CSV
      const url = `/api/admin/orders/export?${params.toString()}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to export orders');
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `puxx-orders-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);

      toast.success('Orders exported successfully');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export orders');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Orders</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage customer orders and invoices
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => fetchOrders()}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Orders</p>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {orders.length}
          </p>
        </div>
        <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending</p>
          <p className="mt-2 text-3xl font-bold text-yellow-600 dark:text-yellow-400">
            {orders.filter((o) => o.status === 'pending').length}
          </p>
        </div>
        <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Processing</p>
          <p className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400">
            {orders.filter((o) => o.status === 'processing').length}
          </p>
        </div>
        <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Revenue</p>
          <p className="mt-2 text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            €{orders.reduce((sum, o) => sum + parseFloat(o.total), 0).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Filters */}
      <OrderFilters filters={filters} onFiltersChange={setFilters} />

      {/* Orders Table */}
      <OrderTable orders={orders} onRefresh={fetchOrders} />
    </div>
  );
}
