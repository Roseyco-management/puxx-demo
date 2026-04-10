import { getUser } from '@/lib/db/queries';
import { redirect } from 'next/navigation';
import { getSupabaseClient } from '@/lib/db/supabase';
import { getRegionConfig } from '@/lib/config/regions';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Package } from 'lucide-react';
import OrdersDataTable from '@/components/account/tables/OrdersDataTable';

export const dynamic = 'force-dynamic';

interface OrdersPageProps {
  params: Promise<{ region: string }>;
}

export default async function OrdersPage({ params }: OrdersPageProps) {
  const { region } = await params;
  const user = await getUser();

  if (!user) {
    redirect(`/${region}/sign-in`);
  }

  const config = getRegionConfig(region);
  const supabase = getSupabaseClient();

  const { data: userOrders, error: ordersError } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const safeOrders = ordersError ? [] : (userOrders || []);

  const orderIds = safeOrders.map((o: any) => o.id);
  const itemCountByOrder = new Map<number, number>();
  if (orderIds.length > 0) {
    const { data: itemsData } = await supabase
      .from('order_items')
      .select('order_id')
      .in('order_id', orderIds);

    (itemsData || []).forEach((row: any) => {
      itemCountByOrder.set(row.order_id, (itemCountByOrder.get(row.order_id) || 0) + 1);
    });
  }

  // OrdersDataTable expects the Drizzle-era camelCase shape. Map snake_case
  // Supabase columns across to keep the existing component untouched.
  const ordersWithItems = safeOrders.map((order: any) => ({
    id: order.id,
    userId: order.user_id,
    orderNumber: order.order_number,
    status: order.status,
    subtotal: order.subtotal,
    shippingCost: order.shipping_cost,
    tax: order.tax,
    discount: order.discount,
    total: order.total,
    currency: order.currency,
    paymentMethod: order.payment_method,
    paymentStatus: order.payment_status,
    stripePaymentIntentId: order.stripe_payment_intent_id,
    shippingName: order.shipping_name,
    shippingEmail: order.shipping_email,
    shippingPhone: order.shipping_phone,
    shippingAddress: order.shipping_address,
    shippingCity: order.shipping_city,
    shippingPostcode: order.shipping_postcode,
    shippingCountry: order.shipping_country,
    notes: order.notes,
    createdAt: order.created_at,
    updatedAt: order.updated_at,
    completedAt: order.completed_at,
    itemCount: itemCountByOrder.get(order.id) || 0,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
        <p className="mt-2 text-gray-600">
          View and track all your orders
        </p>
      </div>

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
              <Link href={`/${region}/products`}>
                <Button className="bg-green-600 text-white hover:bg-green-700">
                  Start Shopping
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <OrdersDataTable
          orders={ordersWithItems}
          currencySymbol={config.currencySymbol}
          ordersBasePath={`/${region}/account/orders`}
        />
      )}
    </div>
  );
}
