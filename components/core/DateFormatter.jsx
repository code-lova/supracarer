import React from "react";

const DateFormatter = ({
  date,
  format = "short",
  className = "",
  showTime = false,
  time,
  timePeriod,
}) => {
  if (!date && !time) return null;

  const formatDate = (dateString, formatType) => {
    const dateObj = new Date(dateString);

    switch (formatType) {
      case "short":
        return dateObj.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      case "long":
        return dateObj.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        });
      case "numeric":
        return dateObj.toLocaleDateString("en-US");
      case "time":
        return dateObj.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
      case "datetime":
        return dateObj.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
      case "relative":
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (dateObj.toDateString() === today.toDateString()) {
          return "Today";
        } else if (dateObj.toDateString() === yesterday.toDateString()) {
          return "Yesterday";
        } else {
          return dateObj.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
        }
      default:
        return dateObj.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
    }
  };

  // New function to format time with period
  const formatTime = (timeString, period) => {
    if (!timeString) return "";

    // If period is provided, use it directly
    if (period) {
      return `${timeString} ${period.toUpperCase()}`;
    }

    // Otherwise, try to parse and format the time
    try {
      // If timeString is already in HH:MM format
      const [hours, minutes] = timeString.split(":");
      const hour24 = parseInt(hours, 10);
      const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
      const ampm = hour24 >= 12 ? "PM" : "AM";
      return `${hour12}:${minutes} ${ampm}`;
    } catch {
      return timeString; // Return as-is if parsing fails
    }
  };

  // If only time formatting is needed
  if (time && !date) {
    return <span className={className}>{formatTime(time, timePeriod)}</span>;
  }

  const formattedDate = formatDate(date, format);
  const formattedTime = showTime ? formatDate(date, "time") : null;

  return (
    <span className={className}>
      {formattedDate}
      {formattedTime && ` ${formattedTime}`}
    </span>
  );
};

export default DateFormatter;
