import { TimePeriod, DateRange } from './types';

export function getDateRangeFromPeriod(period: TimePeriod, customRange?: DateRange): DateRange {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  switch (period) {
    case 'today':
      return {
        start: today,
        end: now,
      };
    case 'week':
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - 7);
      return {
        start: weekStart,
        end: now,
      };
    case 'month':
      const monthStart = new Date(today);
      monthStart.setMonth(today.getMonth() - 1);
      return {
        start: monthStart,
        end: now,
      };
    case 'year':
      const yearStart = new Date(today);
      yearStart.setFullYear(today.getFullYear() - 1);
      return {
        start: yearStart,
        end: now,
      };
    case 'custom':
      return customRange || { start: today, end: now };
    default:
      return { start: today, end: now };
  }
}

export function formatDate(date: Date, format: 'short' | 'medium' | 'long' = 'short'): string {
  if (format === 'short') {
    return date.toLocaleDateString('en-IE', { month: 'short', day: 'numeric' });
  } else if (format === 'medium') {
    return date.toLocaleDateString('en-IE', { month: 'short', day: 'numeric', year: 'numeric' });
  } else {
    return date.toLocaleDateString('en-IE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }
}

export function formatCurrency(amount: number, currency: string = 'EUR'): string {
  return new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-IE').format(value);
}

export function calculateTrend(current: number, previous: number): {
  value: number;
  isPositive: boolean;
} {
  if (previous === 0) {
    return { value: 100, isPositive: current > 0 };
  }

  const change = ((current - previous) / previous) * 100;
  return {
    value: Math.abs(change),
    isPositive: change >= 0,
  };
}

export function groupDataByPeriod<T extends { date: Date }>(
  data: T[],
  period: 'day' | 'week' | 'month'
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();

  data.forEach((item) => {
    let key: string;

    if (period === 'day') {
      key = item.date.toISOString().split('T')[0];
    } else if (period === 'week') {
      const weekStart = new Date(item.date);
      weekStart.setDate(item.date.getDate() - item.date.getDay());
      key = weekStart.toISOString().split('T')[0];
    } else {
      key = `${item.date.getFullYear()}-${String(item.date.getMonth() + 1).padStart(2, '0')}`;
    }

    if (!grouped.has(key)) {
      grouped.set(key, []);
    }
    grouped.get(key)!.push(item);
  });

  return grouped;
}

export function exportToCSV(data: any[], filename: string): void {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row =>
      headers.map(header => {
        const value = row[header];
        // Escape values containing commas or quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function aggregateRevenueData(
  orders: Array<{ createdAt: Date; total: number }>
): { date: string; revenue: number; orders: number }[] {
  const grouped = new Map<string, { revenue: number; orders: number }>();

  orders.forEach(order => {
    const date = order.createdAt.toISOString().split('T')[0];
    const current = grouped.get(date) || { revenue: 0, orders: 0 };

    grouped.set(date, {
      revenue: current.revenue + Number(order.total),
      orders: current.orders + 1,
    });
  });

  return Array.from(grouped.entries())
    .map(([date, data]) => ({ date, ...data }))
    .sort((a, b) => a.date.localeCompare(b.date));
}
