import { fetchWithAuth } from "@utils/fetchWithAuth";

export const enable2Fa = async () => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/enable-2fa`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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

export const disable2Fa = async (password) => {
  const requestBody = password ? { password } : {};

  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/disable-2fa`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
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
