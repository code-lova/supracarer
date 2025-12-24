"use client";
import React from "react";
import {
  FaChartLine,
  FaCalendarAlt,
  FaStar,
  FaArrowLeft,
} from "react-icons/fa";
import Link from "next/link";
import AppointmentChart from "./dashboard-kits/AppointmentChart";
import ActivityStatCard from "./dashboard-kits/ActivityStatCard";
import RecentAppointmentsCard from "./dashboard-kits/RecentAppointmentCard";
import { useQuery } from "@tanstack/react-query";
import { fetchAppointmentCount } from "@service/request/healthworker/dasboard";

const Analytics = () => {
  const { data: appointmentData } = useQuery({
    queryKey: ["appointment-count"],
    queryFn: fetchAppointmentCount,
    staleTime: 5 * 60 * 1000,
  });

  const stats = appointmentData?.data;

  return (
    <div className="w-full min-h-screen pb-8 mt-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Link
            href="/health-service"
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <FaArrowLeft className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Analytics & Reports
            </h1>
            <p className="text-sm text-gray-500">
              Track your performance and appointment trends
            </p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-tranquil-teal/10 flex items-center justify-center">
              <FaCalendarAlt className="text-tranquil-teal" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">
                Total Appointments
              </p>
              <h3 className="text-xl font-bold text-gray-800">
                {stats?.total_appointments || 0}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <FaChartLine className="text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">This Month</p>
              <h3 className="text-xl font-bold text-gray-800">
                {stats?.this_month_total || 0}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <FaCalendarAlt className="text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">
                Upcoming (7 days)
              </p>
              <h3 className="text-xl font-bold text-gray-800">
                {stats?.upcoming_7_days || 0}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
              <FaStar className="text-yellow-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Today</p>
              <h3 className="text-xl font-bold text-gray-800">
                {stats?.today_appointments || 0}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Appointment Chart - Takes 2 columns */}
        <div className="lg:col-span-2">
          <AppointmentChart />
        </div>

        {/* Rating Trends */}
        <div className="lg:col-span-1">
          <ActivityStatCard />
        </div>
      </div>

      {/* Recent Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RecentAppointmentsCard />

        {/* Performance Tips Card */}
        <div className="bg-white rounded-2xl border-2 shadow-md p-6">
          <h3 className="text-lg font-semibold text-tranquil-teal mb-4 flex items-center gap-2">
            <FaChartLine /> Performance Tips
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-bold text-sm">1</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 text-sm">
                  Respond Quickly
                </h4>
                <p className="text-xs text-gray-600">
                  Faster response times lead to higher client satisfaction and
                  more bookings.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold text-sm">2</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 text-sm">
                  Complete Your Profile
                </h4>
                <p className="text-xs text-gray-600">
                  A complete profile with valid information increases trust and
                  visibility.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 font-bold text-sm">3</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 text-sm">
                  Set Availability
                </h4>
                <p className="text-xs text-gray-600">
                  Keep your calendar updated to get matched with more clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
