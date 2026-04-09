"use client";

import { OrderTimelineEvent, OrderStatus } from '@/lib/types/orders';
import { Package, CheckCircle, Truck, Home, XCircle, RefreshCw } from 'lucide-react';

interface OrderTimelineProps {
  events: OrderTimelineEvent[];
  currentStatus: OrderStatus;
}

const STATUS_ICONS: Record<OrderStatus, React.ComponentType<{ size?: number; className?: string }>> = {
  [OrderStatus.PENDING]: Package,
  [OrderStatus.PROCESSING]: RefreshCw,
  [OrderStatus.SHIPPED]: Truck,
  [OrderStatus.DELIVERED]: Home,
  [OrderStatus.CANCELLED]: XCircle,
  [OrderStatus.REFUNDED]: RefreshCw,
};

const STATUS_LABELS: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: 'Order Placed',
  [OrderStatus.PROCESSING]: 'Processing',
  [OrderStatus.SHIPPED]: 'Shipped',
  [OrderStatus.DELIVERED]: 'Delivered',
  [OrderStatus.CANCELLED]: 'Cancelled',
  [OrderStatus.REFUNDED]: 'Refunded',
};

export function OrderTimeline({ events, currentStatus }: OrderTimelineProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IE', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const isEventCompleted = (eventStatus: OrderStatus) => {
    const statusOrder = [
      OrderStatus.PENDING,
      OrderStatus.PROCESSING,
      OrderStatus.SHIPPED,
      OrderStatus.DELIVERED,
    ];

    const currentIndex = statusOrder.indexOf(currentStatus);
    const eventIndex = statusOrder.indexOf(eventStatus);

    if (currentStatus === OrderStatus.CANCELLED || currentStatus === OrderStatus.REFUNDED) {
      return eventStatus === OrderStatus.PENDING || eventStatus === currentStatus;
    }

    return eventIndex <= currentIndex;
  };

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {events.map((event, eventIdx) => {
          const Icon = STATUS_ICONS[event.status];
          const isCompleted = isEventCompleted(event.status);
          const isLast = eventIdx === events.length - 1;
          const isCancelled = event.status === OrderStatus.CANCELLED;
          const isRefunded = event.status === OrderStatus.REFUNDED;

          return (
            <li key={eventIdx}>
              <div className="relative pb-8">
                {!isLast && (
                  <span
                    className={`absolute left-4 top-4 -ml-px h-full w-0.5 ${
                      isCompleted ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex space-x-3">
                  <div>
                    <span
                      className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-gray-900 ${
                        isCancelled
                          ? 'bg-red-600'
                          : isRefunded
                          ? 'bg-gray-600'
                          : isCompleted
                          ? 'bg-emerald-600'
                          : 'bg-gray-300 dark:bg-gray-700'
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 ${
                          isCompleted || isCancelled || isRefunded ? 'text-white' : 'text-gray-500'
                        }`}
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          isCompleted
                            ? 'text-gray-900 dark:text-white'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {STATUS_LABELS[event.status]}
                      </p>
                      {event.note && (
                        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                          {event.note}
                        </p>
                      )}
                      {event.user && (
                        <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
                          by {event.user}
                        </p>
                      )}
                    </div>
                    <div className="whitespace-nowrap text-right text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(event.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
