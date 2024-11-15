import API from "@config/apiClient";

export const getAuthUserRequest = async () => {
  try {
    const response = await API.get("/user");
    return response;
  } catch (error) {
    throw error;
  }
};
