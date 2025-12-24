"use client";
import React from "react";
import Link from "next/link";
import { FiCalendar, FiSettings, FiChevronRight } from "react-icons/fi";
import CalendarWidget from "@components/core/CalenderWidget";

const CalenderCard = () => {
  return (
    <div className="bg-white w-full rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Header with gradient */}
      <div className="relative bg-gradient-to-r from-tranquil-teal to-ever-green px-4 py-4">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-1/4 w-10 h-10 bg-white/10 rounded-full translate-y-1/2" />

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <FiCalendar className="text-white text-sm" />
            </div>
            <h2 className="text-lg font-bold text-white">My Calendar</h2>
          </div>
          <Link
            href="/health-service/profile"
            className="flex items-center gap-1 px-3 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-colors duration-300 group"
          >
            <FiSettings className="text-white text-sm" />
            <span className="text-white text-xs font-medium">Manage</span>
            <FiChevronRight className="text-white text-xs opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
          </Link>
        </div>
      </div>

      {/* Calendar Content */}
      <div className="px-4 py-3">
        {/* Info Banner */}
        <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 rounded-lg mb-3">
          <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
            <span className="text-amber-600 text-xs">💡</span>
          </div>
          <p className="text-amber-700 text-xs font-medium">
            Click on dates to mark your unavailability
          </p>
        </div>

        {/* Calendar Widget */}
        <CalendarWidget />
      </div>
    </div>
  );
};

export default CalenderCard;
