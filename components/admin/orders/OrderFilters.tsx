"use client";

import { Search, Calendar } from 'lucide-react';
import { OrderStatus, PaymentStatus, OrderFilters as OrderFiltersType } from '@/lib/types/orders';

interface OrderFiltersProps {
  filters: OrderFiltersType;
  onFiltersChange: (filters: OrderFiltersType) => void;
}

export function OrderFilters({ filters, onFiltersChange }: OrderFiltersProps) {
  const handleFilterChange = (key: keyof OrderFiltersType, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const handleDateRangeChange = (range: string) => {
    const now = new Date();
    let startDate: string | undefined;
    let endDate: string | undefined;

    if (range === 'today') {
      startDate = new Date(now.setHours(0, 0, 0, 0)).toISOString();
      endDate = new Date(now.setHours(23, 59, 59, 999)).toISOString();
    } else if (range === 'week') {
      const weekAgo = new Date(now);
      weekAgo.setDate(weekAgo.getDate() - 7);
      startDate = weekAgo.toISOString();
      endDate = new Date().toISOString();
    } else if (range === 'month') {
      const monthAgo = new Date(now);
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      startDate = monthAgo.toISOString();
      endDate = new Date().toISOString();
    }

    onFiltersChange({
      ...filters,
      dateRange: range as any,
      startDate,
      endDate,
    });
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {/* Search */}
        <div className="md:col-span-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search orders..."
              value={filters.search || ''}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* Order Status Filter */}
        <div>
          <select
            value={filters.status || 'all'}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
          >
            <option value="all">All Statuses</option>
            <option value={OrderStatus.PENDING}>Pending</option>
            <option value={OrderStatus.PROCESSING}>Processing</option>
            <option value={OrderStatus.SHIPPED}>Shipped</option>
            <option value={OrderStatus.DELIVERED}>Delivered</option>
            <option value={OrderStatus.CANCELLED}>Cancelled</option>
            <option value={OrderStatus.REFUNDED}>Refunded</option>
          </select>
        </div>

        {/* Payment Status Filter */}
        <div>
          <select
            value={filters.paymentStatus || 'all'}
            onChange={(e) => handleFilterChange('paymentStatus', e.target.value)}
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
          >
            <option value="all">All Payments</option>
            <option value={PaymentStatus.PENDING}>Pending</option>
            <option value={PaymentStatus.PROCESSING}>Processing</option>
            <option value={PaymentStatus.SUCCEEDED}>Paid</option>
            <option value={PaymentStatus.FAILED}>Failed</option>
            <option value={PaymentStatus.REFUNDED}>Refunded</option>
          </select>
        </div>

        {/* Date Range Filter */}
        <div>
          <select
            value={filters.dateRange || 'all'}
            onChange={(e) => handleDateRangeChange(e.target.value)}
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
      </div>

      {/* Custom Date Range */}
      {filters.dateRange === 'custom' && (
        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Start Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Calendar size={18} className="text-gray-400" />
              </div>
              <input
                type="date"
                value={filters.startDate ? filters.startDate.split('T')[0] : ''}
                onChange={(e) => {
                  const date = e.target.value ? new Date(e.target.value).toISOString() : undefined;
                  onFiltersChange({ ...filters, startDate: date });
                }}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              End Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Calendar size={18} className="text-gray-400" />
              </div>
              <input
                type="date"
                value={filters.endDate ? filters.endDate.split('T')[0] : ''}
                onChange={(e) => {
                  const date = e.target.value ? new Date(e.target.value).toISOString() : undefined;
                  onFiltersChange({ ...filters, endDate: date });
                }}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
