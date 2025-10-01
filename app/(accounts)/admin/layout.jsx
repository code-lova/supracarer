"use client";
import React, { useState } from "react";
import Sidebar from "../../../components/accounts/admin/ui-kit/Sidebar";
import Navbar from "../../../components/accounts/admin/ui-kit/Navbar";


export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar for desktop & mobile */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Navbar for mobile */}
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 md:p-2">{children}</main>
      </div>
    </div>
  );
}
