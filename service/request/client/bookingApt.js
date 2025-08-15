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
    if (response.status === 422 && errorData.errors)
      throw new Error(Object.values(errorData.errors).flat().join(" "));
    if (response.status >= 500)
      throw new Error("Server error. Please try again later.");
    throw new Error(
      errorData.message || "An error occurred. Please try again."
    );
  }

  const responseData = await response.json();
  return responseData;
};

export const cancelBooking = async (bookingUuid, reasonForCancellation) => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/booking-appointment/${bookingUuid}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "cancel",
        reason_for_cancellation: reasonForCancellation,
      }),
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
      errorData.message || "An error occurred while cancelling the appointment."
    );
  }

  const responseData = await response.json();
  return responseData;
};

export const deleteBooking = async (bookingUuid) => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/booking-appointment/${bookingUuid}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    if (response.status === 422 && errorData.errors)
      throw new Error(Object.values(errorData.errors).flat().join(" "));
    if (response.status >= 500)
      throw new Error("Server error. Please try again later.");
    throw new Error(
      errorData.message || "An error occurred. Please try again."
    );
  }

  const responseData = await response.json();
  return responseData;
};

export const showBooking = async (params = {}) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/booking-appointment${
    Object.keys(params).length
      ? "?" +
        new URLSearchParams(
          Object.entries(params).filter(
            ([k, v]) => v && (k !== "status" || v !== "All")
          )
        )
      : ""
  }`;

  const response = await fetchWithAuth(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    if (response.status === 422 && errorData.errors)
      throw new Error(Object.values(errorData.errors).flat().join(" "));
    if (response.status >= 500)
      throw new Error("Server error. Please try again later.");
    throw new Error(
      errorData.message || "An error occurred. Please try again."
    );
  }

  return response.json();
};
