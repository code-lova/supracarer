export const verifyEmailRequest = async (data) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/verify-email`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Email verification failed");
  }

  return await response.json();
};
