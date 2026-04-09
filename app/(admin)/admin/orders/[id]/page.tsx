"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Printer, Save, Mail, Package } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { OrderWithItems, OrderStatus, getOrderTimeline } from "@/lib/types/orders";
import { OrderStatusBadge } from "@/components/admin/orders/OrderStatusBadge";
import { OrderTimeline } from "@/components/admin/orders/OrderTimeline";
import Image from "next/image";

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [order, setOrder] = useState<OrderWithItems | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(OrderStatus.PENDING);
  const [notes, setNotes] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');

  useEffect(() => {
    fetchOrder();
  }, [params.id]);

  async function fetchOrder() {
    const supabase = createClient();

    const { data: order, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          id,
          product_id,
          product_name,
          product_sku,
          quantity,
          price,
          total,
          products (
            image_url
          )
        )
      `)
      .eq('id', params.id)
      .single();

    if (error) {
      toast.error('Failed to load order');
      console.error(error);
      setLoading(false);
      return;
    }

    const transformedOrder: OrderWithItems = {
      ...order,
      items: (order.order_items || []).map((item: any) => ({
        ...item,
        imageUrl: item.products?.image_url,
      })),
      itemCount: order.order_items?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0,
      customerName: order.shipping_name,
      customerEmail: order.shipping_email,
    };

    setOrder(transformedOrder);
    setSelectedStatus(transformedOrder.status as OrderStatus);
    setNotes(transformedOrder.notes || '');
    setLoading(false);
  }

  async function handleUpdateOrder() {
    if (!order) return;

    setSaving(true);

    try {
      const response = await fetch(`/api/admin/orders/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: selectedStatus,
          notes,
          trackingNumber: trackingNumber || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order');
      }

      toast.success('Order updated successfully');
      await fetchOrder();
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Failed to update order');
    } finally {
      setSaving(false);
    }
  }

  const handlePrintInvoice = () => {
    window.open(`/api/admin/orders/${params.id}/invoice`, '_blank');
  };

  const formatCurrency = (amount: string) => {
    return `€${parseFloat(amount).toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IE', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Package size={64} className="text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Order not found</h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          The order you're looking for doesn't exist.
        </p>
        <button
          onClick={() => router.push('/admin/orders')}
          className="mt-6 flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700"
        >
          <ArrowLeft size={16} />
          Back to Orders
        </button>
      </div>
    );
  }

  const timeline = getOrderTimeline(order);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/admin/orders')}
            className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Order {order.orderNumber}
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Placed on {formatDate(order.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handlePrintInvoice}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <Printer size={16} />
            Print Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Order Status */}
          <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Order Status
            </h2>
            <div className="flex items-center gap-4">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as OrderStatus)}
                className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              >
                <option value={OrderStatus.PENDING}>Pending</option>
                <option value={OrderStatus.PROCESSING}>Processing</option>
                <option value={OrderStatus.SHIPPED}>Shipped</option>
                <option value={OrderStatus.DELIVERED}>Delivered</option>
                <option value={OrderStatus.CANCELLED}>Cancelled</option>
                <option value={OrderStatus.REFUNDED}>Refunded</option>
              </select>
              <OrderStatusBadge status={order.status as OrderStatus} />
            </div>
            <button
              onClick={handleUpdateOrder}
              disabled={saving || selectedStatus === order.status}
              className="mt-4 flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={16} />
              {saving ? 'Saving...' : 'Update Status'}
            </button>
          </div>

          {/* Order Items */}
          <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Order Items
            </h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-800 last:border-0">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden dark:bg-gray-800">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.productName}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-gray-400">
                        <Package size={24} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {item.productName}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      SKU: {item.productSku || 'N/A'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Qty: {item.quantity}
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {formatCurrency(item.price)}
                    </p>
                  </div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(item.total)}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="text-gray-900 dark:text-white">{formatCurrency(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span className="text-gray-900 dark:text-white">{formatCurrency(order.shippingCost)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Tax (VAT 23%)</span>
                  <span className="text-gray-900 dark:text-white">{formatCurrency(order.tax)}</span>
                </div>
                {parseFloat(order.discount) > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Discount</span>
                    <span className="text-emerald-600 dark:text-emerald-400">
                      -{formatCurrency(order.discount)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200 dark:border-gray-800">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(order.total)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Payment Information
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Payment Method</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {order.paymentMethod || 'Credit Card'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Payment Status</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                  {order.paymentStatus}
                </span>
              </div>
              {order.stripePaymentIntentId && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Transaction ID</span>
                  <span className="text-sm font-mono text-gray-900 dark:text-white">
                    {order.stripePaymentIntentId}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Admin Notes */}
          <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Admin Notes
            </h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Add internal notes about this order..."
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
            />
            <button
              onClick={handleUpdateOrder}
              disabled={saving}
              className="mt-4 flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={16} />
              {saving ? 'Saving...' : 'Save Notes'}
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Information */}
          <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Customer
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {order.shippingName}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {order.shippingEmail}
                </p>
                {order.shippingPhone && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {order.shippingPhone}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Shipping Address
            </h2>
            <address className="text-sm text-gray-600 dark:text-gray-400 not-italic">
              {order.shippingAddress}<br />
              {order.shippingCity}, {order.shippingPostcode}<br />
              {order.shippingCountry}
            </address>
          </div>

          {/* Order Timeline */}
          <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Order Timeline
            </h2>
            <OrderTimeline events={timeline} currentStatus={order.status as OrderStatus} />
          </div>
        </div>
      </div>
    </div>
  );
}
