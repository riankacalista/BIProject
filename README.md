# 📊 Business Intelligence Dashboard

A modern, interactive Business Intelligence dashboard built with Next.js, featuring real-time data visualization and analytics for the Superstore Sales dataset.

![Dashboard Preview](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 📈 Overview Dashboard

- **KPI Cards**: Total Sales, Total Orders, Average Order Value, Total Customers
- **Sales Trend Chart**: Monthly sales performance visualization
- **Category Analysis**: Sales distribution by product category
- **Regional Performance**: Sales breakdown by region
- **Top Products Table**: Best-selling products with category tags

### 📊 Sales Analysis

- Year-over-year sales comparison
- Shipping mode distribution
- Monthly trend analysis

### 📦 Product Analysis

- Category and sub-category breakdown
- Interactive category filtering
- Product count and sales metrics

### 🗺️ Regional Analysis

- Geographic sales distribution
- Top states and cities by revenue
- Regional customer metrics

### 🔍 Interactive Filters

- Filter by Region
- Filter by Category
- Filter by Customer Segment
- Clear all filters functionality

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Data Parsing**: PapaParse
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/bi-dashboard.git
cd bi-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
bi-dashboard/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main dashboard
│   │   ├── sales/page.tsx    # Sales analysis
│   │   ├── products/page.tsx # Product analysis
│   │   ├── regions/page.tsx  # Regional analysis
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Global styles
│   ├── components/
│   │   ├── Dashboard.tsx
│   │   ├── KPICards.tsx
│   │   ├── SalesTrendChart.tsx
│   │   ├── CategoryPieChart.tsx
│   │   ├── RegionBarChart.tsx
│   │   ├── HorizontalBarChart.tsx
│   │   ├── TopProductsTable.tsx
│   │   ├── FilterPanel.tsx
│   │   └── Sidebar.tsx
│   ├── lib/
│   │   └── analytics.ts      # Data analytics functions
│   └── types/
│       └── index.ts          # TypeScript interfaces
├── public/
│   └── data.csv              # Superstore dataset
└── package.json
```

## 📊 Data Source

This dashboard uses the **Superstore Sales Dataset** from Kaggle, which contains:

- 9,994 sales records
- Data from 2015-2018
- Product categories: Technology, Furniture, Office Supplies
- Geographic coverage: All US regions

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Deploy!

Or use the Vercel CLI:

```bash
npm install -g vercel
vercel
```

## 📝 License

MIT License - feel free to use this project for your portfolio!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👤 Author

Built with ❤️ for Business Intelligence Portfolio

---

⭐ If you found this helpful, please star this repository!
