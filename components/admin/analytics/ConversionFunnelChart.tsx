"use client";

import { formatNumber, formatPercentage } from '@/lib/analytics/utils';
import type { ConversionFunnelData } from '@/lib/analytics/types';

interface ConversionFunnelChartProps {
  data: ConversionFunnelData[];
  title?: string;
  subtitle?: string;
}

export const ConversionFunnelChart: React.FC<ConversionFunnelChartProps> = ({
  data,
  title = 'Conversion Funnel',
  subtitle = 'Customer journey from visitor to purchase',
}) => {
  if (data.length === 0) {
    return (
      <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
        </div>
        <div className="flex items-center justify-center h-[300px]">
          <p className="text-sm text-gray-500 dark:text-gray-400">No data available</p>
        </div>
      </div>
    );
  }

  const maxVisitors = Math.max(...data.map(d => d.visitors));

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
      </div>

      <div className="space-y-4">
        {data.map((stage, index) => {
          const widthPercentage = (stage.visitors / maxVisitors) * 100;
          const dropoffFromPrevious =
            index > 0
              ? ((data[index - 1].visitors - stage.visitors) / data[index - 1].visitors) * 100
              : 0;

          return (
            <div key={stage.stage}>
              {/* Stage bar */}
              <div className="relative">
                <div
                  className="h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-between px-6 text-white transition-all duration-500"
                  style={{ width: `${widthPercentage}%`, minWidth: '200px' }}
                >
                  <div>
                    <div className="text-sm font-medium opacity-90">{stage.stage}</div>
                    <div className="text-2xl font-bold">{formatNumber(stage.visitors)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm opacity-90">Conversion</div>
                    <div className="text-lg font-semibold">
                      {formatPercentage(stage.conversionRate)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Drop-off indicator */}
              {index < data.length - 1 && (
                <div className="flex items-center mt-2 mb-2 ml-6">
                  <div className="w-px h-6 bg-gray-300 dark:bg-gray-700" />
                  <div className="ml-4 text-sm text-gray-500 dark:text-gray-400">
                    {formatPercentage(dropoffFromPrevious)} drop-off to next stage
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary statistics */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Total Visitors
            </p>
            <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
              {formatNumber(data[0]?.visitors || 0)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Total Purchases
            </p>
            <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
              {formatNumber(data[data.length - 1]?.visitors || 0)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Overall Conversion
            </p>
            <p className="mt-1 text-2xl font-bold text-emerald-600">
              {data.length > 0
                ? formatPercentage((data[data.length - 1].visitors / data[0].visitors) * 100)
                : '0%'}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Avg Stage Conversion
            </p>
            <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
              {data.length > 0
                ? formatPercentage(
                    data.reduce((sum, stage) => sum + stage.conversionRate, 0) / data.length
                  )
                : '0%'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
