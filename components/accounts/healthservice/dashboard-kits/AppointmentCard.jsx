"use client";
import React from "react";
import { FaCalendarAlt, FaCalendarCheck, FaClock } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { fetchAppointmentCount } from "@service/request/healthworker/dasboard";
import { ApptsStatCountSkeleton } from "@components/core/skeleton/dashboard/hw";
import EmptyState from "@components/core/EmptyState";
import ErrorState from "@components/core/ErrorState";

const AppointmentCard = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["appointment-count"],
    queryFn: fetchAppointmentCount,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Loading skeleton
  if (isLoading) {
    return <ApptsStatCountSkeleton />;
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white w-full h-[100px] border-2 rounded-2xl shadow-md py-1 px-3">
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <ErrorState
              title="Failed to load Appointments"
              description={error.message || "Unable to fetch details"}
              onAction={refetch}
              icon={FaCalendarAlt}
              size="sm"
            />
          </div>
        </div>
      </div>
    );
  }

  const appointmentData = data?.data;

  // Empty state - if no data or all counts are zero
  if (!appointmentData || appointmentData.total_appointments === 0) {
    return (
      <div className="bg-white w-full h-[100px] border-2 rounded-2xl shadow-md py-1 px-3">
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <EmptyState
              title="No appointments"
              description="You have no appointments this month"
              icon={FaCalendarAlt}
              size="sm"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white w-full h-[100px] border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="p-3 h-full flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="text-slate-gray text-xs font-semibold">This Month</p>
          <div className="flex items-center gap-1">
            <FaClock className="text-tranquil-teal text-xs" />
            <span className="text-tranquil-teal text-xs md:text-sm">
              Total Appts:
            </span>{" "}
            <span className="text-xs text-tranquil-teal font-medium">
              {appointmentData.total_appointments}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-tranquil-teal">
              {appointmentData.this_month_total}
            </h2>
            <div className="flex flex-col">
              <span className="text-xs text-slate-gray font-medium">total</span>
              {appointmentData.today_appointments > 0 && (
                <span className="text-xs text-custom-green font-semibold">
                  {appointmentData.today_appointments} today
                </span>
              )}
            </div>
          </div>
          <div className="relative">
            <FaCalendarCheck className="text-tranquil-teal text-2xl" />
            {appointmentData.upcoming_7_days > 0 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-custom-green rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {appointmentData.upcoming_7_days > 9
                    ? "9+"
                    : appointmentData.upcoming_7_days}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
