import {createContext, useEffect, useState} from 'react';
import { TokenStorage } from '../../../utils/tokenStorage';
import { accessTokenService } from '../../../api/accesstokenservice';
import { refreshToken } from '../api/api';

type AuthContextType = {
  isLoading: boolean;
  isSignedIn: boolean;
  signInTokens: (accessToken: string, refreshToken: string) => void;
  signOut: () => Promise<void>;
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({children}: {children: React.ReactNode}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const checkAuthStatus = async () => {
    try {
      const storedRefreshToken = await TokenStorage.getRefreshToken();
      if (storedRefreshToken) {
        const response = await refreshToken(storedRefreshToken);
        setAccessToken(response.accessToken);
        accessTokenService.setAccessToken(response.accessToken);
        setIsSignedIn(true);
      }
    } catch (error) {
      setIsSignedIn(false);
      setAccessToken(null);
      accessTokenService.setAccessToken(null);
      await TokenStorage.clearRefreshToken();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const signInTokens = (newAccessToken: string, newRefreshToken: string) => {
    setAccessToken(newAccessToken);
    TokenStorage.setRefreshToken(newRefreshToken);
    accessTokenService.setAccessToken(newAccessToken);
    setIsSignedIn(true);
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      setIsSignedIn(false);
      await TokenStorage.clearRefreshToken();
      accessTokenService.setAccessToken(null);
      setAccessToken(null);
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{isLoading, isSignedIn, signInTokens, signOut, accessToken, setAccessToken}}>
      {children}
    </AuthContext.Provider>
  );
}

