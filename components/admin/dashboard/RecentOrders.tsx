"use client";

import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

interface Order {
  id: string;
  order_number: string;
  total: number;
  status: string;
  created_at: string;
  profiles?: {
    full_name?: string;
    email: string;
  };
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
  processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
  shipped: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400',
  delivered: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
};

export const RecentOrders: React.FC<{ orders: Order[] }> = ({ orders }) => {
  const router = useRouter();

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Orders</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Latest 5 orders</p>
      </div>

      <div className="space-y-4">
        {orders.length === 0 ? (
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 py-8">
            No recent orders
          </p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg dark:border-gray-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {order.order_number}
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {order.profiles?.full_name || order.profiles?.email || 'Guest'}
                </p>
                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                  {new Date(order.created_at).toLocaleDateString('en-IE')}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    €{Number(order.total).toFixed(2)}
                  </p>
                  <span className={`inline-block px-2 py-1 mt-1 text-xs font-medium rounded-full ${statusColors[order.status] || statusColors.pending}`}>
                    {order.status}
                  </span>
                </div>
                <button
                  onClick={() => router.push(`/admin/orders/${order.id}`)}
                  className="p-2 text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400"
                >
                  <Eye size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {orders.length > 0 && (
        <button
          onClick={() => router.push('/admin/orders')}
          className="w-full mt-4 text-sm font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
        >
          View all orders →
        </button>
      )}
    </div>
  );
};
