"use client";

import { useState, useEffect, useRef } from "react";
import { Download, Upload, Search, Mail } from "lucide-react";
import { SubscriberTable } from "@/components/admin/marketing/SubscriberTable";
import { toast } from "sonner";

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showImportModal, setShowImportModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchSubscribers();
  }, [statusFilter]);

  async function fetchSubscribers() {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      if (searchQuery) params.append('search', searchQuery);
      if (statusFilter !== 'all') params.append('status', statusFilter);

      const response = await fetch(`/api/admin/marketing/subscribers?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setSubscribers(data.subscribers);
      } else {
        toast.error('Failed to load subscribers');
      }
    } catch (error) {
      toast.error('Failed to load subscribers');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSubscribers();
  };

  const handleUnsubscribe = async (ids: string[]) => {
    try {
      const response = await fetch('/api/admin/marketing/subscribers', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids, action: 'unsubscribe' }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(`${ids.length} subscriber(s) unsubscribed`);
        fetchSubscribers();
      } else {
        toast.error('Failed to unsubscribe');
      }
    } catch (error) {
      toast.error('Failed to unsubscribe');
      console.error(error);
    }
  };

  const handleDelete = async (ids: string[]) => {
    try {
      const response = await fetch('/api/admin/marketing/subscribers', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids, action: 'delete' }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(`${ids.length} subscriber(s) deleted`);
        fetchSubscribers();
      } else {
        toast.error('Failed to delete');
      }
    } catch (error) {
      toast.error('Failed to delete');
      console.error(error);
    }
  };

  const exportToCSV = () => {
    const headers = ['Email', 'Name', 'Source', 'Status', 'Subscribed Date'];
    const csvData = [
      headers,
      ...subscribers.map((s: any) => [
        s.email,
        s.name || '',
        s.source,
        s.status,
        new Date(s.subscribedAt).toLocaleDateString(),
      ])
    ];

    const csv = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();

    toast.success('Subscribers exported successfully');
  };

  const handleImportCSV = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        const rows = text.split('\n').map(row => row.split(','));

        // Skip header row
        const subscribersData = rows.slice(1).map(row => ({
          email: row[0]?.trim(),
          name: row[1]?.trim() || null,
        })).filter(s => s.email && s.email.includes('@'));

        if (subscribersData.length === 0) {
          toast.error('No valid email addresses found in CSV');
          return;
        }

        const response = await fetch('/api/admin/marketing/subscribers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ subscribers: subscribersData }),
        });

        const data = await response.json();

        if (data.success) {
          toast.success(data.message);
          fetchSubscribers();
          setShowImportModal(false);
        } else {
          toast.error('Failed to import subscribers');
        }
      } catch (error) {
        toast.error('Failed to parse CSV file');
        console.error(error);
      }
    };

    reader.readAsText(file);
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Email Subscribers</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your newsletter subscribers
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowImportModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <Upload size={16} />
            Import CSV
          </button>
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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-100 rounded-lg dark:bg-emerald-900/20">
              <Mail className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Subscribers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {subscribers.length}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg dark:bg-blue-900/20">
              <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Active</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {subscribers.filter((s: any) => s.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gray-100 rounded-lg dark:bg-gray-800">
              <Mail className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Unsubscribed</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {subscribers.filter((s: any) => s.status === 'unsubscribed').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
        <form onSubmit={handleSearch} className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
              />
            </div>
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
              <option value="unsubscribed">Unsubscribed</option>
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
      </div>

      {/* Subscriber Table */}
      <SubscriberTable
        subscribers={subscribers}
        onUnsubscribe={handleUnsubscribe}
        onDelete={handleDelete}
        onRefresh={fetchSubscribers}
      />

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg dark:bg-gray-900">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Import Subscribers from CSV
            </h3>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Upload a CSV file with columns: Email, Name (optional)
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleImportCSV}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
            />
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setShowImportModal(false)}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
