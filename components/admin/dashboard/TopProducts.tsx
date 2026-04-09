"use client";

import Image from "next/image";
import { Package } from "lucide-react";

interface Product {
  id: string;
  name: string;
  image: string;
  sales: number;
  revenue: number;
}

export const TopProducts: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Products</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Best sellers in the last 30 days</p>
      </div>

      <div className="space-y-4">
        {products.length === 0 ? (
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 py-8">
            No sales data yet
          </p>
        ) : (
          products.map((product, index) => (
            <div
              key={product.id}
              className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg dark:border-gray-800"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg dark:bg-gray-800">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={48}
                    height={48}
                    className="object-cover rounded-lg"
                  />
                ) : (
                  <Package size={24} className="text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-emerald-600 rounded-full">
                    {index + 1}
                  </span>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {product.name}
                  </p>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {product.sales} units sold
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  €{product.revenue.toFixed(2)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
