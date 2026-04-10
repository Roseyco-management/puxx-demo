"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Download, Search } from "lucide-react";
import { ProductTable } from "@/components/admin/products/ProductTable";
import { toast } from "sonner";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, [categoryFilter, statusFilter]);

  async function fetchProducts() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (categoryFilter !== 'all') params.append('category', categoryFilter);
      if (statusFilter !== 'all') params.append('status', statusFilter);

      const response = await fetch(`/api/admin/products?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to load products');
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      toast.error('Failed to load products');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const filteredProducts = products.filter((product: any) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (ids: string[]) => {
    try {
      await Promise.all(
        ids.map((id) =>
          fetch(`/api/admin/products/${id}`, { method: 'DELETE' }).then((r) => {
            if (!r.ok) throw new Error(`Failed to delete product ${id}`);
          })
        )
      );
      toast.success(`${ids.length} product(s) deactivated`);
      fetchProducts();
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete product(s)');
    }
  };

  const setActiveForIds = async (ids: string[], isActive: boolean) => {
    try {
      await Promise.all(
        ids.map((id) =>
          fetch(`/api/admin/products/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isActive }),
          }).then((r) => {
            if (!r.ok) throw new Error(`Failed to update product ${id}`);
          })
        )
      );
      toast.success(`${ids.length} product(s) ${isActive ? 'activated' : 'deactivated'}`);
      fetchProducts();
    } catch (error) {
      console.error(error);
      toast.error('Failed to update products');
    }
  };

  const handleBulkActivate = (ids: string[]) => setActiveForIds(ids, true);
  const handleBulkDeactivate = (ids: string[]) => setActiveForIds(ids, false);

  const exportToCSV = () => {
    const headers = ['SKU', 'Name', 'Category', 'Price', 'Stock', 'Status'];
    const csvData = [
      headers,
      ...filteredProducts.map((p: any) => [
        p.sku,
        p.name,
        p.category,
        p.price,
        p.stock_quantity,
        p.active ? 'Active' : 'Inactive'
      ])
    ];

    const csv = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `products-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();

    toast.success('Products exported successfully');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your product catalog
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <Download size={16} />
            Export CSV
          </button>
          <button
            onClick={() => router.push('/admin/products/new')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
          >
            <Plus size={16} />
            Add Product
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name or SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
            >
              <option value="all">All Categories</option>
              <option value="mint">Mint</option>
              <option value="fruit">Fruit</option>
              <option value="specialty">Specialty</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Table */}
      <ProductTable
        products={filteredProducts}
        onDelete={handleDelete}
        onBulkActivate={handleBulkActivate}
        onBulkDeactivate={handleBulkDeactivate}
        onRefresh={fetchProducts}
      />
    </div>
  );
}
