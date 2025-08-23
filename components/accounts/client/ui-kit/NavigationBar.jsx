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
      <header className="hidden md:flex fixed z-30 bg-white md:w-full shadow-md rounded-md justify-between items-center gap-4 py-4 pr-10">
        {/* Show warning if address is missing */}
        {!userDetails?.address && (
          <div className="flex items-center space-x-1 rounded ml-[300px]">
            <PiWarningFill className="text-yellow-500" size={25} />
            <p className="text-[16px] text-yellow-600 font-semibold">
              Please Update your profile for better experience
            </p>
          </div>
        )}

        <div className="flex items-center justify-between space-x-3 ml-auto">
          <Link href="/notifications">
            <div className="relative cursor-pointer">
              <FaBell className="text-carer-blue" size={25} />
              <div className="absolute -top-1 -right-1 bg-red-500 w-4 h-4 rounded-full flex items-center justify-center">
                <p className="text-white text-xs font-bold">1</p>
              </div>
            </div>
          </Link>

          <Link href="/client/profile">
            <FaUserAlt className="text-carer-blue cursor-pointer" size={25} />
          </Link>
        </div>
      </header>
    </>
  );
};

export default NavigationBar;
