"use client";
import React, { useEffect, useState } from "react";

const CurrentDateTime = ({
  showDateTime = false,
  showGreeting = false,
  textClass = "",
}) => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 60000); // update every 1 minute

    return () => clearInterval(interval);
  }, []);

  // Format date and time
  const formattedDate = dateTime.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const weekday = dateTime.toLocaleDateString("en-US", { weekday: "long" });

  return (
    <div className="flex flex-col gap-1">
      {showDateTime && (
        <p className={`text-xs font-semibold ${textClass}`}>{formattedDate}</p>
      )}

      {showGreeting && (
        <p className={`text-xs md:text-[15px] ${textClass}`}>
          Have a Nice {weekday}!
        </p>
      )}
    </div>
  );
};

export default CurrentDateTime;
