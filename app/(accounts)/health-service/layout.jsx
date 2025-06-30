"use client";
import React from "react";
import Sidebar from "@components/accounts/healthservice/ui/Sidebar";
import NavigationBar from "@components/accounts/healthservice/ui/NavigationBar";
import { useUserContext } from "@context/userContext";
import LoadingStateUI from "@components/core/loading";

const HealthServiceLayout = ({ children }) => {
  const { isLoading } = useUserContext();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingStateUI label="Redirecting you in a sec..." />
      </div>
    );
  }

  return (
    <>
      <Sidebar />
      <NavigationBar />
      <div className="lg:ml-[300px] mt-[50px] px-4">{children}</div>
    </>
  );
};

export default HealthServiceLayout;
