"use client";

import { useState, useEffect, useMemo } from "react";
import Papa from "papaparse";
import { SalesData } from "@/types";
import { getSalesByRegion, getTopStates, formatCurrency, formatNumber } from "@/lib/analytics";
import RegionBarChart from "@/components/RegionBarChart";
import HorizontalBarChart from "@/components/HorizontalBarChart";
import { Loader2, MapPin, Building2 } from "lucide-react";

export default function RegionsPage() {
  const [data, setData] = useState<SalesData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState("");

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
    if (!selectedRegion) return data;
    return data.filter((item) => item.Region === selectedRegion);
  }, [data, selectedRegion]);

  const regionData = useMemo(() => getSalesByRegion(data), [data]);
  const topStates = useMemo(() => getTopStates(filteredData, 10), [filteredData]);

  // Get top cities
  const topCities = useMemo(() => {
    const cityMap = new Map<string, number>();
    filteredData.forEach((item) => {
      const current = cityMap.get(item.City) || 0;
      cityMap.set(item.City, current + item.Sales);
    });
    return Array.from(cityMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, value]) => ({ name, value: Math.round(value * 100) / 100 }));
  }, [filteredData]);

  // Calculate metrics per region
  const regionMetrics = useMemo(() => {
    return regionData.map((region) => {
      const regionItems = data.filter((d) => d.Region === region.name);
      const customers = new Set(regionItems.map((d) => d.Customer_ID)).size;
      const cities = new Set(regionItems.map((d) => d.City)).size;
      return {
        ...region,
        customers,
        cities,
      };
    });
  }, [data, regionData]);

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
          <MapPin className="w-8 h-8 text-purple-600" />
          Regional Analysis
        </h1>
        <p className="text-gray-600 mt-1">Geographic distribution of sales</p>
      </header>

      {/* Region Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {regionMetrics.map((region) => {
          const isSelected = selectedRegion === region.name;
          const colors: Record<string, string> = {
            West: "border-blue-500 bg-blue-50",
            East: "border-green-500 bg-green-50",
            Central: "border-purple-500 bg-purple-50",
            South: "border-orange-500 bg-orange-50",
          };
          return (
            <button
              key={region.name}
              onClick={() => setSelectedRegion(isSelected ? "" : region.name)}
              className={`p-6 rounded-xl shadow-sm text-left transition-all border-2 ${isSelected ? colors[region.name] || "bg-gray-50 border-gray-500" : "bg-white border-transparent hover:border-gray-200"}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-semibold text-gray-900">{region.name}</span>
                {isSelected && <span className="text-xs bg-gray-800 text-white px-2 py-0.5 rounded-full">Selected</span>}
              </div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(region.sales)}</p>
              <div className="mt-3 flex gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">{formatNumber(region.orders)}</span> orders
                </div>
                <div>
                  <span className="font-medium">{region.customers}</span> customers
                </div>
              </div>
              <div className="mt-1 text-sm text-gray-500">
                <Building2 className="w-4 h-4 inline mr-1" />
                {region.cities} cities
              </div>
            </button>
          );
        })}
      </div>

      <div className="mb-8">
        <RegionBarChart data={regionData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HorizontalBarChart data={topStates} title={`Top States ${selectedRegion ? `in ${selectedRegion}` : ""}`} color="#8b5cf6" />
        <HorizontalBarChart data={topCities} title={`Top Cities ${selectedRegion ? `in ${selectedRegion}` : ""}`} color="#ec4899" />
      </div>
    </div>
  );
}
