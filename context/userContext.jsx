"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import useUser from "@/hooks/useUser";


const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
  const { user, isLoading: isUserLoading, refetch } = useUser();
  const [userState, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize userState when useUser finishes loading
  useEffect(() => {
    if (!isUserLoading) {
      setUser(user || null);
      setIsLoading(false);
    }
  }, [user, isUserLoading]);

  // Manual refetch helper
  const refetchUser = async () => {
    try {
      const { data } = await refetch();
      setUser(data || null);
    } catch {
      setUser(null); // Reset state if the fetch fails
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: userState,
        isLoading,
        refetchUser,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUserContext must be used within a UserProvider");
  return context;
};
