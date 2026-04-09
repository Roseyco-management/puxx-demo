"use client";

import { ShippingZone } from "@/lib/types/settings";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface ShippingZoneTableProps {
  zones: ShippingZone[];
  onEdit: (zone: ShippingZone) => void;
  onDelete: (id: number) => void;
}

export function ShippingZoneTable({ zones, onEdit, onDelete }: ShippingZoneTableProps) {
  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete the shipping zone "${name}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/settings/shipping/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete shipping zone");
      }

      toast.success("Shipping zone deleted successfully");
      onDelete(id);
    } catch (error) {
      console.error("Error deleting zone:", error);
      toast.error("Failed to delete shipping zone");
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
              Zone Name
            </th>
            <th className="px-6 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
              Countries
            </th>
            <th className="px-6 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
              Methods
            </th>
            <th className="px-6 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
              Status
            </th>
            <th className="px-6 py-3 text-right font-medium text-gray-700 dark:text-gray-300">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-gray-900">
          {zones.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                No shipping zones configured
              </td>
            </tr>
          ) : (
            zones.map((zone) => (
              <tr key={zone.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {zone.name}
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                  {zone.countries.join(", ")}
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    {zone.methods.map((method, idx) => (
                      <div key={idx} className="text-xs text-gray-600 dark:text-gray-400">
                        <span className="font-medium">{method.name}:</span> €{method.cost.toFixed(2)}
                        {method.freeThreshold && (
                          <span className="text-gray-500"> (Free over €{method.freeThreshold})</span>
                        )}
                        <span className="text-gray-500"> - {method.estimatedDays} days</span>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {zone.isActive ? (
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                      Inactive
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(zone)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg dark:text-blue-400 dark:hover:bg-blue-900/20 transition-colors"
                      title="Edit zone"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(zone.id!, zone.name)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
                      title="Delete zone"
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
