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
    // Handle rate limiting (429 Too Many Requests)
    if (response.status === 429) {
      throw new Error("Too many requests. Please try again later.");
    }

    // Try to parse error response as JSON
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      // If response is not valid JSON, throw generic error
      throw new Error("An error occurred. Please try again.");
    }

    if (response.status === 422 && errorData.errors) {
      throw new Error(Object.values(errorData.errors).flat().join(" "));
    }
    throw new Error(errorData.message || "An error occurred.");
  }

  return await response.json();
};
