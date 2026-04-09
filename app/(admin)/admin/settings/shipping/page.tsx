"use client";

import { useEffect, useState } from "react";
import { ShippingZone } from "@/lib/types/settings";
import { ShippingZoneTable } from "@/components/admin/settings/ShippingZoneTable";
import { ShippingZoneForm } from "@/components/admin/settings/ShippingZoneForm";
import { Truck, Plus } from "lucide-react";
import { toast } from "sonner";

export default function ShippingSettingsPage() {
  const [zones, setZones] = useState<ShippingZone[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingZone, setEditingZone] = useState<ShippingZone | undefined>();

  const fetchZones = async () => {
    try {
      const response = await fetch("/api/admin/settings/shipping");
      if (!response.ok) throw new Error("Failed to fetch shipping zones");
      const data = await response.json();
      setZones(data);
    } catch (error) {
      console.error("Error fetching zones:", error);
      toast.error("Failed to load shipping zones");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchZones();
  }, []);

  const handleEdit = (zone: ShippingZone) => {
    setEditingZone(zone);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setZones((prev) => prev.filter((z) => z.id !== id));
  };

  const handleSuccess = () => {
    setShowForm(false);
    setEditingZone(undefined);
    fetchZones();
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingZone(undefined);
  };

  const handleAddNew = () => {
    setEditingZone(undefined);
    setShowForm(true);
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
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-purple-50 dark:bg-purple-900/20">
            <Truck className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Shipping Settings
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage shipping zones, methods, and pricing
            </p>
          </div>
        </div>

        {!showForm && (
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-white hover:bg-emerald-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Shipping Zone
          </button>
        )}
      </div>

      {/* Form or Table */}
      {showForm ? (
        <ShippingZoneForm
          zone={editingZone}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      ) : (
        <>
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
                  Shipping Zones
                </h4>
                <p className="mt-1 text-sm text-blue-700 dark:text-blue-400">
                  Configure shipping zones with different methods and pricing. Each zone can have
                  multiple shipping methods (e.g., Standard, Express). Set free shipping thresholds
                  to encourage larger orders.
                </p>
              </div>
            </div>
          </div>

          {/* Table */}
          <ShippingZoneTable zones={zones} onEdit={handleEdit} onDelete={handleDelete} />
        </>
      )}
    </div>
  );
}
