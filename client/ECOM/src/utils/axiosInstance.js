import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Attach token automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (optional)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 500) {
        console.error("Server error:", error.response.data);
        alert("An unexpected error occurred. Please try again later.");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout:", error.message);
    }
    return Promise.reject(error); // Let component handle 401
  }
);

export default axiosInstance;
