"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const NurseHeader = () => {
    const [active, setActive] = useState("");
    const [toggle, setToggle] = useState(false);
  return (
    <div>
      <header className="hidden w-full md:flex justify-end items-center gap-4 bg-blue-400 py-6 pr-10">
        {/* <Link href="/messages">
          <Image
            src={"/assets/icons/icons8-envelope-48.png"}
            width={30}
            height={40}
            alt="menu"
          />
        </Link>
        <div className="bg-red-500 w-5 h-5 rounded-full mt-[-20px] ml-[-28px]">
          <p className="text-white text-center font-bold text-sm">1</p>
        </div> */}
        <Link href="/notifications">
          <Image
            src={"/assets/icons/icons8-bell-48.png"}
            width={30}
            height={40}
            alt="menu"
          />
        </Link>
        <div className="bg-red-500 w-5 h-5 rounded-full mt-[-20px] ml-[-28px]">
          <p className="text-white text-center font-bold text-sm">1</p>
        </div>
        <div className="w-[30px] h-[30px] rounded-full bg-white">
          <Link href="/nurse/profile">
            <Image
              src={"/assets/icons/icons8-user-48.png"}
              width={30}
              height={40}
              alt="menu"
            />
          </Link>
        </div>
      </header>
    </div>
  );
};

export default NurseHeader;
