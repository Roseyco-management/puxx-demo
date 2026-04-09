export const dynamic = 'force-dynamic';

import { getSession } from '@/lib/auth/session';
import { getDb } from '@/lib/db/drizzle';
import { orders } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import InvoiceButton from '@/components/portal/InvoiceButton';

const statusColour: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-emerald-100 text-emerald-800',
  delivered: 'bg-gray-100 text-gray-700',
  cancelled: 'bg-red-100 text-red-800',
};

export default async function PortalOrdersPage() {
  const session = await getSession();

  const db = getDb();
  const retailerOrders = session?.user?.id
    ? await db
        .select()
        .from(orders)
        .where(eq(orders.userId, session.user.id))
        .orderBy(desc(orders.createdAt))
    : [];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Order History</h1>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {retailerOrders.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p className="text-lg font-medium">No orders yet</p>
            <p className="text-sm mt-1">Your orders will appear here once placed.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 font-medium text-gray-500 uppercase tracking-wider">
                  Order #
                </th>
                <th className="text-left px-6 py-3 font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="text-left px-6 py-3 font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="text-left px-6 py-3 font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-3 font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {retailerOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {order.orderNumber}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {order.createdAt.toLocaleDateString('en-GB')}
                  </td>
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
                    <InvoiceButton />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>
    </div>
  );
}
