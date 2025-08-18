import { fetchWithAuth } from "@utils/fetchWithAuth";

export const createSupportTicket = async (payload) => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/ticket-support`,
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

export const getSupportTicketAndMessages = async () => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/ticket-support`,
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

export const sendSupportTicketReply = async (ticketId, message) => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/ticket-support/${ticketId}/reply`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
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
