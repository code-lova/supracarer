import React from "react";

const DateFormatter = ({
  date,
  format = "short",
  className = "",
  showTime = false,
}) => {
  if (!date) return null;

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
      default:
        return dateObj.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
    }
  };

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
