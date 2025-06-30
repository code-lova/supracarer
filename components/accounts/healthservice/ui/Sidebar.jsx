"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HealthDashboardLinks } from "@constants/index";
import { FaSignOutAlt } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  const toggleDrawer = () => setToggle(!toggle);

  const handleRedirectToLogout = () => {
    setLoading(true);
    router.push("/auth-logout");
  };

  return (
    <div>
      <aside className="bg-white fixed shadow-xl z-50 top-0 left-0 w-full px-2 lg:px-2 lg:py-6 lg:w-[250px] lg:h-screen lg:fixed lg:left-0 lg:top-0 md:bg-white lg:text-haven-blue">
        <div className="flex justify-between items-center mt-3 lg:flex-col lg:items-start lg:-mt-1">
          <Link href="/health-service">
            <Image
              src="/assets/images/logo.png"
              width={180}
              height={50}
              alt="Supracarer logo"
              className="mx-auto"
            />
          </Link>
          <div className="flex lg:hidden">
            <Link href="/health-service/profile">
              <Image
                src={"/assets/icons/icons8-user-48.png"}
                width={40}
                height={50}
                alt="menu"
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
        </div>

        <ul
          className={`${
            toggle ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } bg-mobile-nav`}
        >
          {HealthDashboardLinks.map((nav) => {
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
                <Link href={nav.link} onClick={toggleDrawer} className="w-full">
                  {nav.title}
                </Link>
              </li>
            );
          })}

          <li
            className={`flex items-center gap-2 font-semibold py-4 px-4 cursor-pointer ${
              loading ? "opacity-50 pointer-events-none" : ""
            } text-tranquil-teal`}
            onClick={handleRedirectToLogout}
          >
            <FaSignOutAlt className="text-lg" />
            {loading ? "Logging Out..." : "Logout"}
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
