import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigation/AuthNavigator.tsx';
import { AuthProvider } from './src/features/auth/context/AuthContext.tsx';
import { HomeNavigator } from './src/navigation/HomeNavigator.tsx';
import { useAuth } from './src/features/auth/hooks/useAuth.tsx';
import LoadingScreen from './src/components/LoadingScreen/LoadingScreen.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const AppContent = () => {
  const {isSignedIn, isLoading} = useAuth();

// show a loading state while checking the auth status
  if (isLoading || isSignedIn === null) {
    return <LoadingScreen />;
  }

  return (
      <NavigationContainer>
        {isSignedIn ? <HomeNavigator /> : <AuthNavigator />}
      </NavigationContainer>
  );
};


const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
