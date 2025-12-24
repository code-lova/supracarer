"use client";
import React from "react";
import Link from "next/link";
import {
  FiEdit2,
  FiMapPin,
  FiPhone,
  FiClock,
  FiUser,
  FiMail,
  FiChevronRight,
} from "react-icons/fi";
import { useUserContext } from "@context/userContext";
import ProfileCompleteness from "@components/core/ProfileCompleteness";

const ProfileCard = () => {
  const { user } = useUserContext();
  const userDetails = user?.data;

  // Get initials for avatar fallback
  const getInitials = (name) => {
    if (!name) return "U";
    const names = name.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();
  };

  return (
    <div className="bg-white w-full rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Header with gradient */}
      <div className="relative bg-gradient-to-r from-tranquil-teal to-ever-green px-4 py-4">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-1/2 w-12 h-12 bg-white/10 rounded-full translate-y-1/2" />

        <div className="relative flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">My Profile</h2>
          <Link
            href="/health-service/profile"
            className="flex items-center gap-1 px-3 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-colors duration-300 group"
          >
            <FiEdit2 className="text-white text-sm" />
            <span className="text-white text-xs font-medium">Edit</span>
            <FiChevronRight className="text-white text-xs opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
          </Link>
        </div>
      </div>

      {/* Profile Content */}
      <div className="px-4 py-4">
        {/* Avatar & Basic Info */}
        <div className="flex items-start gap-4 mb-4">
          {/* Avatar with online indicator */}
          <div className="relative flex-shrink-0">
            {userDetails?.image_url ? (
              <img
                src={userDetails?.image_url}
                alt="Profile"
                className="w-20 h-20 object-cover rounded-2xl border-2 border-tranquil-teal/20 shadow-sm"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-tranquil-teal to-ever-green flex items-center justify-center text-white text-xl font-bold shadow-sm">
                {getInitials(userDetails?.fullname)}
              </div>
            )}
            {/* Online indicator */}
            <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-white"></span>
            </span>
          </div>

          {/* Name & Role */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-800 capitalize truncate">
              {userDetails?.fullname || "Username"}
            </h3>
            <p className="text-sm text-tranquil-teal font-medium capitalize">
              {userDetails?.practitioner || "Healthcare Professional"}
            </p>
            <div className="flex items-center gap-1.5 mt-2 text-gray-500 text-xs">
              <FiMapPin className="text-tranquil-teal flex-shrink-0" />
              <span className="truncate">
                {userDetails?.region || "Location not set"}
                {userDetails?.country && `, ${userDetails.country}`}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-gray-50 rounded-xl p-3 text-center hover:bg-gray-100 transition-colors">
            <div className="w-8 h-8 mx-auto mb-1.5 rounded-lg bg-blue-50 flex items-center justify-center">
              <FiUser className="text-blue-500 text-sm" />
            </div>
            <p className="text-[10px] text-gray-500 font-medium mb-0.5">
              Gender
            </p>
            <p className="text-xs text-gray-800 font-semibold truncate">
              {userDetails?.gender || "Not set"}
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-3 text-center hover:bg-gray-100 transition-colors">
            <div className="w-8 h-8 mx-auto mb-1.5 rounded-lg bg-amber-50 flex items-center justify-center">
              <FiClock className="text-amber-500 text-sm" />
            </div>
            <p className="text-[10px] text-gray-500 font-medium mb-0.5">
              Hours
            </p>
            <p className="text-xs text-gray-800 font-semibold truncate">
              {userDetails?.working_hours || "8am-5pm"}
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-3 text-center hover:bg-gray-100 transition-colors">
            <div className="w-8 h-8 mx-auto mb-1.5 rounded-lg bg-green-50 flex items-center justify-center">
              <FiPhone className="text-green-500 text-sm" />
            </div>
            <p className="text-[10px] text-gray-500 font-medium mb-0.5">
              Phone
            </p>
            <p className="text-xs text-gray-800 font-semibold truncate">
              {userDetails?.phone || "Not set"}
            </p>
          </div>
        </div>

        {/* Profile Completeness */}
        <div className="pt-3 border-t border-gray-100">
          <ProfileCompleteness
            userDetails={userDetails}
            userType="health-service"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
