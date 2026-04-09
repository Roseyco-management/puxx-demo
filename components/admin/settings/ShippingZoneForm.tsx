"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShippingZone, shippingZoneSchema } from "@/lib/types/settings";
import { toast } from "sonner";
import { Save, X, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface ShippingZoneFormProps {
  zone?: ShippingZone;
  onSuccess: () => void;
  onCancel: () => void;
}

export function ShippingZoneForm({ zone, onSuccess, onCancel }: ShippingZoneFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ShippingZone>({
    resolver: zodResolver(shippingZoneSchema),
    defaultValues: zone || {
      name: "",
      countries: ["IE"],
      methods: [
        { name: "Standard Shipping", cost: 5.99, freeThreshold: 150, estimatedDays: "3-5" },
      ],
      isActive: true,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "methods",
  });

  const onSubmit = async (data: ShippingZone) => {
    setIsSubmitting(true);
    try {
      const url = zone?.id
        ? `/api/admin/settings/shipping/${zone.id}`
        : "/api/admin/settings/shipping";

      const response = await fetch(url, {
        method: zone?.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to save shipping zone");
      }

      toast.success(`Shipping zone ${zone?.id ? "updated" : "created"} successfully`);
      onSuccess();
    } catch (error) {
      console.error("Error saving zone:", error);
      toast.error("Failed to save shipping zone");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Basic Information */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Zone Information
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Zone Name
            </label>
            <input
              type="text"
              {...register("name")}
              placeholder="e.g., Ireland"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Countries (comma-separated country codes)
            </label>
            <input
              type="text"
              {...register("countries.0")}
              placeholder="IE"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Use ISO 2-letter country codes (e.g., IE, GB, US)
            </p>
            {errors.countries && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.countries.message}
              </p>
            )}
          </div>

          <div className="flex items-center">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                {...register("isActive")}
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 dark:border-gray-700 dark:bg-gray-800"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Zone is active
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Shipping Methods */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Shipping Methods
          </h3>
          <button
            type="button"
            onClick={() =>
              append({ name: "", cost: 0, freeThreshold: null, estimatedDays: "" })
            }
            className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            <Plus className="w-4 h-4" />
            Add Method
          </button>
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
            >
              <div className="flex items-start justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Method {index + 1}
                </h4>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded dark:text-red-400 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Method Name
                  </label>
                  <input
                    type="text"
                    {...register(`methods.${index}.name` as const)}
                    placeholder="e.g., Standard Shipping"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                  {errors.methods?.[index]?.name && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.methods[index]?.name?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Cost (€)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register(`methods.${index}.cost` as const, {
                      valueAsNumber: true,
                    })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                  {errors.methods?.[index]?.cost && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.methods[index]?.cost?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Free Shipping Threshold (€)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register(`methods.${index}.freeThreshold` as const, {
                      setValueAs: (v) => (v === "" || v === null ? null : parseFloat(v)),
                    })}
                    placeholder="Optional"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Estimated Days
                  </label>
                  <input
                    type="text"
                    {...register(`methods.${index}.estimatedDays` as const)}
                    placeholder="e.g., 3-5"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                  {errors.methods?.[index]?.estimatedDays && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.methods[index]?.estimatedDays?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-2.5 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-2.5 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Save className="w-4 h-4" />
          {isSubmitting ? "Saving..." : zone?.id ? "Update Zone" : "Create Zone"}
        </button>
      </div>
    </form>
  );
}
