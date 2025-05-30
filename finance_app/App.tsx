import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigation/AuthNavigator.tsx';
import { AuthProvider } from './src/features/auth/context/AuthContext.tsx';
import { HomeNavigator } from './src/navigation/HomeNavigator.tsx';
import { useAuth } from './src/features/auth/hooks/useAuth.tsx';
import LoadingScreen from './src/components/LoadingScreen/LoadingScreen.tsx';

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
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
