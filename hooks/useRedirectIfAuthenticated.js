"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useRedirectIfAuthenticated() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      const role = session?.user?.role;
      const roleDashboardMap = {
        client: "/client",
        healthworker: "/health-service",
        admin: "/admin",
      };

      router.replace(roleDashboardMap[role] || "/");
    }
  }, [status, session, router]);

  return status;
}
