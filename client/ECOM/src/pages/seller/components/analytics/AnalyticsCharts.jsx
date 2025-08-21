"use client"

import { useState } from "react"
import TimeRangeSelector from "./TimeRangeSelector"
import KeyMetrics from "./KeyMetrics"
import RevenueTrend from "./RevenueTrend"
import CategoryPerformance from "./CategoryPerformance"
import MonthlyOrders from "./MonthlyOrders"
import CustomerAcquisition from "./CustomerAcquisition"
import PerformanceInsights from "./PerformanceInsights"

export default function AnalyticsCharts() {
  const [timeRange, setTimeRange] = useState("6months")

  const monthlyData = [
    { month: "Jul", sales: 23, revenue: 15000, orders: 18, customers: 15 },
    { month: "Aug", sales: 28, revenue: 18000, orders: 22, customers: 19 },
    { month: "Sep", sales: 35, revenue: 22000, orders: 28, customers: 24 },
    { month: "Oct", sales: 42, revenue: 25000, orders: 35, customers: 29 },
    { month: "Nov", sales: 38, revenue: 28000, orders: 31, customers: 26 },
    { month: "Dec", sales: 45, revenue: 32000, orders: 38, customers: 32 },
  ]

  const categoryPerformance = [
    { category: "Clothing", sales: 68, revenue: 89500, percentage: 38.2 },
    { category: "Food", sales: 45, revenue: 36000, percentage: 15.4 },
    { category: "Crafts", sales: 32, revenue: 96000, percentage: 40.9 },
    { category: "Jewelry", sales: 11, revenue: 13000, percentage: 5.5 },
  ]

  const recentTrends = {
    salesGrowth: 12.5,
    revenueGrowth: 18.3,
    customerGrowth: 8.7,
    conversionRate: 3.2,
  }

  return (
    <div className="space-y-6">
      <TimeRangeSelector timeRange={timeRange} setTimeRange={setTimeRange} />
      <KeyMetrics trends={recentTrends} />
      <RevenueTrend monthlyData={monthlyData} />
      <CategoryPerformance data={categoryPerformance} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MonthlyOrders monthlyData={monthlyData} />
        <CustomerAcquisition monthlyData={monthlyData} />
      </div>
      <PerformanceInsights />
    </div>
  )
}
