export const loginRequest = async (data) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "An error occurred during login."
    );
  }

  return await response.json();
};
