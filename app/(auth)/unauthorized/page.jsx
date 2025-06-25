"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const UnauthorizedPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [dashboardPath, setDashboardPath] = useState("/");

  useEffect(() => {
    if (session?.user?.role) {
      switch (session.user.role) {
        case "admin":
          setDashboardPath("/admin");
          break;
        case "nurse":
          setDashboardPath("/nurse");
          break;
        case "client":
          setDashboardPath("/client");
          break;
        default:
          setDashboardPath("/");
      }
    }
  }, [session]);

  return (
    <div className="p-12 text-center">
      <h1 className="text-red-400 text-4xl">Permission Denied</h1>
      <p className="text-2xl">
        You don’t have permission to view this resource...
      </p>
      <button
        onClick={() => router.push(dashboardPath)}
        className="text-custom-green hover:text-dark-yellow font-bold text-xl py-6"
      >
        <span className="mr-2">&#8592;</span> Back to dashboard
      </button>
      <div className="flex justify-center">
        <p className="text-[200px] md:text-[300px] font-bold">403</p>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
