"use client";
import React from "react";
import { useUserContext } from "@context/userContext";
import Image from "next/image";
import Link from "next/link";
import {
  FaRegCalendarAlt,
  FaMapMarkerAlt,
  FaStar,
  FaCalendarAlt,
  FaRegHeart,
  FaCalendarCheck,
  FaPencilAlt,
} from "react-icons/fa";
import { PiWarningFill } from "react-icons/pi";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useState } from "react";

import { format, parseISO, isValid } from "date-fns";
import TimeAgo from "@components/core/TimeAgo";
import { MdOutlineVerifiedUser } from "react-icons/md";

// Dummy data for now
const sampleChartData = [
  { week: "Week 1", appointments: 2 },
  { week: "Week 2", appointments: 5 },
  { week: "Week 3", appointments: 3 },
  { week: "Week 4", appointments: 7 },
];

const availableNurses = Array.from({ length: 6 }).map((_, index) => ({
  id: index,
  name: `Nurse ${index + 1}`,
  rating: 4.5,
  type: index % 2 === 0 ? "Nurse" : "Doctor",
  location: "Ikeja, Lagos",
  theme: index % 2 === 0 ? "pink" : "blue", // Alternate theme
}));

// Status color styles
const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
  confirmed: "bg-green-100 text-green-700 border-green-300",
  ongoing: "bg-blue-100 text-blue-700 border-blue-300",
};

const Dashboard = () => {
  const { user } = useUserContext();

  const userDetails = user?.data;

  const nextAppointment = [
    {
      id: 1,
      date: "2025-09-02", // should be a valid ISO date string
      time: "10:30 AM",
      status: "Pending",
    },
  ];

  // Filter appointments to exclude ones with status "Done"
  const upcomingAppointments = nextAppointment.filter(
    (appt) => appt.status !== "Done"
  );

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 w-full mb-6 mt-[98px] lg:mt-[80px] px-2">
        {userDetails?.address === null && (
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
            <div className="bg-carer-blue rounded-2xl p-6 shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-[1.02] h-auto md:h-[240px]">
              <div className="flex flex-col md:flex-row item-center justify-between gap-4 h-full">
                {/* Text Section */}
                <div className="flex-1">
                  {userDetails && (
                    <h3 className="text-white font-semibold text-sm md:text-sm">
                      Welcome Back! {userDetails.fullname || "UserName"}
                    </h3>
                  )}
                  <div className="w-[300px] text-white font-bold text-sm lg:text-3xl mt-3">
                    <p>Check Your Health Regularly</p>
                  </div>

                  <Link href="/book-appointment" passHref>
                    <button className="mt-4 flex items-center gap-2 bg-white text-carer-blue font-semibold py-2 px-5 rounded-xl hover:bg-carer-blue hover:text-white transition duration-300 ease-in-out">
                      <span>Book Appointment</span>
                      <FaRegCalendarAlt size={18} className="text-inherit" />
                    </button>
                  </Link>
                </div>

                {/* Image Section */}
                <div className="flex-1 max-w-[180px] md:max-w-[235px] w-full mt-10 lg:mt-4 mx-auto">
                  <Image
                    src="/assets/images/heart.png"
                    width={400}
                    height={240}
                    alt="well-being"
                    className="w-full h-auto object-contain -mt-8"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Two Cards in a Row */}
            <div className="grid grid-col-1 lg:grid-cols-2 gap-2">
              {/* Total appointments */}
              <div className="bg-gradient-to-l from-[#ffe6ec] via-[#fff0f4] to-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-[1.02] w-full h-[160px] flex items-center justify-between">
                {/* Icon Section */}
                <div className="flex items-center justify-center w-[70px] h-[70px] rounded-full bg-[#ffd6e2] shadow-inner border border-pink-100">
                  <FaCalendarCheck size={38} className="text-[#cc3366]" />
                </div>

                {/* Text and Count */}
                <div className="flex flex-col items-end justify-center">
                  <h3 className="text-[#cc3366] font-semibold text-lg">
                    Total Appointments
                  </h3>
                  <p className="text-3xl font-bold text-[#cc3366] mt-1">24 </p>
                  <span className="font-semibold text-[#cc3366] text-xs -mt-2">
                    Bookings
                  </span>
                </div>
              </div>

              {/* Available Nurses */}
              <div className="bg-gradient-to-r from-[#e6f7ff] via-[#f0faff] to-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-[1.02] w-full h-[160px] flex items-center justify-between">
                {/* Text Content */}
                <div className=" w-[210px] lg:w-[260px]">
                  <h3 className="text-carer-blue font-semibold text-lg mb-4">
                    Health Tip of the Day
                  </h3>
                  <p className="text-slate-600 text-sm">
                    💧 Stay hydrated and rest after each appointment booking.!!
                  </p>
                </div>

                {/* Icon Area */}
                <div className="flex items-center justify-center w-[70px] h-[70px] rounded-full bg-white shadow-inner border border-blue-100">
                  <FaRegHeart size={38} className="text-carer-blue" />
                </div>
              </div>
            </div>

            {/* One Cards barchart placeholder */}
            <div className="grid grid-cols-1 md:grid-cols-3">
              {/* Activity Chart/Stats */}
              <div className="md:col-span-3 overflow-y-auto bg-white rounded-2xl py-3 px-3 shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-[1.01] h-[260px]">
                <div className="flex items-center justify-between">
                  <h3 className="text-dark-blue font-semibold text-lg">
                    Monthly Activity
                  </h3>
                  {/* Month Filter */}
                  <select
                    className="border-2 border-slate-gray text-dark-blue font-semibold text-sm rounded-md p-1"
                    onChange={(e) => {
                      // Hook this into real data filter logic later
                      console.log("Selected month:", e.target.value);
                    }}
                  >
                    <option value="july">July 2025</option>
                    <option value="june">June 2025</option>
                    <option value="may">May 2025</option>
                  </select>
                </div>

                <ResponsiveContainer width="100%" height={180} className="mt-4">
                  <BarChart
                    data={sampleChartData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar
                      dataKey="appointments"
                      fill="#3B82F6"
                      radius={[5, 5, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar (1/3 Width) */}
        <div className="w-full h-auto md:h-[660px] mt-6 xl:mt-0">
          <div className="w-full grid grid-cols-1 gap-4">
            {/* Next  appointment */}
            <div className="bg-white w-full rounded-2xl shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-[1.01] h-[280px]">
              <div className="flex items-center justify-between border-b-2 w-full h-[50px] px-4">
                <h3 className="text-dark-blue font-semibold text-lg">
                  My Profile
                </h3>
                <FaPencilAlt
                  className="cursor-pointer text-dark-blue hover:text-carer-blue"
                  size={16}
                />
              </div>
              {/* <div className="w-full h-[1px] bg-gray-200 mt-1 mb-1"></div> */}

              <div className="px-5">
                <div className="px-1 py-1">
                  <div className="w-full flex items-center space-x-4 mb-6">
                    {userDetails?.image_url ? (
                      <img
                        src={userDetails?.image_url}
                        alt="Profile"
                        className="w-20 h-20 rounded-full border-2 border-light-blue-bg"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-carer-blue flex items-center justify-center text-white text-3xl font-bold border-2 border-light-blue-bg">
                        {userDetails?.fullname?.[0]?.toUpperCase() || "U"}
                      </div>
                    )}

                    <div className="w-[200px] space-y-1">
                      <h3 className="text-lg font-semibold text-carer-blue -mt-2 capitalize">
                        {userDetails?.fullname || "UserName"}
                      </h3>

                      <div className="mt-6 flex items-center gap-2 text-slate-gray text-sm">
                        <FaMapMarkerAlt className="text-tranquil-teal" />
                        <span>
                          {userDetails?.region || "Not Set"},{" "}
                          {userDetails?.country}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex item-center justify-between -mt-4">
                    <p className="text-carer-blue text-[10px] md:text-[13px]">
                      Last Activity:
                    </p>
                    <p className="text-xs text-slate-gray font-semibold capitalize">
                      <TimeAgo
                        timestamp={userDetails?.last_logged_in || new Date()}
                      />
                    </p>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-gray-200 mt-2 mb-4"></div>
                <h3 className="text-dark-blue font-semibold text-xs">
                  Next Appointment
                </h3>

                <div className="space-y-3 pr-2 mt-5">
                  {upcomingAppointments.map((appt) => (
                    <div key={appt.id}>
                      {/* Details */}
                      <div className="flex item-center justify-between space-x-3">
                        <div className="flex items-center text-xs text-slate-gray bg-white rounded-md border border-carer-blue px-3 py-1 w-fit">
                          <FaCalendarAlt className="mr-2 text-blue-500" />
                          {isValid(parseISO(appt.date))
                            ? format(parseISO(appt.date), "MMMM d, yyyy")
                            : "Invalid Date"}{" "}
                          – {appt.time}
                        </div>
                        <div>
                          <span
                            className={`text-xs px-3 py-1 rounded-full border font-medium text-slate-gray capitalize ${
                              statusStyles[appt.status]
                            }`}
                          >
                            {appt.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Available Nurses with image, star rating, name, practioner type(doctor/nurse), location(with location icon) */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-[1.01] h-[396px]">
              <div className="flex justify-between items-center border-b-2 w-full h-[50px] px-4">
                <div>
                  <h3 className="text-dark-blue font-semibold text-lg">
                    Our Verified Nurses
                  </h3>
                </div>
                <MdOutlineVerifiedUser
                  size={24}
                  className="text-dark-blue cursor-pointer hover:text-carer-blue"
                />
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 gap-2 h-[299px] w-full overflow-y-auto">
                  {availableNurses.map((nurse) => (
                    <div
                      key={nurse.id}
                      className={`flex items-start gap-4 border-l-4 rounded-md p-4 ${
                        nurse.theme === "pink"
                          ? "bg-light-pink-bg border-dark-pink-border"
                          : "bg-light-blue-bg border-dark-blue-border"
                      }`}
                    >
                      {/* Nurse Image Placeholder */}
                      <div className="w-16 h-16 rounded-md bg-gray-300 flex-shrink-0" />

                      {/* Details */}
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-dark-blue">
                            {nurse.name}
                          </h4>
                          <div className="flex items-center text-yellow-500 text-sm">
                            <FaStar className="mr-1" />
                            {nurse.rating}
                          </div>
                        </div>

                        <p className="text-xs text-slate-gray mt-1">
                          {nurse.type}
                        </p>
                        <div className="flex items-center text-xs text-slate-gray mt-1">
                          <FaMapMarkerAlt className="mr-1" />
                          {nurse.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
