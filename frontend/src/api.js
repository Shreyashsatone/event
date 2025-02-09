import axios from 'axios';

// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://event-czm8.onrender.com/api',
});

// export default api;


// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
