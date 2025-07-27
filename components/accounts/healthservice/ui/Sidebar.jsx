"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { logoutRequest } from "@/service/request/auth/logoutRequest";
import { signOut as nextAuthSignOut } from "next-auth/react";
import { HealthDashboardLinks } from "@constants/index";
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
      <aside className="bg-white fixed shadow-md lg:shadow-[0_-2px_4px_rgba(0,0,0,0.1),0_2px_3px_rgba(0,0,0,0.1)] rounded-xl md:rounded-3xl z-50 top-0 left-0 w-full px-2 lg:px-2  lg:py-6 lg:w-[270px] lg:h-[758px] lg:fixed lg:left-2 lg:top-2 lg:text-haven-blue">
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
          <div className="flex justify-between space-x-6 items-center lg:hidden mr-3">
            <div className="relative">
              <Link href="/health-service/profile">
                <FaBell
                  className="text-tranquil-teal cursor-pointer"
                  size={27}
                />
              </Link>
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </div>
            {/* ☰ Hamburger menu */}
            <div
              className="cursor-pointer lg:hidden"
              onClick={() => setToggle(!toggle)}
            >
              {toggle ? (
                <RiCloseLargeFill
                  className="text-tranquil-teal cursor-pointer font-semibold"
                  size={30}
                />
              ) : (
                <FaAlignRight
                  className="text-tranquil-teal cursor-pointer"
                  size={27}
                />
              )}
            </div>
          </div>
        </div>

        <ul
          className={`${
            toggle ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } bg-mobile-nav`}
        >
          {Array.isArray(HealthDashboardLinks) &&
            HealthDashboardLinks.map((nav) => {
              const Icon = nav.icon;
              const isActive = pathname === nav.link;

              return (
                <li
                  key={nav.id}
                  className={`flex items-center gap-2 py-3 lg:py-3 font-semibold text-[15px] transition-colors duration-300 px-4 rounded-full cursor-pointer
                ${
                  isActive
                    ? "bg-tranquil-teal text-white"
                    : "text-tranquil-teal md:hover:bg-gray-100 mt-1"
                }`}
                >
                  <Icon className="text-lg md:text-3xl" />
                  <Link
                    href={nav.link}
                    onClick={toggleDrawer}
                    className="w-full"
                  >
                    {nav.title}
                  </Link>
                </li>
              );
            })}

          <li
            className={`flex items-center gap-2 font-semibold py-4 px-4 cursor-pointer ${
              loading ? "opacity-50 pointer-events-none" : ""
            } text-tranquil-teal`}
            onClick={handleLogout}
          >
            <FaSignOutAlt className="text-lg" />
            {loading ? "Logging Out..." : "Logout"}
          </li>
        </ul>

        <div className="mt-10 hidden lg:flex flex-col items-center bg-tranquil-teal/10 w-full h-[200px] rounded-xl p-4 text-gray-500 text-sm font-semibold">
            <p>SupraBot Coming Soon...</p>
            <Image 
              src="/assets/images/bot.webp"
              width={200}
              height={200}
              className=" object-contain -mt-3"
            />
        </div>


      </aside>
    </div>
  );
};

export default Sidebar;
