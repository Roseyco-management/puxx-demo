"use client";

import { useEffect, useState } from "react";
import { ActivityEntry } from "@/lib/types/settings";
import { ActivityLog } from "@/components/admin/settings/ActivityLog";
import { Activity } from "lucide-react";
import { toast } from "sonner";

export default function ActivityLogPage() {
  const [entries, setEntries] = useState<ActivityEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivityLog() {
      try {
        const response = await fetch("/api/admin/activity");
        if (!response.ok) throw new Error("Failed to fetch activity log");
        const data = await response.json();
        setEntries(data);
      } catch (error) {
        console.error("Error fetching activity log:", error);
        toast.error("Failed to load activity log");
      } finally {
        setLoading(false);
      }
    }

    fetchActivityLog();
  }, []);

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
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-purple-50 dark:bg-purple-900/20">
          <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Activity Log
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Track all admin actions and changes
          </p>
        </div>
      </div>

      {/* Info Box */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-900/20">
        <div className="flex gap-3">
          <svg
            className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h4 className="font-semibold text-blue-900 dark:text-blue-300">
              Activity Tracking
            </h4>
            <p className="mt-1 text-sm text-blue-700 dark:text-blue-400">
              All admin actions are logged for security and audit purposes. This includes creating,
              updating, and deleting products, orders, customers, and settings changes.
            </p>
          </div>
        </div>
      </div>

      {/* Activity Log */}
      <ActivityLog entries={entries} />
    </div>
  );
}
