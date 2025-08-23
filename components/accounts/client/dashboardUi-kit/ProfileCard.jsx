import React from "react";
import { useQuery } from "@tanstack/react-query";
import TimeAgo from "@components/core/TimeAgo";
import { FaCalendarAlt, FaMapMarkerAlt, FaPencilAlt } from "react-icons/fa";
import { format, parseISO, isValid } from "date-fns";
import StatusPill from "@components/core/StatusPill";
import { showClientNextApt } from "@service/request/client/dashboard";
import ProfileCardSkeleton from "@components/core/skeleton/ProfileCardSkeleton";

const ProfileCard = ({ userDetails }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["nextAppointment"],
    queryFn: showClientNextApt,
    refetchInterval: 10000, // updates every 10 seconds
    retry: 2,
  });

  const appointment = data?.appointment;

  if (isLoading) {
    return <ProfileCardSkeleton />;
  }
  return (
    <div className="bg-white w-full rounded-2xl shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-[1.01] h-[280px]">
      <div className="flex items-center justify-between border-b-2 w-full h-[50px] px-4">
        <h3 className="text-dark-blue font-semibold text-lg">My Profile</h3>
        <FaPencilAlt
          className="text-dark-blue hover:text-carer-blue"
          size={16}
        />
      </div>
      <div className="px-3">
        <div className="px-1 py-1">
          <div className="w-full flex items-center space-x-4 mb-6">
            {userDetails?.image ? (
              <img
                src={userDetails?.image}
                alt="Profile"
                className="w-20 h-20 rounded-full border-2 border-light-blue-bg"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-carer-blue flex items-center justify-center text-white text-3xl font-bold border-2 border-light-blue-bg">
                {userDetails?.fullname?.[0]?.toUpperCase() || "U"}
              </div>
            )}

            <div className="w-[200px] space-y-1">
              <h3 className="text-lg font-semibold text-carer-blue -mt-2 capitalize">
                {userDetails?.fullname || "UserName"}
              </h3>
              <div className="mt-6 flex items-center gap-2 text-slate-gray text-sm">
                <FaMapMarkerAlt className="text-tranquil-teal" />
                <span>
                  {userDetails?.region || "Not Set"}, {userDetails?.country}
                </span>
              </div>
            </div>
          </div>
          <div className="flex item-center justify-between -mt-4">
            <p className="text-carer-blue text-[10px] md:text-[13px]">
              Last Activity:
            </p>
            <p className="text-xs text-slate-gray font-semibold capitalize">
              <TimeAgo timestamp={userDetails?.last_logged_in || new Date()} />
            </p>
          </div>
        </div>

        <div className="w-full h-[1px] bg-gray-200 mt-2 mb-4"></div>

        {/* Show appointment.label here */}
        {appointment && appointment.label ? (
          <h3 className="text-dark-blue font-semibold text-xs">
            {appointment.label}
          </h3>
        ) : (
          <h3 className="text-dark-blue font-semibold text-xs">
            Next Appointment
          </h3>
        )}

        <div className="space-y-3 pr-2 mt-5">
          {isError ? (
            <div className="text-red-500 text-xs">
              Failed to load appointment.
            </div>
          ) : appointment ? (
            <div key={appointment.id}>
              <div className="flex item-center justify-between space-x-5">
                <div className="flex items-center text-xs text-slate-gray bg-white rounded-md border border-carer-blue px-2 py-1 w-fit">
                  <FaCalendarAlt className="mr-2 text-blue-500" />
                  {isValid(parseISO(appointment.start_date))
                    ? format(parseISO(appointment.start_date), "MMMM d, yyyy")
                    : "Invalid Date"}
                  {appointment.start_time && appointment.start_time_period
                    ? ` – ${appointment.start_time} ${appointment.start_time_period}`
                    : ""}
                </div>
                <div>
                  <StatusPill status={appointment.status} size="sm" />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-slate-gray text-xs">
              No upcoming appointments found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
