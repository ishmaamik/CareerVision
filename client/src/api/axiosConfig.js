import axios from 'axios';

// Base URL for API calls
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Create axios instance with default configuration
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Request interceptor for logging and potential token injection
axiosInstance.interceptors.request.use(
    config => {
        console.log(`Sending request to: ${config.url}`);
        return config;
    },
    error => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor for global error handling
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        console.error('Comprehensive Response Error:', {
            message: error.message,
            url: error.config?.url,
            method: error.config?.method,
            response: error.response ? {
                status: error.response.status,
                data: error.response.data
            } : 'No response'
        });
        
        return Promise.reject(error);
    }
);

export default axiosInstance;
