'use client';

import { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
  SortingState,
  ColumnFiltersState,
} from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowUpDown, ChevronLeft, ChevronRight, Eye, Search } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Order {
  id: number;
  orderNumber: string;
  createdAt: Date | string;
  total: string;
  status: string;
  itemCount: number;
}

interface OrdersDataTableProps {
  orders: Order[];
}

const getStatusBadgeVariant = (status: string): 'default' | 'success' | 'destructive' | 'outline' => {
  switch (status) {
    case 'delivered':
      return 'success';
    case 'cancelled':
    case 'refunded':
      return 'destructive';
    default:
      return 'default';
  }
};

export default function OrdersDataTable({ orders }: OrdersDataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'createdAt', desc: true },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = useMemo<ColumnDef<Order>[]>(
    () => [
      {
        accessorKey: 'orderNumber',
        header: ({ column }) => (
          <button
            className="flex items-center gap-2 font-semibold text-gray-700 hover:text-gray-900"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Order Number
            <ArrowUpDown className="h-4 w-4" />
          </button>
        ),
        cell: ({ row }) => (
          <span className="font-medium text-gray-900">#{row.original.orderNumber}</span>
        ),
      },
      {
        accessorKey: 'createdAt',
        header: ({ column }) => (
          <button
            className="flex items-center gap-2 font-semibold text-gray-700 hover:text-gray-900"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Date
            <ArrowUpDown className="h-4 w-4" />
          </button>
        ),
        cell: ({ row }) => format(new Date(row.original.createdAt), 'dd MMM yyyy'),
        sortingFn: 'datetime',
      },
      {
        accessorKey: 'itemCount',
        header: 'Items',
        cell: ({ row }) => (
          <span className="text-gray-700">
            {row.original.itemCount} item{row.original.itemCount !== 1 ? 's' : ''}
          </span>
        ),
      },
      {
        accessorKey: 'total',
        header: ({ column }) => (
          <button
            className="flex items-center gap-2 font-semibold text-gray-700 hover:text-gray-900"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Total
            <ArrowUpDown className="h-4 w-4" />
          </button>
        ),
        cell: ({ row }) => (
          <span className="font-semibold text-gray-900">
            €{parseFloat(row.original.total).toFixed(2)}
          </span>
        ),
        sortingFn: (rowA, rowB) => {
          const a = parseFloat(rowA.original.total);
          const b = parseFloat(rowB.original.total);
          return a - b;
        },
      },
      {
        accessorKey: 'status',
        header: ({ column }) => (
          <button
            className="flex items-center gap-2 font-semibold text-gray-700 hover:text-gray-900"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Status
            <ArrowUpDown className="h-4 w-4" />
          </button>
        ),
        cell: ({ row }) => (
          <Badge variant={getStatusBadgeVariant(row.original.status)}>
            {row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1)}
          </Badge>
        ),
        filterFn: 'equals',
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <Link href={`/account/orders/${row.original.id}`}>
            <Button
              variant="outline"
              size="sm"
              className="border-green-600 text-green-600 hover:bg-green-50"
            >
              <Eye className="mr-1 h-4 w-4" />
              View
            </Button>
          </Link>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: orders,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="w-full space-y-4">
      {/* Search and Filter Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders..."
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="h-10 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Show:</label>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
          >
            {[10, 20, 30, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left text-sm"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-200">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 text-sm">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-gray-600">
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{' '}
          of {table.getFilteredRowModel().rows.length} entries
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: table.getPageCount() }, (_, i) => i).map((pageIndex) => {
              const currentPage = table.getState().pagination.pageIndex;
              // Show first page, last page, current page, and 1 page before/after current
              if (
                pageIndex === 0 ||
                pageIndex === table.getPageCount() - 1 ||
                Math.abs(pageIndex - currentPage) <= 1
              ) {
                return (
                  <button
                    key={pageIndex}
                    onClick={() => table.setPageIndex(pageIndex)}
                    className={`h-8 w-8 rounded-lg text-sm font-medium transition-colors ${
                      pageIndex === currentPage
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {pageIndex + 1}
                  </button>
                );
              } else if (
                pageIndex === currentPage - 2 ||
                pageIndex === currentPage + 2
              ) {
                return <span key={pageIndex}>...</span>;
              }
              return null;
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
