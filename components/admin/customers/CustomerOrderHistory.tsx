"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Eye, Package } from "lucide-react";

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  createdAt: Date;
  itemCount?: number;
}

interface CustomerOrderHistoryProps {
  customerId: string;
}

export function CustomerOrderHistory({ customerId }: CustomerOrderHistoryProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchOrders();
  }, [customerId]);

  async function fetchOrders() {
    try {
      const response = await fetch(`/api/admin/orders?userId=${customerId}`);
      const data = await response.json();

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string }> = {
      pending: { bg: 'bg-yellow-100 dark:bg-yellow-900/20', text: 'text-yellow-800 dark:text-yellow-400' },
      processing: { bg: 'bg-blue-100 dark:bg-blue-900/20', text: 'text-blue-800 dark:text-blue-400' },
      shipped: { bg: 'bg-purple-100 dark:bg-purple-900/20', text: 'text-purple-800 dark:text-purple-400' },
      delivered: { bg: 'bg-emerald-100 dark:bg-emerald-900/20', text: 'text-emerald-800 dark:text-emerald-400' },
      cancelled: { bg: 'bg-red-100 dark:bg-red-900/20', text: 'text-red-800 dark:text-red-400' },
      refunded: { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-800 dark:text-gray-400' },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
        <div className="flex items-center justify-center h-32">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Package className="w-12 h-12 mb-4 text-gray-400" />
          <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            No Orders Yet
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This customer hasn't placed any orders.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Order History
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {orders.length} order{orders.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-200 dark:border-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider dark:text-gray-300">
                Order #
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider dark:text-gray-300">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider dark:text-gray-300">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider dark:text-gray-300">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                  {order.orderNumber}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  {format(new Date(order.createdAt), 'PPP')}
                </td>
                <td className="px-6 py-4 text-sm">
                  {getStatusBadge(order.status)}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  €{parseFloat(order.total as any).toFixed(2)}
                </td>
                <td className="px-6 py-4 text-sm">
                  <button
                    onClick={() => router.push(`/admin/orders/${order.id}`)}
                    className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                    title="View Order"
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Summary */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Total Orders Value:</span>
          <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
            €{orders.reduce((sum, order) => sum + parseFloat(order.total as any), 0).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
