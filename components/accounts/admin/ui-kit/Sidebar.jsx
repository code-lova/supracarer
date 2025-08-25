import React, { useState } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import {
  FaTachometerAlt,
  FaUsers,
  FaUserCircle,
  FaCog,
  FaCalendarCheck,
  FaHourglassHalf,
  FaTrashAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { logoutRequest } from "@/service/request/auth/logoutRequest";
import { signOut as nextAuthSignOut } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { useUserContext } from "@/context/userContext";

const links = [
  {
    name: "Dashboard",
    icon: <FaTachometerAlt size={20} />,
    href: "/admin",
  },
  {
    name: "Users",
    icon: <FaUsers size={20} />,
    href: "/admin/users",
  },
  {
    name: "Booking Requests",
    icon: <FaCalendarCheck size={20} />,
    href: "/admin/booking-requests",
  },
  {
    name: "Appointments",
    icon: <FaHourglassHalf size={20} />,
    href: "/admin/processing-request",
  },
  {
    name: "Profile",
    icon: <FaUserCircle size={20} />,
    href: "/admin/profile",
  },
  {
    name: "Settings",
    icon: <FaCog size={20} />,
    href: "/admin/settings",
  },
  {
    name: "Deleted Accounts",
    icon: <FaTrashAlt size={20} />,
    href: "/admin/deleted-accounts",
  },
];

export default function Sidebar({ open, onClose }) {
  const currentPath = usePathname();
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const { setUser } = useUserContext();

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
    <aside
      className={clsx(
        "fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transition-transform duration-300 flex flex-col",
        open ? "translate-x-0" : "-translate-x-full",
        "md:static md:translate-x-0 md:h-auto md:w-56 md:shadow-none"
      )}
    >
      {/* Logo placeholder */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-100">
        <Link href="/admin">
          <Image
            src="/assets/images/logo.png"
            width={180}
            height={50}
            alt="Supracarer logo"
            className="mx-auto px-4"
          />
        </Link>
      </div>
      {/* Mobile close button */}
      <div className="flex items-center justify-between text-haven-blue p-4 md:hidden">
        <span className="font-bold text-lg">Administrator</span>
        <button
          onClick={onClose}
          aria-label="Close sidebar"
          className="font-bold"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="6" y1="18" x2="18" y2="6" />
          </svg>
        </button>
      </div>
      <nav className="mt-2 flex-1">
        <ul>
          {links.map((link) => {
            const isActive = currentPath === link.href;
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={clsx(
                    "flex items-center font-semibold gap-3 px-6 py-4",
                    isActive
                      ? "bg-haven-blue text-white cursor-default"
                      : "text-haven-blue hover:bg-gray-100 cursor-pointer"
                  )}
                  scroll={false}
                  tabIndex={isActive ? -1 : 0}
                  aria-disabled={isActive}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      {/* Logout at bottom */}
      <div className="px-6 py-4 border-t border-gray-100 mt-auto">
        <button
          className={`flex items-center gap-3 text-danger-red hover:text-red-800 w-full ${
            loading ? "opacity-50 pointer-events-none" : ""
          } text-slate-gray2`}
          onClick={handleLogout}

        >
          <FaSignOutAlt size={20} />
          <span>{loading ? "Logging Out..." : "Logout"}</span>
        </button>
      </div>
    </aside>
  );
}
