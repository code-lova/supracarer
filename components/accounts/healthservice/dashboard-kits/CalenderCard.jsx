import { FaRegCalendarTimes } from "react-icons/fa";
import React from "react";
import Link from "next/link";
import CalendarWidget from "@components/core/CalenderWidget";

const CalenderCard = () => {
  return (
    <>
      <div className="bg-white w-full h-[372px] border-2 rounded-2xl shadow-md">
        <div className="bg-tranquil-teal w-full h-[55px] rounded-2xl flex items-center justify-between px-4">
          <h2 className="text-md font-bold text-white">My Calender</h2>
          <Link
            href="/health-service/profile"
            className="bg-ever-green p-2 rounded-md hover:bg-gray-200 transition-colors duration-300"
          >
            <FaRegCalendarTimes
              className="text-white cursor-pointer hover:text-tranquil-teal"
              size={16}
            />
          </Link>
        </div>
        <div className="px-2">
          <p className="text-gray-600 font-bold">Mark only unavailable dates</p>
          <CalendarWidget />
        </div>
      </div>
    </>
  );
};

export default CalenderCard;
