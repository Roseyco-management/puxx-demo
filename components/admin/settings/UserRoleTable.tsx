"use client";

import { AdminUser, Role } from "@/lib/types/settings";
import { Edit, Trash2, Shield, UserCheck, Headset } from "lucide-react";
import { toast } from "sonner";

interface UserRoleTableProps {
  users: AdminUser[];
  onEdit: (user: AdminUser) => void;
  onDelete: (id: number) => void;
}

const roleIcons: Record<Role, React.ReactNode> = {
  admin: <Shield className="w-4 h-4" />,
  manager: <UserCheck className="w-4 h-4" />,
  support: <Headset className="w-4 h-4" />,
};

const roleColors: Record<Role, string> = {
  admin: "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
  manager: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
  support: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
};

export function UserRoleTable({ users, onEdit, onDelete }: UserRoleTableProps) {
  const handleDelete = async (id: number, email: string) => {
    if (!confirm(`Are you sure you want to remove ${email} from admin users?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      toast.success("User removed successfully");
      onDelete(id);
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to remove user");
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-IE", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatLastLogin = (date: Date | null | undefined) => {
    if (!date) return "Never";
    const now = new Date();
    const loginDate = new Date(date);
    const diffMs = now.getTime() - loginDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(loginDate);
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
              User
            </th>
            <th className="px-6 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
              Role
            </th>
            <th className="px-6 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
              Last Login
            </th>
            <th className="px-6 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
              Joined
            </th>
            <th className="px-6 py-3 text-right font-medium text-gray-700 dark:text-gray-300">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-gray-900">
          {users.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                No admin users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {user.name || "No name"}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {user.email}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                      roleColors[user.role]
                    }`}
                  >
                    {roleIcons[user.role]}
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                  {formatLastLogin(user.lastLogin)}
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                  {formatDate(user.createdAt)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(user)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg dark:text-blue-400 dark:hover:bg-blue-900/20 transition-colors"
                      title="Edit user"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id, user.email)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
                      title="Remove user"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
