import axios from "axios";
import { queryClient } from "./ReactQueryProvider";

const options = {
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true
}

// Separate client for token refresh
const TokenRefreshClient = axios.create(options);
TokenRefreshClient.interceptors.response.use((response) => response.data);

const API = axios.create(options);

let navigate; // Declare a global navigate function

export const setNavigate = (navigateFn) => {
  navigate = navigateFn; // Assign the navigation function dynamically
};

API.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        const { config, response } = error;
        const {status, data} = response || {};

        if (status === 401 && data?.errorCode === "InvalidAccessToken") {
            try {
                await TokenRefreshClient.get("/auth/refresh");
                return TokenRefreshClient(config);
            } catch (error) {
              queryClient.clear();
              if (navigate) {
                navigate("/signin", {
                  query: { redirectUrl: window.location.pathname },
                });
              }
            }
        }
        return Promise.reject({ status, ...data });
    }
);

export default API;


