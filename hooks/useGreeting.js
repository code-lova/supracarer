"use client";
import { useState, useEffect } from "react";

/**
 * Custom hook for dynamic greeting based on time of day
 * @returns {Object} { greeting, currentTime, currentDate, hour }
 */
export const useGreeting = () => {
  const [greeting, setGreeting] = useState("Hello");
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [hour, setHour] = useState(new Date().getHours());

  useEffect(() => {
    const updateGreeting = () => {
      const now = new Date();
      const currentHour = now.getHours();
      setHour(currentHour);

      // Set greeting based on time of day
      if (currentHour >= 5 && currentHour < 12) {
        setGreeting("Good Morning");
      } else if (currentHour >= 12 && currentHour < 17) {
        setGreeting("Good Afternoon");
      } else if (currentHour >= 17 && currentHour < 21) {
        setGreeting("Good Evening");
      } else {
        setGreeting("Good Night");
      }

      // Format current time (e.g., "10:30 AM")
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );

      // Format current date (e.g., "Monday, Dec 23")
      setCurrentDate(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
        })
      );
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return {
    greeting,
    currentTime,
    currentDate,
    hour,
  };
};

export default useGreeting;
