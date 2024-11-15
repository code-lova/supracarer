"use client";
import React, { useState, useEffect } from "react";
import { DashboardLinks } from "@constants/index";
import Link from "next/link";
import Image from "next/image";
import useUser from "@hooks/useUser";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { logoutRequest } from "@service/request/auth/logoutRequest";
import { queryClient } from "@config/ReactQueryProvider";

const Client = () => {

  const { user, refetch, isLoading } = useUser();
  const navigate = useRouter();

  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);


  const { mutate:signOut } = useMutation({
    mutationFn: logoutRequest,
    onSettled: () => {
      queryClient.clear();
      navigate.push("/signin", { replace: true })
    }

  });

  // Refetch user if user data is null
  useEffect(() => {
    if (!user && !isLoading) {
      refetch();
    }
  }, [user, isLoading, refetch]);



   // Handle navigation when user data is null after refetch
   useEffect(() => {
    if (!isLoading && !user) {
      navigate.push("/signin");
    }
  }, [user, isLoading, navigate]);

  // Show a loading indicator if data is loading
  if (isLoading) return <p>Loading...</p>;

  // Ensure user is valid before rendering the dashboard
  if (!user) return null;

  const { fullname, email, createdAt } = user;

 

  return (
    <div>
      <aside className="bg-gray-800 fixed shadow-2xl z-50 top-0 left-0 w-full px-2 lg:px-2 lg:py-6 lg:w-[250px] lg:h-screen lg:fixed lg:left-0 lg:top-0 lg:bg-gray-800 lg:text-white">
        <div className="flex justify-between items-center mt-3 lg:flex-col lg:items-start lg:pt-4">
          <Link
            href="/"
            onClick={() => {
              setActive("");
              window.scrollTo(0, 0);
            }}
          >
            <Image
              src="/assets/images/logo.png"
              width={180}
              height={50}
              alt="Supracarer logo"
              className="mx-auto"
            />
          </Link>
          <Image
            className="cursor-pointer lg:hidden"
            src={
              toggle ? "/assets/images/close.svg" : "/assets/images/menu.svg"
            }
            width={40}
            height={50}
            alt="menu"
            onClick={() => setToggle(!toggle)}
          />
        </div>

        <ul
          className={`${
            toggle ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } bg-mobile-nav`}
        >
          {DashboardLinks.map((nav) => (
            <li
              key={nav.id}
              className="text-white hover:underline py-2 hover:lg:text-white lg:transitioning lg:py-4 font-light text-[15px]"
              onClick={() => setActive(nav.title)}
            >
              {nav.id === "signout" ? (
                <button onClick={signOut} className="text-white hover:underline">
                {nav.title}
              </button>
              ): (
                <Link href={nav.link}>{nav.title}</Link>
              )}
            </li>
          ))}
        </ul>
      </aside>
      <header className="hidden w-full md:flex justify-end items-center gap-4 bg-blue-400 py-6 pr-10">
        <Link href="/messages">
          <Image
            src={"/assets/icons/icons8-envelope-48.png"}
            width={30}
            height={40}
            alt="menu"
          />
        </Link>
        <div className="bg-red-500 w-5 h-5 rounded-full mt-[-20px] ml-[-28px]">
          <p className="text-white text-center font-bold text-sm">1</p>
        </div>
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
          <Link href="/profile">
            <Image
              src={"/assets/icons/icons8-user-48.png"}
              width={30}
              height={40}
              alt="menu"
            />
          </Link>
        </div>
      </header>
      <div className="lg:ml-[300px]">
        <section className="px-20 flex flex-col md:flex-row justify-between items-center border-2 lg:w-[1000px] h-20 md:my-10 mt-[100px] rounded-full">
          <h2 className=" lg:text-3xl mt-6 md:mt-0 text-2xl text-center font-bold text-cyan-400">
            Hi, {fullname}
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
        <div className="mt-28 md:mt-0 container md:px-20 lg:p-6 overflow-x-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="mx-10 md:mx-0 grid grid-cols-1 gap-6 md:grid-cols-2 md:col-span-1">
              <div className="bg-gray-100 md:p-3 px-5 pt-5 rounded-lg md:w-[250px] h-[200px] shadow-lg">
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
                <div className="flex items-center justify-center pt-[25px]">
                  <Image
                    src={"/assets/images/icons8-chart-60.png"}
                    width={100}
                    height={70}
                    alt="menu"
                  />
                </div>
              </div>
              <div className="md:ml-[60px] lg:ml-[120px] bg-gray-100 md:p-3 px-5 pt-5 rounded-lg md:w-[250px] h-[200px] shadow-lg">
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
              </div>
              <div className="bg-gray-100 md:p-3 px-5 pt-5 rounded-lg md:w-[250px] h-[200px] shadow-lg">
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
              </div>
              <div className="bg-gray-100 md:ml-[60px] lg:ml-[120px] md:p-3 px-5 pt-5 rounded-lg md:w-[250px] h-[200px] shadow-lg">
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
    </div>
  );
};

export default Client;
