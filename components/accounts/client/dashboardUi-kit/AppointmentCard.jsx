import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaCalendarCheck } from "react-icons/fa";
import { getTotalApptCount } from "@service/request/client/dashboard";
import Link from "next/link";

const AppointmentCard = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["totalApptCount"],
    queryFn: getTotalApptCount,
    staleTime: 60 * 1000,
    retry: 2,
  });

  let total_appointments = 0;
  if (data && typeof data.total_appointments === "number") {
    total_appointments = data.total_appointments;
  } else if (data && typeof data.total === "number") {
    total_appointments = data.total;
  }

  return (
    <div className="bg-gradient-to-l from-[#ffe6ec] via-[#fff0f4] to-white rounded-xl p-6 shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-[1.02] w-full h-[160px] flex items-center justify-between">
      {/* Icon Section */}
      <div className="flex items-center justify-center w-[70px] h-[70px] rounded-full bg-[#ffd6e2] shadow-inner border border-pink-100">
        <FaCalendarCheck size={38} className="text-danger-red" />
      </div>

      {/* Text and Count */}
      <div className="flex flex-col items-end justify-center">
        <h3 className="text-danger-red font-semibold text-lg">
          Total Appointments
        </h3>
        {isLoading ? (
          <p className="text-3xl font-bold text-danger-red mt-1 animate-pulse">
            ...
          </p>
        ) : isError ? (
          <p className="text-3xl font-bold text-danger-red mt-1">0</p>
        ) : (
          <p className="text-3xl font-bold text-danger-red mt-1">
            {total_appointments}
          </p>
        )}
        <span className="font-semibold text-danger-red text-xs -mt-2">
          Bookings
        </span>
        <Link href="/client/appointment" className="text-carer-blue text-xs pt-2">
          View All
        </Link>
      </div>
    </div>
  );
};

export default AppointmentCard;
