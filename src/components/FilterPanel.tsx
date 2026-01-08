"use client";

import { useState } from "react";
import { Filter, X } from "lucide-react";

interface FilterPanelProps {
  regions: string[];
  categories: string[];
  segments: string[];
  selectedRegion: string;
  selectedCategory: string;
  selectedSegment: string;
  onRegionChange: (region: string) => void;
  onCategoryChange: (category: string) => void;
  onSegmentChange: (segment: string) => void;
  onReset: () => void;
}

export default function FilterPanel({ regions, categories, segments, selectedRegion, selectedCategory, selectedSegment, onRegionChange, onCategoryChange, onSegmentChange, onReset }: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const hasFilters = selectedRegion || selectedCategory || selectedSegment;

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
      <div className="flex items-center justify-between">
        <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
          <Filter className="w-5 h-5" />
          <span className="font-medium">Filters</span>
          {hasFilters && <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">Active</span>}
        </button>
        {hasFilters && (
          <button onClick={onReset} className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700">
            <X className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {isOpen && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
            <select value={selectedRegion} onChange={(e) => onRegionChange(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">All Regions</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Segment</label>
            <select value={selectedSegment} onChange={(e) => onSegmentChange(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">All Segments</option>
              {segments.map((segment) => (
                <option key={segment} value={segment}>
                  {segment}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
