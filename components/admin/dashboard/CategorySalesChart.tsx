"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface CategoryData {
  name: string;
  value: number;
}

const COLORS = ['#009A49', '#00A86B', '#00563F', '#10B981', '#059669'];

export const CategorySalesChart: React.FC<{ data: CategoryData[] }> = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sales by Category</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Last 30 days</p>
      </div>

      {data.length === 0 ? (
        <p className="text-sm text-center text-gray-500 dark:text-gray-400 py-8">
          No sales data yet
        </p>
      ) : (
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data as any}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${((entry.value / total) * 100).toFixed(1)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
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
                formatter={(value: any) => `€${value.toFixed(2)}`}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
