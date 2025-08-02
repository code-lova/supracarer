"use client";
import React from "react";
import Link from "next/link";
import { FaUserAlt, FaBell } from "react-icons/fa";

const NavigationBar = () => {
  return (
    <>
      <header className="hidden md:flex fixed z-30 bg-white md:w-full shadow-md lg:shadow-[0_-2px_4px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.1)] rounded-md justify-end items-center gap-4 py-4 pr-10">
        <Link href="/notifications">
          <FaBell className="text-light-slate cursor-pointer" size={30} />
        </Link>
        <div className="bg-red-500 w-5 h-5 rounded-full mt-[-20px] ml-[-28px]">
          <p className="text-white text-center font-bold text-sm">1</p>
        </div>
        <div className="w-[30px] h-[30px] rounded-full bg-carer-blue">
          <Link href="/health-service/settings">
            <FaUserAlt className="text-light-slate cursor-pointer" size={30}/>
          </Link>
        </div>
      </header>
    </>
  );
};

export default NavigationBar;
