"use client";
import React from "react";
import {
  FaCalendarAlt,
  FaCalendarCheck,
  FaClock,
  FaBell,
  FaChartLine,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { fetchAppointmentCount } from "@service/request/healthworker/dasboard";
import Link from "next/link";

const QuickStatsCard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["appointment-count"],
    queryFn: fetchAppointmentCount,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  const stats = data?.data;

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 bg-gray-100 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state - show minimal stats
  if (error) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="text-center text-gray-500 py-4">
          <p className="text-sm">Unable to load stats</p>
        </div>
      </div>
    );
  }

  const statItems = [
    {
      label: "Today",
      value: stats?.today_appointments || 0,
      icon: FaClock,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      highlight: stats?.today_appointments > 0,
    },
    {
      label: "This Week",
      value: stats?.upcoming_7_days || 0,
      icon: FaCalendarCheck,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      highlight: false,
    },
    {
      label: "This Month",
      value: stats?.this_month_total || 0,
      icon: FaCalendarAlt,
      color: "text-tranquil-teal",
      bgColor: "bg-tranquil-teal/10",
      highlight: false,
    },
    {
      label: "Total",
      value: stats?.total_appointments || 0,
      icon: FaChartLine,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      highlight: false,
    },
  ];

  return (
    <div className="bg-white rounded-xl border shadow-md border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <FaCalendarAlt className="text-tranquil-teal" />
          Appointment Overview
        </h3>
        <Link
          href="/health-service/analytics"
          className="text-xs text-tranquil-teal hover:underline font-medium"
        >
          View Analytics →
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          {statItems.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`${stat.bgColor} rounded-lg p-3 ${
                  stat.highlight ? "ring-2 ring-orange-300" : ""
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`${stat.color} text-sm`} />
                  <span className="text-xs text-gray-600 font-medium">
                    {stat.label}
                  </span>
                </div>
                <p className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Today's appointments highlight */}
        {stats?.today_appointments > 0 && (
          <div className="mt-3 p-3 bg-orange-50 rounded-lg border border-orange-100">
            <div className="flex items-center gap-2">
              <FaBell className="text-orange-500 text-sm animate-pulse" />
              <p className="text-sm text-orange-700 font-medium">
                You have {stats.today_appointments} appointment
                {stats.today_appointments > 1 ? "s" : ""} today!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickStatsCard;
