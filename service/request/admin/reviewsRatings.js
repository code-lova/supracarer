import { fetchWithAuth } from "@utils/fetchWithAuth";

export const fetchRatingsReviews = async (params = {}) => {
  // Build query string from params
  const queryString = Object.entries(params)
    .filter(([_, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
  const url = `${process.env.NEXT_PUBLIC_API_URL}/admin/ratings-review${
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
