// Order Types and Interfaces

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  productName: string;
  productSku: string | null;
  quantity: number;
  price: string;
  total: string;
  imageUrl?: string;
}

export interface Order {
  id: number;
  userId: number;
  orderNumber: string;
  status: OrderStatus;
  subtotal: string;
  shippingCost: string;
  tax: string;
  discount: string;
  total: string;
  currency: string;
  paymentMethod: string | null;
  paymentStatus: PaymentStatus;
  stripePaymentIntentId: string | null;
  shippingName: string;
  shippingEmail: string;
  shippingPhone: string | null;
  shippingAddress: string;
  shippingCity: string;
  shippingPostcode: string;
  shippingCountry: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
}

export interface OrderWithItems extends Order {
  items: OrderItem[];
  itemCount: number;
  customerName: string;
  customerEmail: string;
}

export interface OrderTimelineEvent {
  status: OrderStatus;
  timestamp: string;
  user?: string;
  note?: string;
}

export interface OrderFilters {
  status?: OrderStatus | 'all';
  paymentStatus?: PaymentStatus | 'all';
  dateRange?: 'today' | 'week' | 'month' | 'custom' | 'all';
  startDate?: string;
  endDate?: string;
  search?: string;
}

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400',
  [OrderStatus.PROCESSING]: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400',
  [OrderStatus.SHIPPED]: 'bg-emerald-100 text-emerald-800 border-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
  [OrderStatus.DELIVERED]: 'bg-green-100 text-green-800 border-green-600 dark:bg-green-900/20 dark:text-green-400',
  [OrderStatus.CANCELLED]: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400',
  [OrderStatus.REFUNDED]: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-400',
};

export const PAYMENT_STATUS_COLORS: Record<PaymentStatus, string> = {
  [PaymentStatus.PENDING]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
  [PaymentStatus.PROCESSING]: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
  [PaymentStatus.SUCCEEDED]: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  [PaymentStatus.FAILED]: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
  [PaymentStatus.REFUNDED]: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400',
};

export function formatOrderNumber(num: number): string {
  return `PUXX-IE-${String(num).padStart(5, '0')}`;
}

export function getOrderTimeline(order: Order): OrderTimelineEvent[] {
  const timeline: OrderTimelineEvent[] = [
    {
      status: OrderStatus.PENDING,
      timestamp: order.createdAt,
      note: 'Order placed',
    },
  ];

  if (order.status === OrderStatus.PROCESSING || order.status === OrderStatus.SHIPPED || order.status === OrderStatus.DELIVERED) {
    timeline.push({
      status: OrderStatus.PROCESSING,
      timestamp: order.updatedAt,
      note: 'Order being processed',
    });
  }

  if (order.status === OrderStatus.SHIPPED || order.status === OrderStatus.DELIVERED) {
    timeline.push({
      status: OrderStatus.SHIPPED,
      timestamp: order.updatedAt,
      note: 'Order shipped',
    });
  }

  if (order.status === OrderStatus.DELIVERED && order.completedAt) {
    timeline.push({
      status: OrderStatus.DELIVERED,
      timestamp: order.completedAt,
      note: 'Order delivered',
    });
  }

  if (order.status === OrderStatus.CANCELLED) {
    timeline.push({
      status: OrderStatus.CANCELLED,
      timestamp: order.updatedAt,
      note: 'Order cancelled',
    });
  }

  if (order.status === OrderStatus.REFUNDED) {
    timeline.push({
      status: OrderStatus.REFUNDED,
      timestamp: order.updatedAt,
      note: 'Order refunded',
    });
  }

  return timeline;
}
