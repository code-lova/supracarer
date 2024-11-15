import API from "@config/apiClient";

export const logoutRequest = async () => {
  try {
    const response = await API.get("/auth/logout");
    return response;
  } catch (error) {
    throw new Error(error.message || "An unexpected error occurred.");
  }
};
