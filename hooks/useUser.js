import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getAuthUser, getClientUser } from "@service/request/user/getAuthUser";

export const AUTH = "auth";

const useUser = (opts = {}) => {
  const { data: session, status } = useSession();

  const role = session?.user?.role ?? null;

  const enabled = status === "authenticated" && !!role;

  const {
    data = null,
    refetch,
    isLoading,
    ...rest
  } = useQuery({
    queryKey: [AUTH, role],
    queryFn: async () => {
      try {
        if (role === "client") {
          return await getClientUser();
        } else {
          return await getAuthUser(); // default to healthworker or admin, etc.
        }
      } catch {
        return null;
      }
    },
    enabled, // only run if authenticated and role is known
    refetchOnWindowFocus: true,
    staleTime: 5 * 60 * 1000,
    ...opts,
  });

  return { user: data, refetch, isLoading: enabled && isLoading, ...rest };
};

export default useUser;
