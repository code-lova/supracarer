import { useEffect, useState } from "react";

export const useResendCountdown = (initialDelay = 60) => {
  const [countdown, setCountdown] = useState(0);
  const [isCountdownActive, setIsCountdownActive] = useState(false);

  useEffect(() => {
    let interval;
    if (isCountdownActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setIsCountdownActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCountdownActive, countdown]);

  const startCountdown = (delay = initialDelay) => {
    setCountdown(delay);
    setIsCountdownActive(true);
  };

  const resetCountdown = () => {
    setCountdown(0);
    setIsCountdownActive(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return {
    countdown,
    isCountdownActive,
    startCountdown,
    resetCountdown,
    formatTime,
  };
};
