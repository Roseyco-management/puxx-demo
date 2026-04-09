"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaymentSettings, paymentSettingsSchema } from "@/lib/types/settings";
import { toast } from "sonner";
import { Save, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface PaymentSettingsFormProps {
  initialData: PaymentSettings;
}

export function PaymentSettingsForm({ initialData }: PaymentSettingsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSecrets, setShowSecrets] = useState({
    stripeLiveSecret: false,
    stripeTestSecret: false,
    worldpayXmlPassword: false,
    webhookSecret: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PaymentSettings>({
    resolver: zodResolver(paymentSettingsSchema),
    defaultValues: initialData,
  });

  const testMode = watch("testMode");

  const onSubmit = async (data: PaymentSettings) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/admin/settings/payments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update settings");
      }

      toast.success("Payment settings updated successfully");
    } catch (error) {
      console.error("Error updating settings:", error);
      toast.error("Failed to update settings");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSecret = (key: keyof typeof showSecrets) => {
    setShowSecrets((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Test Mode Toggle */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Test Mode
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Use test credentials for development and testing
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              {...register("testMode")}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
          </label>
        </div>
        {testMode && (
          <div className="mt-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <p className="text-sm text-yellow-800 dark:text-yellow-300">
              Test mode is enabled. Your store will use test payment credentials.
            </p>
          </div>
        )}
      </div>

      {/* Stripe Configuration */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Stripe Configuration
        </h3>

        {/* Live Credentials */}
        <div className="mb-6">
          <h4 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Live Credentials
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Publishable Key (Live)
              </label>
              <input
                type="text"
                {...register("stripeLivePublishableKey")}
                placeholder="pk_live_..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Secret Key (Live)
              </label>
              <div className="relative">
                <input
                  type={showSecrets.stripeLiveSecret ? "text" : "password"}
                  {...register("stripeLiveSecretKey")}
                  placeholder="sk_live_..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-12 focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => toggleSecret("stripeLiveSecret")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {showSecrets.stripeLiveSecret ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Test Credentials */}
        <div>
          <h4 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Test Credentials
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Publishable Key (Test)
              </label>
              <input
                type="text"
                {...register("stripeTestPublishableKey")}
                placeholder="pk_test_..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Secret Key (Test)
              </label>
              <div className="relative">
                <input
                  type={showSecrets.stripeTestSecret ? "text" : "password"}
                  {...register("stripeTestSecretKey")}
                  placeholder="sk_test_..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-12 focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => toggleSecret("stripeTestSecret")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {showSecrets.stripeTestSecret ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Webhook Secret
              </label>
              <div className="relative">
                <input
                  type={showSecrets.webhookSecret ? "text" : "password"}
                  {...register("webhookSecret")}
                  placeholder="whsec_..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-12 focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => toggleSecret("webhookSecret")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {showSecrets.webhookSecret ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Worldpay Configuration */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Worldpay Configuration
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Merchant Code
            </label>
            <input
              type="text"
              {...register("worldpayMerchantCode")}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Installation ID
            </label>
            <input
              type="text"
              {...register("worldpayInstallationId")}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              XML Password
            </label>
            <div className="relative">
              <input
                type={showSecrets.worldpayXmlPassword ? "text" : "password"}
                {...register("worldpayXmlPassword")}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-12 focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              <button
                type="button"
                onClick={() => toggleSecret("worldpayXmlPassword")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {showSecrets.worldpayXmlPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
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
