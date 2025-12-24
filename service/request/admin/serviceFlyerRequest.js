import { fetchWithAuth } from "@utils/fetchWithAuth";

const BASE_URL = "/admin/service-flyers";

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

export const serviceFlyerService = {
  // Get all service flyers with filters and pagination
  getServiceFlyers: async ({
    page = 1,
    per_page = 12,
    search = "",
    target_audience = "",
    status = "",
  } = {}) => {
    const params = new URLSearchParams();

    if (page) params.append("page", page.toString());
    if (per_page) params.append("per_page", per_page.toString());
    if (search) params.append("search", search);
    if (target_audience) params.append("target_audience", target_audience);
    if (status && status !== "All") params.append("status", status);

    const queryString = params.toString();
    const url = buildUrl(queryString ? `?${queryString}` : "");

    const response = await fetchWithAuth(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    return handleResponse(response);
  },

  // Create new service flyer
  createServiceFlyer: async (data) => {
    const response = await fetchWithAuth(buildUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return handleResponse(response);
  },

  // Update service flyer
  updateServiceFlyer: async (uuid, data) => {
    const response = await fetchWithAuth(buildUrl(`/${uuid}`), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return handleResponse(response);
  },

  // Delete service flyer
  deleteServiceFlyer: async (uuid) => {
    const response = await fetchWithAuth(buildUrl(`/${uuid}`), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    return handleResponse(response);
  },

  // Toggle service flyer status
  toggleServiceFlyerStatus: async (uuid) => {
    const response = await fetchWithAuth(buildUrl(`/${uuid}/toggle-status`), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });

    return handleResponse(response);
  },

  // Update sort order
  updateSortOrder: async (sortData) => {
    const response = await fetchWithAuth(buildUrl("/sort-order"), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sortData),
    });

    return handleResponse(response);
  },
};
