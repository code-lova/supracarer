import { fetchWithAuth } from "@utils/fetchWithAuth";

export const showAllBookingRequests = async (params = {}) => {
  const queryString = new URLSearchParams(
    Object.entries(params).filter(
      ([k, v]) => v && (k !== "status" || v !== "All")
    )
  ).toString();

  const url = `${process.env.NEXT_PUBLIC_API_URL}/booking-requests${
    queryString ? `?${queryString}` : ""
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

export const getAllhealthWorkers = async () => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/all-health-workers`,
    {
      method: "GET",
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

  return response.json();
};

export const processBookingRequest = async (
  bookingUuid,
  healthWorkerUuid = null
) => {
  const requestBody = {
    action: "processing",
  };

  // Add health worker UUID if provided (for assignment)
  if (healthWorkerUuid) {
    requestBody.health_worker_uuid = healthWorkerUuid;
  }

  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/booking-request/${bookingUuid}/processing`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
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

  return response.json();
};

export const completeBookingRequest = async (bookingUuid, rating, review) => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/booking-request/${bookingUuid}/done`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "Done",
        rating,
        review,
      }),
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

  return response.json();
};

export const cancelBookingRequest = async (
  bookingUuid,
  reasonForCancellation
) => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/booking-request/${bookingUuid}/cancel`,
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

export const deleteBookingRequest = async (bookingUuid) => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/booking-request/${bookingUuid}/delete`,
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
