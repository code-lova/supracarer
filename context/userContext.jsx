"use client";
import React, { createContext, useContext, useMemo } from "react";
import { useSession } from "next-auth/react";
import useUser from "@/hooks/useUser";

const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
  const { status: sessionStatus } = useSession();
  const {
    user,
    isLoading: userLoading,
    isFetching,
    isRefreshing,
    hasData,
    refetch,
    isError,
  } = useUser();

  const contextValue = useMemo(() => {
    const isSessionLoading = sessionStatus === "loading";
    const isUserLoading = userLoading;
    const isInitialLoading = isSessionLoading || isUserLoading;

    return {
      user,
      // Different loading states for different UX needs
      isLoading: isInitialLoading,
      isRefreshing,
      isFetching,
      hasData,
      isAuthenticated: sessionStatus === "authenticated" && !!user,
      isError,
      refetchUser: refetch,
      // Legacy support - you can gradually migrate away from setUser
      setUser: () =>
        console.warn("setUser is deprecated, use refetchUser instead"),
    };
  }, [
    user,
    sessionStatus,
    userLoading,
    isFetching,
    isRefreshing,
    hasData,
    refetch,
    isError,
  ]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUserContext must be used within a UserProvider");
  return context;
};
