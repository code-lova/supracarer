import { fetchWithAuth } from "@utils/fetchWithAuth";

export const logoutRequest = async () => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/logout`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Server Error, Try again Later");
  }

  const data = await response.json();
  return data;
};
