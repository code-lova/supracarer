"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PiWarningFill } from "react-icons/pi";
import { useUserContext } from "@context/userContext";

const ProfileWarningModal = ({ userType = "health-service" }) => {
  const { user } = useUserContext();
  const [showModal, setShowModal] = useState(false);
  const userDetails = user?.data;

  // Check if profile needs updates based on user type
  const needsProfileUpdate =
    userType === "health-service"
      ? !userDetails?.address || userDetails?.has_guided_rate_system === false
      : !userDetails?.address; // Client only checks address

  // Show modal on mount if needed
  useEffect(() => {
    if (needsProfileUpdate) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 1000); // Show after 1 second
      return () => clearTimeout(timer);
    }
  }, [needsProfileUpdate]);

  // Don't render if profile is complete
  if (!needsProfileUpdate || !showModal) {
    return null;
  }

  const profileLink =
    userType === "health-service"
      ? "/health-service/profile"
      : "/client/profile";
  const warningItems = [];

  // Add relevant warning items based on user type
  if (!userDetails?.address) {
    warningItems.push("Missing address information");
  }

  if (
    userType === "health-service" &&
    userDetails?.has_guided_rate_system === false
  ) {
    warningItems.push("Guided Rate System not configured");
  }

  return (
    <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6">
        <div className="flex items-start gap-3">
          <PiWarningFill
            className="text-yellow-500 flex-shrink-0 mt-1"
            size={24}
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Profile Update Needed
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Please complete your profile for the best experience:
            </p>
            <ul className="space-y-2 text-sm text-gray-700 mb-6">
              {warningItems.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-yellow-500 rounded-full"></span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex gap-3">
              <Link
                href={profileLink}
                onClick={() => setShowModal(false)}
                className="flex-1 bg-haven-blue text-white text-center py-2 px-4 rounded-lg text-sm font-medium hover:bg-carer-blue/90 transition-colors"
              >
                Update Profile
              </Link>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 text-sm font-medium hover:text-gray-800 transition-colors"
              >
                Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileWarningModal;
