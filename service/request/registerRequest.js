import API from "@config/apiClient";

export const registerRequest = async (data) => {
    try {
      const response = await API.post("/auth/register", data);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          error.response.data.message || "An error occurred during registration."
        );
      } else if (error.request) {
        // Request was made but no response was received
        throw new Error(
          "No response received from the server. Please try again."
        );
      } else {
        // Something happened in setting up the request
        throw new Error(error.message || "An unexpected error occurred.");
      }
    }
  };