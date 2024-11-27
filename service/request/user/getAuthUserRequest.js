import API from "@config/apiClient";

export const getAuthUserRequest = async () => {
  try {
    const response = await API.get("/user");
    return response ?? null;
  } catch (error) {
    throw error;
  }
};
