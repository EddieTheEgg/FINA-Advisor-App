import {createContext, useEffect, useState} from 'react';
import { TokenStorage } from '../../../utils/tokenStorage';

type AuthContextType = {
  isLoading: boolean;
  isSignedIn: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({children}: {children: React.ReactNode}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const checkAuthStatus = async () => {
    try {
      const accessToken = await TokenStorage.getAccessToken();
      if (accessToken) {
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
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });
      const data = await response.json();
      await TokenStorage.setAccessToken(data.access_token);
      await TokenStorage.setRefreshToken(data.refresh_token);
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
  setIsLoading(true);
  try{
    setIsSignedIn(false);
    await TokenStorage.clearTokens();
  } catch (error) {
    console.error('Error signing out:', error);
  } finally {
    setIsLoading(false);
  }
};

return (
  <AuthContext.Provider
  value={{isLoading, isSignedIn, signIn, signOut}}>
    {children}
  </AuthContext.Provider>
);
  }

