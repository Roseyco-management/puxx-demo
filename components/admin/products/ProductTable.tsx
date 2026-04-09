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
import { Edit, Trash2, Eye, ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock_quantity: number;
  active: boolean;
  image_url?: string;
  strength?: number;
}

interface ProductTableProps {
  products: Product[];
  onDelete: (ids: string[]) => void;
  onBulkActivate: (ids: string[]) => void;
  onBulkDeactivate: (ids: string[]) => void;
  onRefresh: () => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onDelete,
  onBulkActivate,
  onBulkDeactivate,
  onRefresh,
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const router = useRouter();

  const columns: ColumnDef<Product>[] = [
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
      accessorKey: "image_url",
      header: "Image",
      cell: ({ row }) => (
        <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden dark:bg-gray-800">
          {row.original.image_url ? (
            <Image
              src={row.original.image_url}
              alt={row.original.name}
              width={48}
              height={48}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-400">
              <Eye size={20} />
            </div>
          )}
        </div>
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
    },
    {
      accessorKey: "sku",
      header: "SKU",
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <span className="px-2 py-1 text-xs font-medium text-gray-700 capitalize bg-gray-100 rounded-full dark:bg-gray-800 dark:text-gray-300">
          {row.original.category}
        </span>
      ),
    },
    {
      accessorKey: "strength",
      header: "Strength",
      cell: ({ row }) => row.original.strength ? `${row.original.strength}mg` : '-',
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 font-semibold hover:text-emerald-600"
        >
          Price
          {column.getIsSorted() === "asc" ? (
            <ChevronUp size={16} />
          ) : column.getIsSorted() === "desc" ? (
            <ChevronDown size={16} />
          ) : (
            <ChevronsUpDown size={16} />
          )}
        </button>
      ),
      cell: ({ row }) => `€${parseFloat(row.original.price as any).toFixed(2)}`,
    },
    {
      accessorKey: "stock_quantity",
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 font-semibold hover:text-emerald-600"
        >
          Stock
          {column.getIsSorted() === "asc" ? (
            <ChevronUp size={16} />
          ) : column.getIsSorted() === "desc" ? (
            <ChevronDown size={16} />
          ) : (
            <ChevronsUpDown size={16} />
          )}
        </button>
      ),
      cell: ({ row }) => {
        const stock = row.original.stock_quantity;
        const color = stock === 0 ? 'text-red-600 dark:text-red-400' : stock <= 10 ? 'text-orange-600 dark:text-orange-400' : 'text-gray-900 dark:text-white';
        return <span className={`font-medium ${color}`}>{stock}</span>;
      },
    },
    {
      accessorKey: "active",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            row.original.active
              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400"
              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
          }`}
        >
          {row.original.active ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push(`/admin/products/${row.original.id}`)}
            className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            title="View"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => router.push(`/admin/products/${row.original.id}/edit`)}
            className="p-2 text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400"
            title="Edit"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => {
              if (confirm('Are you sure you want to delete this product?')) {
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
    data: products,
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
        pageSize: 20,
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
            {selectedRows.length} product(s) selected
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => onBulkActivate(selectedIds)}
              className="px-3 py-1.5 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-lg hover:bg-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:hover:bg-emerald-900/30"
            >
              Activate
            </button>
            <button
              onClick={() => onBulkDeactivate(selectedIds)}
              className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Deactivate
            </button>
            <button
              onClick={() => {
                if (confirm(`Are you sure you want to delete ${selectedIds.length} product(s)?`)) {
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
            products.length
          )}{" "}
          of {products.length} products
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
