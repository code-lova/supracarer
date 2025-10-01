import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "@service/request/admin/dashboard";
import NumberFormater from "@components/core/NumberFormater";
import ErrorState from "@components/core/ErrorState";
import { getStatsData } from "./StatsDataProvider";
import { AdminStatSkeleton } from "@components/core/skeleton/dashboard/admin";

export default function StatsCards() {
  const {
    data: dashboardData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: getDashboardStats,
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });

  // Loading state
  if (isLoading) {
    return <AdminStatSkeleton />;
  }

  // Error state
  if (isError) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 mb-6">
        <div className="col-span-full">
          <ErrorState
            title="Failed to load dashboard statistics"
            description="Unable to fetch dashboard data. Please try again."
            error={error}
            onAction={refetch}
            actionLabel="Refresh Data"
            className="p-8"
          />
        </div>
      </div>
    );
  }

  const stats = getStatsData(dashboardData);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`flex flex-col p-4 rounded-xl shadow ${stat.bg} hover:shadow-md transition-shadow min-h-48 max-h-64 overflow-hidden`}
        >
          {/* Header with icon and main stats */}
          <div className="flex items-center gap-3 mb-3 flex-shrink-0">
            <div className="p-2 rounded-full bg-white shadow flex-shrink-0">
              {stat.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xl font-bold truncate">
                <NumberFormater value={stat.value} />
              </div>
              <div className="text-xs text-gray-500 leading-tight truncate">
                {stat.label}
              </div>
            </div>
          </div>

          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <div className="space-y-1">
              {stat.subData?.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-xs"
                >
                  <span className="text-gray-600 truncate pr-1">
                    {item.label}:
                  </span>
                  <span
                    className={`font-medium flex-shrink-0 ${
                      item.isGrowth
                        ? parseFloat(item.value) >= 0
                          ? "text-green-600"
                          : "text-red-600"
                        : "text-gray-800"
                    }`}
                  >
                    <NumberFormater value={item.value} />
                  </span>
                </div>
              ))}

              {/* Breakdown data if available */}
              {stat.breakdown && (
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <div className="text-xs text-gray-500 mb-1 font-medium">
                    Status Breakdown:
                  </div>
                  <div className="space-y-1">
                    {Object.entries(stat.breakdown)
                      .slice(0, 6) // Limit to 6 items to prevent extreme overflow
                      .map(([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between items-center text-xs"
                        >
                          <span className="text-gray-600 truncate pr-1">
                            {key}:
                          </span>
                          <span className="font-medium text-gray-800 flex-shrink-0">
                            <NumberFormater value={value} />
                          </span>
                        </div>
                      ))}
                    {Object.entries(stat.breakdown).length > 6 && (
                      <div className="text-xs text-gray-400 italic text-center">
                        +{Object.entries(stat.breakdown).length - 6} more...
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
