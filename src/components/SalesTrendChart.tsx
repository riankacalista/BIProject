"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { MonthlyData } from "@/types";
import { formatCurrency } from "@/lib/analytics";

interface SalesTrendChartProps {
  data: MonthlyData[];
}

export default function SalesTrendChart({ data }: SalesTrendChartProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Trend Over Time</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => {
                const [year, month] = value.split("-");
                return `${month}/${year.slice(2)}`;
              }}
            />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
            <Tooltip formatter={(value) => [formatCurrency(Number(value) || 0), "Sales"]} labelFormatter={(label) => `Period: ${label}`} contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb" }} />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} name="Sales ($)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
