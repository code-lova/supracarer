import { fetchWithAuth } from "@utils/fetchWithAuth";

export const sendEmail = async (emailData) => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/send-email`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    if (response.status === 422 && errorData.errors)
      throw new Error(Object.values(errorData.errors).flat().join(" "));
    if (response.status >= 500)
      throw new Error("Server error. Please try again later.");
    throw new Error(
      errorData.message || "An error occurred while sending email."
    );
  }

  const data = await response.json();
  return data;
};
