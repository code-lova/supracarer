export const resetPasswordRequest = async (data) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/password/reset`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to reset password");
  }

  return response.json();
};
