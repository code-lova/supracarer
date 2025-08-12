import { fetchWithAuth } from "@utils/fetchWithAuth";

export const bookAppointment = async (payload) => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/booking-appointment`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    // Handle validation errors (show specific messages)
    if (response.status === 422 && errorData.errors) {
      throw new Error(Object.values(errorData.errors).flat().join(" "));
    }
    if (response.status >= 500) {
      throw new Error("Server error. Please try again later.");
    }

    // Handle other client errors with generic message or specific message if safe
    throw new Error(
      errorData.message || "An error occurred. Please try again."
    );
  }

  const responseData = await response.json();
  return responseData;
};
