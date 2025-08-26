import { fetchWithAuth } from "@utils/fetchWithAuth";

export const updateUserPassword = async (passwordData) => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/update-password`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passwordData),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    if (response.status === 422 && errorData.errors)
      throw new Error(Object.values(errorData.errors).flat().join(" "));
    if (response.status >= 500)
      throw new Error("Server error. Please try again later.");
    throw new Error(
      errorData.message || "An error occurred. Please try again."
    );
  }

  return response.json();
};
