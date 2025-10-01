import { fetchWithAuth } from "@utils/fetchWithAuth";


export const processingBookingRequest = async () => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/processing-booking-requests`,
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

  const responseData = await response.json();
  return responseData;
};


export const acceptBookingRequest = async (bookingUuid) => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/confirm-booking-request/${bookingUuid}/accept`,
    {
      method: "PUT",
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

export const getHealthWorkerAppointments = async (params = {}) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/healthworker/appointments${
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


export const updateToOngoingRequest = async (bookingUuid) => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/update-booking-request/${bookingUuid}/ongoing`,
    {
      method: "PUT",
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
