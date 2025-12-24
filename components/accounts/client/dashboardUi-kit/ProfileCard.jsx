import React from "react";
import { useQuery } from "@tanstack/react-query";
import TimeAgo from "@components/core/TimeAgo";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPencilAlt,
  FaUser,
  FaClock,
  FaChevronRight,
} from "react-icons/fa";
import { FiMail, FiPhone } from "react-icons/fi";
import StatusPill from "@components/core/StatusPill";
import { showClientNextApt } from "@service/request/client/dashboard";
import ProfileCardSkeleton from "@components/core/skeleton/ProfileCardSkeleton";
import ProfileCompleteness from "@components/core/ProfileCompleteness";
import DateFormatter from "@components/core/DateFormatter";
import Link from "next/link";

const ProfileCard = ({ userDetails }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["nextAppointment"],
    queryFn: showClientNextApt,
    refetchInterval: 10000,
    retry: 2,
  });

  const appointment = data?.appointment;

  if (isLoading) {
    return <ProfileCardSkeleton />;
  }

  return (
    <div className="bg-white w-full rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Header with gradient */}
      <div className="relative bg-gradient-to-r from-carer-blue to-blue-600 px-4 py-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* Profile Image */}
            <div className="relative">
              {userDetails?.image ? (
                <img
                  src={userDetails?.image}
                  alt="Profile"
                  className="w-16 h-16 rounded-full border-3 border-white shadow-md object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-2xl font-bold border-2 border-white/50">
                  {userDetails?.fullname?.[0]?.toUpperCase() || "U"}
                </div>
              )}
              {/* Online indicator */}
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
            </div>

            {/* Name and Location */}
            <div>
              <h3 className="text-white font-bold text-base capitalize">
                {userDetails?.fullname || "User Name"}
              </h3>
              <div className="flex items-center gap-1 text-white/80 text-xs mt-0.5">
                <FaMapMarkerAlt className="text-[10px]" />
                <span>
                  {userDetails?.region || "Location not set"}
                  {userDetails?.country && `, ${userDetails.country}`}
                </span>
              </div>
            </div>
          </div>

          {/* Edit Button */}
          <Link
            href="/client/profile"
            className="w-8 h-8 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg flex items-center justify-center transition-colors"
          >
            <FaPencilAlt className="text-white text-xs" />
          </Link>
        </div>

        {/* Last Activity */}
        <div className="flex items-center gap-1.5 mt-3 text-white/70 text-[10px]">
          <FaClock className="text-[9px]" />
          <span>Last active: </span>
          <span className="text-white/90 font-medium">
            <TimeAgo timestamp={userDetails?.last_logged_in || new Date()} />
          </span>
        </div>
      </div>

      {/* Profile Completeness */}
      <div className="px-4 py-3 border-b border-gray-100">
        <ProfileCompleteness userDetails={userDetails} userType="client" />
      </div>

      {/* Quick Info */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="grid grid-cols-2 gap-3">
          {userDetails?.email && (
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                <FiMail className="text-carer-blue text-xs" />
              </div>
              <span className="truncate">{userDetails.email}</span>
            </div>
          )}
          {userDetails?.phone && (
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center">
                <FiPhone className="text-green-600 text-xs" />
              </div>
              <span>{userDetails.phone}</span>
            </div>
          )}
        </div>
      </div>

      {/* Next Appointment Section */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-gray-800 font-semibold text-xs flex items-center gap-1.5">
            <FaCalendarAlt className="text-carer-blue text-[10px]" />
            {appointment?.label || "Next Appointment"}
          </h4>
          <Link
            href="/client/appointment"
            className="text-[10px] text-carer-blue hover:underline flex items-center gap-0.5"
          >
            View all
            <FaChevronRight className="text-[8px]" />
          </Link>
        </div>

        {isError ? (
          <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg text-center">
            Failed to load appointment
          </div>
        ) : appointment ? (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Provider Avatar Placeholder */}
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
                  <FaUser className="text-gray-400 text-sm" />
                </div>
                <div>
                  <p className="text-gray-800 font-medium text-sm">
                    <DateFormatter
                      date={appointment.start_date}
                      format="long"
                    />
                  </p>
                  <p className="text-gray-500 text-[10px]">
                    Healthcare Appointment
                  </p>
                </div>
              </div>
              <StatusPill status={appointment.status} size="sm" />
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-2">
              <FaCalendarAlt className="text-gray-300 text-sm" />
            </div>
            <p className="text-gray-500 text-xs">No upcoming appointments</p>
            <Link
              href="/client/booking"
              className="inline-block mt-2 text-[10px] text-carer-blue font-medium hover:underline"
            >
              Book an appointment →
            </Link>
          </div>
        )}
      </div>

    </div>
  );
};

export default ProfileCard;
