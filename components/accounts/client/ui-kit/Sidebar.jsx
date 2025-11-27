"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { logoutRequest } from "@/service/request/auth/logoutRequest";
import { signOut as nextAuthSignOut } from "next-auth/react";
import { clientDashboardLinks } from "@constants/index";
import { FaSignOutAlt, FaTimes, FaBars } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { clearSessionCache } from "@utils/sessionCache";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutRequest();
    } catch (error) {
      console.error("Logout error:", error);
    }
    // Clear session cache first
    await clearSessionCache();
    queryClient.clear();
    await nextAuthSignOut({ callbackUrl: "/signin", redirect: true });
  };

  return (
    <>
      {/* Mobile Hamburger Button - Only show when sidebar is closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={clsx(
            "lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg",
            "bg-white shadow-md border text-carer-blue hover:bg-gray-50"
          )}
        >
          <FaBars size={20} />
        </button>
      )}

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed top-0 left-0 h-screen bg-white shadow-lg z-50 transition-transform duration-300",
          "w-72 flex flex-col",
          // Mobile: slide in from left
          "lg:transform-none",
          isOpen
            ? "transform translate-x-0"
            : "transform -translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <Link
            href="/client"
            onClick={() => setIsOpen(false)}
            className="flex-1"
          >
            <Image
              src="/assets/images/logo.png"
              width={160}
              height={45}
              alt="Supracarer logo"
              className="mx-auto"
            />
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className={clsx(
              "lg:hidden p-2 rounded-lg ml-4",
              "text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors"
            )}
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-6">
          <ul className="space-y-2 px-4">
            {clientDashboardLinks?.map((nav) => {
              const Icon = nav.icon;
              const isActive = pathname === nav.link;

              return (
                <li key={nav.id}>
                  <Link
                    href={nav.link}
                    onClick={() => setIsOpen(false)}
                    className={clsx(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                      "text-sm font-medium",
                      isActive
                        ? "bg-carer-blue text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-100 hover:text-carer-blue"
                    )}
                  >
                    <Icon className="text-lg" />
                    <span>{nav.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* SupraBot Section */}
        <div className="p-4 border-t border-gray-200 space-y-4">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={clsx(
              "flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all",
              "text-sm font-medium",
              "text-gray-600 hover:bg-red-50 hover:text-red-600",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            <FaSignOutAlt className="text-lg" />
            <span>{isLoggingOut ? "Logging Out..." : "Logout"}</span>
          </button>
          <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-lg p-4 text-center">
            <p className="text-carer-blue font-semibold text-sm mb-2">
              SupraBot Coming Soon
            </p>
            <Image
              src="/assets/images/bot.webp"
              width={80}
              height={80}
              alt="SupraBot"
              className="mx-auto opacity-80"
            />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
