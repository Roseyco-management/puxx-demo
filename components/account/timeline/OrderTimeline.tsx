'use client';

import { format } from 'date-fns';
import { Check, Package, Truck, Home, Clock, XCircle } from 'lucide-react';

interface TimelineStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  date?: Date | string | null;
  isComplete: boolean;
  isActive: boolean;
  isCancelled?: boolean;
}

interface OrderTimelineProps {
  status: string;
  createdAt: Date | string;
  completedAt?: Date | string | null;
  shippedAt?: Date | string | null;
  processingAt?: Date | string | null;
}

export default function OrderTimeline({
  status,
  createdAt,
  completedAt,
  shippedAt,
  processingAt,
}: OrderTimelineProps) {
  const isCancelled = status === 'cancelled' || status === 'refunded';

  const steps: TimelineStep[] = [
    {
      id: 'placed',
      title: 'Order Placed',
      description: format(new Date(createdAt), 'MMM dd, yyyy h:mm a'),
      icon: <Package className="h-5 w-5" />,
      date: createdAt,
      isComplete: true,
      isActive: status === 'pending',
      isCancelled: false,
    },
    {
      id: 'processing',
      title: 'Processing',
      description: processingAt
        ? format(new Date(processingAt), 'MMM dd, yyyy h:mm a')
        : 'Your order is being prepared',
      icon: <Clock className="h-5 w-5" />,
      date: processingAt,
      isComplete: ['processing', 'shipped', 'delivered'].includes(status),
      isActive: status === 'processing',
      isCancelled,
    },
    {
      id: 'shipped',
      title: 'Shipped',
      description: shippedAt
        ? format(new Date(shippedAt), 'MMM dd, yyyy h:mm a')
        : 'Your order is on the way',
      icon: <Truck className="h-5 w-5" />,
      date: shippedAt,
      isComplete: ['shipped', 'delivered'].includes(status),
      isActive: status === 'shipped',
      isCancelled,
    },
    {
      id: 'delivered',
      title: 'Delivered',
      description: completedAt
        ? format(new Date(completedAt), 'MMM dd, yyyy h:mm a')
        : 'Estimated delivery date',
      icon: <Home className="h-5 w-5" />,
      date: completedAt,
      isComplete: status === 'delivered',
      isActive: false,
      isCancelled,
    },
  ];

  if (isCancelled) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600">
            <XCircle className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-red-900">
              Order {status === 'cancelled' ? 'Cancelled' : 'Refunded'}
            </h3>
            <p className="mt-1 text-sm text-red-700">
              This order has been {status === 'cancelled' ? 'cancelled' : 'refunded'}.
            </p>
            {completedAt && (
              <p className="mt-2 text-sm text-red-600">
                {format(new Date(completedAt), 'MMM dd, yyyy h:mm a')}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const isLastStep = index === steps.length - 1;

        return (
          <div key={step.id} className="relative">
            {/* Connector Line */}
            {!isLastStep && (
              <div
                className={`absolute left-6 top-12 h-12 w-0.5 ${
                  step.isComplete && steps[index + 1].isComplete
                    ? 'bg-green-600'
                    : 'bg-gray-200'
                }`}
              />
            )}

            {/* Step Content */}
            <div className="flex items-start gap-4">
              {/* Icon Circle */}
              <div
                className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                  step.isComplete
                    ? 'border-green-600 bg-green-600 text-white shadow-lg shadow-green-600/30'
                    : step.isActive
                    ? 'border-green-600 bg-white text-green-600 shadow-lg shadow-green-600/20'
                    : 'border-gray-300 bg-white text-gray-400'
                }`}
              >
                {step.isComplete ? (
                  <Check className="h-5 w-5" />
                ) : (
                  step.icon
                )}
              </div>

              {/* Text Content */}
              <div className="flex-1 pt-1">
                <h4
                  className={`text-base font-semibold ${
                    step.isComplete || step.isActive
                      ? 'text-gray-900'
                      : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </h4>
                <p
                  className={`mt-1 text-sm ${
                    step.isComplete || step.isActive
                      ? 'text-gray-700'
                      : 'text-gray-500'
                  }`}
                >
                  {step.description}
                </p>

                {/* Active Indicator */}
                {step.isActive && (
                  <div className="mt-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      <span className="flex h-2 w-2">
                        <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                      </span>
                      In Progress
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
