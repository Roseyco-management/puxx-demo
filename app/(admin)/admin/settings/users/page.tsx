"use client";

import { useEffect, useState } from "react";
import { AdminUser } from "@/lib/types/settings";
import { UserRoleTable } from "@/components/admin/settings/UserRoleTable";
import { Users, Plus, Shield } from "lucide-react";
import { toast } from "sonner";

export default function UsersRolesPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load admin users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user: AdminUser) => {
    // TODO: Implement edit modal
    toast.info("Edit functionality coming soon");
  };

  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-indigo-50 dark:bg-indigo-900/20">
            <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Users & Roles
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage admin users and their permissions
            </p>
          </div>
        </div>

        <button
          onClick={() => toast.info("Add user functionality coming soon")}
          className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-white hover:bg-emerald-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Admin User
        </button>
      </div>

      {/* Roles Info */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 dark:border-purple-900 dark:bg-purple-900/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/40">
              <Shield className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold text-purple-900 dark:text-purple-300">Admin</h3>
          </div>
          <p className="text-sm text-purple-700 dark:text-purple-400">
            Full access to all features including settings and user management
          </p>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-900/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40">
              <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-blue-900 dark:text-blue-300">Manager</h3>
          </div>
          <p className="text-sm text-blue-700 dark:text-blue-400">
            Can manage products, orders, and customers. No access to settings
          </p>
        </div>

        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-900/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/40">
              <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="font-semibold text-emerald-900 dark:text-emerald-300">Support</h3>
          </div>
          <p className="text-sm text-emerald-700 dark:text-emerald-400">
            Can view orders and customers, update order status. Read-only for products
          </p>
        </div>
      </div>

      {/* Users Table */}
      <UserRoleTable users={users} onEdit={handleEdit} onDelete={handleDelete} />

      {/* Info */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <strong>Note:</strong> Admin users are managed through Supabase authentication. You can
          add new admin users through the Supabase dashboard and assign roles here. Only admins
          can access the Settings section.
        </p>
      </div>
    </div>
  );
}
