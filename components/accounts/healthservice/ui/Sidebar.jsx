"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { logoutRequest } from "@/service/request/auth/logoutRequest";
import { signOut as nextAuthSignOut } from "next-auth/react";
import { HealthDashboardLinks } from "@constants/index";
import { isFeatureEnabled, logFeatureStatus } from "@config/features";
import {
  FaSignOutAlt,
  FaBell,
  FaAlignRight,
  FaCog,
  FaUserCircle,
  FaUser,
  FaStar,
  FaChevronDown,
} from "react-icons/fa";
import { RiCloseLargeFill } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useUserContext } from "@/context/userContext";
import NotificationDropdown from "@components/core/NotificationDropdown";
import { getUnreadCount } from "@service/request/user/getNotifications";
import { clearSessionCache } from "@utils/sessionCache";

const Sidebar = () => {
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const notificationRef = useRef(null);
  const dropdownRef = useRef(null);
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { user } = useUserContext();
  const userDetails = user?.data;

  // Log feature status in development
  useEffect(() => {
    logFeatureStatus();
  }, []);

  // Filter navigation links based on feature flags
  const filteredNavLinks = HealthDashboardLinks.filter((nav) => {
    // Check if this is a GRS-related link
    if (nav.id === "grs" || nav.link.includes("guided-rate-system")) {
      return isFeatureEnabled("GUIDED_RATE_SYSTEM");
    }
    // Add other feature-dependent links here in the future
    return true; // Show all other links by default
  });

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

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoutRequest();
    } catch (e) {
      console.error("Logout error:", e);
    }
    await clearSessionCache();
    await nextAuthSignOut({ callbackUrl: "/signin", redirect: true });
    queryClient.clear();
  };

  // Filter dropdown items based on feature flags
  const allDropdownItems = [
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
      featureFlag: "GUIDED_RATE_SYSTEM", // Add feature flag requirement
    },
  ];

  const dropdownItems = allDropdownItems.filter((item) => {
    if (item.featureFlag) {
      return isFeatureEnabled(item.featureFlag);
    }
    return true; // Show items without feature flag requirements
  });

  const closeMobileMenu = () => setToggle(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-md z-50 px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/health-service">
            <Image
              src="/assets/images/logo.png"
              width={140}
              height={35}
              alt="Supracarer logo"
            />
          </Link>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <div className="relative">
              <button
                ref={notificationRef}
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors group"
              >
                <FaBell className="h-5 w-5 text-gray-600 group-hover:text-tranquil-teal transition-colors" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center">
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
                userRole="health-service"
              />
            </div>

            {/* Profile with Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors group"
              >
                {userDetails?.image_url ? (
                  <img
                    src={userDetails?.image_url}
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
                    disabled={loading}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaSignOutAlt className="h-4 w-4" />
                    <span>{loading ? "Logging Out..." : "Logout"}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Menu Toggle */}
            <button
              onClick={() => setToggle(!toggle)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors ml-1"
            >
              {toggle ? (
                <RiCloseLargeFill className="text-tranquil-teal" size={24} />
              ) : (
                <FaAlignRight
                  className="text-gray-600 hover:text-tranquil-teal transition-colors"
                  size={20}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {toggle && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          // Base styles
          "fixed top-0 left-0 h-screen bg-white shadow-lg z-50 flex flex-col",
          // Desktop styles
          "lg:w-[270px] lg:shadow-xl lg:rounded-r-3xl",
          // Mobile styles
          "lg:translate-x-0 w-80 transition-transform duration-300",
          toggle ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header Section */}
        <div className="px-2 py-4 border-b border-gray-100">
          <Link href="/health-service" onClick={closeMobileMenu}>
            <Image
              src="/assets/images/logo.png"
              width={180}
              height={50}
              alt="Supracarer logo"
              className="px-2"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-2">
            {filteredNavLinks.map((nav) => {
              const Icon = nav.icon;
              const isActive = pathname === nav.link;

              return (
                <li key={nav.id}>
                  <Link
                    href={nav.link}
                    onClick={closeMobileMenu}
                    className={clsx(
                      "flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200",
                      isActive && "bg-tranquil-teal text-white shadow-md",
                      !isActive &&
                        "text-tranquil-teal hover:bg-gray-50 hover:shadow-sm"
                    )}
                  >
                    <Icon className="text-xl flex-shrink-0" />
                    <span>{nav.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Development Feature Status Indicator */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs font-medium text-yellow-800 mb-1">
                🎛️ Feature Status (Dev Only)
              </p>
              <p className="text-xs text-yellow-700">
                GRS: {isFeatureEnabled("GUIDED_RATE_SYSTEM") ? "✅ Enabled" : "❌ Disabled"}
              </p>
            </div>
          )}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-100 space-y-4">
          <button
            onClick={handleLogout}
            disabled={loading}
            className={clsx(
              "flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200",
              "text-tranquil-teal hover:bg-red-50 hover:text-red-600",
              loading && "opacity-50 cursor-not-allowed"
            )}
          >
            <FaSignOutAlt className="text-xl flex-shrink-0" />
            <span>{loading ? "Logging Out..." : "Logout"}</span>
          </button>

          {/* SupraBot Section - Desktop Only */}
          <div className="block">
            <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl p-4 text-center">
              <p className="text-gray-600 text-sm font-medium mb-2">
                SupraBot Coming Soon...
              </p>
              <Image
                src="/assets/images/bot.webp"
                width={120}
                height={120}
                alt="suprabot"
                className="mx-auto object-contain"
              />
            </div>
          </div>
        </div>
      </aside>

      {/* Spacer for desktop layout */}
      <div className="hidden lg:block lg:w-[270px] flex-shrink-0" />
    </>
  );
};

export default Sidebar;
