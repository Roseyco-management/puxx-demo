"use client";

import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  SortingState,
  ColumnDef,
} from "@tanstack/react-table";
import { Eye, ChevronUp, ChevronDown, ChevronsUpDown, Printer } from "lucide-react";
import { useRouter } from "next/navigation";
import { OrderWithItems, OrderStatus, PaymentStatus, PAYMENT_STATUS_COLORS } from '@/lib/types/orders';
import { OrderStatusBadge } from './OrderStatusBadge';

interface OrderTableProps {
  orders: OrderWithItems[];
  onRefresh: () => void;
}

export function OrderTable({ orders, onRefresh }: OrderTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const router = useRouter();

  const formatCurrency = (amount: string) => {
    return `€${parseFloat(amount).toFixed(2)}`;
  };

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

  const columns: ColumnDef<OrderWithItems>[] = [
    {
      accessorKey: "orderNumber",
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 font-semibold hover:text-emerald-600"
        >
          Order #
          {column.getIsSorted() === "asc" ? (
            <ChevronUp size={16} />
          ) : column.getIsSorted() === "desc" ? (
            <ChevronDown size={16} />
          ) : (
            <ChevronsUpDown size={16} />
          )}
        </button>
      ),
      cell: ({ row }) => (
        <span className="font-mono text-sm font-medium text-emerald-600 dark:text-emerald-400">
          {row.original.orderNumber}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 font-semibold hover:text-emerald-600"
        >
          Date
          {column.getIsSorted() === "asc" ? (
            <ChevronUp size={16} />
          ) : column.getIsSorted() === "desc" ? (
            <ChevronDown size={16} />
          ) : (
            <ChevronsUpDown size={16} />
          )}
        </button>
      ),
      cell: ({ row }) => (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {formatDate(row.original.createdAt)}
        </span>
      ),
    },
    {
      accessorKey: "customerName",
      header: "Customer",
      cell: ({ row }) => (
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {row.original.customerName}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {row.original.customerEmail}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "itemCount",
      header: "Items",
      cell: ({ row }) => (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {row.original.itemCount} {row.original.itemCount === 1 ? 'item' : 'items'}
        </span>
      ),
    },
    {
      accessorKey: "total",
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 font-semibold hover:text-emerald-600"
        >
          Total
          {column.getIsSorted() === "asc" ? (
            <ChevronUp size={16} />
          ) : column.getIsSorted() === "desc" ? (
            <ChevronDown size={16} />
          ) : (
            <ChevronsUpDown size={16} />
          )}
        </button>
      ),
      cell: ({ row }) => (
        <span className="text-sm font-semibold text-gray-900 dark:text-white">
          {formatCurrency(row.original.total)}
        </span>
      ),
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment",
      cell: ({ row }) => {
        const status = row.original.paymentStatus as PaymentStatus;
        const colors = PAYMENT_STATUS_COLORS[status];
        return (
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <OrderStatusBadge status={row.original.status as OrderStatus} />
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push(`/admin/orders/${row.original.id}`)}
            className="p-2 text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400"
            title="View Details"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => window.open(`/api/admin/orders/${row.original.id}/invoice`, '_blank')}
            className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            title="Print Invoice"
          >
            <Printer size={16} />
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: orders,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 25,
      },
    },
  });

  return (
    <div className="bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-200 dark:border-gray-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider dark:text-gray-300"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center">
                  <div className="text-gray-500 dark:text-gray-400">
                    <p className="text-lg font-medium">No orders found</p>
                    <p className="mt-1 text-sm">Try adjusting your filters</p>
                  </div>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"
                  onClick={() => router.push(`/admin/orders/${row.original.id}`)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {orders.length > 0 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-800">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              orders.length
            )}{" "}
            of {orders.length} orders
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              Previous
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-emerald-700 dark:hover:bg-emerald-600"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
