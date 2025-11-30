import axios from 'axios';
//import { Platform } from 'react-native';
import { TokenStorage } from '../utils/tokenStorage';
import type { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { accessTokenService } from './accesstokenservice';
import { refreshToken } from '../features/auth/api/api';
import { authManager } from '../utils/authManager';

// Use localhost for development, production URL for production
const getBaseURL = () => {
  // TEMPORARY FIX: Force production URL for now
  // Sometimes __DEV__ doesn't work correctly in production builds
  return 'https://finance--connection.app';
  
  // Check if we're in development mode
  // if (__DEV__) {
  //   // For iOS simulator, use localhost
  //   // For Android emulator, use 10.0.2.2
  //   // For physical device, use your computer's IP address
  //   return 'http://localhost:8000';
  // }
  // // Production URL
  // return 'https://finance--connection.app';
};

  // Create axios instance with base URL and headers
  export const api = axios.create({
  baseURL: getBaseURL(),
    headers: {
      'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout for complex operations
});

// Log the base URL on initialization (only in dev)
if (__DEV__) {
  console.log('🌐 Axios baseURL configured:', api.defaults.baseURL);
}

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
  if (__DEV__) {
    console.log(`🤖 AI Request: { method: ${config.method}, url: ${config.url}, fullURL: ${config.baseURL}${config.url}, hasToken: ${!!token} }`);
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    if (__DEV__) {
      console.warn('⚠️ No auth token found for request:', config.url);
    }
  }
  return config;
}, (error) => {
  if (__DEV__) {
    console.error('❌ AI Request Error (Interceptor):', error.message);
  }
  return Promise.reject(error);
});

// Handle responses and errors
api.interceptors.response.use(
    (response: AxiosResponse) => {
      if (__DEV__) {
        console.log(`✅ AI Response: { url: ${response.config.url}, status: ${response.status} }`);
      }
      return response;
    },
    async (error: AxiosError) => {
      if (__DEV__) {
        console.error(`❌ AI Request Error: { url: ${error.config?.url}, status: ${error.response?.status}, message: ${error.message} }`);
      }
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
          if (__DEV__) {
          console.log('Token refresh failed, redirecting to login');
          }
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
        if (__DEV__) {
        console.error('Network error:', error.message);
        }
        // Show user-friendly network error
        if (error.code === 'ECONNABORTED') {
          if (__DEV__) {
          console.log('Request timed out - please check your connection');
          }
          // Add retry logic for timeouts
          if (!originalRequest._retry && originalRequest._retry !== 0) {
            originalRequest._retry = 0;
            // Wait a bit and retry once
            await new Promise(resolve => setTimeout(resolve, 2000));
            return api(originalRequest);
          }
        } else if (error.code === 'ENOTFOUND') {
          if (__DEV__) {
          console.log('Unable to reach server - please check your connection');
          }
        }
      } else if (status === 403) {
        if (__DEV__) {
        console.warn('Access denied');
        }
      } else if (status === 404) {
        if (__DEV__) {
        console.warn('Resource not found');
        }
      } else if (status && status >= 500) {
        if (__DEV__) {
        console.error('Server error:', status);
        }
      }

      return Promise.reject(error);
    }
  );

export default api;
