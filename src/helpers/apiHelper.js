// src/apiHelper.js
import axios from "axios";
import { toast } from "react-toastify";
import { getAuthToken, removeAuthInfo } from "./authHelper";
import ROUTES from "./routesHelper";
import { getDeviceId, logger } from "./commonHelper";

// Create an instance of axios with default settings
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/api/v1", // Replace with your API base URL
  timeout: 60000, // Timeout after 10 seconds
  headers: {
    "Content-Type": "application/json",
    "DeviceId": getDeviceId(),
  },
});

// Response interceptor (for handling responses and errors globally)
apiClient.interceptors.response.use(
  (response) => response.data || null,
  (error) => {
    toast.error(
      error.response.data.message ||
      error.message ||
      "Something went wrong, please try again later."
    );
    logger("ERROR RESPONSE ::: ", error);
    // Handle response errors
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error (e.g., redirect to login)
      removeAuthInfo();
      window.location.href = ROUTES.LOGIN;
    }
    return Promise.reject(error.response.data);
  }
);

export const updateAuthToken = () => {
  // Request interceptor (if you need to add tokens or other headers)
  apiClient.interceptors.request.use(
    (config) => {
      // Modify the request config before sending the request
      const token = getAuthToken(); // Example: Get token from localStorage
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      // Handle request errors
      return Promise.reject(error);
    }
  );
};
updateAuthToken();

// Basic functions for making API calls
export const apiGet = async (url, params = {}) => {
  return apiClient.get(url, { params });
};

export const apiPost = async (url, data = {}) => {
  return apiClient.post(url, data);
};

export const apiPut = async (url, data = {}) => {
  return apiClient.put(url, data);
};

export const apiDelete = async (url) => {
  return apiClient.delete(url);
};

// Export the apiClient if you need to use it directly for advanced use cases
export default apiClient;
