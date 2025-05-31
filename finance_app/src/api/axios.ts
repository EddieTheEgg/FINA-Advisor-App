import axios from 'axios';
import { Platform } from 'react-native';
import { TokenStorage } from '../utils/tokenStorage';
import type { AxiosResponse, AxiosError } from 'axios';

export const api = axios.create({
  baseURL: Platform.OS === 'android'
    ? 'http://10.0.2.2:8000'
    : 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const status = error.response?.status;
      if (!error.response) {
        console.error('Network error:', error.message);
      } else if (status === 401) {
        await TokenStorage.clearRefreshToken();
      } else if (status === 403) {
        console.warn('Access denied');
      } else if (status === 404) {
        console.warn('Resource not found');
      } else if (status && status >= 500) {
        console.error('Server error:', status);
      }
        return Promise.reject(error); // Always rethrow so individual components can still handle
    }
  );

export default api;
