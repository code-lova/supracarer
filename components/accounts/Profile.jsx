"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { DashboardLinks } from "@constants/index";
import Aside from "./Aside";

const Profile = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      <Aside />
      <div className="md:ml-[200px]">
        <div className="h-[300px] w-full bg-cyan-600">
          <div className="flex justify-center items-center md:w-[220px] md:h-[220px] w-[100px] h-[100px] rounded-full border-4 border-gray-900 bg-gray-400 absolute md:top-[200px] md:left-[700px] top-[250px] left-[130px]">
            <Image
              src={"/assets/icons/icons8-user-48.png"}
              width={200}
              height={200}
              alt="menu"
            />
          </div>
        </div>
        <div className="h-[400px] w-[300px] md:w-[700px] bg-pink-300 ml-10 md:ml-[250px] flex flex-col justify-center items-center px-10 text-center">
          <h2 className="text-3xl text-white font-bold pt-0 md:pt-10 pb-2">
            Victor Omale
          </h2>
          <p className="text-white"><Image
              src={"/assets/icons/icons8-phone-48.png"}
              width={30}
              height={30}
              alt="menu"
              className="inline-block pr-3"
            />
            +233 345 345 345</p>
          <p className="text-white">
            <Image
              src={"/assets/icons/icons8-envelope-48.png"}
              width={30}
              height={30}
              alt="menu"
              className="inline-block pr-3"
            />
            victor@supracarer.com</p>
          <p className="text-white">
            <Image
              src={"/assets/icons/icons8-place-marker-50.png"}
              width={30}
              height={30}
              alt="menu"
              className="inline-block pr-3"
            />
            359, St Mary's Road, Accra, Ghana</p>
          <p className="text-white md:pt-5 pt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
            minus odit quia quis tempore dolorem, voluptatem quae inventore
            vitae ea
          </p>
        </div>
        <div className="mt-[-50px] container p-6 overflow-x-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:ml-[300px] ml-9 grid grid-cols-2 md:gap-40 gap-6 md:grid-cols-4 md:col-span-1">
              <div className="bg-gray-100 p-3 rounded-lg shadow-lg w-[100px] flex justify-center flex-col items-center">
                <h3 className="text-xl font-bold text-cyan-400">Gender</h3>
                <p className="text-sm pt-2">Male</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg shadow-lg w-[100px] flex justify-center flex-col items-center">
                <h3 className="text-xl font-bold text-cyan-400">Age</h3>
                <p className="text-sm pt-2">25 years</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg shadow-lg w-[100px] flex justify-center flex-col items-center">
                <h3 className="text-xl font-bold text-cyan-400">Weight</h3>
                <p className="text-sm pt-2">65kg</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg shadow-lg w-[100px] flex justify-center flex-col items-center">
                <h3 className="text-xl font-bold text-cyan-400">Height</h3>
                <p className="text-sm pt-2">160cm</p>
              </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
