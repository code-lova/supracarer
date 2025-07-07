"use client";

import React from "react";
import { formatDistanceToNow } from "date-fns";

const TimeAgo = ({ timestamp }) => {
  if (!timestamp) return null;

  let timeAgo = "Just now";

  try {
    // Parse string into ISO format
    const utcString = timestamp.replace(" ", "T") + "Z"; // Ensure it's treated as UTC
    const utcDate = new Date(utcString); // JS auto adjusts to user local time

    timeAgo = formatDistanceToNow(utcDate, { addSuffix: true });
  } catch (error) {
    console.error("Error parsing timestamp:", error);
  }

  return <span>{timeAgo}</span>;
};

export default TimeAgo;
