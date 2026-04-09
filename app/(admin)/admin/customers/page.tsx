"use client";

import { useState, useEffect } from "react";
import { Download, Search, Users } from "lucide-react";
import { CustomerTable } from "@/components/admin/customers/CustomerTable";
import { toast } from "sonner";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isGuestFilter, setIsGuestFilter] = useState("all");
  const [hasOrdersFilter, setHasOrdersFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, [isGuestFilter, hasOrdersFilter, dateFrom, dateTo]);

  async function fetchCustomers() {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      if (searchQuery) params.append('search', searchQuery);
      if (isGuestFilter !== 'all') params.append('isGuest', isGuestFilter);
      if (hasOrdersFilter !== 'all') params.append('hasOrders', hasOrdersFilter);
      if (dateFrom) params.append('dateFrom', dateFrom);
      if (dateTo) params.append('dateTo', dateTo);

      const response = await fetch(`/api/admin/customers?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setCustomers(data.customers);
      } else {
        toast.error('Failed to load customers');
      }
    } catch (error) {
      toast.error('Failed to load customers');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCustomers();
  };

  const handleDelete = async (ids: string[]) => {
    try {
      for (const id of ids) {
        const response = await fetch(`/api/admin/customers/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete customer');
        }
      }

      toast.success(`${ids.length} customer(s) deleted`);
      fetchCustomers();
    } catch (error) {
      toast.error('Failed to delete customers');
      console.error(error);
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Orders', 'Total Spent', 'Last Order', 'Joined'];
    const csvData = [
      headers,
      ...customers.map((c: any) => [
        c.name,
        c.email,
        c.phone || '',
        c.ordersCount,
        c.totalSpent,
        c.lastOrderDate ? new Date(c.lastOrderDate).toLocaleDateString() : 'Never',
        new Date(c.joinedDate).toLocaleDateString(),
      ])
    ];

    const csv = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `customers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();

    toast.success('Customers exported successfully');
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Customers</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your customer database
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
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-100 rounded-lg dark:bg-emerald-900/20">
              <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {customers.length}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg dark:bg-blue-900/20">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Registered</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {customers.filter((c: any) => !c.isGuest).length}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg dark:bg-purple-900/20">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">With Orders</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {customers.filter((c: any) => c.ordersCount > 0).length}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-lg dark:bg-orange-900/20">
              <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                €{customers.reduce((sum: number, c: any) => sum + c.totalSpent, 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
        <form onSubmit={handleSearch} className="grid grid-cols-1 gap-4 md:grid-cols-5">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
              />
            </div>
          </div>

          {/* Customer Type Filter */}
          <div>
            <select
              value={isGuestFilter}
              onChange={(e) => setIsGuestFilter(e.target.value)}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
            >
              <option value="all">All Types</option>
              <option value="false">Registered</option>
              <option value="true">Guest</option>
            </select>
          </div>

          {/* Has Orders Filter */}
          <div>
            <select
              value={hasOrdersFilter}
              onChange={(e) => setHasOrdersFilter(e.target.value)}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
            >
              <option value="all">All Customers</option>
              <option value="true">With Orders</option>
              <option value="false">No Orders</option>
            </select>
          </div>

          {/* Search Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
            >
              Search
            </button>
          </div>
        </form>

        {/* Date Range Filters */}
        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Joined From
            </label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Joined To
            </label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
            />
          </div>
        </div>
      </div>

      {/* Customer Table */}
      <CustomerTable
        customers={customers}
        onDelete={handleDelete}
        onRefresh={fetchCustomers}
      />
    </div>
  );
}
