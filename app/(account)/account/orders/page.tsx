import { getUser } from '@/lib/db/queries';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db/drizzle';
import { orders, orderItems } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Package } from 'lucide-react';
import OrdersDataTable from '@/components/account/tables/OrdersDataTable';

export default async function OrdersPage() {
  const user = await getUser();

  if (!user) {
    redirect('/sign-in');
  }

  if (!db) {
    throw new Error('Database not configured');
  }

  // Get all user orders with items count
  const userOrders = await db
    .select()
    .from(orders)
    .where(eq(orders.userId, user.id))
    .orderBy(desc(orders.createdAt));

  const database = db; // Capture db reference for TypeScript
  const ordersWithItems = await Promise.all(
    userOrders.map(async (order) => {
      const items = await database
        .select()
        .from(orderItems)
        .where(eq(orderItems.orderId, order.id));
      return { ...order, itemCount: items.length };
    })
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
        <p className="mt-2 text-gray-600">
          View and track all your orders
        </p>
      </div>

      {/* Orders List */}
      {ordersWithItems.length === 0 ? (
        <Card>
          <CardContent className="py-16">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                <Package className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                No orders yet
              </h3>
              <p className="mb-6 text-gray-600">
                Start shopping to see your orders here
              </p>
              <Link href="/products">
                <Button className="bg-green-600 text-white hover:bg-green-700">
                  Start Shopping
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <OrdersDataTable orders={ordersWithItems} />
      )}
    </div>
  );
}
