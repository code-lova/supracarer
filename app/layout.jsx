"use client";
import "@styles/global.css";
import { Toaster } from "react-hot-toast";
import { ReactQueryProvider } from "@config/ReactQueryProvider";
import { SessionProvider } from "next-auth/react";
import Navbar from "@components/pages/Navbar";
import { usePathname } from "next/navigation";
import ServerLayout from "./ServerLayout";
import { showNavbarPaths } from "@utils/navbarPaths";

const RootLayout = ({ children }) => {
  const pathname = usePathname();

  const shouldShowNavbar = showNavbarPaths.includes(pathname);

  return (
    <ServerLayout>
      <div className="main">
        <div className="gradient"></div>
      </div>

      <main className="app">
        <SessionProvider>
          <ReactQueryProvider>
            {shouldShowNavbar && <Navbar />}
            {children}
            <Toaster />
          </ReactQueryProvider>
        </SessionProvider>
      </main>
    </ServerLayout>
  );
};

export default RootLayout;
