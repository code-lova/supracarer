"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { setNavigate } from "@config/apiClient";
import "@styles/global.css";
import { Toaster } from "react-hot-toast";
import { ReactQueryProvider } from "@config/ReactQueryProvider";

import ServerLayout from "./ServerLayout";

const RootLayout = ({ children }) => {
  const navigate = useRouter();
  useEffect(() => {
    setNavigate((path, options) => {
      navigate.push(path, options);
    });
  }, [navigate]);


  return (
    <ServerLayout>
      <div className="main">
        <div className="gradient"></div>
      </div>

      <main className="app">
        <ReactQueryProvider>
          {children}
          <Toaster />
        </ReactQueryProvider>
      </main>
    </ServerLayout>
  );
};

export default RootLayout;
