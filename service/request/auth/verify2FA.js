import { fetchWithAuth } from "@utils/fetchWithAuth";

export const verify2FA = async (code, email) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-2fa`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Real-User-Agent": navigator.userAgent,
      },
      body: JSON.stringify({
        code,
        email,
        userAgent: navigator.userAgent,
      }),
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

export const resend2FA = async (email) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/resend-2fa`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Real-User-Agent": navigator.userAgent,
      },
      body: JSON.stringify({
        email,
        userAgent: navigator.userAgent,
      }),
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
