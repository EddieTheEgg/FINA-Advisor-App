import {createContext, useEffect, useState} from 'react';
import { TokenStorage } from '../../../utils/tokenStorage';
import { accessTokenService } from '../../../api/accesstokenservice';
import { refreshToken } from '../api/api';

type AuthContextType = {
  isLoading: boolean;
  isSignedIn: boolean;
  isFirstTimeUser: boolean;
  signInTokens: (accessToken: string, refreshToken: string, isFirstTime?: boolean) => void;
  signOut: () => Promise<void>;
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  clearFirstTimeUser: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({children}: {children: React.ReactNode}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
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

  // When user signs in, set the access token and refresh token.
  // By default user is not first time user, so only set isFirstTimeUser to true if user signs in after SIGNING UP.
  const signInTokens = (newAccessToken: string, newRefreshToken: string, isFirstTime: boolean = false) => {
    setAccessToken(newAccessToken);
    TokenStorage.setRefreshToken(newRefreshToken);
    accessTokenService.setAccessToken(newAccessToken);
    setIsSignedIn(true);
    setIsFirstTimeUser(isFirstTime);
  };

  // When user goes to dashboard after signing up, clear them as first time user.
  const clearFirstTimeUser = () => {
    setIsFirstTimeUser(false);
  };

  //Reset the auth state when user signs out.
  const signOut = async () => {
    try {
      setIsLoading(true);
      setIsSignedIn(false);
      setIsFirstTimeUser(false);
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
      value={{isLoading, isSignedIn, isFirstTimeUser, signInTokens, signOut, accessToken, setAccessToken, clearFirstTimeUser}}>
      {children}
    </AuthContext.Provider>
  );
}

