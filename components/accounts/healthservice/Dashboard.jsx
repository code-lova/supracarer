"use client";
import React from "react";
import DetailsCard from "./dashboard-kits/DetailsCard";
import CalenderCard from "./dashboard-kits/CalenderCard";
import ProfileCard from "./dashboard-kits/ProfileCard";
import ActivityStatCard from "./dashboard-kits/ActivityStatCard";

const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full mb-6">
        <div className="w-full h-auto md:h-[660px] md:col-span-2">
          <div className="grid grid-col-1 gap-4 mb-1">
            <DetailsCard />

            {/* three small boxes */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="bg-white w-full h-[100px] border-2 rounded-2xl shadow-md"></div>
              <div className="bg-white w-full h-[100px] border-2 rounded-2xl shadow-md"></div>

              <div className="bg-white w-full h-[100px] border-2 rounded-2xl shadow-md"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* this is for the piechart chart */}
              <ActivityStatCard />

              {/* placeholder to see 3 list of patients/clients appointments */}
              <div className="bg-white w-full h-[263px] border-2 rounded-2xl shadow-md"></div>
            </div>
          </div>
        </div>

        <div className="w-full h-auto md:h-[660px]">
          <div className="grid grid-col-1 gap-4 px-1">
            <ProfileCard />

            <CalenderCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
