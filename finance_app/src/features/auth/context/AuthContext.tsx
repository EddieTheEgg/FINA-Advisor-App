import {createContext, useEffect, useState, useCallback} from 'react';
import { TokenStorage } from '../../../utils/tokenStorage';
import { accessTokenService } from '../../../api/accesstokenservice';
import { refreshToken } from '../api/api';
import { useQueryClient } from '@tanstack/react-query';
import { authManager } from '../../../utils/authManager';

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
  const queryClient = useQueryClient();

  const checkAuthStatus = async () => {
    console.log('🔐🔐🔐 AUTH: Starting checkAuthStatus...');
    try {
      console.log('🔐🔐🔐 AUTH: Getting stored refresh token...');
      const storedRefreshToken = await TokenStorage.getRefreshToken();
      console.log('🔐🔐🔐 AUTH: Has stored refresh token?', !!storedRefreshToken);
      
      if (storedRefreshToken) {
        console.log('🔐🔐🔐 AUTH: Calling refreshToken API...');
        const response = await refreshToken(storedRefreshToken);
        console.log('🔐🔐🔐 AUTH: Refresh token API SUCCESS!');
        setAccessToken(response.accessToken);
        accessTokenService.setAccessToken(response.accessToken);
        setIsSignedIn(true);
        console.log('🔐🔐🔐 AUTH: User signed in successfully');
      } else {
        console.log('🔐🔐🔐 AUTH: No stored refresh token, user needs to login');
      }
    } catch (error) {
      console.error('🔐🔐🔐 AUTH ERROR:', error);
      console.log('🔐🔐🔐 AUTH: Clearing tokens due to error');
      setIsSignedIn(false);
      setAccessToken(null);
      accessTokenService.setAccessToken(null);
      await TokenStorage.clearRefreshToken();
    } finally {
      console.log('🔐🔐🔐 AUTH: Setting isLoading to FALSE');
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
  const signOut = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsSignedIn(false);
      setIsFirstTimeUser(false);
      await TokenStorage.clearRefreshToken();
      accessTokenService.setAccessToken(null);
      setAccessToken(null);

      // Clear all React Query cache to prevent data from previous user
      queryClient.clear();
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  }, [queryClient]);

  // Register signOut callback with auth manager for axios interceptor
  useEffect(() => {
    authManager.setSignOutCallback(signOut);
    return () => {
      authManager.clearSignOutCallback();
    };
  }, [signOut]);

  return (
    <AuthContext.Provider
      value={{isLoading, isSignedIn, isFirstTimeUser, signInTokens, signOut, accessToken, setAccessToken, clearFirstTimeUser}}>
      {children}
    </AuthContext.Provider>
  );
}

