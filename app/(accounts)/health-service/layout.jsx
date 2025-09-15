"use client";
import React from "react";
import Sidebar from "@components/accounts/healthservice/ui/Sidebar";
import NavigationBar from "@components/accounts/healthservice/ui/NavigationBar";
import ProfileWarningModal from "@components/core/modal/ProfileWarningModal";
import { useUserContext } from "@context/userContext";
import LoadingStateUI from "@components/core/loading";

const HealthServiceLayout = ({ children }) => {
  const { isLoading, isRefreshing, hasData } = useUserContext();

  if (isLoading && !hasData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingStateUI />
      </div>
    );
  }

  return (
    <div className="bg-dashboard min-h-full w-full">
      {isRefreshing && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-blue-500 animate-pulse z-50" />
      )}
      <ProfileWarningModal userType="health-service" />
      <Sidebar />
      <NavigationBar />
      <div className="lg:ml-[270px] flex flex-col">
        <div className="lg:hidden h-16" />
        <main className="flex-1 px-4 lg:px-4 py-2 lg:py-1 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};

export default HealthServiceLayout;
