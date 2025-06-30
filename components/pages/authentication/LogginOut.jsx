"use client";
import { signOut as nextAuthSignOut } from "next-auth/react";
import React, { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutRequest } from "@/service/request/auth/logoutRequest";
import { useUserContext } from "@/context/userContext";
import LoadingStateUI from "@components/core/loading";

const LoggingOut = () => {
  const queryClient = useQueryClient();
  const { setUser } = useUserContext();

  const { mutate } = useMutation({
    mutationFn: logoutRequest,
    onSettled: () => {
      queryClient.clear();
      setUser(null);
      nextAuthSignOut({ callbackUrl: "/signin" });
    },
  });

  useEffect(() => {
    mutate(); // Trigger logout when component mounts
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingStateUI label="Logging you out..." />
    </div>
  );
};

export default LoggingOut;
