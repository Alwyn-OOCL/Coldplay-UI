import axios from "axios";

const baseApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:8080",
});

// Add a request interceptor
baseApi.interceptors.request.use(
  (config) => {
    // You can add any custom logic before the request is sent
    const token = localStorage.getItem("user");
    if (token) {
      const cleanedToken = token.replace(/^"|"$/g, ""); // Remove surrounding quotes
      config.headers["Authorization"] = `Bearer ${cleanedToken}`;
    }
    return config;
  },
  (error) => {
    // Handle the request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
baseApi.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Handle global errors here
    if (error.response && error.response.status === 404) {
      window.location.href = "/404-not-found";
    }

    if (error.response && error.response.status === 500) {
      window.location.href = "/server-error";
    }

    console.error("Response Error:", error);
    return Promise.reject(error);
  }
);

export default baseApi;
