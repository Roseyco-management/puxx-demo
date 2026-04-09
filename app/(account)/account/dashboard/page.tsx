import { getUser } from '@/lib/db/queries';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db/drizzle';
import { orders, profiles, orderItems } from '@/lib/db/schema';
import { eq, desc, sql } from 'drizzle-orm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Package, ShoppingBag, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from '@/lib/date-utils';
import DashboardMetrics from '@/components/account/analytics/DashboardMetrics';
import SpendingChart from '@/components/account/analytics/SpendingChart';
import OrderStatsChart from '@/components/account/analytics/OrderStatsChart';

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    redirect('/sign-in');
  }

  if (!db) {
    throw new Error('Database not configured');
  }

  // Get user profile
  const userProfile = await db
    .select()
    .from(profiles)
    .where(eq(profiles.userId, user.id))
    .limit(1);

  // Get ALL user orders for analytics
  const allOrders = await db
    .select()
    .from(orders)
    .where(eq(orders.userId, user.id))
    .orderBy(desc(orders.createdAt));

  // Get recent orders with items
  const database = db; // Capture db reference for TypeScript
  const recentOrders = await Promise.all(
    allOrders.slice(0, 3).map(async (order) => {
      const items = await database
        .select()
        .from(orderItems)
        .where(eq(orderItems.orderId, order.id));
      return { ...order, items };
    })
  );

  // Calculate analytics
  const totalOrders = allOrders.length;
  const totalSpent = allOrders.reduce((sum, order) => sum + parseFloat(order.total), 0);
  const avgOrderValue = totalOrders > 0 ? totalSpent / totalOrders : 0;

  // Get orders from 30 days ago for comparison
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const previousPeriodOrders = allOrders.filter(
    (order) => new Date(order.createdAt) < thirtyDaysAgo
  );
  const previousPeriodSpent = previousPeriodOrders.reduce(
    (sum, order) => sum + parseFloat(order.total),
    0
  );

  const profile = userProfile[0] || null;

  // Get first name from user name
  const firstName = user.name?.split(' ')[0] || 'there';

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {firstName}!
        </h1>
        <p className="mt-2 text-gray-600">
          Manage your orders and account settings
        </p>
      </div>

      {/* Enhanced Metrics */}
      <DashboardMetrics
        totalOrders={totalOrders}
        recentOrders={recentOrders.length}
        totalSpent={totalSpent}
        avgOrderValue={avgOrderValue}
        previousPeriodSpent={previousPeriodSpent}
      />

      {/* Charts Section */}
      {allOrders.length > 0 && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Spending Over Time */}
          <Card>
            <CardHeader>
              <CardTitle>Spending Over Time</CardTitle>
              <CardDescription>Your monthly spending pattern</CardDescription>
            </CardHeader>
            <CardContent>
              <SpendingChart orders={allOrders} />
            </CardContent>
          </Card>

          {/* Order Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Order Status Distribution</CardTitle>
              <CardDescription>Orders by status</CardDescription>
            </CardHeader>
            <CardContent>
              <OrderStatsChart orders={allOrders} />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks you might want to do</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/products">
              <Button className="w-full bg-green-600 text-white hover:bg-green-700">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Shop Products
              </Button>
            </Link>
            <Link href="/account/orders">
              <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                <Package className="mr-2 h-4 w-4" />
                View All Orders
              </Button>
            </Link>
            <Link href="/account/details">
              <Button variant="outline" className="w-full">
                Edit Profile
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Your latest orders</CardDescription>
            </div>
            {totalOrders > 3 && (
              <Link href="/account/orders">
                <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                  View All
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {recentOrders.length === 0 ? (
            <div className="py-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <Package className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">No orders yet</h3>
              <p className="mb-6 text-sm text-gray-600">
                Start shopping to see your orders here
              </p>
              <Link href="/products">
                <Button className="bg-green-600 text-white hover:bg-green-700">
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col justify-between rounded-lg border border-gray-200 p-4 transition-all hover:border-green-300 hover:shadow-md sm:flex-row sm:items-center"
                >
                  <div className="mb-3 flex-1 sm:mb-0">
                    <div className="mb-2 flex items-center gap-3">
                      <p className="font-semibold text-gray-900">
                        Order #{order.orderNumber}
                      </p>
                      <Badge
                        variant={
                          order.status === 'delivered'
                            ? 'success'
                            : order.status === 'shipped'
                            ? 'default'
                            : order.status === 'processing'
                            ? 'default'
                            : order.status === 'cancelled'
                            ? 'destructive'
                            : 'default'
                        }
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''} •
                      €{parseFloat(order.total).toFixed(2)} •{' '}
                      {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                  <Link href={`/account/orders/${order.id}`}>
                    <Button variant="outline" size="sm" className="border-green-600 text-green-600 hover:bg-green-50">
                      View Details
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
