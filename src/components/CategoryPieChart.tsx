"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { CategoryData } from "@/types";
import { formatCurrency } from "@/lib/analytics";

interface CategoryPieChartProps {
  data: CategoryData[];
  title: string;
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

export default function CategoryPieChart({ data, title }: CategoryPieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Transform data for Recharts compatibility
  const chartData = data.map((item) => ({
    ...item,
    [Symbol.iterator]: undefined,
  })) as unknown as Array<{ name: string; value: number }>;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value" nameKey="name">
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => {
                const numValue = Number(value) || 0;
                return [`${formatCurrency(numValue)} (${((numValue / total) * 100).toFixed(1)}%)`, "Sales"];
              }}
              contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb" }}
            />
            <Legend verticalAlign="bottom" height={36} formatter={(value) => <span className="text-sm text-gray-700">{value}</span>} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
