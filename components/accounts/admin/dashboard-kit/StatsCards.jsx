import React from "react";
import { FaCalendarCheck, FaUsers, FaUserTie, FaUserMd } from "react-icons/fa";

const stats = [
  {
    label: "Total Appointments",
    value: "1,245",
    icon: <FaCalendarCheck size={28} className="text-blue-500" />,
    bg: "bg-blue-50",
  },
  {
    label: "Total Users",
    value: "3,210",
    icon: <FaUsers size={28} className="text-green-500" />,
    bg: "bg-green-50",
  },
  {
    label: "Total Clients",
    value: "2,100",
    icon: <FaUserTie size={28} className="text-purple-500" />,
    bg: "bg-purple-50",
  },
  {
    label: "Health Workers",
    value: "320",
    icon: <FaUserMd size={28} className="text-pink-500" />,
    bg: "bg-pink-50",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`flex items-center gap-4 p-5 rounded-xl shadow ${stat.bg}`}
        >
          <div className="p-3 rounded-full bg-white shadow">{stat.icon}</div>
          <div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
