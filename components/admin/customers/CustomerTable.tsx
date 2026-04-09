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
import { Eye, Mail, Trash2, ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  ordersCount: number;
  totalSpent: number;
  lastOrderDate?: Date;
  joinedDate: Date;
  isGuest: boolean;
}

interface CustomerTableProps {
  customers: Customer[];
  onDelete: (ids: string[]) => void;
  onRefresh: () => void;
}

export const CustomerTable: React.FC<CustomerTableProps> = ({
  customers,
  onDelete,
  onRefresh,
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const router = useRouter();

  const columns: ColumnDef<Customer>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
        />
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 font-semibold hover:text-emerald-600"
        >
          Name
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
        <div>
          <div className="font-medium text-gray-900 dark:text-white">
            {row.original.name}
          </div>
          {row.original.isGuest && (
            <span className="text-xs text-gray-500 dark:text-gray-400">Guest</span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <a
          href={`mailto:${row.original.email}`}
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {row.original.email}
        </a>
      ),
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => row.original.phone || "-",
    },
    {
      accessorKey: "ordersCount",
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 font-semibold hover:text-emerald-600"
        >
          Orders
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
        <span className="font-medium text-gray-900 dark:text-white">
          {row.original.ordersCount}
        </span>
      ),
    },
    {
      accessorKey: "totalSpent",
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 font-semibold hover:text-emerald-600"
        >
          Total Spent
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
        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
          €{row.original.totalSpent.toFixed(2)}
        </span>
      ),
    },
    {
      accessorKey: "lastOrderDate",
      header: "Last Order",
      cell: ({ row }) =>
        row.original.lastOrderDate
          ? formatDistanceToNow(new Date(row.original.lastOrderDate), {
              addSuffix: true,
            })
          : "Never",
    },
    {
      accessorKey: "joinedDate",
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 font-semibold hover:text-emerald-600"
        >
          Joined
          {column.getIsSorted() === "asc" ? (
            <ChevronUp size={16} />
          ) : column.getIsSorted() === "desc" ? (
            <ChevronDown size={16} />
          ) : (
            <ChevronsUpDown size={16} />
          )}
        </button>
      ),
      cell: ({ row }) =>
        formatDistanceToNow(new Date(row.original.joinedDate), {
          addSuffix: true,
        }),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push(`/admin/customers/${row.original.id}`)}
            className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            title="View"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => window.open(`mailto:${row.original.email}`, '_blank')}
            className="p-2 text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400"
            title="Email"
          >
            <Mail size={16} />
          </button>
          <button
            onClick={() => {
              if (confirm('Are you sure you want to delete this customer?')) {
                onDelete([row.original.id]);
              }
            }}
            className="p-2 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: customers,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 25,
      },
    },
  });

  const selectedRows = table.getSelectedRowModel().rows;
  const selectedIds = selectedRows.map((row) => row.original.id);

  return (
    <div className="bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
      {/* Bulk Actions */}
      {selectedRows.length > 0 && (
        <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {selectedRows.length} customer(s) selected
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => {
                if (confirm(`Are you sure you want to delete ${selectedIds.length} customer(s)?`)) {
                  onDelete(selectedIds);
                  setRowSelection({});
                }
              }}
              className="px-3 py-1.5 text-sm font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
            >
              Delete Selected
            </button>
          </div>
        </div>
      )}

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
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-800">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            customers.length
          )}{" "}
          of {customers.length} customers
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
    </div>
  );
};
