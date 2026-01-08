export interface SalesData {
  Row_ID: number;
  Order_ID: string;
  Order_Date: string;
  Ship_Date: string;
  Ship_Mode: string;
  Customer_ID: string;
  Customer_Name: string;
  Segment: string;
  Country: string;
  City: string;
  State: string;
  Postal_Code: string;
  Region: string;
  Product_ID: string;
  Category: string;
  Sub_Category: string;
  Product_Name: string;
  Sales: number;
}

export interface KPIData {
  totalSales: number;
  totalOrders: number;
  avgOrderValue: number;
  totalCustomers: number;
}

export interface CategoryData {
  name: string;
  value: number;
}

export interface RegionData {
  name: string;
  sales: number;
  orders: number;
}

export interface MonthlyData {
  month: string;
  sales: number;
  orders: number;
}

export interface TopProduct {
  name: string;
  sales: number;
  category: string;
}
