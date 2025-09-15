"use client";
import React from "react";
import DetailsCard from "./dashboard-kits/DetailsCard";
import CalenderCard from "./dashboard-kits/CalenderCard";
import ProfileCard from "./dashboard-kits/ProfileCard";
import ActivityStatCard from "./dashboard-kits/ActivityStatCard";
import AppointmentCard from "./dashboard-kits/AppointmentCard";
import ServiceChargeCard from "./dashboard-kits/ServiceChargeCard";
import RecentAppointmentsCard from "./dashboard-kits/RecentAppointmentCard";
import AppointmentChart from "./dashboard-kits/AppointmentChart";

const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-2 w-full mb-6 mt-[10px]">
        <div className="w-full h-auto md:h-[660px] md:col-span-2">
          <div className="grid grid-col-1 gap-3 mb-1">
            <DetailsCard />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="flex flex-col gap-3 md:col-span-2 ">
                <div className="flex flex-col md:flex-row gap-2 ">
                  <AppointmentCard />

                  <ServiceChargeCard />
                </div>
                <div className="flex flex-col">
                  <AppointmentChart />
                </div>
              </div>

              <div className="flex flex-col gap-3 md:col-span-1">
                <ActivityStatCard />
                <RecentAppointmentsCard />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-auto md:h-[660px] mt-6 xl:mt-0">
          <div className="w-full grid grid-col-1 gap-4 px-0">
            <ProfileCard />

            <CalenderCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
