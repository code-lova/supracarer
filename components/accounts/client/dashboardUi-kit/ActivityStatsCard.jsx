import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import ErrorState from "@components/core/ErrorState";
import { getMyMonthlyAptStats } from "@service/request/client/dashboard";
import { FaCalendarAlt, FaChartBar, FaChevronDown } from "react-icons/fa";
import { monthNames } from "@constants";

const currentYear = new Date().getFullYear();
const monthOptions = monthNames.map((name, idx) => ({
  value: idx + 1,
  label: name,
  shortLabel: name.substring(0, 3),
}));

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-100">
        <p className="text-xs text-gray-500 font-medium">{label}</p>
        <p className="text-sm font-bold text-carer-blue">
          {payload[0].value}{" "}
          {payload[0].value === 1 ? "Appointment" : "Appointments"}
        </p>
      </div>
    );
  }
  return null;
};

// Loading skeleton
const ChartSkeleton = () => (
  <div className="animate-pulse h-full">
    <div className="flex items-end justify-around h-[180px] px-4 pt-4">
      {[40, 70, 55, 85, 45].map((height, i) => (
        <div
          key={i}
          className="w-8 sm:w-10 bg-gradient-to-t from-gray-200 to-gray-100 rounded-t-md"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
    <div className="flex justify-around px-4 mt-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-3 w-10 bg-gray-200 rounded" />
      ))}
    </div>
  </div>
);

const ActivityStatsCard = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["monthlyAptStats", selectedMonth, selectedYear],
    queryFn: () =>
      getMyMonthlyAptStats({ month: selectedMonth, year: selectedYear }),
    retry: 2,
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
  });

  const chartData = data?.data || [
    { week: "Week 1", appointments: 0 },
    { week: "Week 2", appointments: 0 },
    { week: "Week 3", appointments: 0 },
    { week: "Week 4", appointments: 0 },
    { week: "Week 5", appointments: 0 },
  ];

  // Calculate total appointments for the month
  const totalAppointments = chartData.reduce(
    (sum, item) => sum + (item.appointments || 0),
    0
  );

  // Find the peak week
  const peakWeek = chartData.reduce(
    (max, item) => (item.appointments > max.appointments ? item : max),
    { week: "", appointments: 0 }
  );

  // Bar colors - highlight the peak week
  const getBarColor = (entry, index) => {
    if (
      entry.appointments === peakWeek.appointments &&
      entry.appointments > 0
    ) {
      return "#2563EB"; // Darker blue for peak
    }
    return "#60A5FA"; // Lighter blue for others
  };

  return (
    <div className="md:col-span-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-carer-blue/10 flex items-center justify-center">
              <FaChartBar className="text-carer-blue text-sm" />
            </div>
            <div>
              <h3 className="text-gray-800 font-semibold text-sm sm:text-base">
                Monthly Activity
              </h3>
              <p className="text-[10px] sm:text-xs text-gray-400">
                Your appointment trends
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-xs sm:text-sm font-medium rounded-lg pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-carer-blue/20 focus:border-carer-blue cursor-pointer"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
              >
                {monthOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.shortLabel}
                  </option>
                ))}
              </select>
              <FaChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-[10px] pointer-events-none" />
            </div>
            <div className="relative">
              <select
                className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-xs sm:text-sm font-medium rounded-lg pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-carer-blue/20 focus:border-carer-blue cursor-pointer"
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
              >
                <option value={currentYear}>{currentYear}</option>
                <option value={currentYear - 1}>{currentYear - 1}</option>
              </select>
              <FaChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-[10px] pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      {!isLoading && !isError && (
        <div className="grid grid-cols-2 gap-3 px-4 py-3 bg-gradient-to-r from-carer-blue/5 to-transparent">
          <div className="flex items-center gap-2">
            <div className="w-2 h-8 rounded-full bg-carer-blue" />
            <div>
              <p className="text-lg sm:text-xl font-bold text-gray-800">
                {totalAppointments}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-500">
                Total this month
              </p>
            </div>
          </div>
          {peakWeek.appointments > 0 && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-8 rounded-full bg-green-500" />
              <div>
                <p className="text-lg sm:text-xl font-bold text-gray-800">
                  {peakWeek.week.replace("Week ", "W")}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500">
                  Busiest week
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Chart Area */}
      <div className="px-2 sm:px-4 pb-4 h-[200px] sm:h-[220px]">
        {isLoading ? (
          <ChartSkeleton />
        ) : isError ? (
          <div className="flex items-center justify-center h-full">
            <ErrorState
              title="Failed to load chart"
              description="Unable to fetch chart data"
              onAction={refetch}
              icon={FaCalendarAlt}
              size="sm"
            />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 10, left: -20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={1} />
                  <stop offset="100%" stopColor="#60A5FA" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E5E7EB"
              />
              <XAxis
                dataKey="week"
                tick={{ fontSize: 10, fill: "#6B7280" }}
                tickLine={false}
                axisLine={{ stroke: "#E5E7EB" }}
                tickFormatter={(value) => value.replace("Week ", "W")}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 10, fill: "#6B7280" }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "#F3F4F6" }}
              />
              <Bar
                dataKey="appointments"
                fill="url(#barGradient)"
                radius={[6, 6, 0, 0]}
                maxBarSize={40}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getBarColor(entry, index)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Empty State Hint */}
      {!isLoading && !isError && totalAppointments === 0 && (
        <div className="px-4 pb-4">
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <FaCalendarAlt className="text-gray-300 text-2xl mx-auto mb-2" />
            <p className="text-xs text-gray-500">
              No appointments in{" "}
              {monthOptions.find((m) => m.value === selectedMonth)?.label}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityStatsCard;
