import axios from "axios";
import {BASE_URL} from "./apiPaths";


const axiosInstance=axios.create({
    baseURL:BASE_URL,
    timeout: 30000, // 10 seconds timeout
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },

});

//request interceptor to add token to headers
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response ){
            if(error.response.status === 401) {
         window.location.href = "/"; // Redirect to login on 401 Unauthorized
            }
            else if (error.response.status ===500){
                console.error("Server error:", error.response.data);
                alert("An unexpected error occurred. Please try again later.");
            }
        }else if (ErrorEvent.code ==="ECONNABORTED") {
                console.error("Request timeout:", error.message);
            }
        return Promise.reject(error);
    }

);
export default axiosInstance;
