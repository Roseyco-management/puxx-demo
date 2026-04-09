"use client";

import Link from "next/link";
import {
  Settings,
  CreditCard,
  Truck,
  Receipt,
  Mail,
  Users,
  Globe,
} from "lucide-react";

// Force dynamic rendering to avoid useSearchParams prerender error
export const dynamic = 'force-dynamic';

const settingsCategories = [
  {
    title: "General Settings",
    description: "Site name, logo, contact information, and general preferences",
    icon: <Globe className="w-6 h-6" />,
    href: "/admin/settings/general",
    color: "emerald",
  },
  {
    title: "Payment Settings",
    description: "Configure Stripe, Worldpay, and payment methods",
    icon: <CreditCard className="w-6 h-6" />,
    href: "/admin/settings/payments",
    color: "blue",
  },
  {
    title: "Shipping Settings",
    description: "Manage shipping zones, methods, and pricing",
    icon: <Truck className="w-6 h-6" />,
    href: "/admin/settings/shipping",
    color: "purple",
  },
  {
    title: "Tax Settings",
    description: "Configure VAT and tax calculation",
    icon: <Receipt className="w-6 h-6" />,
    href: "/admin/settings/taxes",
    color: "orange",
  },
  {
    title: "Email Templates",
    description: "Customize email templates for orders and notifications",
    icon: <Mail className="w-6 h-6" />,
    href: "/admin/settings/email-templates",
    color: "pink",
  },
  {
    title: "Users & Roles",
    description: "Manage admin users and their permissions",
    icon: <Users className="w-6 h-6" />,
    href: "/admin/settings/users",
    color: "indigo",
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
          <Settings className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Settings
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your store configuration and preferences
          </p>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {settingsCategories.map((category) => (
          <Link
            key={category.href}
            href={category.href}
            className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900 hover:border-emerald-500 dark:hover:border-emerald-500"
          >
            {/* Icon */}
            <div
              className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 bg-${category.color}-50 dark:bg-${category.color}-900/20 text-${category.color}-600 dark:text-${category.color}-400 group-hover:scale-110 transition-transform`}
            >
              {category.icon}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {category.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {category.description}
            </p>

            {/* Hover Arrow */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg
                className="w-5 h-5 text-emerald-600 dark:text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Link>
        ))}
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
              Settings Information
            </h4>
            <p className="mt-1 text-sm text-blue-700 dark:text-blue-400">
              Changes to settings are saved immediately. Some settings may require
              your store to be in test mode before making changes. Be careful when
              modifying payment and shipping settings as they affect live orders.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
