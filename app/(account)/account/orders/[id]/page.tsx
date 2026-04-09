import { getUser } from '@/lib/db/queries';
import { redirect, notFound } from 'next/navigation';
import { db } from '@/lib/db/drizzle';
import { orders, orderItems, products } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Package, MapPin, CreditCard } from 'lucide-react';
import { format } from 'date-fns';
import OrderTimeline from '@/components/account/timeline/OrderTimeline';
import ReorderButton from '@/components/account/ReorderButton';

interface OrderDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  const { id } = await params;
  const user = await getUser();

  if (!user) {
    redirect('/sign-in');
  }

  if (!db) {
    throw new Error('Database not configured');
  }

  // Get order
  const orderResult = await db
    .select()
    .from(orders)
    .where(and(eq(orders.id, parseInt(id)), eq(orders.userId, user.id)))
    .limit(1);

  if (orderResult.length === 0) {
    notFound();
  }

  const order = orderResult[0];

  // Get order items
  const items = await db
    .select({
      orderItem: orderItems,
      product: products,
    })
    .from(orderItems)
    .leftJoin(products, eq(orderItems.productId, products.id))
    .where(eq(orderItems.orderId, order.id));

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'success';
      case 'shipped':
        return 'default';
      case 'processing':
        return 'default';
      case 'cancelled':
      case 'refunded':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'succeeded':
        return 'text-green-600';
      case 'failed':
        return 'text-red-600';
      case 'processing':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/account/orders">
          <Button variant="ghost" size="sm" className="hover:bg-gray-100">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Button>
        </Link>
      </div>

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Order #{order.orderNumber}
          </h1>
          <p className="mt-2 text-gray-600">
            Placed on {format(new Date(order.createdAt), 'MMMM dd, yyyy')}
          </p>
        </div>
        <Badge variant={getStatusBadgeVariant(order.status)} className="px-4 py-2 text-sm">
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Order Items */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Items
              </CardTitle>
              <CardDescription>
                {items.length} item{items.length !== 1 ? 's' : ''} in this order
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.orderItem.id}
                    className="flex gap-4 border-b border-gray-100 pb-4 last:border-0"
                  >
                    {item.product?.imageUrl && (
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        <img
                          src={item.product.imageUrl}
                          alt={item.orderItem.productName}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-gray-900">
                        {item.orderItem.productName}
                      </h4>
                      {item.orderItem.productSku && (
                        <p className="mt-1 text-sm text-gray-600">
                          SKU: {item.orderItem.productSku}
                        </p>
                      )}
                      <p className="mt-1 text-sm text-gray-600">
                        Quantity: {item.orderItem.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        €{parseFloat(item.orderItem.total).toFixed(2)}
                      </p>
                      <p className="mt-1 text-sm text-gray-600">
                        €{parseFloat(item.orderItem.price).toFixed(2)} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reorder Button */}
              <div className="mt-6 border-t border-gray-200 pt-6">
                <ReorderButton orderId={order.id} items={items} />
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Order Tracking */}
          {order.status !== 'cancelled' && order.status !== 'refunded' && (
            <Card>
              <CardHeader>
                <CardTitle>Order Tracking</CardTitle>
                <CardDescription>Track your order status</CardDescription>
              </CardHeader>
              <CardContent>
                <OrderTimeline
                  status={order.status}
                  createdAt={order.createdAt}
                  completedAt={order.completedAt}
                  shippedAt={null}
                  processingAt={null}
                />
              </CardContent>
            </Card>
          )}

          {/* Cancelled/Refunded Notice */}
          {(order.status === 'cancelled' || order.status === 'refunded') && (
            <Card>
              <CardHeader>
                <CardTitle>Order Status</CardTitle>
              </CardHeader>
              <CardContent>
                <OrderTimeline
                  status={order.status}
                  createdAt={order.createdAt}
                  completedAt={order.completedAt}
                  shippedAt={null}
                  processingAt={null}
                />
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary & Details */}
        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-900">
                  €{parseFloat(order.subtotal).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-gray-900">
                  €{parseFloat(order.shippingCost).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium text-gray-900">
                  €{parseFloat(order.tax).toFixed(2)}
                </span>
              </div>
              {parseFloat(order.discount) > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Discount</span>
                  <span className="font-medium text-green-600">
                    -€{parseFloat(order.discount).toFixed(2)}
                  </span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-gray-900">
                    €{parseFloat(order.total).toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 text-sm">
                <p className="font-semibold text-gray-900">{order.shippingName}</p>
                <p className="text-gray-700">{order.shippingAddress}</p>
                <p className="text-gray-700">
                  {order.shippingCity}, {order.shippingPostcode}
                </p>
                <p className="text-gray-700">{order.shippingCountry}</p>
                {order.shippingPhone && (
                  <p className="mt-2 text-gray-700">{order.shippingPhone}</p>
                )}
                {order.shippingEmail && (
                  <p className="text-gray-700">{order.shippingEmail}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Method</span>
                  <span className="font-medium capitalize text-gray-900">
                    {order.paymentMethod || 'Card'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className={`font-medium capitalize ${getPaymentStatusColor(order.paymentStatus)}`}>
                    {order.paymentStatus}
                  </span>
                </div>
                {order.currency && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Currency</span>
                    <span className="font-medium text-gray-900">
                      {order.currency}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Order Notes */}
          {order.notes && (
            <Card>
              <CardHeader>
                <CardTitle>Order Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">{order.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
