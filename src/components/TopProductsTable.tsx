"use client";

import { TopProduct } from "@/types";
import { formatCurrency } from "@/lib/analytics";

interface TopProductsTableProps {
  data: TopProduct[];
}

const categoryColors: Record<string, string> = {
  Technology: "bg-blue-100 text-blue-800",
  Furniture: "bg-green-100 text-green-800",
  "Office Supplies": "bg-orange-100 text-orange-800",
};

export default function TopProductsTable({ data }: TopProductsTableProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Top 10 Products by Sales</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">#</th>
              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">Product Name</th>
              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">Category</th>
              <th className="text-right py-3 px-2 text-sm font-semibold text-gray-600">Sales</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-2 text-sm text-gray-500">{index + 1}</td>
                <td className="py-3 px-2 text-sm text-gray-900 font-medium">{product.name}</td>
                <td className="py-3 px-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[product.category] || "bg-gray-100 text-gray-800"}`}>{product.category}</span>
                </td>
                <td className="py-3 px-2 text-sm text-gray-900 font-semibold text-right">{formatCurrency(product.sales)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
