import API from "@config/apiClient";

export const resetPasswordRequest = async (data) => {
    await API.post("/auth/password/reset", data);      
};
