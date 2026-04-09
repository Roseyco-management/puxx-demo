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
import { Trash2, ChevronUp, ChevronDown, ChevronsUpDown, UserX } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Subscriber {
  id: string;
  email: string;
  name?: string;
  source: string;
  subscribedAt: Date;
  status: 'active' | 'unsubscribed';
}

interface SubscriberTableProps {
  subscribers: Subscriber[];
  onUnsubscribe: (ids: string[]) => void;
  onDelete: (ids: string[]) => void;
  onRefresh: () => void;
}

export const SubscriberTable: React.FC<SubscriberTableProps> = ({
  subscribers,
  onUnsubscribe,
  onDelete,
  onRefresh,
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const columns: ColumnDef<Subscriber>[] = [
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
      accessorKey: "email",
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 font-semibold hover:text-emerald-600"
        >
          Email
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
        <a
          href={`mailto:${row.original.email}`}
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {row.original.email}
        </a>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => row.original.name || "-",
    },
    {
      accessorKey: "source",
      header: "Source",
      cell: ({ row }) => (
        <span className="px-2 py-1 text-xs font-medium text-gray-700 capitalize bg-gray-100 rounded-full dark:bg-gray-800 dark:text-gray-300">
          {row.original.source}
        </span>
      ),
    },
    {
      accessorKey: "subscribedAt",
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 font-semibold hover:text-emerald-600"
        >
          Subscribed
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
        formatDistanceToNow(new Date(row.original.subscribedAt), {
          addSuffix: true,
        }),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            row.original.status === 'active'
              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400"
              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
          }`}
        >
          {row.original.status === 'active' ? 'Active' : 'Unsubscribed'}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {row.original.status === 'active' && (
            <button
              onClick={() => {
                if (confirm('Are you sure you want to unsubscribe this subscriber?')) {
                  onUnsubscribe([row.original.id]);
                }
              }}
              className="p-2 text-gray-600 hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-400"
              title="Unsubscribe"
            >
              <UserX size={16} />
            </button>
          )}
          <button
            onClick={() => {
              if (confirm('Are you sure you want to permanently delete this subscriber?')) {
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
    data: subscribers,
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
            {selectedRows.length} subscriber(s) selected
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => {
                if (confirm(`Are you sure you want to unsubscribe ${selectedIds.length} subscriber(s)?`)) {
                  onUnsubscribe(selectedIds);
                  setRowSelection({});
                }
              }}
              className="px-3 py-1.5 text-sm font-medium text-orange-700 bg-orange-100 rounded-lg hover:bg-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:hover:bg-orange-900/30"
            >
              Unsubscribe
            </button>
            <button
              onClick={() => {
                if (confirm(`Are you sure you want to delete ${selectedIds.length} subscriber(s)?`)) {
                  onDelete(selectedIds);
                  setRowSelection({});
                }
              }}
              className="px-3 py-1.5 text-sm font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
            >
              Delete
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
            subscribers.length
          )}{" "}
          of {subscribers.length} subscribers
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
