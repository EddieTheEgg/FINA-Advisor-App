import axios from 'axios';
//import { Platform } from 'react-native';
import { TokenStorage } from '../utils/tokenStorage';
import type { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { accessTokenService } from './accesstokenservice';
import { refreshToken } from '../features/auth/api/api';
import { authManager } from '../utils/authManager';

// Use production URL
// Note: Hardcoded to avoid __DEV__ issues in production builds
const getBaseURL = () => {
  return 'https://finance--connection.app';
};

  // Create axios instance with base URL and headers
  export const api = axios.create({
  baseURL: getBaseURL(),
    headers: {
      'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout for complex operations
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
}, (error) => {
  return Promise.reject(error);
});

// Handle responses and errors
api.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
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
      if (!error.response) {
        // Network error - retry once for timeouts
        if (error.code === 'ECONNABORTED') {
          if (!originalRequest._retry && originalRequest._retry !== 0) {
            originalRequest._retry = 0;
            await new Promise(resolve => setTimeout(resolve, 2000));
            return api(originalRequest);
          }
        }
      }

      return Promise.reject(error);
    }
  );

export default api;
