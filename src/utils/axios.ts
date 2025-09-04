import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

// Buat instance
const api = axios.create({
  baseURL: "https://rentverse.com", // ganti sesuai API lu
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem("token"); // ambil token dari localStorage
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      // Handle global error
      if (error.response.status === 401) {
        console.log("Unauthorized! Redirect to login.");
        // bisa pakai react-router navigate atau window.location
      }
      if (error.response.status === 403) {
        console.log("Forbidden!");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
