import { getAuthUserRequest } from "@service/request/user/getAuthUserRequest";
import { useQuery } from "@tanstack/react-query";


export const AUTH = "auth";

const useUser = (opts = {}) => {
  const {
    data: user = null,
    refetch,
    isLoading,
    isError,
    error,
    ...rest
  } = useQuery({
    queryKey: [AUTH],
    queryFn: async () => {
      try {
        const result = await getAuthUserRequest();
        return result ?? null; // Ensure result is never undefined
      } catch (error) {
        throw new Error("Failed to fetch user");
      }
    },
    cacheTime: 5 * 60 * 1000, // Cache for 5 minutes
    staleTime: 5 * 60 * 1000, // Five minutes to avoid too frequent refetching
    refetchOnWindowFocus: true, // Refresh user data on focus
    retry: 1, // Retry once if the query fails
    ...opts,
  });
  return { user, refetch, isLoading, isError, error, ...rest };
};

export default useUser;