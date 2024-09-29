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
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwt="));
    if (token) {
      config.headers["Authorization"] = `Bearer ${token.split("=")[1]}`;
    } 
    return config;
  },
  (error) => Promise.reject(error)
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
