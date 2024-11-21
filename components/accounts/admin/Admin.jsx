"use client"
import React from "react";
import AdminAside from "./AdminAside";
import AdminHeader from "./AdminHeader";
import Image from "next/image";
import Link from "next/link";

const Admin = () => {
  return (
    <div>
      <AdminAside />
      <AdminHeader />
      <div className="lg:ml-[300px]">
        <section className="px-20 flex flex-col md:flex-row justify-between items-center border-2 lg:w-[1000px] h-20 md:my-10 mt-[100px] rounded-full">
          <h2 className=" lg:text-3xl mt-6 md:mt-0 text-2xl text-center font-bold text-cyan-400">
            Welcome to Supracarer
          </h2>
          <div className="hidden md:flex items-center gap-4">
            <Image
              src={"/assets/icons/icons8-alarm-clock-64.png"}
              width={50}
              height={70}
              alt="menu"
            />
            <div>
              <h2 className="text-2xl font-bold text-cyan-400">Reminder</h2>
              <p>Take Medications</p>
            </div>
          </div>
          <div className="md:hidden flex items-center gap-4 border-2 rounded-full h-20 w-[250px] py-8 px-4 my-12">
            <Image
              src={"/assets/icons/icons8-alarm-clock-64.png"}
              width={50}
              height={70}
              alt="menu"
            />
            <div>
              <h2 className="text-xl font-bold text-cyan-400">Reminder</h2>
              <p>Take Medications</p>
            </div>
          </div>
        </section>
        <div className="flex gap-10">
          <div className="w-[500px] h-[100px] shadow-lg rounded-lg bg-blue-400 flex justify-between items-center p-6">
            <h2 className="text-2xl font-bold text-white">Total Patients</h2>
            <h2 className="text-xl font-bold">24</h2>
          </div>
          <div className="w-[500px] h-[100px] shadow-lg rounded-lg bg-blue-400 flex justify-between items-center p-6">
          <h2 className="text-2xl font-bold text-white">Total Clients</h2>
          <h2 className="text-xl font-bold">24</h2>
          </div>
        </div>
        <div className="mt-28 md:mt-0 container md:px-20 lg:p-6 overflow-x-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-pink-400 w-full text-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center">
                <h2 className="hover:underline text-2xl font-semibold">
                  Appointment Schedule
                </h2>
                <button className="rounded-xl p-3 bg-cyan-400 text-sm font-semibold">
                  <Link href="/messages">More</Link>
                </button>
              </div>
              <div className="mt-5 flex flex-col gap-6">
                <div>
                  <p className="text-2xl">
                    <span className="pr-5 text-2xl">&#128980;</span>Omale Victor
                  </p>
                  <p className="pl-10 font-semibold text-cyan-400">
                    27 July, 14:33
                  </p>
                </div>
                <div>
                  <p className="text-2xl">
                    <span className="pr-5 text-2xl">&#128980;</span>Omale Victor
                  </p>
                  <p className="pl-10 font-semibold text-cyan-400">
                    27 July, 14:33
                  </p>
                </div>
                <div>
                  <p className="text-2xl">
                    <span className="pr-5 text-2xl">&#128980;</span>Omale Victor
                  </p>
                  <p className="pl-10 font-semibold text-cyan-400">
                    27 July, 14:33
                  </p>
                </div>
                <div>
                  <p className="text-2xl">
                    <span className="pr-5 text-2xl">&#128980;</span>Omale Victor
                  </p>
                  <p className="pl-10 font-semibold text-cyan-400">
                    27 July, 14:33
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-pink-400 w-full text-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center">
                <h2 className="hover:underline text-2xl font-semibold">
                  Notifications
                </h2>
                <button className="rounded-xl p-3 bg-cyan-400 text-sm font-semibold">
                  <Link href="/notifications">More</Link>
                </button>
              </div>
              <div className="mt-5 flex flex-col gap-6">
                <div>
                  <p className="text-2xl">
                    <span className="pr-5 text-2xl">&#128980;</span>Take your
                    medications
                  </p>
                  <p className="pl-10 font-semibold text-cyan-400">
                    27 July, 14:33
                  </p>
                </div>
                <div>
                  <p className="text-2xl">
                    <span className="pr-5 text-2xl">&#128980;</span>Take your
                    medications
                  </p>
                  <p className="pl-10 font-semibold text-cyan-400">
                    27 July, 14:33
                  </p>
                </div>
                <div>
                  <p className="text-2xl">
                    <span className="pr-5 text-2xl">&#128980;</span>Take your
                    medications
                  </p>
                  <p className="pl-10 font-semibold text-cyan-400">
                    27 July, 14:33
                  </p>
                </div>
                <div>
                  <p className="text-2xl">
                    <span className="pr-5 text-2xl">&#128980;</span>Take your
                    medications
                  </p>
                  <p className="pl-10 font-semibold text-cyan-400">
                    27 July, 14:33
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
