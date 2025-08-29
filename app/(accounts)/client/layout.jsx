"use client";
import React from "react";
import NavigationBar from "@components/accounts/client/ui-kit/NavigationBar";
import Sidebar from "@components/accounts/client/ui-kit/Sidebar";
import { useUserContext } from "@context/userContext";
import LoadingStateUI from "@components/core/loading";

const ClientLayout = ({ children }) => {
  // const { isLoading } = useUserContext();

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <LoadingStateUI />
  //     </div>
  //   );
  // }
  return (
    <div className="client-bg">
      <Sidebar />
      <NavigationBar />
      <section className="px-2 md:px-4 lg:ml-[270px] min-h-screen">
        <div className="flex flex-col md:flex-row justify-between">
          {children}
        </div>
      </section>
    </div>
  );
};

export default ClientLayout;
