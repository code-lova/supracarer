export const sendPasswordResetRequest = async (email) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/forgot-password`,
    {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
        'Accept': 'application/json' 
      },
      body: JSON.stringify(email),
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to send request");
  }

  return response.json();
};
