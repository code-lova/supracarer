import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import {
  getAuthUser,
  getClientUser,
  getAdminUser,
} from "@service/request/user/getAuthUser";

export const AUTH = "auth";

const useUser = (opts = {}) => {
  const { data: session, status } = useSession();

  const role = session?.user?.role ?? null;
  const enabled = status === "authenticated" && !!role;

  const {
    data = null,
    refetch,
    isLoading,
    isFetching,
    isError,
    ...rest
  } = useQuery({
    queryKey: [AUTH, role],
    queryFn: async () => {
      try {
        if (role === "client") {
          return await getClientUser();
        } else if (role === "healthworker") {
          return await getAuthUser();
        } else if (role === "admin") {
          return await getAdminUser();
        }
      } catch (error) {
        console.error("User fetch error:", error);
        return null;
      }
    },
    enabled,
    // Enhanced caching configuration for better UX
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: false,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    // Keep previous data while fetching new data (prevents loading flicker)
    placeholderData: (previousData) => previousData,
    ...opts,
  });

  return {
    user: data,
    refetch,
    isLoading: enabled && isLoading && !data,
    isFetching: enabled && isFetching,
    isRefreshing: enabled && isFetching && !!data,
    hasData: !!data,
    isError,
    ...rest,
  };
};

export default useUser;
