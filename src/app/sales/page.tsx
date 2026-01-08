"use client";

import { useState, useEffect, useMemo } from "react";
import Papa from "papaparse";
import { SalesData } from "@/types";
import { getMonthlySales, getSalesByShipMode, formatCurrency } from "@/lib/analytics";
import SalesTrendChart from "@/components/SalesTrendChart";
import CategoryPieChart from "@/components/CategoryPieChart";
import { Loader2, TrendingUp, Calendar, Truck } from "lucide-react";

export default function SalesPage() {
  const [data, setData] = useState<SalesData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse<SalesData>(csvText, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
          complete: (results) => {
            setData(results.data);
            setLoading(false);
          },
        });
      });
  }, []);

  const monthlyData = useMemo(() => getMonthlySales(data), [data]);
  const shipModeData = useMemo(() => getSalesByShipMode(data), [data]);

  // Calculate YoY growth
  const yearlyTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    monthlyData.forEach((item) => {
      const year = item.month.split("-")[0];
      totals[year] = (totals[year] || 0) + item.sales;
    });
    return totals;
  }, [monthlyData]);

  const years = Object.keys(yearlyTotals).sort();

  if (loading) {
    return (
      <div className="ml-64 flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading...</span>
      </div>
    );
  }

  return (
    <div className="ml-64 p-8 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-blue-600" />
          Sales Analysis
        </h1>
        <p className="text-gray-600 mt-1">Deep dive into sales performance over time</p>
      </header>

      {/* Yearly Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {years.map((year) => (
          <div key={year} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-500">Year {year}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(yearlyTotals[year])}</p>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <SalesTrendChart data={monthlyData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Truck className="w-5 h-5 text-gray-500" />
            Sales by Shipping Mode
          </h3>
          <div className="space-y-4">
            {shipModeData.map((item, index) => {
              const total = shipModeData.reduce((sum, i) => sum + i.value, 0);
              const percentage = (item.value / total) * 100;
              const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500"];
              return (
                <div key={item.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                    <span className="text-sm text-gray-500">
                      {formatCurrency(item.value)} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className={`${colors[index % colors.length]} h-2 rounded-full`} style={{ width: `${percentage}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <CategoryPieChart data={shipModeData} title="Shipping Mode Distribution" />
      </div>
    </div>
  );
}
