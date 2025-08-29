"use client";

import React from "react";
import { formatDistanceToNow } from "date-fns";

const TimeAgo = ({ timestamp, format = "date-fns" }) => {
  if (!timestamp) return null;

  let timeAgo = "Just now";

  // Custom format function
  const formatTimeAgo = (dateInput) => {
    let date;
    
    // Handle different input types
    if (dateInput instanceof Date) {
      date = dateInput;
    } else if (typeof dateInput === 'string') {
      // Handle string timestamps
      const utcString = dateInput.includes('T') 
        ? dateInput 
        : dateInput.replace(" ", "T") + "Z";
      date = new Date(utcString);
    } else {
      date = new Date(dateInput);
    }

    // Check if date is valid
    if (isNaN(date.getTime())) {
      console.error("Invalid date:", dateInput);
      return "Invalid date";
    }

    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  try {
    if (format === "custom") {
      // Use custom format function
      timeAgo = formatTimeAgo(timestamp);
    } else {
      // Use date-fns (default behavior)
      let utcDate;
      if (timestamp instanceof Date) {
        utcDate = timestamp;
      } else {
        const utcString = timestamp.replace(" ", "T") + "Z";
        utcDate = new Date(utcString);
      }
      timeAgo = formatDistanceToNow(utcDate, { addSuffix: true });
    }
  } catch (error) {
    console.error("Error parsing timestamp:", error);
    timeAgo = "Invalid date";
  }

  return <span>{timeAgo}</span>;
};

export default TimeAgo;