import { fetchWithAuth } from "@utils/fetchWithAuth";

export const getHealthworkerMessages = async (params = {}) => {
  // Build query string from params
  const queryString = Object.entries(params)
    .filter(([_, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
  const url = `${process.env.NEXT_PUBLIC_API_URL}/admin/support-messages${
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


//Admin reply to health worker message
export const replyToMessage = async (messageData) => {
  const { support_message_uuid, admin_reply } = messageData;

  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/support-messages/reply`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        support_message_uuid,
        admin_reply,
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
      errorData.message || "An error occurred while sending the reply."
    );
  }

  const data = await response.json();
  return data;
};

