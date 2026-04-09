import { OrderStatus, ORDER_STATUS_COLORS } from '@/lib/types/orders';

interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

export function OrderStatusBadge({ status, className = '' }: OrderStatusBadgeProps) {
  const colors = ORDER_STATUS_COLORS[status];

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium border inline-flex items-center ${colors} ${className}`}
    >
      {status.toUpperCase()}
    </span>
  );
}
