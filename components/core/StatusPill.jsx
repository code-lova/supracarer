import React from "react";
import clsx from "clsx";
import {
  FiAlertCircle,     
  FiCheckCircle,
  FiThumbsUp,
  FiClock,
  FiHelpCircle
} from "react-icons/fi";


const statusStyleMap = {
  pending: "bg-yellow-400 text-white",
  replied: "bg-green-500 text-white",
  confirmed: "bg-blue-100 text-blue-700",
  ongoing: "bg-yellow-100 text-yellow-700",
  done: "bg-green-100 text-green-700",
};

const sizeClassMap = {
  sm: "text-xs px-2 py-1",
  md: "text-sm px-3 py-1.5",
  lg: "text-base px-4 py-2",
};

const statusIconMap = {
  pending: FiAlertCircle,
  replied: FiCheckCircle,
  confirmed: FiThumbsUp,
  ongoing: FiClock,
  done: FiCheckCircle,
};

const StatusPill = ({ status, size = "sm", customClass = "", icon, clickable = false }) => {
  const normalizedStatus = status?.toLowerCase() || "pending";
  const statusStyle = statusStyleMap[normalizedStatus] || "bg-gray-200 text-gray-700";
  const sizeStyle = sizeClassMap[size] || sizeClassMap.sm;

  const Icon = icon || statusIconMap[normalizedStatus] || FiHelpCircle;

  return (
    <span
      className={clsx(
        "font-medium rounded-full inline-flex items-center gap-1 transition",
        sizeStyle,
        statusStyle,
        customClass,
        clickable && "hover:opacity-80 cursor-pointer"
      )}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {status}
    </span>
  );
};

export default StatusPill;
