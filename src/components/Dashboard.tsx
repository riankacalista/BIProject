"use client";

import { useState, useEffect, useMemo } from "react";
import Papa from "papaparse";
import { SalesData } from "@/types";
import { calculateKPIs, getSalesByCategory, getSalesByRegion, getMonthlySales, getTopProducts, getSalesBySegment, getSalesBySubCategory, getTopStates } from "@/lib/analytics";
import KPICards from "@/components/KPICards";
import SalesTrendChart from "@/components/SalesTrendChart";
import CategoryPieChart from "@/components/CategoryPieChart";
import RegionBarChart from "@/components/RegionBarChart";
import TopProductsTable from "@/components/TopProductsTable";
import HorizontalBarChart from "@/components/HorizontalBarChart";
import FilterPanel from "@/components/FilterPanel";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const [data, setData] = useState<SalesData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSegment, setSelectedSegment] = useState("");

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
    return data.filter((item) => {
      if (selectedRegion && item.Region !== selectedRegion) return false;
      if (selectedCategory && item.Category !== selectedCategory) return false;
      if (selectedSegment && item.Segment !== selectedSegment) return false;
      return true;
    });
  }, [data, selectedRegion, selectedCategory, selectedSegment]);

  const regions = useMemo(() => [...new Set(data.map((d) => d.Region))].sort(), [data]);
  const categories = useMemo(() => [...new Set(data.map((d) => d.Category))].sort(), [data]);
  const segments = useMemo(() => [...new Set(data.map((d) => d.Segment))].sort(), [data]);

  const kpis = useMemo(() => calculateKPIs(filteredData), [filteredData]);
  const categoryData = useMemo(() => getSalesByCategory(filteredData), [filteredData]);
  const regionData = useMemo(() => getSalesByRegion(filteredData), [filteredData]);
  const monthlyData = useMemo(() => getMonthlySales(filteredData), [filteredData]);
  const topProducts = useMemo(() => getTopProducts(filteredData), [filteredData]);
  const segmentData = useMemo(() => getSalesBySegment(filteredData), [filteredData]);
  const subCategoryData = useMemo(() => getSalesBySubCategory(filteredData).slice(0, 10), [filteredData]);
  const topStates = useMemo(() => getTopStates(filteredData), [filteredData]);

  const resetFilters = () => {
    setSelectedRegion("");
    setSelectedCategory("");
    setSelectedSegment("");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="ml-64 p-8 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Business Intelligence Dashboard</h1>
        <p className="text-gray-600 mt-1">Superstore Sales Analysis • {filteredData.length.toLocaleString()} records</p>
      </header>

      <FilterPanel
        regions={regions}
        categories={categories}
        segments={segments}
        selectedRegion={selectedRegion}
        selectedCategory={selectedCategory}
        selectedSegment={selectedSegment}
        onRegionChange={setSelectedRegion}
        onCategoryChange={setSelectedCategory}
        onSegmentChange={setSelectedSegment}
        onReset={resetFilters}
      />

      <KPICards {...kpis} />

      <div className="mt-8">
        <SalesTrendChart data={monthlyData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <CategoryPieChart data={categoryData} title="Sales by Category" />
        <CategoryPieChart data={segmentData} title="Sales by Segment" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <RegionBarChart data={regionData} />
        <HorizontalBarChart data={subCategoryData} title="Top Sub-Categories" color="#10b981" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <TopProductsTable data={topProducts} />
        <HorizontalBarChart data={topStates} title="Top 10 States by Sales" color="#8b5cf6" />
      </div>
    </div>
  );
}
