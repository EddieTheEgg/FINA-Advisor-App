import * as Keychain from 'react-native-keychain';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

// Store the access token safely
export const TokenStorage = {
  setAccessToken: async (token: string): Promise<void> => {
    try {
      await Keychain.setGenericPassword(ACCESS_TOKEN_KEY, token);
    } catch (error) {
      console.error('Error storing access token:', error);
    }
  },

  // Get access token
  getAccessToken: async (): Promise<string | null> => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        return credentials.password;
      }
      return null;
    } catch (error) {
      console.error('Error retrieving access token:', error);
      return null;
    }
  },

  // Store refresh token
  setRefreshToken: async (token: string): Promise<void> => {
    try {
      await Keychain.setInternetCredentials(REFRESH_TOKEN_KEY, REFRESH_TOKEN_KEY, token);
    } catch (error) {
      console.error('Error storing refresh token:', error);
    }
  },

  // Get refresh token
  getRefreshToken: async (): Promise<string | null> => {
    try {
      const credentials = await Keychain.getInternetCredentials(REFRESH_TOKEN_KEY);
      if (credentials) {
        return credentials.password;
      }
      return null;
    } catch (error) {
      console.error('Error retrieving refresh token:', error);
      return null;
    }
  },

  // Clear all tokens (for logout)
  clearTokens: async (): Promise<void> => {
    try {
      await Keychain.resetGenericPassword();
      await Keychain.resetInternetCredentials(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Error clearing tokens:', error);
    }
  },
};
