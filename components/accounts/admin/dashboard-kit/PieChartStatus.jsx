"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { getAppointmentStatusCountStats } from "@service/request/admin/dashboard";
import ErrorState from "@components/core/ErrorState";
import NumberFormater from "@components/core/NumberFormater";
import { PieChartStatusSkeleton } from "@components/core/skeleton/dashboard/admin";
import { MONTHS, STATUS_COLORS } from "@constants";

export default function PieChartStatus() {
  const [selectedMonth, setSelectedMonth] = useState(null);

  const {
    data: statusData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["appointmentStatusStats", selectedMonth],
    queryFn: () => getAppointmentStatusCountStats(selectedMonth),
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });

  // Transform API data for chart
  const transformDataForChart = (apiData) => {
    if (!apiData?.data?.status_counts) return [];

    const statusCounts = apiData.data.status_counts;

    return Object.entries(statusCounts).map(([status, count]) => ({
      label: status,
      value: count,
      color: STATUS_COLORS[status] || "#64748b", // Fallback color
    }));
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: data.payload.color }}
            ></span>
            <span className="font-medium text-gray-700">{data.name}</span>
          </div>
          <p className="text-indigo-600 mt-1">
            <NumberFormater value={data.value} /> appointments
          </p>
        </div>
      );
    }
    return null;
  };

  // Loading state
  if (isLoading) {
    return (
      <PieChartStatusSkeleton 
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        MONTHS={MONTHS}
      />
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="bg-white rounded-xl shadow p-4 mb-6 flex flex-col items-center min-h-[320px] w-full">
        <ErrorState
          title="Failed to load appointment status data"
          description="Unable to fetch appointment status statistics. Please try again."
          error={error}
          onAction={refetch}
          actionLabel="Refresh Data"
          className="w-full"
        />
      </div>
    );
  }

  const chartData = transformDataForChart(statusData);
  const total = statusData?.data?.total_appointments || 0;
  const displayMonth = statusData?.data?.month || "All Months";
  const year = statusData?.data?.year || new Date().getFullYear();

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6 flex flex-col items-center min-h-[320px] w-full">
      <div className="w-full flex flex-col items-center">
        {/* Header with month filter */}
        <div className=" flex items-center justify-between w-full mb-4">
          <div className="text-md font-semibold text-haven-blue mb-2 text-center">
            Appointment Status ({year})
          </div>

          {/* Month Filter Dropdown */}
          <div className="flex justify-center">
            <select
              value={selectedMonth || ""}
              onChange={(e) =>
                setSelectedMonth(
                  e.target.value ? parseInt(e.target.value) : null
                )
              }
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {MONTHS.map((month) => (
                <option key={month.label} value={month.value || ""}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Chart */}
        <div className="relative w-40 h-40 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                label={false}
                isAnimationActive={true}
              >
                {chartData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Center total */}
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-xs font-semibold text-slate-gray pointer-events-none">
            <p>Appointments</p>
            <p>
              <NumberFormater value={total} />
            </p>
          </div>
        </div>

        {/* Legend with color circles and status names */}
        <div className="flex flex-wrap gap-4 justify-center mt-2">
          {chartData.map((status) => (
            <div
              key={status.label}
              className="flex items-center gap-1 text-xs text-slate-gray"
            >
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: status.color }}
              ></span>
              <div className="flex space-x-1">
                <span>{status.label}</span>
                <span>
                  (<NumberFormater value={status.value} />)
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary stats */}
        {chartData.length > 0 && (
          <div className="mt-7 text-center text-sm text-gray-600">
            <p>
              Total: <NumberFormater value={total} className="font-medium" />{" "}
              appointments
              {selectedMonth && (
                <span className="text-gray-500"> in {displayMonth}</span>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
