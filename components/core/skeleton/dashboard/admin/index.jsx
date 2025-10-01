import React from "react";

export const AdminStatSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 mb-6">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="flex flex-col p-4 rounded-xl shadow bg-gray-50 animate-pulse min-h-48 max-h-64"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-full bg-gray-200 w-12 h-12"></div>
            <div className="flex-1">
              <div className="h-6 bg-gray-200 rounded mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
          <div className="space-y-2 flex-1">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            <div className="h-px bg-gray-200 my-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            <div className="h-3 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const PieChartStatusSkeleton = ({
  selectedMonth,
  setSelectedMonth,
  MONTHS,
}) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6 flex flex-col items-center min-h-[320px] w-full">
      <div className="w-full flex flex-col items-center">
        {/* Header with month filter - keep visible during loading */}
        <div className="flex items-center justify-between w-full mb-4">
          <div className="text-md font-semibold text-haven-blue mb-2 text-center">
            Appointment Status ({new Date().getFullYear()})
          </div>

          {/* Month Filter Dropdown - keep functional during loading */}
          <div className="flex justify-center">
            <select
              value={selectedMonth || ""}
              onChange={(e) =>
                setSelectedMonth(
                  e.target.value ? parseInt(e.target.value) : null
                )
              }
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              disabled={true}
            >
              {MONTHS.map((month) => (
                <option key={month.label} value={month.value || ""}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading skeleton for chart content */}
        <div className="animate-pulse w-full flex flex-col items-center">
          {/* Chart skeleton */}
          <div className="w-40 h-40 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full"></div>
          </div>

          {/* Legend skeleton */}
          <div className="flex flex-wrap gap-4 justify-center mt-2 mb-7">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-1">
                <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>

          {/* Summary skeleton */}
          <div className="h-4 bg-gray-200 rounded w-48"></div>
        </div>
      </div>
    </div>
  );
};
