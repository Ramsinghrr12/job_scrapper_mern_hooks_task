import axios from 'axios';

// Determine API base URL
// In production (Render), use relative URLs since frontend and backend are on same domain
// In development, use localhost:5000
const apiURL = import.meta.env.VITE_API_URL || 
               (import.meta.env.PROD ? '/api' : 'http://localhost:5000');

const API = axios.create({
  baseURL: apiURL,
});

// Add token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;
