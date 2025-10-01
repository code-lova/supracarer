"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PiWarningFill } from "react-icons/pi";
import { useUserContext } from "@context/userContext";

const ProfileWarningModal = ({ userType = "health-service" }) => {
  const { user } = useUserContext();
  const [showModal, setShowModal] = useState(false);
  const userDetails = user?.data;

  // Check profile completion status
  const hasCompleteProfile = Boolean(userDetails?.address);
  const hasGuidedRateSystem = userDetails?.has_guided_rate_system === true;

  // Check if this is a first-time login - based on profile completion status
  const isFirstTimeLogin =
    typeof window !== "undefined" &&
    localStorage.getItem("firstTimeLogin") !== "false" &&
    !hasCompleteProfile;

  // Set the flag appropriately based on user data
  useEffect(() => {
    if (typeof window !== "undefined" && userDetails) {
      const currentFlag = localStorage.getItem("firstTimeLogin");

      // If user has complete profile and guided rate system, mark as not first-time
      if (
        hasCompleteProfile &&
        hasGuidedRateSystem &&
        currentFlag !== "false"
      ) {
        localStorage.setItem("firstTimeLogin", "false");
      }
      // If user has incomplete profile and no flag set, mark as first-time
      else if (!hasCompleteProfile && !currentFlag) {
        localStorage.setItem("firstTimeLogin", "true");
      }
    }
  }, [userDetails, hasCompleteProfile, hasGuidedRateSystem]);

  // Determine what needs to be completed
  const needsProfileUpdate = !hasCompleteProfile;
  const needsGuidedRateSetup =
    userType === "health-service" && hasCompleteProfile && !hasGuidedRateSystem;

  // For first-time users or incomplete profiles, force profile completion
  const forceProfileUpdate =
    isFirstTimeLogin && (needsProfileUpdate || needsGuidedRateSetup);

  // Show modal on mount if needed
  useEffect(() => {
    if (forceProfileUpdate) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 1000); // Show after 1 second
      return () => clearTimeout(timer);
    }
  }, [forceProfileUpdate]);

  // Don't render if profile is complete and guided rate system is set (or not needed)
  if (!forceProfileUpdate || !showModal) {
    return null;
  }

  // Determine navigation target and content
  const getNavigationDetails = () => {
    if (needsProfileUpdate) {
      return {
        link:
          userType === "health-service"
            ? "/health-service/profile"
            : "/client/profile",
        buttonText: isFirstTimeLogin ? "Complete Profile" : "Update Profile",
        title: isFirstTimeLogin
          ? "Welcome to SupraCarer!"
          : "Profile Update Needed",
        description: isFirstTimeLogin
          ? "Let's get you set up for success. Please complete your profile first:"
          : "Please complete your profile for the best experience:",
        warningItems: [
          isFirstTimeLogin
            ? "Step 1: Complete your profile information"
            : "Missing address information",
        ],
      };
    } else if (needsGuidedRateSetup) {
      return {
        link: "/health-service/guided-rate-system",
        buttonText: "Setup Rate System",
        title: "Complete Your Setup",
        description:
          "Great! Your profile is complete. Now let's set up your guided rate system:",
        warningItems: [
          "Step 2: Configure your guided rate system",
          "Set your service rates and availability",
        ],
      };
    }
  };

  const navDetails = getNavigationDetails();
  if (!navDetails) return null;

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
              {navDetails.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {navDetails.description}
            </p>
            <ul className="space-y-2 text-sm text-gray-700 mb-6">
              {navDetails.warningItems.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-yellow-500 rounded-full"></span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex gap-3">
              <Link
                href={navDetails.link}
                onClick={() => setShowModal(false)}
                className="flex-1 bg-haven-blue text-white text-center py-2 px-4 rounded-lg text-sm font-medium hover:bg-carer-blue/90 transition-colors"
              >
                {navDetails.buttonText}
              </Link>
              {!isFirstTimeLogin && (
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 text-sm font-medium hover:text-gray-800 transition-colors"
                >
                  Later
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileWarningModal;
