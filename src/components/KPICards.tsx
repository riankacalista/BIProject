"use client";

import { formatCurrency, formatNumber } from "@/lib/analytics";
import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react";

interface KPICardsProps {
  totalSales: number;
  totalOrders: number;
  avgOrderValue: number;
  totalCustomers: number;
}

export default function KPICards({ totalSales, totalOrders, avgOrderValue, totalCustomers }: KPICardsProps) {
  const cards = [
    {
      title: "Total Sales",
      value: formatCurrency(totalSales),
      icon: DollarSign,
      color: "bg-blue-500",
      bgLight: "bg-blue-50",
    },
    {
      title: "Total Orders",
      value: formatNumber(totalOrders),
      icon: ShoppingCart,
      color: "bg-green-500",
      bgLight: "bg-green-50",
    },
    {
      title: "Avg Order Value",
      value: formatCurrency(avgOrderValue),
      icon: TrendingUp,
      color: "bg-purple-500",
      bgLight: "bg-purple-50",
    },
    {
      title: "Total Customers",
      value: formatNumber(totalCustomers),
      icon: Users,
      color: "bg-orange-500",
      bgLight: "bg-orange-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div key={card.title} className={`${card.bgLight} rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{card.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
            </div>
            <div className={`${card.color} p-3 rounded-lg`}>
              <card.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
