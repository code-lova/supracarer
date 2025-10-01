"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getGoogleAnalytics } from "@service/request/admin/analytics";
import ErrorState from "@components/core/ErrorState";
import {
  FaChartLine,
  FaUserCheck,
  FaMousePointer,
  FaMobileAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaEye,
} from "react-icons/fa";

export default function AnalyticsPlaceholder() {
  const {
    data: analyticsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["googleAnalytics"],
    queryFn: getGoogleAnalytics,
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    retry: 2,
  });

  // Transform API data for display
  const getAnalyticsItems = (data) => {
    if (!data?.data) {
      // Fallback data if no real data available
      return [
        {
          label: "Visitors per Month",
          value: "Loading...",
          icon: <FaChartLine className="text-blue-500" />,
        },
        {
          label: "Unique Users",
          value: "Loading...",
          icon: <FaUserCheck className="text-green-500" />,
        },
        {
          label: "Bounce Rate",
          value: "Loading...",
          icon: <FaMousePointer className="text-red-500" />,
        },
        {
          label: "Pages Visited",
          value: "Loading...",
          icon: <FaEye className="text-purple-500" />,
        },
        {
          label: "Devices",
          value: "Loading...",
          icon: <FaMobileAlt className="text-pink-500" />,
        },
        {
          label: "Locations",
          value: "Loading...",
          icon: <FaMapMarkerAlt className="text-yellow-500" />,
        },
        {
          label: "Total Visits",
          value: "Loading...",
          icon: <FaUsers className="text-gray-500" />,
        },
      ];
    }

    return [
      {
        label: "Visitors per Month",
        value: data.data.visitorsPerMonth,
        icon: <FaChartLine className="text-blue-500" />,
      },
      {
        label: "Unique Users",
        value: data.data.uniqueUsers,
        icon: <FaUserCheck className="text-green-500" />,
      },
      {
        label: "Bounce Rate",
        value: data.data.bounceRate,
        icon: <FaMousePointer className="text-red-500" />,
      },
      {
        label: "Pages Visited",
        value: data.data.pagesVisited,
        icon: <FaEye className="text-purple-500" />,
      },
      {
        label: "Top Devices",
        value: data.data.devices,
        icon: <FaMobileAlt className="text-pink-500" />,
      },
      {
        label: "Top Locations",
        value: data.data.locations,
        icon: <FaMapMarkerAlt className="text-yellow-500" />,
      },
      {
        label: "Total Visits",
        value: data.data.visits,
        icon: <FaUsers className="text-gray-500" />,
      },
    ];
  };

  const analytics = getAnalyticsItems(analyticsData);

  // Error state
  if (isError) {
    return (
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <ErrorState
          title="Failed to load Google Analytics data"
          description="Unable to fetch analytics data. This might be due to configuration issues or API limits."
          error={error}
          onAction={refetch}
          actionLabel="Retry Analytics"
          className="w-full"
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-lg font-semibold text-gray-700">
          Google Analytics
          {analyticsData?.data?.lastUpdated && (
            <span className="text-sm font-normal text-gray-500 ml-2">
              (Last 30 days)
            </span>
          )}
        </div>
        {isLoading && (
          <div className="text-sm text-gray-500 flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
            Loading...
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {analytics.map((item, index) => (
          <div
            key={item.label}
            className={`flex items-center gap-3 p-4 rounded-lg transition-all duration-200 ${
              isLoading
                ? "bg-gray-50 animate-pulse"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
          >
            <div className="p-2 rounded-full bg-white shadow">
              {isLoading ? (
                <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
              ) : (
                item.icon
              )}
            </div>
            <div className="flex-1">
              {isLoading ? (
                <>
                  <div className="h-6 bg-gray-200 rounded mb-1 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                </>
              ) : (
                <>
                  <div className="font-bold text-lg text-gray-800">
                    {item.value}
                  </div>
                  <div className="text-xs text-gray-500">{item.label}</div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {analyticsData?.data?.lastUpdated && !isLoading && (
        <div className="mt-4 text-xs text-gray-400 text-center">
          Last updated:{" "}
          {new Date(analyticsData.data.lastUpdated).toLocaleString()}
        </div>
      )}
    </div>
  );
}
