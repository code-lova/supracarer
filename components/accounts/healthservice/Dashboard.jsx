"use client";
import React from "react";
import DetailsCard from "./dashboard-kits/DetailsCard";
import CalenderCard from "./dashboard-kits/CalenderCard";
import ProfileCard from "./dashboard-kits/ProfileCard";
import QuickStatsCard from "./dashboard-kits/QuickStatsCard";
import RecentAppointmentsCard from "./dashboard-kits/RecentAppointmentCard";
import ServiceFlyerSlider from "./dashboard-kits/ServiceFlyerSlider";

const Dashboard = () => {
  return (
    <div className="w-full pb-6">
      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-5">
        <div className="xl:col-span-2 space-y-4 ">
          <DetailsCard />
          <div className="xl:hidden">
            <ServiceFlyerSlider />
          </div>

          {/* Quick Stats + Recent Appointments Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <QuickStatsCard />
            <RecentAppointmentsCard />
          </div>
          <div className="w-full hidden md:block">
            <CalenderCard />
          </div>
        </div>

        {/* Right Sidebar (1/3 Width on xl) */}
        <div className="space-y-4">
          <ProfileCard />
          <div className="w-full md:hidden">
            <CalenderCard />
          </div>

          {/* Service Flyer - Show in sidebar on xl screens */}
          <div className="hidden xl:block">
            <ServiceFlyerSlider />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
