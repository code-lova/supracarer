"use client";
import React from "react";
import Link from "next/link";
import { FaUserAlt, FaBell } from "react-icons/fa";
import { PiWarningFill } from "react-icons/pi";
import { useUserContext } from "@context/userContext";

const NavigationBar = () => {
  const { user } = useUserContext();

  const userDetails = user?.data;
  return (
    <>
      <header className="hidden md:flex fixed z-30 bg-white md:w-full shadow-md lg:shadow-md rounded-md justify-between items-center gap-4 py-4 pr-10">
        {userDetails?.address === null && (
          <div className="flex item-center space-x-1  rounded ml-[300px]">
            <PiWarningFill className="text-yellow-500" size={25} />
            <p className="text-[16px] text-yellow-600 font-seminbold">
              Please Update your profile for better experience
            </p>
          </div>
        )}
        <div className="flex items-center justify-between space-x-3">
          <Link href="/notifications">
            <div className="relative cursor-pointer">
              <FaBell className="text-dark-blue" size={30} />
              <div className="absolute -top-1 -right-1 bg-red-500 w-5 h-5 rounded-full flex items-center justify-center">
                <p className="text-white text-xs font-bold">1</p>
              </div>
            </div>
          </Link>

          <Link href="/health-service/profile">
            <FaUserAlt className="text-dark-blue cursor-pointer" size={30} />
          </Link>
        </div>
      </header>
    </>
  );
};

export default NavigationBar;
