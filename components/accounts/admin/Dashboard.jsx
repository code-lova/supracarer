import React from "react";
import StatsCards from "./dashboard-kit/StatsCards";
import LineGraphChart from "./dashboard-kit/LineGraphChart";
import PieChartStatus from "./dashboard-kit/PieChartStatus";
import PieChartIncome from "./dashboard-kit/PieChartIncome";
import AnalyticsPlaceholder from "./dashboard-kit/AnalyticsPlaceholder";

export default function Dashboard() {
  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-5 py-5">
      <StatsCards />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <LineGraphChart />
        </div>
        <div className="lg:col-span-1">
          <PieChartStatus />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-1">
        <div className="lg:col-span-1">
          <PieChartIncome />
        </div>
        <div className="lg:col-span-2">
          <AnalyticsPlaceholder />
        </div>
      </div>
    </div>
  );
}
