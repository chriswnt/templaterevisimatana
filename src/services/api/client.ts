import axios from 'axios';

import { CONFIG } from 'src/config-global';

const apiClient = axios.create({
  baseURL: CONFIG.apiBaseUrl,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.detail || error.message || 'Connection error';
    return Promise.reject(new Error(message));
  }
);

export default apiClient;
