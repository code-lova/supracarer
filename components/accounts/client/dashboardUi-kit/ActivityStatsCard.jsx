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
} from "recharts";

import { getMyMonthlyAptStats } from "@service/request/client/dashboard";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentYear = new Date().getFullYear();
const monthOptions = monthNames.map((name, idx) => ({
  value: idx + 1,
  label: name,
}));

const ActivityStatsCard = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["monthlyAptStats", selectedMonth, selectedYear],
    queryFn: () =>
      getMyMonthlyAptStats({ month: selectedMonth, year: selectedYear }),
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
    keepPreviousData: true, // Keep previous data while fetching new data
  });

  const chartData = data?.data || [
    { week: "Week 1", appointments: 0 },
    { week: "Week 2", appointments: 0 },
    { week: "Week 3", appointments: 0 },
    { week: "Week 4", appointments: 0 },
    { week: "Week 5", appointments: 0 },
  ];

  return (
    <div className="md:col-span-3 overflow-y-auto bg-white rounded-2xl py-3 px-3 shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-[1.01] h-[260px]">
      <div className="flex items-center justify-between">
        <h3 className="text-dark-blue font-semibold text-lg">
          Monthly Activity
        </h3>
        <div className="flex items-center space-x-2">
          {/* Month Filter */}
          <select
            className="border-2 border-slate-gray text-dark-blue font-semibold text-sm rounded-md p-1"
            value={selectedMonth}
            onChange={(e) => {
              setSelectedMonth(Number(e.target.value));
            }}
          >
            {monthOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {/* Year Filter */}
          <select
            className="border-2 border-slate-gray text-dark-blue font-semibold text-sm rounded-md p-1"
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(Number(e.target.value));
            }}
          >
            <option value={currentYear}>{currentYear}</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-[180px]">
          <span className="text-gray-400">Loading chart...</span>
        </div>
      ) : isError ? (
        <div className="flex items-center justify-center h-[180px]">
          <span className="text-red-500">
            {error?.message || "Failed to load chart."}
          </span>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={180} className="mt-4">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="appointments" fill="#3B82F6" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ActivityStatsCard;
