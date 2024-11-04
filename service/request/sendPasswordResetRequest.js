import API from "@config/apiClient";

export const sendPasswordResetRequest = async (email) => {
    try {
      const response = await API.post("/auth/password/forgot", email);
      return response.data; // Return the data from the response
    } catch (error) {
      // Check if the error has a response and extract the message
      if (error.response) {
        const message = error.response.data.message || "An unexpected error occurred.";
        throw new Error(message); // Throw a new Error with the user-friendly message
      } else if (error.request) {
        throw new Error("No response received from the server. Please try again.");
      } else {
        throw new Error("An unexpected error occurred.");
      }
    }
  };
