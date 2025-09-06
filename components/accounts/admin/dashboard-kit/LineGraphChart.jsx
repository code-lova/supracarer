"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { getAppointmentChartStats } from "@service/request/admin/dashboard";
import ErrorState from "@components/core/ErrorState";
import NumberFormater from "@components/core/NumberFormater";

export default function LineGraphChart() {
  const {
    data: appointmentData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["appointmentChartStats"],
    queryFn: getAppointmentChartStats,
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });

  // Transform API data to chart format
  const transformDataForChart = (apiData) => {
    if (!apiData?.data?.chart_data) return [];

    const { labels, data: values } = apiData.data.chart_data;

    return labels.map((month, index) => ({
      month: month.substring(0, 3), // Convert "January" to "Jan"
      appointments: values[index] || 0,
      fullMonth: month, // Keep full name for tooltip
    }));
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-700">{data.fullMonth}</p>
          <p className="text-indigo-600">
            <NumberFormater value={payload[0].value} /> appointments
          </p>
        </div>
      );
    }
    return null;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow p-6 mb-6 flex flex-col items-center justify-center min-h-[320px] w-full">
        <div className="animate-pulse w-full">
          <div className="h-6 bg-gray-200 rounded mb-4 w-64"></div>
          <div className="h-64 bg-gray-100 rounded"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="bg-white rounded-xl shadow p-6 mb-6 flex flex-col items-center justify-center min-h-[320px] w-full">
        <ErrorState
          title="Failed to load appointment statistics"
          description="Unable to fetch appointment chart data. Please try again."
          error={error}
          onAction={refetch}
          actionLabel="Refresh Chart"
          className="w-full"
        />
      </div>
    );
  }

  const chartData = transformDataForChart(appointmentData);
  const insights = appointmentData?.data?.insights;
  const year = appointmentData?.data?.year || new Date().getFullYear();

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6 flex flex-col items-center justify-center min-h-[320px] w-full">
      <div className="w-full">
        {/* Header with insights */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">
              Appointments per Month ({year})
            </h3>
            {insights && (
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span>
                  Total:{" "}
                  <NumberFormater
                    value={insights.total_appointments}
                    className="font-medium"
                  />
                </span>
                <span>
                  Avg/Month:{" "}
                  <NumberFormater
                    value={insights.average_per_month}
                    className="font-medium"
                  />
                </span>
                <span>
                  Lowest: {insights.lowest_month} (
                  <NumberFormater value={insights.lowest_count} />)
                </span>
                <span>
                  Peak: {insights.peak_month} (
                  <NumberFormater value={insights.peak_count} />)
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Chart */}
        <ResponsiveContainer width="100%" height={260}>
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="month"
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="line" />
            <Line
              type="monotone"
              dataKey="appointments"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ r: 4, fill: "#6366f1" }}
              activeDot={{ r: 6, fill: "#4f46e5" }}
              name="Appointments"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
