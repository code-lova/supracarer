"use client";
import "@styles/global.css";
import { Toaster } from "react-hot-toast";
import { ReactQueryProvider } from "@config/ReactQueryProvider";
import { SessionProvider } from "next-auth/react";

import ServerLayout from "./ServerLayout";

const RootLayout = ({ children }) => {
  return (
    <ServerLayout>
      <div className="main">
        <div className="gradient"></div>
      </div>

      <main className="app">
        <SessionProvider>
          <ReactQueryProvider>
            {children}
            <Toaster />
          </ReactQueryProvider>
        </SessionProvider>
      </main>
    </ServerLayout>
  );
};

export default RootLayout;
