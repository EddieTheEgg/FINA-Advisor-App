import {createContext, useEffect, useState} from 'react';
import { TokenStorage } from '../../../utils/tokenStorage';
import api from '../../../api/axios';
import { accessTokenService } from '../../../api/accesstokenservice';

type AuthContextType = {
  isLoading: boolean;
  isSignedIn: boolean;
  signIn: (email: string, password: string) => Promise<void>;
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
      const refreshToken = await TokenStorage.getRefreshToken();
      if (refreshToken) {
        setIsSignedIn(true);
      }
    } catch (error) {
      console.error('Error checking auth status, try relogging in:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const signIn = async(email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });
      const data = response.data;
      await TokenStorage.setRefreshToken(data.refresh_token);
      accessTokenService.setToken(data.access_token);
      setAccessToken(data.access_token);
      setIsSignedIn(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Error signing in:', error);
      setIsSignedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

const signOut = async () => {
  try{
    setIsLoading(true);
    setIsSignedIn(false);
    await TokenStorage.clearRefreshToken();
    accessTokenService.setToken(null);
    setAccessToken(null);
  } catch (error) {
    console.error('Error signing out:', error);
  } finally {
    setIsLoading(false);
  }
};

return (
  <AuthContext.Provider
  value={{isLoading, isSignedIn, signIn, signOut, accessToken, setAccessToken}}>
    {children}
  </AuthContext.Provider>
);
  }

