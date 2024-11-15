import API from "@config/apiClient";

export const verifyEmailRequest = async (verificationCode) => {
    try {
      const response = await API.get(`/auth/email/verify/${verificationCode}`);
      return response;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
  };