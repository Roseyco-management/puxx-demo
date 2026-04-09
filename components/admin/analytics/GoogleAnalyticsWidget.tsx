"use client";

import { useEffect, useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Monitor, Smartphone, Tablet, TrendingUp, Users, Eye, Clock } from 'lucide-react';
import { formatNumber, formatPercentage } from '@/lib/analytics/utils';
import type { TrafficMetrics } from '@/lib/analytics/types';

interface GoogleAnalyticsWidgetProps {
  title?: string;
}

const COLORS = ['#009A49', '#00A86B', '#00563F', '#10B981', '#059669', '#047857'];

export const GoogleAnalyticsWidget: React.FC<GoogleAnalyticsWidgetProps> = ({
  title = 'Traffic Analytics',
}) => {
  const [data, setData] = useState<TrafficMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrafficData = async () => {
      try {
        const response = await fetch('/api/admin/analytics/traffic');
        if (!response.ok) {
          throw new Error('Failed to fetch traffic data');
        }
        const result = await response.json();
        setData(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTrafficData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
        <div className="flex items-center justify-center h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
        <div className="flex items-center justify-center h-[400px]">
          <p className="text-sm text-red-600">Failed to load traffic data</p>
        </div>
      </div>
    );
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">{title}</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-700 dark:text-emerald-400">Page Views</p>
                <p className="mt-1 text-2xl font-bold text-emerald-900 dark:text-emerald-100">
                  {formatNumber(data.pageViews)}
                </p>
              </div>
              <Eye className="w-8 h-8 text-emerald-600" />
            </div>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 dark:text-blue-400">Unique Visitors</p>
                <p className="mt-1 text-2xl font-bold text-blue-900 dark:text-blue-100">
                  {formatNumber(data.uniqueVisitors)}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700 dark:text-purple-400">Bounce Rate</p>
                <p className="mt-1 text-2xl font-bold text-purple-900 dark:text-purple-100">
                  {formatPercentage(data.bounceRate)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-700 dark:text-orange-400">Avg Duration</p>
                <p className="mt-1 text-2xl font-bold text-orange-900 dark:text-orange-100">
                  {formatDuration(data.avgSessionDuration)}
                </p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Traffic Sources & Devices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
          <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-6">
            Traffic Sources
          </h4>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.sources}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${((entry.percent || 0) * 100).toFixed(1)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="visitors"
                >
                  {data.sources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                  formatter={(value: any, name: string, props: any) => [
                    `${formatNumber(value)} (${props.payload.percentage.toFixed(1)}%)`,
                    props.payload.source,
                  ]}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
          <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-6">
            Device Breakdown
          </h4>
          <div className="space-y-4">
            {data.devices.map((device, index) => {
              const Icon = device.device === 'Mobile' ? Smartphone : device.device === 'Tablet' ? Tablet : Monitor;
              return (
                <div key={device.device}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Icon className="w-5 h-5 text-emerald-600 mr-3" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {device.device}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {formatNumber(device.count)}
                      </span>
                      <span className="text-sm font-medium text-emerald-600">
                        {formatPercentage(device.percentage)}
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div
                      className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                      style={{ width: `${device.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Pages */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
        <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-6">
          Top Pages
        </h4>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.topPages.slice(0, 8)} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="page"
                stroke="#6B7280"
                style={{ fontSize: '12px' }}
                tick={{ fill: '#6B7280' }}
              />
              <YAxis
                stroke="#6B7280"
                style={{ fontSize: '12px' }}
                tick={{ fill: '#6B7280' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                }}
                formatter={(value: any) => [formatNumber(value), 'Views']}
              />
              <Bar dataKey="views" fill="#009A49" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Locations */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
        <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-6">
          Top Locations
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-y border-gray-200 dark:border-gray-800">
              <tr className="text-left text-gray-500 dark:text-gray-400">
                <th className="py-3 pr-4 font-medium">Location</th>
                <th className="py-3 px-4 font-medium text-right">Visitors</th>
                <th className="py-3 pl-4 font-medium">Distribution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {data.locations.map((location) => {
                const percentage = (location.visitors / data.uniqueVisitors) * 100;
                return (
                  <tr key={location.location} className="text-gray-900 dark:text-white">
                    <td className="py-3 pr-4 font-medium">{location.location}</td>
                    <td className="py-3 px-4 text-right">{formatNumber(location.visitors)}</td>
                    <td className="py-3 pl-4">
                      <div className="flex items-center">
                        <div className="w-full max-w-xs h-2 bg-gray-200 dark:bg-gray-700 rounded-full mr-3">
                          <div
                            className="h-full bg-emerald-600 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[45px]">
                          {formatPercentage(percentage)}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
