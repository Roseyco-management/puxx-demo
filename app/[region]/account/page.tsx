import { getUser } from '@/lib/db/queries';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db/drizzle';
import { orders, profiles } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { getRegionConfig } from '@/lib/config/regions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Package, ArrowRight } from 'lucide-react';
import { ReferralCard } from '@/components/account/ReferralCard';

const getStatusBadgeVariant = (status: string): 'default' | 'success' | 'destructive' | 'outline' => {
  switch (status) {
    case 'delivered':
      return 'success';
    case 'cancelled':
    case 'refunded':
      return 'destructive';
    default:
      return 'default';
  }
};

interface AccountPageProps {
  params: Promise<{ region: string }>;
}

export default async function AccountPage({ params }: AccountPageProps) {
  const { region } = await params;
  const user = await getUser();

  if (!user) {
    redirect(`/${region}/sign-in`);
  }

  if (!db) {
    throw new Error('Database not configured');
  }

  const config = getRegionConfig(region);

  // Get user profile
  const profileResult = await db
    .select()
    .from(profiles)
    .where(eq(profiles.userId, user.id))
    .limit(1);
  const profile = profileResult[0] || null;

  // Get all orders count
  const allOrders = await db
    .select()
    .from(orders)
    .where(eq(orders.userId, user.id));
  const totalOrderCount = allOrders.length;

  // Get recent orders (last 3)
  const recentOrders = await db
    .select()
    .from(orders)
    .where(eq(orders.userId, user.id))
    .orderBy(desc(orders.createdAt))
    .limit(3);

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user.name || user.email}
        </h1>
        <p className="mt-2 text-gray-600">
          Manage your orders and referral codes
        </p>
      </div>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Link href={`/${region}/account/orders`}>
              <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                View All ({totalOrderCount})
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {recentOrders.length === 0 ? (
            <div className="py-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <Package className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">No orders yet</h3>
              <p className="mb-4 text-sm text-gray-600">
                Start shopping to see your orders here
              </p>
              <Link href={`/${region}/products`}>
                <Button className="bg-green-600 text-white hover:bg-green-700">
                  Shop Now
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between rounded-lg border border-gray-200 p-3 hover:border-green-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-medium text-gray-900">#{order.orderNumber}</p>
                      <p className="text-sm text-gray-500">
                        {config.currencySymbol}{parseFloat(order.total).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={getStatusBadgeVariant(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                    <Link href={`/${region}/account/orders/${order.id}`}>
                      <Button variant="outline" size="sm" className="border-green-600 text-green-600 hover:bg-green-50">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Referral Card */}
      <ReferralCard
        retailCode={profile?.retailReferralCode ?? null}
        wholesaleCode={profile?.wholesaleReferralCode ?? null}
        commissionEarned={profile?.commissionEarned ?? null}
        currencySymbol={config.currencySymbol}
      />
    </div>
  );
}
