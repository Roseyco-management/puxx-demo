"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaxSettings, taxSettingsSchema } from "@/lib/types/settings";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { useState } from "react";

interface TaxSettingsFormProps {
  initialData: TaxSettings;
}

export function TaxSettingsForm({ initialData }: TaxSettingsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TaxSettings>({
    resolver: zodResolver(taxSettingsSchema),
    defaultValues: initialData,
  });

  const enabled = watch("enabled");

  const onSubmit = async (data: TaxSettings) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/admin/settings/taxes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update settings");
      }

      toast.success("Tax settings updated successfully");
    } catch (error) {
      console.error("Error updating settings:", error);
      toast.error("Failed to update settings");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Tax Calculation Toggle */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Enable Tax Calculation
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Automatically calculate and apply tax to orders
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              {...register("enabled")}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
          </label>
        </div>
      </div>

      {/* Tax Configuration */}
      <div
        className={`rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 transition-opacity ${
          !enabled ? "opacity-50" : ""
        }`}
      >
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          VAT Configuration
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tax Name
              </label>
              <input
                type="text"
                {...register("name")}
                disabled={!enabled}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tax Rate (%)
              </label>
              <input
                type="number"
                step="0.01"
                {...register("rate", { valueAsNumber: true })}
                disabled={!enabled}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              />
              {errors.rate && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.rate.message}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Ireland standard VAT rate is 23%
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tax Display
            </label>
            <select
              {...register("display")}
              disabled={!enabled}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="inclusive">Inclusive (Price includes tax)</option>
              <option value="exclusive">Exclusive (Tax added at checkout)</option>
            </select>
            {errors.display && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.display.message}
              </p>
            )}
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              In Ireland, prices are typically displayed inclusive of VAT
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              VAT Registration Number
            </label>
            <input
              type="text"
              {...register("vatNumber")}
              placeholder="IE1234567AB"
              disabled={!enabled}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {errors.vatNumber && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.vatNumber.message}
              </p>
            )}
          </div>
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
              About VAT in Ireland
            </h4>
            <p className="mt-1 text-sm text-blue-700 dark:text-blue-400">
              The standard VAT rate in Ireland is 23%. If you are VAT registered, you must display
              your VAT number on invoices and receipts. Prices displayed to customers should include
              VAT as this is the legal requirement in Ireland.
            </p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-2.5 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Save className="w-4 h-4" />
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
