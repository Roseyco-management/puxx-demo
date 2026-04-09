"use client";

import { ActivityEntry } from "@/lib/types/settings";
import { useState } from "react";
import { Calendar, User, Filter } from "lucide-react";

interface ActivityLogProps {
  entries: ActivityEntry[];
}

export function ActivityLog({ entries }: ActivityLogProps) {
  const [filterAction, setFilterAction] = useState<string>("all");
  const [filterUser, setFilterUser] = useState<string>("all");

  const uniqueActions = Array.from(new Set(entries.map((e) => e.action)));
  const uniqueUsers = Array.from(new Set(entries.map((e) => e.userName)));

  const filteredEntries = entries.filter((entry) => {
    if (filterAction !== "all" && entry.action !== filterAction) return false;
    if (filterUser !== "all" && entry.userName !== filterUser) return false;
    return true;
  });

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString("en-IE", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getActionColor = (action: string) => {
    if (action.toLowerCase().includes("create") || action.toLowerCase().includes("add")) {
      return "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400";
    }
    if (action.toLowerCase().includes("update") || action.toLowerCase().includes("edit")) {
      return "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400";
    }
    if (action.toLowerCase().includes("delete") || action.toLowerCase().includes("remove")) {
      return "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400";
    }
    return "bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Filter by Action
          </label>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              <option value="all">All Actions</option>
              {uniqueActions.map((action) => (
                <option key={action} value={action}>
                  {action}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Filter by User
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={filterUser}
              onChange={(e) => setFilterUser(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              <option value="all">All Users</option>
              {uniqueUsers.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>
        </div>

        {(filterAction !== "all" || filterUser !== "all") && (
          <div className="flex items-end">
            <button
              onClick={() => {
                setFilterAction("all");
                setFilterUser("all");
              }}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Activity Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
                Timestamp
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
                User
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
                Action
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
                Details
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
                IP Address
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-gray-900">
            {filteredEntries.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                  No activity found
                </td>
              </tr>
            ) : (
              filteredEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {formatDate(entry.timestamp)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/20">
                        <User className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {entry.userName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getActionColor(
                        entry.action
                      )}`}
                    >
                      {entry.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                    {entry.details || "-"}
                  </td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-500 font-mono text-xs">
                    {entry.ipAddress || "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Showing {filteredEntries.length} of {entries.length} activities
      </div>
    </div>
  );
}
