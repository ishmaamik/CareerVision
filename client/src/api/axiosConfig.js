import axios from 'axios';

// Base URL for all API calls
const BASE_URL = 'http://localhost:8080/api';

// Create an axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor for adding auth token
axiosInstance.interceptors.request.use(
  config => {
    // You can add authentication token here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // Log detailed error information
    if (error.response) {
      console.error("API Error Response:", {
        data: error.response.data,
        status: error.response.status,
        headers: error.response.headers
      });
    } else if (error.request) {
      console.error("API Error Request:", error.request);
    } else {
      console.error("API Error Message:", error.message);
    }

    // You can add global error handling logic here
    return Promise.reject(error);
  }
);

export default axiosInstance;
