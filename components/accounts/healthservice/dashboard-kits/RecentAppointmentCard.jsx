"use client";
import React, { useState } from "react";
import { FaEllipsisV, FaCalendarAlt, FaUser } from "react-icons/fa";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchRecentAppts } from "@service/request/healthworker/dasboard";
import EmptyState from "@components/core/EmptyState";
import ErrorState from "@components/core/ErrorState";
import { RecentApptSkeleton } from "@components/core/skeleton/dashboard/hw";
import DateFormatter from "@components/core/DateFormatter";

const RecentAppointmentsCard = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["recent-appointments"],
    queryFn: fetchRecentAppts,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Loading skeleton
  if (isLoading) {
    return <RecentApptSkeleton />;
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white w-full h-[200px] overflow-y-auto border-2 rounded-2xl shadow-md">
        <div className="h-full flex items-center justify-center p-4">
          <ErrorState
            title="Failed to load appointments"
            description={error.message || "Unable to fetch recent appointments"}
            onAction={refetch}
            size="sm"
          />
        </div>
      </div>
    );
  }

  const appointmentsData = data?.data?.recent_appointments || [];

  // Empty state
  if (appointmentsData.length === 0) {
    return (
      <div className="bg-white w-full h-[200px] overflow-y-auto border-2 rounded-2xl shadow-md">
        <div className="h-full flex items-center justify-center p-4">
          <EmptyState
            title="No recent appointments"
            description="Your recent appointments will appear here"
            icon={FaCalendarAlt}
            size="sm"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white w-full h-[200px] overflow-y-auto border-2 rounded-2xl shadow-md hover:shadow-lg duration-200">
      <div className="p-4 h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-tranquil-teal text-lg" />
            <h2 className="text-tranquil-teal font-semibold text-md">
              Recent Appointments
            </h2>
          </div>
          <div className="relative">
            <FaEllipsisV
              className="text-gray-500 cursor-pointer hover:text-tranquil-teal transition-colors"
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div className="absolute right-0 top-6 bg-white border border-gray-200 shadow-lg rounded-lg text-sm z-10 w-[120px]">
                <Link
                  href="/health-service/appointments"
                  className="block px-4 py-2 hover:bg-gray-50 font-semibold text-tranquil-teal rounded-lg transition-colors"
                  onClick={() => setShowDropdown(false)}
                >
                  View All
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Appointments List */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-3 max-h-[190px] overflow-y-auto pr-2">
            {appointmentsData.map((appointment, index) => (
              <div
                key={appointment.user?.uuid || index}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
              >
                {/* Client Avatar */}
                <div className="flex-shrink-0">
                  {appointment.user?.image ? (
                    <img
                      src={appointment.user.image}
                      alt={appointment.user.name || "Client"}
                      className="w-10 h-10 object-cover rounded-full border-2 border-tranquil-teal/20"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-tranquil-teal/10 flex items-center justify-center border-2 border-tranquil-teal/20">
                      <FaUser className="text-tranquil-teal text-sm" />
                    </div>
                  )}
                </div>

                {/* Client Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-800 truncate">
                    {appointment.user?.name || "Unknown Client"}
                  </h4>
                  <p className="text-xs text-gray-500">Appointment scheduled</p>
                </div>

                {/* Date */}
                <div className="flex-shrink-0 text-right">
                  <span className="text-xs font-medium text-tranquil-teal bg-tranquil-teal/10 px-2 py-1 rounded-full">
                    <DateFormatter date={appointment.start_date} format="relative" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentAppointmentsCard;
