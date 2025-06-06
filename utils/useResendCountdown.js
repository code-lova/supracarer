import { useEffect, useState } from "react";

const RESEND_DELAY = 3 * 60 * 1000; // 3 minutes in ms

export const useResendCountdown = (storageKey = "verificationStartTime") => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    let start = localStorage.getItem(storageKey);
    if (!start) {
      start = Date.now();
      localStorage.setItem(storageKey, start);
    }

    const updateCountdown = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, RESEND_DELAY - elapsed);
      setTimeLeft(remaining);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [storageKey]);

  const resetCountdown = () => {
    const now = Date.now();
    localStorage.setItem(storageKey, now);
    setTimeLeft(RESEND_DELAY);
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return { timeLeft, resetCountdown, formatTime };
};
