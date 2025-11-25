"use client";
import React from "react";
import { FaCheckCircle, FaExclamationTriangle, FaUser } from "react-icons/fa";
import { healthWorkerFields, clientFields } from "@constants";
import { isFeatureEnabled } from "@config/features";

const ProfileCompleteness = ({ userDetails, userType = "health-service" }) => {
  // Get required fields based on user type
  let requiredFields =
    userType === "health-service" ? [...healthWorkerFields] : clientFields;

  // For health workers, exclude GRS field if feature is disabled
  if (userType === "health-service" && !isFeatureEnabled("GUIDED_RATE_SYSTEM")) {
    requiredFields = requiredFields.filter(field => field !== "has_guided_rate_system");
  }

  // Calculate completeness
  const calculateCompleteness = () => {
    if (!userDetails) return 0;

    let completedFields = 0;

    requiredFields.forEach((field) => {
      const value = userDetails[field];

      // Check if field has a meaningful value
      if (field === "has_guided_rate_system") {
        // For boolean field, check if it's explicitly set to true
        if (value === true) completedFields++;
      } else if (
        value &&
        value.toString().trim() !== "" &&
        value !== "Not Set"
      ) {
        completedFields++;
      }
    });

    return Math.round((completedFields / requiredFields.length) * 100);
  };

  const completionPercentage = calculateCompleteness();

  // Determine status and styling based on completion percentage
  const getStatusInfo = (percentage) => {
    if (percentage >= 80) {
      const colorScheme = userType === "client" ? "carer-blue" : "custom-green";
      const bgColor = userType === "client" ? "bg-blue-50" : "bg-green-50";

      return {
        icon: FaCheckCircle,
        iconColor: `text-${colorScheme}`,
        bgColor: bgColor,
        borderColor: `border-${colorScheme}`,
        textColor: `text-${colorScheme}`,
        status: "Complete",
      };
    } else if (percentage >= 50) {
      return {
        icon: FaExclamationTriangle,
        iconColor: "text-orange-500",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-500",
        textColor: "text-orange-600",
        status: "Almost Done",
      };
    } else {
      return {
        icon: FaUser,
        iconColor: "text-red-500",
        bgColor: "bg-red-50",
        borderColor: "border-red-500",
        textColor: "text-red-600",
        status: "Incomplete",
      };
    }
  };

  const statusInfo = getStatusInfo(completionPercentage);
  const StatusIcon = statusInfo.icon;

  return (
    <div
      className={`${statusInfo.bgColor} ${statusInfo.borderColor} border-2 rounded-lg p-3 mt-3`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <StatusIcon className={`${statusInfo.iconColor} text-lg`} />
          <div>
            <h4 className={`text-sm font-semibold ${statusInfo.textColor}`}>
              Profile Completeness
            </h4>
            <p className="text-xs text-gray-600">{statusInfo.status}</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-bold ${statusInfo.textColor}`}>
            {completionPercentage}%
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${
            completionPercentage >= 80
              ? userType === "client"
                ? "bg-carer-blue"
                : "bg-custom-green"
              : completionPercentage >= 50
              ? "bg-orange-500"
              : "bg-red-500"
          }`}
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>

      {completionPercentage < 100 ? (
        <p className="text-xs text-gray-500 mt-1">
          Complete your profile to unlock all features
        </p>
      ) : (
        <>
          <p className="text-xs text-gray-500 mt-1">
            All Features are unlocked
          </p>
        </>
      )}
    </div>
  );
};

export default ProfileCompleteness;
