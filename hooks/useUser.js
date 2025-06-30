import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "@service/request/user/getAuthUser";

export const AUTH = "auth";

const useUser = (opts = {}) => {
  const {
    data = null,
    refetch,
    isLoading,
    ...rest
  } = useQuery({
    queryKey: [AUTH],
    queryFn: async () => {
      try {
        return await getAuthUser();
      } catch {
        return null;
      }
    },
    refetchOnWindowFocus: true, // Refresh user data on focus
    staleTime: 5 * 60 * 1000, // Five minutes to avoid too frequent refetching
    ...opts,
  });
  return { user: data, refetch, isLoading, ...rest };
};

export default useUser;