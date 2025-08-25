"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { logoutRequest } from "@/service/request/auth/logoutRequest";
import { signOut as nextAuthSignOut } from "next-auth/react";
import { clientDashboardLinks } from "@constants/index";
import { FaSignOutAlt } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useUserContext } from "@/context/userContext";
import { FaAlignRight } from "react-icons/fa6";
import { RiCloseLargeFill } from "react-icons/ri";
import { FaBell } from "react-icons/fa";

const Sidebar = () => {
  const [toggle, setToggle] = useState(false);
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const { setUser } = useUserContext();

  const toggleDrawer = () => setToggle(!toggle);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoutRequest();
    } catch (e) {
      // Optionally handle error, but proceed with sign out regardless
    }
    await nextAuthSignOut({ callbackUrl: "/signin", redirect: true });
    queryClient.clear();
    setUser(null);
  };

  return (
    <div>
      <aside className="bg-white fixed shadow-md lg:shadow-xl rounded-md md:rounded-xl z-50 top-0 left-0 w-full lg:px-2  lg:py-6 lg:w-[270px] lg:h-full lg:fixed lg:text-haven-blue">
        <div className="flex justify-between items-center mt-4 lg:flex-col lg:items-start lg:-mt-1">
          <Link href="/health-service">
            <Image
              src="/assets/images/logo.png"
              width={180}
              height={50}
              alt="Supracarer logo"
              className="mx-auto px-4"
            />
          </Link>
          <div className="hidden xl:block w-full bg-gray-200 h-[2px] font-bold mt-2"></div>
          <div className="flex justify-between space-x-6 items-center lg:hidden mr-3">
            <div className="relative">
              <Link href="/health-service/profile">
                <FaBell
                  className="text-carer-blue cursor-pointer"
                  size={27}
                />
              </Link>
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                4
              </span>
            </div>
            {/* ☰ Hamburger menu */}
            <div
              className="cursor-pointer lg:hidden"
              onClick={() => setToggle(!toggle)}
            >
              {toggle ? (
                <RiCloseLargeFill
                  className="text-carer-blue cursor-pointer font-semibold"
                  size={30}
                />
              ) : (
                <FaAlignRight
                  className="text-carer-blue cursor-pointer"
                  size={27}
                />
              )}
            </div>
          </div>
        </div>

        <ul
          className={`${
            toggle ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } bg-mobile-nav transition-all duration-300 overflow-hidden`}
        >
          {Array.isArray(clientDashboardLinks) &&
            clientDashboardLinks.map((nav) => {
              const Icon = nav.icon;
              const isActive = pathname === nav.link;

              return (
                <li key={nav.id} className="mt-1">
                  <Link
                    href={nav.link}
                    onClick={toggleDrawer}
                    className={`flex items-center gap-2 py-3 px-3 font-semibold text-[15px] transition-colors duration-300 w-full
                    ${isActive ? "text-carer-blue" : "text-slate-gray hover:text-dark-gray-blue transitioning"}`}
                  >
                    {/* Icon - increased size, padded, and styled when active */}
                    <Icon
                      className={`text-2xl md:text-3xl p-1 transition-all duration-300
                      ${
                        isActive
                          ? "bg-carer-blue rounded-md text-white"
                          : "bg-transparent"
                      }`}
                    />
                    <span>{nav.title}</span>
                  </Link>
                </li>
              );
          })}

          {/* Logout Item */}
          <li
            className={`flex items-center gap-3 text-[15px] font-semibold py-3 px-4 cursor-pointer
            ${loading ? "opacity-50 pointer-events-none" : ""} text-slate-gray`}
            onClick={handleLogout}
          >
            {/* Logout Icon - larger size for consistency */}
            <FaSignOutAlt className="text-xl" />
            {loading ? "Logging Out..." : "Logout"}
          </li>
        </ul>

        <div className="mt-16 hidden lg:flex flex-col items-center bg-gradient-to-br from-teal-100/20 via-blue-100/20 to-transparent z-0 w-full h-[200px] rounded-xl p-4 text-gray-500 text-sm font-semibold">
          <p className="text-carer-blue font-bold">SupraBot Coming Soon...</p>
          <Image
            src="/assets/images/bot.webp"
            width={200}
            height={200}
            alt="suprabot"
            className=" object-contain -mt-3"
          />
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
