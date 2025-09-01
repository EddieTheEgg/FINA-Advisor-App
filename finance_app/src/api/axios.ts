import axios from 'axios';
//import { Platform } from 'react-native';
import { TokenStorage } from '../utils/tokenStorage';
import type { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { accessTokenService } from './accesstokenservice';
import { refreshToken } from '../features/auth/api/api';
import { authManager } from '../utils/authManager';

  // Create axios instance with base URL and headers
  export const api = axios.create({
    baseURL: 'http://3.232.108.227:8000',
    headers: {
      'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout instead of 30 minutes
});

// Track if we're currently refreshing a token
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

// Add access token to headers (which is used for any authenticated requests) using singleton pattern
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = accessTokenService.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle responses and errors
api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as any;

      // Skip token refresh for login endpoint
      const isLoginRequest = originalRequest?.url?.includes('/auth/login');
      
      // If it's a 401 and we haven't tried to refresh yet (and it's not a login request)
      if (error.response?.status === 401 && !originalRequest._retry && !isLoginRequest) {
        if (isRefreshing) {
          // If we're already refreshing, queue this request
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          }).catch(err => {
            return Promise.reject(err);
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          // Try to refresh the token
          const storedRefreshToken = await TokenStorage.getRefreshToken();
          if (!storedRefreshToken) {
            throw new Error('No refresh token available');
          }

          // Make refresh request using existing function
          const response = await refreshToken(storedRefreshToken);

          // Update tokens
          accessTokenService.setAccessToken(response.accessToken);
          if (response.refreshToken) {
            await TokenStorage.setRefreshToken(response.refreshToken);
          }

          // Process queued requests
          processQueue(null, response.accessToken);

          // Retry original request
          originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;
          return api(originalRequest);

        } catch (refreshError) {
          // Refresh failed - clear tokens and redirect to login
          console.log('Token refresh failed, redirecting to login');
          processQueue(refreshError, null);

          // Clear tokens and sign out
          accessTokenService.setAccessToken(null);
          await TokenStorage.clearRefreshToken();

          // Trigger sign out through auth manager
          await authManager.signOut();

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      // Handle other errors
      const status = error.response?.status;
      if (!error.response) {
        console.error('Network error:', error.message);
        // Show user-friendly network error
        if (error.code === 'ECONNABORTED') {
          console.log('Request timed out - please check your connection');
        } else if (error.code === 'ENOTFOUND') {
          console.log('Unable to reach server - please check your connection');
        }
      } else if (status === 403) {
        console.warn('Access denied');
      } else if (status === 404) {
        console.warn('Resource not found');
      } else if (status && status >= 500) {
        console.error('Server error:', status);
      }

      return Promise.reject(error);
    }
  );

export default api;
