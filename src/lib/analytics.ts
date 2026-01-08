import { SalesData, KPIData, CategoryData, RegionData, MonthlyData, TopProduct } from "@/types";

export function calculateKPIs(data: SalesData[]): KPIData {
  const totalSales = data.reduce((sum, item) => sum + item.Sales, 0);
  const totalOrders = new Set(data.map((item) => item.Order_ID)).size;
  const totalCustomers = new Set(data.map((item) => item.Customer_ID)).size;
  const avgOrderValue = totalSales / totalOrders;

  return {
    totalSales,
    totalOrders,
    avgOrderValue,
    totalCustomers,
  };
}

export function getSalesByCategory(data: SalesData[]): CategoryData[] {
  const categoryMap = new Map<string, number>();

  data.forEach((item) => {
    const current = categoryMap.get(item.Category) || 0;
    categoryMap.set(item.Category, current + item.Sales);
  });

  return Array.from(categoryMap.entries()).map(([name, value]) => ({
    name,
    value: Math.round(value * 100) / 100,
  }));
}

export function getSalesByRegion(data: SalesData[]): RegionData[] {
  const regionMap = new Map<string, { sales: number; orders: Set<string> }>();

  data.forEach((item) => {
    const current = regionMap.get(item.Region) || { sales: 0, orders: new Set<string>() };
    current.sales += item.Sales;
    current.orders.add(item.Order_ID);
    regionMap.set(item.Region, current);
  });

  return Array.from(regionMap.entries()).map(([name, data]) => ({
    name,
    sales: Math.round(data.sales * 100) / 100,
    orders: data.orders.size,
  }));
}

export function getSalesBySegment(data: SalesData[]): CategoryData[] {
  const segmentMap = new Map<string, number>();

  data.forEach((item) => {
    const current = segmentMap.get(item.Segment) || 0;
    segmentMap.set(item.Segment, current + item.Sales);
  });

  return Array.from(segmentMap.entries()).map(([name, value]) => ({
    name,
    value: Math.round(value * 100) / 100,
  }));
}

export function getMonthlySales(data: SalesData[]): MonthlyData[] {
  const monthlyMap = new Map<string, { sales: number; orders: Set<string> }>();

  data.forEach((item) => {
    // Parse date format: D/M/YYYY or DD/MM/YYYY
    const parts = item.Order_Date.split("/");
    if (parts.length >= 2) {
      const month = parts[1].padStart(2, "0");
      const year = parts[2] || "2017";
      const key = `${year}-${month}`;

      const current = monthlyMap.get(key) || { sales: 0, orders: new Set<string>() };
      current.sales += item.Sales;
      current.orders.add(item.Order_ID);
      monthlyMap.set(key, current);
    }
  });

  return Array.from(monthlyMap.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([month, data]) => ({
      month,
      sales: Math.round(data.sales * 100) / 100,
      orders: data.orders.size,
    }));
}

export function getTopProducts(data: SalesData[], limit: number = 10): TopProduct[] {
  const productMap = new Map<string, { sales: number; category: string }>();

  data.forEach((item) => {
    const current = productMap.get(item.Product_Name) || { sales: 0, category: item.Category };
    current.sales += item.Sales;
    productMap.set(item.Product_Name, current);
  });

  return Array.from(productMap.entries())
    .sort((a, b) => b[1].sales - a[1].sales)
    .slice(0, limit)
    .map(([name, data]) => ({
      name: name.length > 40 ? name.substring(0, 40) + "..." : name,
      sales: Math.round(data.sales * 100) / 100,
      category: data.category,
    }));
}

export function getSalesByShipMode(data: SalesData[]): CategoryData[] {
  const shipModeMap = new Map<string, number>();

  data.forEach((item) => {
    const current = shipModeMap.get(item.Ship_Mode) || 0;
    shipModeMap.set(item.Ship_Mode, current + item.Sales);
  });

  return Array.from(shipModeMap.entries()).map(([name, value]) => ({
    name,
    value: Math.round(value * 100) / 100,
  }));
}

export function getSalesBySubCategory(data: SalesData[]): CategoryData[] {
  const subCategoryMap = new Map<string, number>();

  data.forEach((item) => {
    const current = subCategoryMap.get(item.Sub_Category) || 0;
    subCategoryMap.set(item.Sub_Category, current + item.Sales);
  });

  return Array.from(subCategoryMap.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({
      name,
      value: Math.round(value * 100) / 100,
    }));
}

export function getTopStates(data: SalesData[], limit: number = 10): CategoryData[] {
  const stateMap = new Map<string, number>();

  data.forEach((item) => {
    const current = stateMap.get(item.State) || 0;
    stateMap.set(item.State, current + item.Sales);
  });

  return Array.from(stateMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, value]) => ({
      name,
      value: Math.round(value * 100) / 100,
    }));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}
