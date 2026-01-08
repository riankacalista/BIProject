"use client";

import { BarChart2, TrendingUp, Package, MapPin } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Overview", href: "/", icon: BarChart2 },
  { name: "Sales Analysis", href: "/sales", icon: TrendingUp },
  { name: "Products", href: "/products", icon: Package },
  { name: "Regions", href: "/regions", icon: MapPin },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 min-h-screen p-4 fixed left-0 top-0">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <BarChart2 className="w-6 h-6 text-blue-400" />
          BI Dashboard
        </h1>
        <p className="text-gray-400 text-sm mt-1">Superstore Analytics</p>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}>
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <a 
          href="https://www.kaggle.com/datasets/bhanupratapbiswas/superstore-sales" 
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors"
        >
          <p className="text-gray-400 text-xs">Data Source</p>
          <p className="text-white text-sm font-medium hover:text-blue-400 transition-colors">
            Kaggle Superstore →
          </p>
          <p className="text-gray-500 text-xs mt-1">9,994 records</p>
        </a>
      </div>
    </aside>
  );
}
