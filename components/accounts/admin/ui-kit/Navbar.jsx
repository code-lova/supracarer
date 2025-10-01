"use client";
import React, { useState, useRef } from "react";
import { useUserContext } from "@context/userContext";
import { useQuery } from "@tanstack/react-query";
import { getUnreadCount } from "@service/request/user/getNotifications";
import NotificationDropdown from "@components/core/NotificationDropdown";
import Link from "next/link";

import {
  FaBars,
  FaBell,
  FaComments,
  FaChevronDown,
  FaSearch,
} from "react-icons/fa";

export default function Navbar({ onMenuClick }) {
  const { user } = useUserContext();
  const userDetails = user?.data;
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Fetch unread count for badge
  const { data: unreadResponse } = useQuery({
    queryKey: ["unread-count"],
    queryFn: getUnreadCount,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Get unread notification count
  const unreadCount = unreadResponse?.data?.unread_count || 0;

  // Simple click outside to close dropdowns
  const notificationRef = useRef();
  const profileRef = useRef();

  React.useEffect(() => {
    function handleClick(e) {
      if (profileRef.current && !profileRef.current.contains(e.target))
        setShowProfile(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="w-full bg-white shadow flex items-center justify-between px-4 py-3">
      {/* Left: Hamburger (mobile) + Search */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          aria-label="Open sidebar"
          className="p-2 md:hidden"
        >
          <FaBars size={24} className="text-haven-blue" />
        </button>
        <div className="hidden lg:block">
          <span className="font-bold text-md text-haven-blue">Admin Panel</span>
        </div>

        <div className="hidden md:block ml-2">
          <div className="relative w-72">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FaSearch size={16} />
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-4 py-2 w-full rounded-full border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-haven-blue transition"
              style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
            />
          </div>
        </div>
      </div>

      {/* Center/Right: Bell, Chat, Profile */}
      <div className="flex items-center gap-4">
        {/* Bell Icon - Notification Dropdown */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className="p-2 bg-light-blue-bg rounded-md relative"
            aria-label="Notifications"
          >
            <FaBell size={20} className="text-haven-blue" />
            {/* Notification dot */}
            {unreadCount > 0 && (
              <span className="absolute top-1 right-2 w-2.5 h-2.5 bg-danger-red rounded-full border-2 border-white"></span>
            )}
          </button>

          <NotificationDropdown
            isOpen={isNotificationOpen}
            onClose={() => setIsNotificationOpen(false)}
            triggerRef={notificationRef}
            userRole="admin"
          />
        </div>
        {/* Chat Icon - Link to Support Tickets */}
        <Link
          href="/admin/support-ticket"
          className="p-2 bg-light-blue-bg rounded-md relative hover:bg-blue-100 transition-colors"
          aria-label="Support Tickets"
        >
          <FaComments size={20} className="text-haven-blue" />
          {/* You can add a notification dot here if needed for support tickets */}
        </Link>
        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfile((v) => !v)}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full"
            aria-label="Profile"
          >
            {userDetails?.image ? (
              <img
                src={userDetails?.image}
                alt="Profile"
                className="w-8 h-8 rounded-full border-2 border-light-blue-bg"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-haven-blue flex items-center justify-center text-white text-md font-bold border-2 border-light-blue-bg">
                {userDetails?.fullname === "Administrator"
                  ? "AD"
                  : userDetails?.fullname?.[0]?.toUpperCase() || "U"}
              </div>
            )}

            <FaChevronDown size={16} />
          </button>
          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-haven-blue shadow-lg rounded z-50">
              <div className="p-3 border-b font-semibold">
                {userDetails?.fullname}
              </div>
              <ul>
                <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                  Profile
                </li>
                <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                  Settings
                </li>
                <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-danger-red">
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
