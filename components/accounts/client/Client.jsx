"use client";
import React, { useState } from "react";
import { historyData } from "@constants/index";
import Link from "next/link";
import Image from "next/image";
import UpdateModal from "./UpdateModal";
import HistoryModal from "./HistoryModal";
import Header from "./Header";
import Aside from "./Aside";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import LoadingStateUI from "@components/core/loading";
import { getUserRequest } from "@service/request/user/getUserRequest";
import DashboardSkeletonLoader from "@components/core/skeleton/dashboard/DashboardSkeletonLoader";

const Client = () => {
  const { data: status } = useSession();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  // Fetch user details
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUserRequest,
    refetchOnWindowFocus: false,
  });
  const user = data?.data;

  if (status === "loading") {
    return <LoadingStateUI label="Redirecting you in a sec" />;
  }

  return (
    <div>
      <Aside />
      <Header />
      <div className="lg:ml-[300px]">
        <section className="px-18 md:px-20 flex flex-col md:flex-row justify-between items-center border-2 lg:w-[1000px] h-20 md:my-10 mt-[100px] rounded-full">
          {isLoading ? (
            <DashboardSkeletonLoader />
          ) : (
            <>
              <h2 className="lg:text-3xl mt-6 md:mt-0 text-2xl text-center font-bold text-cyan-400">
                Hi, {user?.fullname || "User"}
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
            </>
          )}
        </section>
        <div className="mt-28 md:mt-0 container md:px-20 lg:p-6 overflow-x-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="mx-10 md:mx-0 grid grid-cols-1 gap-6 md:grid-cols-2 md:col-span-1">
              <div className="bg-gray-100 md:p-3 px-5 pt-5 rounded-lg md:w-[250px] h-[280px] shadow-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-cyan-400">
                      Blood Pressure
                    </h3>
                    <p className="text-sm pt-2">In the normal</p>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-green-400">180/90</h2>
                    <p>mmHG</p>
                  </div>
                </div>
                <div className="flex items-center justify-center pt-[20px]">
                  <Image
                    src={"/assets/images/icons8-chart-60.png"}
                    width={100}
                    height={70}
                    alt="menu"
                  />
                </div>
                <div className="pt-4 flex justify-between items-start">
                  <div>
                    <button
                      onClick={() => setIsHistoryModalOpen(true)}
                      className="login-btn text-sm font-bold"
                    >
                      History
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => setIsUpdateModalOpen(true)}
                      className="login-btn text-sm font-bold"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
              <div className="md:ml-[60px] lg:ml-[120px] bg-gray-100 md:p-3 px-5 pt-5 rounded-lg md:w-[250px] h-[280px] shadow-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-cyan-400">
                      Heart Rate
                    </h3>
                    <p className="text-sm pt-2">Above the normal</p>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-green-400">180</h2>
                    <p>Per min</p>
                  </div>
                </div>
                <div className="flex items-center justify-center pt-[25px]">
                  <Image
                    src={"/assets/images/icons8-chart-60.png"}
                    width={100}
                    height={70}
                    alt="menu"
                  />
                </div>
                <div className="pt-4 flex justify-between items-start">
                  <div>
                    <button
                      onClick={() => setIsHistoryModalOpen(true)}
                      className="login-btn text-sm font-bold"
                    >
                      History
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => setIsUpdateModalOpen(true)}
                      className="login-btn text-sm font-bold"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 md:p-3 px-5 pt-5 rounded-lg md:w-[250px] h-[280px] shadow-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-cyan-400">
                      Glucose Rate
                    </h3>
                    <p className="text-sm pt-2">In the normal</p>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-green-400">180/90</h2>
                    <p>mg/dl</p>
                  </div>
                </div>
                <div className="flex items-center justify-center pt-[25px]">
                  <Image
                    src={"/assets/images/icons8-chart-60.png"}
                    width={100}
                    height={70}
                    alt="menu"
                  />
                </div>
                <div className="pt-4 flex justify-between items-start">
                  <div>
                    <button
                      onClick={() => setIsHistoryModalOpen(true)}
                      className="login-btn text-sm font-bold"
                    >
                      History
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => setIsUpdateModalOpen(true)}
                      className="login-btn text-sm font-bold"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 md:ml-[60px] lg:ml-[120px] md:p-3 px-5 pt-5 rounded-lg md:w-[250px] h-[280px] shadow-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-cyan-400">
                      Cholesterol
                    </h3>
                    <p className="text-sm pt-2">In the normal</p>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-green-400">180/90</h2>
                    <p>mg/dl</p>
                  </div>
                </div>
                <div className="flex items-center justify-center pt-[25px]">
                  <Image
                    src={"/assets/images/icons8-chart-60.png"}
                    width={100}
                    height={70}
                    alt="menu"
                  />
                </div>
                <div className="pt-4 flex justify-between items-start">
                  <div>
                    <button
                      onClick={() => setIsHistoryModalOpen(true)}
                      className="login-btn text-sm font-bold"
                    >
                      History
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => setIsUpdateModalOpen(true)}
                      className="login-btn text-sm font-bold"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-2 bg-pink-400 lg:ml-[250px] w-full lg:w-[380px] text-white p-6 rounded-lg shadow-lg">
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
      <UpdateModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
      />
      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        data={historyData}
      />
    </div>
  );
};

export default Client;
