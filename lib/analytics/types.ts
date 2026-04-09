export type TimePeriod = 'today' | 'week' | 'month' | 'year' | 'custom';

export interface DateRange {
  start: Date;
  end: Date;
}

export interface RevenueData {
  date: string;
  revenue: number;
  orders: number;
}

export interface CategorySalesData {
  name: string;
  value: number;
  revenue: number;
  orders: number;
}

export interface TopProduct {
  id: number;
  name: string;
  revenue: number;
  orders: number;
  quantity: number;
}

export interface ProductPerformance {
  id: number;
  name: string;
  sku: string;
  views: number;
  addToCartRate: number;
  purchaseRate: number;
  revenue: number;
  profitMargin: number | null;
  stockQuantity: number;
}

export interface ConversionFunnelData {
  stage: string;
  visitors: number;
  conversionRate: number;
}

export interface AnalyticsMetrics {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  conversionRate: number;
  returnCustomerRate: number;
  customerLifetimeValue: number;
}

export interface RevenueBreakdown {
  byDay: RevenueData[];
  byWeek: RevenueData[];
  byMonth: RevenueData[];
  byProduct: { productName: string; revenue: number; orders: number }[];
  byCategory: CategorySalesData[];
  byCustomerSegment: { segment: string; revenue: number; customers: number }[];
}

export interface TrafficMetrics {
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: number;
  sources: { source: string; visitors: number; percentage: number }[];
  topPages: { page: string; views: number }[];
  devices: { device: string; count: number; percentage: number }[];
  locations: { location: string; visitors: number }[];
}

export interface AnalyticsResponse<T> {
  data: T;
  period: TimePeriod;
  dateRange: DateRange;
  comparisonData?: T;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}
