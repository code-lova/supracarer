import { fetchWithAuth } from "@utils/fetchWithAuth";

export const createNewSupport = async (payload) => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/support`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }
  );

  if (!response.ok) {
    // Handle rate limiting (429 Too Many Requests)
    if (response.status === 429) {
      throw new Error("Too many requests. Please try again later.");
    }

    // Try to parse error response as JSON
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      // If response is not valid JSON, throw generic error
      throw new Error("An error occurred. Please try again.");
    }

    if (response.status === 422 && errorData.errors) {
      throw new Error(Object.values(errorData.errors).flat().join(" "));
    }
    throw new Error(errorData.message || "An error occurred.");
  }

  const responseData = await response.json();
  return responseData;
};


export const getUserSupportMessages = async () => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/support`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "An error occurred fetching data."
    );
  }

  const responseData = await response.json();
  return responseData;
};


export const getSupportLimit = async () => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/support/limits`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "An error occurred fetching data."
    );
  }

  const responseData = await response.json();
  return responseData;
}


