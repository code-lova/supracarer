"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { fetchRatingStats } from "@service/request/healthworker/dasboard";
import EmptyState from "@components/core/EmptyState";
import ErrorState from "@components/core/ErrorState";
import { FaStar, FaChartLine } from "react-icons/fa";
import { RatingTrendsSkeleton } from "@components/core/skeleton/dashboard/hw";

const RatingsChart = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["rating-stats"],
    queryFn: fetchRatingStats,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Loading skeleton
  if (isLoading) {
    return <RatingTrendsSkeleton />;
  }

  // Error state
  if (error) {
    return (
      <div className="w-full h-[190px] md:h-[190px] flex items-center justify-center">
        <ErrorState
          title="Failed to load ratings"
          description={
            error.message || "Unable to fetch your rating statistics"
          }
          onAction={refetch}
          icon={FaChartLine}
          size="sm"
        />
      </div>
    );
  }

  const ratingsData = data?.data;

  // Empty state - no ratings data
  if (
    !ratingsData ||
    !ratingsData.weekly_trends ||
    ratingsData.weekly_trends.length === 0
  ) {
    return (
      <div className="w-full h-[190px] md:h-[190px] flex items-center justify-center">
        <EmptyState
          title="No ratings yet"
          description="Start providing services to receive ratings"
          icon={FaStar}
          size="sm"
        />
      </div>
    );
  }

  // Transform weekly trends data for the line chart
  const chartData = ratingsData.weekly_trends.map((week) => ({
    week: `Week ${week.week}`,
    rating: week.average_rating,
    reviews: week.reviews_count,
    period: week.week_period,
  }));

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-tranquil-teal/20 rounded-lg shadow-lg">
          <p className="text-sm font-semibold text-gray-800">{label}</p>
          <p className="text-xs text-gray-600 mb-1">{data.period}</p>
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-400 text-xs" />
            <span className="text-sm font-medium text-tranquil-teal">
              {data.rating}
            </span>
          </div>
          <p className="text-xs text-gray-500">{data.reviews} reviews</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[190px] md:h-[190px] flex flex-col">
      {/* Header with current stats */}
      <div className="flex items-center justify-between mb-2 px-2">
        <div className="flex items-center gap-2">
          <FaStar className="text-yellow-400 text-sm" />
          <span className="text-lg font-bold text-tranquil-teal">
            {ratingsData.overall.average_rating}
          </span>
          <span className="text-xs text-gray-500">
            ({ratingsData.overall.total_reviews} reviews)
          </span>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-600">This Month</p>
          <div className="flex items-center gap-1">
            <FaStar className="text-custom-green text-xs" />
            <span className="text-sm font-semibold text-custom-green">
              {ratingsData.current_month.average_rating}
            </span>
          </div>
        </div>
      </div>

      {/* Line Chart */}
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 5, left: -10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="week"
              tick={{ fontSize: 10, fill: "#6b7280" }}
              tickLine={{ stroke: "#d1d5db" }}
            />
            <YAxis
              domain={[3.5, 5]}
              tick={{ fontSize: 10, fill: "#6b7280" }}
              tickLine={{ stroke: "#d1d5db" }}
              width={30}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="rating"
              stroke="#088272"
              strokeWidth={3}
              dot={{ fill: "#088272", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: "#088272" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RatingsChart;
