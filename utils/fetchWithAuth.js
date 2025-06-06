import { signOut, getSession } from "next-auth/react";

export const fetchWithAuth = async (url, options = {}) => {
  let session = await getSession();

  if (!session?.accessToken) {
    throw new Error("No access token found. User might be logged out.");
  }

  const isFormData = options.body instanceof FormData;

  let response = await fetch(url, {
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...options.headers,
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  if (response.status === 401) {
    await signOut({ callbackUrl: "/signin" });
    throw new Error("Session expired. Please log in again.");
  }

  return response;
};
