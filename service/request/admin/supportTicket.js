import { fetchWithAuth } from "@utils/fetchWithAuth";

//Fetch all support tickets
export const fetchSupportTickets = async (params = {}) => {
  // Build query string from params
  const queryString = Object.entries(params)
    .filter(([_, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
  const url = `${process.env.NEXT_PUBLIC_API_URL}/admin/support-tickets${
    queryString ? `?${queryString}` : ""
  }`;

  const response = await fetchWithAuth(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
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

  const data = await response.json();
  return data;
};


//Get a support tickey by ID
export const fetchSupportTicketById = async (ticketId) => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/support-tickets/${ticketId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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

  const data = await response.json();
  return data;
};

//Reply to ticket messages
export const replyTicketMessage = async (
  ticketId,
  message,
  closeTicket = false
) => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/support-tickets/${ticketId}/reply`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        close_ticket: closeTicket,
        message,
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

  const responseData = await response.json();
  return responseData;
};

// Update ticket status (open/close)
export const updateTicketStatus = async (ticketId, status) => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/support-tickets/${ticketId}/status`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: status, // "Open" or "Closed"
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

  const responseData = await response.json();
  return responseData;
};
