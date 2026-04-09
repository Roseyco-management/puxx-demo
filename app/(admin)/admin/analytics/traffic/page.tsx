"use client";

import { ArrowLeft, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { GoogleAnalyticsWidget } from '@/components/admin/analytics/GoogleAnalyticsWidget';

export default function TrafficAnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/analytics"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Traffic Analytics
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              View traffic sources and visitor behavior
            </p>
          </div>
        </div>
      </div>

      {/* GA4 Integration Notice */}
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100">
              Google Analytics 4 Integration
            </h3>
            <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
              This page displays mock traffic data. To view real analytics data, integrate with Google Analytics 4 API.
              You'll need to:
            </p>
            <ul className="mt-2 text-sm text-blue-700 dark:text-blue-300 list-disc list-inside space-y-1">
              <li>Install @google-analytics/data package</li>
              <li>Set up a Google Cloud service account</li>
              <li>Add GA4 credentials to your environment variables</li>
              <li>Update the /api/admin/analytics/traffic route</li>
            </ul>
            <div className="mt-3">
              <a
                href="https://developers.google.com/analytics/devguides/reporting/data/v1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                View Google Analytics Data API Documentation →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Traffic Analytics Widget */}
      <GoogleAnalyticsWidget title="Traffic Overview" />

      {/* Integration Steps */}
      <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Integration Steps
        </h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex items-center justify-center w-6 h-6 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 rounded-full flex-shrink-0 text-sm font-medium">
              1
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                Install Dependencies
              </h4>
              <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded text-sm overflow-x-auto">
                <code>npm install @google-analytics/data</code>
              </pre>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="flex items-center justify-center w-6 h-6 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 rounded-full flex-shrink-0 text-sm font-medium">
              2
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                Set Up Service Account
              </h4>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Create a service account in Google Cloud Console with Analytics Viewer permissions
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="flex items-center justify-center w-6 h-6 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 rounded-full flex-shrink-0 text-sm font-medium">
              3
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                Add Environment Variables
              </h4>
              <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded text-sm overflow-x-auto">
                <code>{`GA4_PROPERTY_ID=your-property-id
GA4_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GA4_PRIVATE_KEY=your-private-key`}</code>
              </pre>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="flex items-center justify-center w-6 h-6 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 rounded-full flex-shrink-0 text-sm font-medium">
              4
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                Update API Route
              </h4>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                See the commented example code in{' '}
                <code className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                  /app/api/admin/analytics/traffic/route.ts
                </code>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Available After Integration */}
      <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Available After Integration
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Real-Time Data
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Active users on site</li>
              <li>• Current page views</li>
              <li>• Live conversion tracking</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              User Behavior
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• User flow analysis</li>
              <li>• Engagement metrics</li>
              <li>• Event tracking</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Traffic Sources
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Campaign tracking</li>
              <li>• Referral analysis</li>
              <li>• Search keywords</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              E-commerce Insights
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Product impressions</li>
              <li>• Add to cart tracking</li>
              <li>• Checkout abandonment</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
