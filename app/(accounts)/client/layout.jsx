"use client";
import React from "react";
import NavigationBar from "@components/accounts/client/ui-kit/NavigationBar";
import Sidebar from "@components/accounts/client/ui-kit/Sidebar";
import ProfileWarningModal from "@components/core/modal/ProfileWarningModal";
import { useUserContext } from "@context/userContext";
import LoadingStateUI from "@components/core/loading";

const ClientLayout = ({ children }) => {
  const { isLoading, isRefreshing, hasData } = useUserContext();

  if (isLoading && !hasData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingStateUI />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Loading indicator */}
      {isRefreshing && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-blue-500 animate-pulse z-50" />
      )}

      {/* Profile Warning Modal */}
      <ProfileWarningModal userType="client" />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="lg:ml-72">
        {/* Navigation Bar */}
        <NavigationBar />

        {/* Page Content */}
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
};

export default ClientLayout;
