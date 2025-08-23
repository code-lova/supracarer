"use client";
import React from "react";
import { useUserContext } from "@context/userContext";
import { PiWarningFill } from "react-icons/pi";
import WelcomeCard from "./dashboardUi-kit/WelcomeCard";
import AppointmentCard from "./dashboardUi-kit/AppointmentCard";
import HealthTipsCard from "./dashboardUi-kit/HealthTipsCard";
import ActivityStatsCard from "./dashboardUi-kit/ActivityStatsCard";
import ProfileCard from "./dashboardUi-kit/ProfileCard";
import AvailablePractioners from "./dashboardUi-kit/AvailablePractioners";

const Dashboard = () => {
  const { user } = useUserContext();
  const userDetails = user?.data;

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 w-full mb-6 mt-[98px] lg:mt-[80px] px-2">
        {!userDetails?.address && (
          <div className="lg:hidden flex item-center space-x-1 bg-yellow-100 px-3 py-2 rounded">
            <PiWarningFill className="text-yellow-600" size={25} />
            <p className="text-[15px] text-yellow-600 font-semibold">
              Please Update your profile for better experience
            </p>
          </div>
        )}

        {/* Left Section (2/3 Width) */}
        <div className="w-full h-auto md:h-[660px] md:col-span-2">
          <div className="grid grid-cols-1 gap-4 mb-1">
            {/* Welcome Card */}
            <WelcomeCard userDetails={userDetails} />

            {/* Two Cards in a Row */}
            <div className="grid grid-col-1 lg:grid-cols-2 gap-2">
              {/* Total appointments */}
              <AppointmentCard />

              {/* Health Tips */}
              <HealthTipsCard />
            </div>

            {/* Activity Chart/Stats card */}
            <div className="grid grid-cols-1 md:grid-cols-3">
              <ActivityStatsCard />
            </div>
          </div>
        </div>

        {/* Right Sidebar (1/3 Width) */}
        <div className="w-full h-auto md:h-[660px] mt-6 xl:mt-0">
          <div className="w-full grid grid-cols-1 gap-4">
            {/* Profile and current appointment card with skeleton loader */}
            <ProfileCard userDetails={userDetails} />

            {/* Available Nurses with image, star rating, name, practioner with skeleton loader */}
            <AvailablePractioners />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
