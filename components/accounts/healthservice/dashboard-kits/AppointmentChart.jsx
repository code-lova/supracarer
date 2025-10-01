"use client";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { fetchMonthlyAppStats } from "@service/request/healthworker/dasboard";
import EmptyState from "@components/core/EmptyState";
import ErrorState from "@components/core/ErrorState";
import { FaChartBar, FaCalendarAlt, FaFilter } from "react-icons/fa";
import { AppointmentBarchartSkeleton } from "@components/core/skeleton/dashboard/hw";

const AppointmentChart = () => {
  const [statusFilter, setStatusFilter] = useState("all");

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["monthly-app-stats", statusFilter],
    queryFn: () => fetchMonthlyAppStats({ status: statusFilter }),
    refetchOnWindowFocus: false,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Loading skeleton
  if (isLoading) {
    return <AppointmentBarchartSkeleton />;
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white w-full h-[380px] border-2 rounded-2xl shadow-md">
        <div className="h-full flex items-center justify-center p-4">
          <ErrorState
            title="Failed to load statistics"
            description={
              error.message || "Unable to fetch monthly appointment data"
            }
            onAction={refetch}
            icon={FaChartBar}
            size="md"
          />
        </div>
      </div>
    );
  }

  const statsData = data?.data;

  // Empty state - no data
  if (
    !statsData ||
    !statsData.monthly_data ||
    statsData.monthly_data.length === 0
  ) {
    return (
      <div className="bg-white w-full h-[380px] border-2 rounded-2xl shadow-md">
        <div className="h-full flex items-center justify-center p-4">
          <EmptyState
            title="No appointment data"
            description="Start taking appointments to see your monthly statistics"
            icon={FaCalendarAlt}
            size="md"
          />
        </div>
      </div>
    );
  }

  // Transform data for the bar chart - show only months with data
  const chartData = statsData.monthly_data
    .filter((month) => month.appointment_count > 0)
    .map((month) => ({
      month: month.month_name.substring(0, 3), // Short month names
      total: month.appointment_count,
      completed: month.completed_count,
      confirmed: month.confirmed_count,
      ongoing: month.ongoing_count,
      fullMonth: month.month_name,
    }));

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-tranquil-teal/20 rounded-lg shadow-lg">
          <p className="text-sm font-semibold text-gray-800 mb-2">
            {data.fullMonth}
          </p>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-gray-600">Total:</span>
              <span className="text-sm font-medium text-tranquil-teal">
                {data.total}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-gray-600">Completed:</span>
              <span className="text-sm font-medium text-custom-green">
                {data.completed}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-gray-600">Confirmed:</span>
              <span className="text-sm font-medium text-blue-600">
                {data.confirmed}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-gray-600">Ongoing:</span>
              <span className="text-sm font-medium text-orange-600">
                {data.ongoing}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white w-full h-[380px] border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="p-4 h-full flex flex-col">
        {/* Header with filter */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FaChartBar className="text-tranquil-teal text-lg" />
            <h2 className="text-lg font-semibold text-tranquil-teal">
              Monthly Appointments {statsData.year}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-500 text-sm" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tranquil-teal focus:border-transparent bg-white"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="confirmed">Confirmed</option>
              <option value="ongoing">Ongoing</option>
            </select>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="flex items-center justify-between mb-4 bg-gray-50 rounded-lg p-3">
          <div className="text-center">
            <p className="text-xs text-gray-600">Total</p>
            <p className="text-lg font-bold text-tranquil-teal">
              {statsData.summary.total_appointments}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600">Completed</p>
            <p className="text-lg font-bold text-custom-green">
              {statsData.summary.total_completed}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600">Peak Month</p>
            <p className="text-sm font-semibold text-tranquil-teal">
              {statsData.peak_month.month}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600">Success Rate</p>
            <p className="text-lg font-bold text-custom-green">
              {statsData.summary.completion_rate}%
            </p>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
              barCategoryGap="15%"
              maxBarSize={30}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 10, fill: "#6b7280" }}
                tickLine={{ stroke: "#d1d5db" }}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#6b7280" }}
                tickLine={{ stroke: "#d1d5db" }}
                width={25}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="total"
                fill="#088272"
                radius={[4, 4, 0, 0]}
                name="Total Appointments"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AppointmentChart;
