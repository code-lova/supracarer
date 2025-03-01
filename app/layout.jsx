"use client";
import "@styles/global.css";
import { Toaster } from "react-hot-toast";
import { ReactQueryProvider } from "@config/ReactQueryProvider";
import { SessionProvider } from "next-auth/react";
import Navbar from "@components/pages/Navbar";
import { usePathname } from "next/navigation";

import ServerLayout from "./ServerLayout";

const RootLayout = ({ children }) => {
  const pathname = usePathname();
  return (
    <ServerLayout>
      <div className="main">
        <div className="gradient"></div>
      </div>

      <main className="app">
        <SessionProvider>
          <ReactQueryProvider>
            { pathname !== "/" && <Navbar />}
            {children}
            <Toaster />
          </ReactQueryProvider>
        </SessionProvider>
      </main>
    </ServerLayout>
  );
};

export default RootLayout;
