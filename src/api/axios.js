import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8080",
});

// Attach JWT from localStorage, except for signup/login requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");

  // Skip token for authentication endpoints
  if (
    token &&
    !config.url.includes("/auth/login") &&
    !config.url.includes("/auth/signup")
  ) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Optional: unwrap error message from GlobalExceptionHandler ApiResponse
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const apiMsg = err?.response?.data?.message;
    if (apiMsg) err.message = apiMsg;
    return Promise.reject(err);
  }
);

export default api;
