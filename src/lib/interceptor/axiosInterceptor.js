"use client";
import axios from "axios";

// Create an axios instance with default headers
const axiosInterceptor = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // Include cookies with requests
});

// Add a request interceptor
axiosInterceptor.interceptors.request.use(
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
);

axiosInterceptor.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Unauthorized access. Please log in.");
      }
    } else {
      console.error("An error occurred:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInterceptor;
