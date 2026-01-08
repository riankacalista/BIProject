"use client";

import { useState, useEffect, useMemo } from "react";
import Papa from "papaparse";
import { SalesData } from "@/types";
import { getTopProducts, getSalesByCategory, getSalesBySubCategory, formatCurrency } from "@/lib/analytics";
import TopProductsTable from "@/components/TopProductsTable";
import CategoryPieChart from "@/components/CategoryPieChart";
import HorizontalBarChart from "@/components/HorizontalBarChart";
import { Loader2, Package, Tag } from "lucide-react";

export default function ProductsPage() {
  const [data, setData] = useState<SalesData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");

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

  const filteredData = useMemo(() => {
    if (!selectedCategory) return data;
    return data.filter((item) => item.Category === selectedCategory);
  }, [data, selectedCategory]);

  const categories = useMemo(() => [...new Set(data.map((d) => d.Category))].sort(), [data]);
  const categoryData = useMemo(() => getSalesByCategory(data), [data]);
  const subCategoryData = useMemo(() => getSalesBySubCategory(filteredData), [filteredData]);
  const topProducts = useMemo(() => getTopProducts(filteredData, 15), [filteredData]);

  // Calculate product count by category
  const productCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    const productSet = new Map<string, Set<string>>();

    data.forEach((item) => {
      if (!productSet.has(item.Category)) {
        productSet.set(item.Category, new Set());
      }
      productSet.get(item.Category)!.add(item.Product_Name);
    });

    productSet.forEach((products, category) => {
      counts[category] = products.size;
    });

    return counts;
  }, [data]);

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
          <Package className="w-8 h-8 text-green-600" />
          Product Analysis
        </h1>
        <p className="text-gray-600 mt-1">Explore product performance and categories</p>
      </header>

      {/* Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {categoryData.map((cat) => {
          const isSelected = selectedCategory === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(isSelected ? "" : cat.name)}
              className={`p-6 rounded-xl shadow-sm border text-left transition-all ${isSelected ? "bg-blue-50 border-blue-300 ring-2 ring-blue-500" : "bg-white border-gray-100 hover:border-gray-300"}`}
            >
              <div className="flex items-center justify-between mb-2">
                <Tag className={`w-5 h-5 ${isSelected ? "text-blue-600" : "text-gray-400"}`} />
                {isSelected && <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">Selected</span>}
              </div>
              <h3 className="font-semibold text-gray-900">{cat.name}</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(cat.value)}</p>
              <p className="text-sm text-gray-500 mt-1">{productCounts[cat.name]?.toLocaleString()} products</p>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <CategoryPieChart data={categoryData} title="Sales Distribution by Category" />
        <HorizontalBarChart data={subCategoryData} title={`Sub-Categories ${selectedCategory ? `in ${selectedCategory}` : ""}`} color="#10b981" />
      </div>

      <TopProductsTable data={topProducts} />
    </div>
  );
}
