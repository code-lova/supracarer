export const resetPasswordRequest = async (data) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/reset-password`,
    {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
        'Accept': 'application/json'
      },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to reset password");
  }

  return response.json();
};
