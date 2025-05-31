export const resendVerification = async (email) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/resend-verification`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(email),
      }
    );
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Server Error, Try again Later");
    }
  
    return await response.json();
  };
  