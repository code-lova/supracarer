"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import InactivityModal from "@components/core/modal/InactivityModal";
import { logoutRequest } from "@service/request/auth/logoutRequest";
import { signOut as nextAuthSignOut } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { useUserContext } from "@context/userContext";

const SessionTimeoutContext = createContext();

export const SessionTimeoutProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(20);
  const queryClient = useQueryClient();
  const { user, setUser } = useUserContext();

  const timeoutRef = useRef(null);
  const warningRef = useRef(null);
  const countdownRef = useRef(null);

  // Logout function (replace with actual logic)
  const logout = async () => {
    console.log("Logging out...");
    try {
      await logoutRequest();
    } catch (e) {
      // Optionally handle error, but proceed with sign out regardless
    }
    await nextAuthSignOut({ callbackUrl: "/signin", redirect: true });
    queryClient.clear();
    setUser(null);
  };

  const resetTimers = () => {
    clearTimeout(warningRef.current);
    clearTimeout(timeoutRef.current);
    clearInterval(countdownRef.current);
    setShowModal(false);
    setCountdown(20);

    warningRef.current = setTimeout(() => {
      setShowModal(true);
      startCountdown();
    }, 5 * 60 * 1000); // 1 min inactivity
  };

  const startCountdown = () => {
    let counter = 20;
    countdownRef.current = setInterval(() => {
      counter -= 1;
      setCountdown(counter);
      if (counter <= 0) {
        clearInterval(countdownRef.current);
        logout();
      }
    }, 1000);
  };

  const activityEvents = ["mousemove", "keydown", "scroll", "click"];

  useEffect(() => {
    if (!user) return;
    activityEvents.forEach((event) =>
      window.addEventListener(event, resetTimers)
    );
    resetTimers(); // init on mount

    return () => {
      activityEvents.forEach((event) =>
        window.removeEventListener(event, resetTimers)
      );
      clearTimeout(warningRef.current);
      clearTimeout(timeoutRef.current);
      clearInterval(countdownRef.current);
    };
  }, [user]);

  return (
    <SessionTimeoutContext.Provider value={{}}>
      {children}
      {user && (
        <InactivityModal
          show={showModal}
          countdown={countdown}
          onCancel={() => {
            resetTimers();
          }}
        />
      )}
    </SessionTimeoutContext.Provider>
  );
};

export const useSessionTimeout = () => useContext(SessionTimeoutContext);
