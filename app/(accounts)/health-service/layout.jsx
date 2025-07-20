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
        <LoadingStateUI />
      </div>
    );
  }

  return (
    <div className="bg-dashboard">
      <Sidebar />
      <NavigationBar />
      <section className="px-2 md:px-4 lg:ml-[280px] min-h-screen">
        <div className="flex flex-col md:flex-row justify-between">
          {children}
        </div>
      </section>
    </div>
  );
};

export default HealthServiceLayout;
