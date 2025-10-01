"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  FaBell,
  FaSearch,
  FaCog,
  FaUserCircle,
  FaChevronDown,
  FaUser,
  FaSignOutAlt,
  FaHeadset,
} from "react-icons/fa";
import { PiWarningFill } from "react-icons/pi";
import { useUserContext } from "@context/userContext";
import { logoutRequest } from "@/service/request/auth/logoutRequest";
import { signOut as nextAuthSignOut } from "next-auth/react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { getUnreadCount } from "@service/request/user/getNotifications";
import NotificationDropdown from "@components/core/NotificationDropdown";

const NavigationBar = () => {
  const { user } = useUserContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const queryClient = useQueryClient();

  const userDetails = user?.data;

  // Fetch unread count for badge
  const { data: unreadResponse } = useQuery({
    queryKey: ["unread-count"],
    queryFn: getUnreadCount,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Get unread notification count
  const unreadCount = unreadResponse?.data?.unread_count || 0;

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

  // Handle logout
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutRequest();
    } catch (error) {
      console.error("Logout error:", error);
    }
    queryClient.clear();
    await nextAuthSignOut({ callbackUrl: "/signin", redirect: true });
  };

  // Dropdown menu items
  const dropdownItems = [
    { label: "Profile", href: "/client/profile", icon: FaUser },
    { label: "Settings", href: "/client/settings", icon: FaCog },
    { label: "Support", href: "/client/support", icon: FaHeadset },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left Section - Welcome/Warning */}
          <div className="flex items-center min-w-0 flex-1 lg:flex-initial">
            {!userDetails?.address ? (
              <div className="flex items-center gap-2">
                <PiWarningFill
                  className="text-yellow-500 flex-shrink-0"
                  size={16}
                />
                <p className="text-xs lg:text-sm text-yellow-600 font-medium truncate">
                  <span className="hidden lg:inline">
                    Please update your profile for better experience
                  </span>
                  <span className="lg:hidden ml-14">Profile update needed</span>
                </p>
              </div>
            ) : (
              <div className="hidden lg:block text-gray-700">
                <p className="text-xs lg:text-sm font-medium">
                  Welcome back,{" "}
                  <span className="text-carer-blue font-semibold">
                    {userDetails?.fullname || "Client"}
                  </span>
                  !
                </p>
                <p className="hidden lg:block text-xs text-gray-500">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            )}
          </div>

          {/* Center Section - Search (Desktop Only) */}
          <div className="hidden lg:flex flex-1 max-w-md mx-6">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search healthcare services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-carer-blue/20 focus:border-carer-blue text-sm"
              />
            </form>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Search (Mobile Only) */}
            <button className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
              <FaSearch className="text-carer-blue" size={16} />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                ref={notificationRef}
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors group"
              >
                <FaBell
                  className="text-carer-blue group-hover:text-haven-blue transition-colors"
                  size={18}
                />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">
                      {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                  </span>
                )}
              </button>

              <NotificationDropdown
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
                triggerRef={notificationRef}
                userRole="client"
              />
            </div>

            {/* Settings (Desktop Only) */}
            <Link
              href="/client/settings"
              className="hidden lg:block p-2 hover:bg-gray-100 rounded-lg"
            >
              <FaCog
                className="text-gray-600 hover:text-carer-blue"
                size={16}
              />
            </Link>

            {/* Profile with Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {userDetails?.image ? (
                  <img
                    src={userDetails?.image}
                    alt={userDetails.fullname || "Profile"}
                    className="w-6 h-6 lg:w-8 lg:h-8 rounded-full object-cover"
                  />
                ) : (
                  <FaUserCircle
                    className="text-gray-600 hover:text-carer-blue"
                    size={20}
                  />
                )}

                {/* User details (Desktop Only) */}
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium text-gray-700">
                    {userDetails?.fullname}
                  </p>
                  <p className="text-xs text-gray-500">Client</p>
                </div>

                <FaChevronDown
                  className={`h-3 w-3 text-gray-400 transition-transform duration-200 ${
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
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-carer-blue transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}

                  <hr className="my-1 border-gray-200" />

                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
                  >
                    <FaSignOutAlt className="h-4 w-4" />
                    <span>{isLoggingOut ? "Logging Out..." : "Logout"}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;
