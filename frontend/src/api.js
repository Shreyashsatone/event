import axios from 'axios';

const api = axios.create({
  baseURL: 'https://event-czm8.onrender.com/api',
  withCredentials: true,  // Ensures cookies are sent
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
