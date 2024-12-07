import API from "@config/apiClient";

export const logoutRequest = async () => {
  try {
    await API.get("/auth/refresh"); // Attempt to refresh the token if needed
  } catch (error) {
    // Proceed with logout even if refresh fails
    throw new Error(error);
  }

  try {
    const response = await API.get("/auth/logout");
    return response;
  } catch (error) {
    throw new Error(error.message || "An unexpected error occurred.");
  }
};
