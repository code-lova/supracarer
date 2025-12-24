import { fetchWithAuth } from "@utils/fetchWithAuth";

const BASE_URL = "/client/service-flyers";

const buildUrl = (path = "") => {
  return `${process.env.NEXT_PUBLIC_API_URL}${BASE_URL}${path}`;
};

const handleResponse = async (response) => {
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

export const serviceFlyerRequest = {
  // Get all service flyers with audience as client

  getClientServiceFlyers: async () => {
    const response = await fetchWithAuth(buildUrl(), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    return handleResponse(response);
  },

};
