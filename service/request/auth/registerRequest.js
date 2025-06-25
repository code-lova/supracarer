export const registerRequest = async (data) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    let errorMessage = "An error occurred during registration.";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.errors || errorMessage;
    } catch (e) {
      // fallback if response isn't valid JSON (e.g. plain text or HTML)
      errorMessage =
        response.status === 429
          ? "Too many requests. Please wait a moment and try again."
          : errorMessage;
    }
    throw new Error(errorMessage);
  }

  return await response.json();
};
