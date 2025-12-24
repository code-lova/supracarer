"use client";
import React from "react";
import {
  FiCalendar,
  FiClock,
  FiActivity,
  FiCheckCircle,
  FiStar,
} from "react-icons/fi";
import Image from "next/image";
import { useUserContext } from "@context/userContext";
import TimeAgo from "@components/core/TimeAgo";
import { useGreeting } from "@hooks/useGreeting";

const DetailsCard = () => {
  const { user } = useUserContext();
  const { greeting, currentTime, currentDate } = useGreeting();

  const userDetails = user?.data;

  // Get first name for more personal greeting
  const firstName = userDetails?.fullname?.split(" ")[0] || "there";

  return (
    <div className="relative w-full h-[200px] md:h-[260px] bg-gradient-to-br from-tranquil-teal via-tranquil-teal to-ever-green rounded-xl shadow-lg overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/5 rounded-full" />

      <div className="relative h-full flex items-center justify-between px-4 md:px-6 py-4 md:py-6">
        {/* Left Content */}
        <div className="flex flex-col justify-between h-full flex-1 z-10">
          {/* Date & Time Badge */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/15 backdrop-blur-sm rounded-full">
              <FiCalendar className="text-white text-xs" />
              <span className="text-white text-xs font-medium">
                {currentDate}
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white/15 backdrop-blur-sm rounded-full">
              <FiClock className="text-white text-xs" />
              <span className="text-white text-xs font-medium">
                {currentTime}
              </span>
            </div>
          </div>

          {/* Greeting Section */}
          <div className="flex-1 flex flex-col justify-center py-2 md:py-4">
            <p className="text-white/80 text-xs md:text-sm font-medium mb-0.5">
              {greeting} 👋
            </p>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white capitalize truncate max-w-[200px] md:max-w-[280px]">
              {firstName}
            </h1>
            <p className="text-white/70 text-[10px] md:text-xs mt-1">
              Welcome back! Ready to make a difference today?
            </p>
          </div>

          {/* Quick Stats Row */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Online Status */}
            <div className="flex items-center gap-1.5 px-2 md:px-3 py-1 md:py-1.5 bg-white/10 backdrop-blur-sm rounded-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
              </span>
              <span className="text-white text-[10px] md:text-xs font-medium">
                Online
              </span>
            </div>

            {/* Last Activity */}
            <div className="flex items-center gap-1.5 px-2 md:px-3 py-1 md:py-1.5 bg-white/10 backdrop-blur-sm rounded-lg">
              <FiActivity className="text-white/80 text-xs" />
              <span className="text-white/80 text-[10px] md:text-xs">
                <TimeAgo
                  timestamp={userDetails?.last_logged_in || new Date()}
                />
              </span>
            </div>
          </div>
        </div>

        {/* Right - Image Section */}
        <div className="relative flex items-end h-full max-w-[120px] md:max-w-[160px] lg:max-w-[180px] w-full xl:mt-8">
          {/* Glow effect behind image */}
          <div className="absolute inset-0 bg-gradient-to-t from-ever-green/30 to-transparent rounded-full blur-2xl" />

          <Image
            src="/assets/images/health.png"
            width={280}
            height={200}
            alt="Health Service"
            className="relative w-full h-auto object-contain drop-shadow-lg"
            style={{
              maxWidth: "100%",
              height: "auto",
              objectFit: "contain",
            }}
            priority
          />

          {/* Floating badge */}
          <div className="absolute -top-1 -right-1 md:top-0 md:right-0 flex items-center gap-1 px-2 py-1 bg-amber-400 rounded-full shadow-lg animate-bounce">
            <FiStar className="text-white text-[10px]" />
            <span className="text-white text-[8px] md:text-[10px] font-bold">
              PRO
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsCard;
