"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaUserAlt, FaBell } from "react-icons/fa";

const NavigationBar = () => {
  return (
    <div className="w-full pl-[300px] pr-5 fixed top-0 md:top-1 z-50">
      <header className="hidden bg-white shadow-md lg:shadow-[0_-2px_4px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.1)] rounded-3xl lg:flex justify-end items-center gap-4 py-4 pr-10">
        <Link href="/notifications">
          <FaBell className="text-tranquil-teal cursor-pointer" size={30} />
        </Link>
        <div className="bg-red-500 w-5 h-5 rounded-full mt-[-20px] ml-[-28px]">
          <p className="text-white text-center font-bold text-sm">1</p>
        </div>
        <div className="w-[30px] h-[30px] rounded-full bg-white">
          <Link href="/health-service/profile">
            <FaUserAlt className="text-tranquil-teal cursor-pointer" size={30}/>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default NavigationBar;
