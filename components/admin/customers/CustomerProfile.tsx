"use client";

import { Mail, Phone, Calendar, ShoppingBag, DollarSign, TrendingUp, CheckCircle, XCircle } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";

interface CustomerProfileProps {
  customer: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    dateOfBirth?: Date;
    ageVerified: boolean;
    marketingConsent: boolean;
    joinedDate: Date;
    isGuest: boolean;
    ordersCount: number;
    totalSpent: number;
    averageOrderValue: number;
    lastOrderDate?: Date;
  };
}

export function CustomerProfile({ customer }: CustomerProfileProps) {
  return (
    <div className="space-y-6">
      {/* Main Info Card */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-16 h-16 text-2xl font-bold text-white bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full">
                {customer.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {customer.name}
                </h2>
                {customer.isGuest && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                    Guest Customer
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Email */}
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                  <a
                    href={`mailto:${customer.email}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400"
                  >
                    {customer.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              {customer.phone && (
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Phone</p>
                    <a
                      href={`tel:${customer.phone}`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400"
                    >
                      {customer.phone}
                    </a>
                  </div>
                </div>
              )}

              {/* Joined Date */}
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Customer Since</p>
                  <p className="text-sm font-medium">
                    {format(new Date(customer.joinedDate), 'PPP')}
                    <span className="ml-1 text-xs text-gray-500">
                      ({formatDistanceToNow(new Date(customer.joinedDate), { addSuffix: true })})
                    </span>
                  </p>
                </div>
              </div>

              {/* Date of Birth */}
              {customer.dateOfBirth && (
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Date of Birth</p>
                    <p className="text-sm font-medium">
                      {format(new Date(customer.dateOfBirth), 'PPP')}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Verification Status */}
            <div className="flex gap-4 mt-4">
              <div className="flex items-center gap-2">
                {customer.ageVerified ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                )}
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Age {customer.ageVerified ? 'Verified' : 'Not Verified'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {customer.marketingConsent ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                )}
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Marketing {customer.marketingConsent ? 'Opted In' : 'Opted Out'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* Total Orders */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg dark:bg-blue-900/20">
              <ShoppingBag className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {customer.ordersCount}
              </p>
            </div>
          </div>
        </div>

        {/* Total Spent */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-100 rounded-lg dark:bg-emerald-900/20">
              <DollarSign className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                €{customer.totalSpent.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Average Order Value */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg dark:bg-purple-900/20">
              <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Avg Order Value</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                €{customer.averageOrderValue.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Last Order */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-lg dark:bg-orange-900/20">
              <Calendar className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Last Order</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                {customer.lastOrderDate
                  ? formatDistanceToNow(new Date(customer.lastOrderDate), { addSuffix: true })
                  : 'Never'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
