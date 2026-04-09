"use client";

import { AlertTriangle, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  stock_quantity: number;
  reorder_point: number;
  sku: string;
}

export const LowStockAlerts: React.FC<{ products: Product[] }> = ({ products }) => {
  const router = useRouter();

  const getStockLevel = (stock: number) => {
    if (stock === 0) return { label: 'Out of Stock', color: 'text-red-600 dark:text-red-400' };
    if (stock <= 5) return { label: 'Critical', color: 'text-red-600 dark:text-red-400' };
    if (stock <= 10) return { label: 'Low', color: 'text-orange-600 dark:text-orange-400' };
    return { label: 'Moderate', color: 'text-yellow-600 dark:text-yellow-400' };
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Low Stock Alerts</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Products that need restocking</p>
      </div>

      <div className="space-y-4">
        {products.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              All products are well stocked
            </p>
          </div>
        ) : (
          products.map((product) => {
            const stockLevel = getStockLevel(product.stock_quantity);
            return (
              <div
                key={product.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg dark:border-gray-800"
              >
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/20">
                    <AlertTriangle size={20} className="text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {product.name}
                    </p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      SKU: {product.sku}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs font-semibold ${stockLevel.color}`}>
                        {stockLevel.label}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Stock: {product.stock_quantity} / Reorder: {product.reorder_point}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => router.push(`/admin/products/${product.id}/edit`)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
                >
                  <Plus size={16} />
                  <span className="hidden sm:inline">Restock</span>
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
