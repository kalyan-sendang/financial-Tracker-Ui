import axios from "axios"
import Cookies from "js-cookie";

const axiosInstance = axios.create({
    baseURL: import.meta.env.REACT_APP_API_URL ?? "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    }
});

// Add a request interceptor to update the Authorization header with the latest token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get('auth') ?? "";
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
