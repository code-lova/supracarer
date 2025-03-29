export const registerRequest = async (data) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    // Extract first validation error if "errors" key exists and it's an array
    if (
      errorData.errors &&
      Array.isArray(errorData.errors) &&
      errorData.errors.length > 0
    ) {
      throw new Error(errorData.errors[0].message);
    }
    throw new Error(
      errorData.message || "An error occurred during registration."
    );
  }

  return await response.json();
};
