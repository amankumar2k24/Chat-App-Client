"use client";
import axios from "axios";

// Create an axios instance with default headers
const axiosInterceptor = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // Include cookies with requests
});

export default axiosInterceptor;
