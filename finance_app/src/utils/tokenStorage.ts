import * as Keychain from 'react-native-keychain';

const REFRESH_TOKEN_KEY = 'refresh_token';
const REFRESH_TOKEN_URL = 'https://refresh-token';

export const TokenStorage = {
  setRefreshToken: async (token: string): Promise<void> => {
    try {
      await Keychain.setInternetCredentials(REFRESH_TOKEN_URL, REFRESH_TOKEN_KEY, token);
    } catch (error) {
      console.error('Error storing refresh token:', error);
    }
  },

  getRefreshToken: async (): Promise<string | null> => {
    try {
      const credentials = await Keychain.getInternetCredentials(REFRESH_TOKEN_URL);
      if (credentials) {
        return credentials.password;
      }
      return null;
    } catch (error) {
      console.error('Error retrieving refresh token:', error);
      return null;
    }
  },

  clearRefreshToken: async (): Promise<void> => {
    try {
      await Keychain.resetInternetCredentials({ server: REFRESH_TOKEN_URL });
    } catch (error) {
      console.error('Error clearing refresh token:', error);
    }
  },
};
