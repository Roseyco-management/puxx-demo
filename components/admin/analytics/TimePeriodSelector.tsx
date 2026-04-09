"use client";

import { useState } from 'react';
import { Calendar } from 'lucide-react';
import type { TimePeriod } from '@/lib/analytics/types';

interface TimePeriodSelectorProps {
  selected: TimePeriod;
  onChange: (period: TimePeriod, customRange?: { start: Date; end: Date }) => void;
}

export const TimePeriodSelector: React.FC<TimePeriodSelectorProps> = ({
  selected,
  onChange,
}) => {
  const [showCustom, setShowCustom] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const periods: { value: TimePeriod; label: string }[] = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'Last 30 Days' },
    { value: 'year', label: 'Last Year' },
    { value: 'custom', label: 'Custom' },
  ];

  const handlePeriodChange = (period: TimePeriod) => {
    if (period === 'custom') {
      setShowCustom(true);
    } else {
      setShowCustom(false);
      onChange(period);
    }
  };

  const handleCustomApply = () => {
    if (startDate && endDate) {
      onChange('custom', {
        start: new Date(startDate),
        end: new Date(endDate),
      });
      setShowCustom(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
      <div className="flex items-center space-x-2">
        <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Period:</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {periods.map((period) => (
          <button
            key={period.value}
            onClick={() => handlePeriodChange(period.value)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              selected === period.value
                ? 'bg-emerald-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            {period.label}
          </button>
        ))}
      </div>

      {showCustom && (
        <div className="flex items-center space-x-2 mt-3 sm:mt-0">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
          <span className="text-gray-500 dark:text-gray-400">to</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
          <button
            onClick={handleCustomApply}
            disabled={!startDate || !endDate}
            className="px-4 py-2 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};
