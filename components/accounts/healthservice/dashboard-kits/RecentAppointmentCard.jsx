"use client";
import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import Link from "next/link";

const placeholderAppointments = [
  { name: "Grace Okafor Amina", date: "July 10, 2025", time: "10:00 AM" },
  { name: "Michael Ade", date: "July 9, 2025", time: "2:30 PM" },
  { name: "Nkechi O.", date: "July 7, 2025", time: "9:15 AM" },
  { name: "Paul Ibe", date: "July 6, 2025", time: "1:00 PM" },
  { name: "Lilian Musa", date: "July 5, 2025", time: "4:00 PM" },
];

const RecentAppointmentsCard = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="bg-white w-full h-[279px] border-2 rounded-2xl shadow-md p-4 relative">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-tranquil-teal font-semibold text-md">
          Recent Appointments
        </h2>
        <div className="relative">
          <FaEllipsisV
            className="text-gray-500 cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          />
          {showDropdown && (
            <div className="absolute right-0 top-6 bg-white border shadow-md rounded-md text-sm z-10 w-[95px]">
              <Link
                href="/health-service/appointments"
                className="block px-4 py-2 hover:bg-gray-100 font-semibold text-tranquil-teal"
              >
                View All
              </Link>
            </div>
          )}
        </div>
      </div>

      <ul className="space-y-2 max-h-[170px] overflow-y-auto pr-2 mt-6">
        {placeholderAppointments.map((item, index) => (
          <li
            key={index}
            className="flex justify-between text-sm border-b pb-1 text-gray-700"
          >
            <span className="font-semibold truncate w-1/2">{item.name}</span>
            <span className="w-1/2 text-right text-xs text-gray-500">
              {item.date}, {item.time}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentAppointmentsCard;
