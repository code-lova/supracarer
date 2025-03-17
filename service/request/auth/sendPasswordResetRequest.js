export const sendPasswordResetRequest = async (email) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/password/forgot`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(email),
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to send request");
  }

  return response.json();
};
