"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  FaUserCircle,
  FaBell,
  FaSearch,
  FaCog,
  FaChevronDown,
  FaUser,
  FaSignOutAlt,
  FaStar,
} from "react-icons/fa";
import { PiWarningFill } from "react-icons/pi";
import { useUserContext } from "@context/userContext";
import { logoutRequest } from "@/service/request/auth/logoutRequest";
import { signOut as nextAuthSignOut } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import DateFormatter from "@components/core/DateFormatter";

const NavigationBar = () => {
  const { user } = useUserContext();
  const userDetails = user?.data;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef(null);
  const queryClient = useQueryClient();

  // Check if profile needs updates
  const needsProfileUpdate =
    !userDetails?.address || userDetails?.has_guided_rate_system === false;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutRequest();
    } catch (e) {
      console.error("Logout error:", e);
    }
    await nextAuthSignOut({ callbackUrl: "/signin", redirect: true });
    queryClient.clear();
  };

  const dropdownItems = [
    {
      label: "Profile",
      href: "/health-service/profile",
      icon: FaUser,
    },
    {
      label: "Settings",
      href: "/health-service/settings",
      icon: FaCog,
    },
    {
      label: "GRS",
      href: "/health-service/guided-rate-system",
      icon: FaStar,
    },
  ];

  return (
    <header className="hidden lg:flex sticky top-0 z-30 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 px-6 py-2">
      <div className="flex items-center justify-between w-full max-w-full">
        <div className="flex-1 ml-[270px]">
          {needsProfileUpdate ? (
            <div className="flex items-center gap-2 mb-2">
              <PiWarningFill
                className="text-yellow-500 flex-shrink-0"
                size={20}
              />
              <div>
                <p className="text-sm text-yellow-600 font-medium">
                  Profile update needed for better experience
                </p>
                <div className="flex flex-wrap gap-4 text-xs text-yellow-700 mt-1">
                  {!userDetails?.address && (
                    <span>• Missing address information</span>
                  )}
                  {userDetails?.has_guided_rate_system === false && (
                    <span>• Guided Rate System not configured</span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-md font-semibold text-tranquil-teal">
                Welcome back, {userDetails?.fullname || "Health Worker"}! 👋
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                <DateFormatter date={new Date()} format="long" />
              </p>
            </>
          )}
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="block w-64 pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-tranquil-teal focus:border-transparent bg-gray-50"
            />
          </div>

          {/* Notifications */}
          <Link
            href="/health-service/notifications"
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors group"
          >
            <FaBell className="h-5 w-5 text-gray-600 group-hover:text-tranquil-teal transition-colors" />
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">3</span>
            </span>
          </Link>

          {/* Settings */}
          <Link
            href="/health-service/settings"
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors group"
          >
            <FaCog className="h-5 w-5 text-gray-600 group-hover:text-tranquil-teal transition-colors" />
          </Link>

          {/* Profile with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors group"
            >
              {userDetails?.image ? (
                <img
                  src={userDetails?.image}
                  alt={userDetails.fullname || "Profile"}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <FaUserCircle className="h-8 w-8 text-gray-600 group-hover:text-tranquil-teal transition-colors" />
              )}
              <div className="hidden xl:block text-left">
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  {userDetails?.fullname || "Health Worker"}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {user?.role || "Health Worker"}
                </p>
              </div>
              <FaChevronDown
                className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                {dropdownItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-tranquil-teal transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}

                {/* Divider */}
                <hr className="my-1 border-gray-200" />

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaSignOutAlt className="h-4 w-4" />
                  <span>{isLoggingOut ? "Logging Out..." : "Logout"}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;
