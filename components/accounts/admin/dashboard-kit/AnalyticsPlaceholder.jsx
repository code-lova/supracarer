import React from "react";
import {
  FaChartLine,
  FaUserCheck,
  FaMousePointer,
  FaMobileAlt,
  FaMapMarkerAlt,
  FaUsers,
} from "react-icons/fa";

const analytics = [
  {
    label: "Visitors per Month",
    value: "12,500",
    icon: <FaChartLine className="text-blue-500" />,
  },
  {
    label: "Unique Users",
    value: "3,200",
    icon: <FaUserCheck className="text-green-500" />,
  },
  {
    label: "Bounce Rate",
    value: "42%",
    icon: <FaMousePointer className="text-red-500" />,
  },
  {
    label: "Pages Visited",
    value: "8,900",
    icon: <FaChartLine className="text-purple-500" />,
  },
  {
    label: "Devices",
    value: "Mobile, Desktop",
    icon: <FaMobileAlt className="text-pink-500" />,
  },
  {
    label: "Locations",
    value: "Lagos, Abuja, PH",
    icon: <FaMapMarkerAlt className="text-yellow-500" />,
  },
  {
    label: "Visits",
    value: "15,000",
    icon: <FaUsers className="text-gray-500" />,
  },
];

export default function AnalyticsPlaceholder() {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <div className="text-lg font-semibold text-gray-700 mb-4">
        Google Analytics (Fake Data)
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {analytics.map((a) => (
          <div
            key={a.label}
            className="flex items-center gap-3 p-4 rounded-lg bg-gray-50"
          >
            <div className="p-2 rounded-full bg-white shadow">{a.icon}</div>
            <div>
              <div className="font-bold text-lg">{a.value}</div>
              <div className="text-xs text-gray-500">{a.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
