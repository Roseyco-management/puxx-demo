'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Order } from '@/lib/db/schema';

const statusColour: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-emerald-100 text-emerald-800',
  delivered: 'bg-gray-100 text-gray-700',
};

export default function FulfilmentQueue({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState(initialOrders);

  async function markShipped(id: number) {
    try {
      const response = await fetch(`/api/fulfilment/orders/${id}`, {
        method: 'PATCH',
      });

      if (!response.ok) {
        toast.error('Failed to update order');
        return;
      }

      setOrders((prev) =>
        prev.map((order) =>
          order.id === id ? { ...order, status: 'shipped' } : order
        )
      );
      toast.success('Order marked as shipped');
    } catch {
      toast.error('Failed to update order');
    }
  }

  if (orders.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Pending Orders</h1>
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center text-gray-500">
          <p className="text-lg font-medium">No pending orders</p>
          <p className="text-sm mt-1">All orders have been processed.</p>
        </div>
      </div>
    );
  }

  const activeCount = orders.filter((o) => o.status !== 'shipped').length;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Pending Orders</h1>
        <span className="text-sm text-gray-500">
          {activeCount} order{activeCount !== 1 ? 's' : ''} to process
        </span>
      </div>
      {/* Mobile card view */}
      <div className="block md:hidden space-y-3">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg border border-gray-200 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900">{order.orderNumber}</span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColour[order.status] ?? 'bg-gray-100 text-gray-700'}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            <div className="text-sm text-gray-600 truncate">{order.shippingEmail}</div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-900">£{order.total}</span>
              <button
                onClick={() => markShipped(order.id)}
                disabled={order.status === 'shipped'}
                className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Mark Shipped
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table view */}
      <div className="hidden md:block bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 font-medium text-gray-500 uppercase tracking-wider">
                Order #
              </th>
              <th className="text-left px-6 py-3 font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="text-left px-6 py-3 font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="text-left px-6 py-3 font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="text-left px-6 py-3 font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {order.orderNumber}
                </td>
                <td className="px-6 py-4 text-gray-600">{order.shippingEmail}</td>
                <td className="px-6 py-4 text-gray-900">£{order.total}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      statusColour[order.status] ?? 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => markShipped(order.id)}
                    disabled={order.status === 'shipped'}
                    className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                  >
                    Mark Shipped
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
