export const contactUs = async (payload) => {
  // Prepare the payload with Turnstile token for backend verification
  const requestPayload = {
    fullname: payload.fullname,
    email: payload.email,
    phone: payload.phone,
    subject: payload.subject,
    message: payload.message,
    // Cloudflare Turnstile token for server-side verification
    cf_turnstile_response: payload.turnstileToken || null,
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/contact-us`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestPayload),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    if (response.status === 422 && errorData.errors) {
      throw new Error(Object.values(errorData.errors).flat().join(" "));
    }
    throw new Error(errorData.message || "An error occurred.");
  }

  const responseData = await response.json();
  return responseData;
};
