import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthNavigator from './src/navigation/AuthNavigator.tsx';
import { AuthProvider } from './src/features/auth/context/AuthContext.tsx';
import { HomeNavigator } from './src/navigation/HomeNavigator.tsx';
import { useAuth } from './src/features/auth/hooks/useAuth.tsx';
import LoadingScreen from './src/components/LoadingScreen/LoadingScreen.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransactionDetailScreen } from './src/features/transaction/screens/TransactionDetailScreen/TransactionDetailScreen';
import { EditTransactionScreen } from './src/features/transaction/screens/EditTransactionScreen/EditTransactionScreen';
import { RootStackParamList } from './src/navigation/types/RootNavigatorTypes';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppContent = () => {
  const {isSignedIn, isLoading} = useAuth();

// show a loading state while checking the auth status
  if (isLoading || isSignedIn === null) {
    return <LoadingScreen />;
  }

  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {isSignedIn ? (
            <>
              <Stack.Screen name= "Home" component={HomeNavigator} />
              <Stack.Screen name = "TransactionDetail" component={TransactionDetailScreen} />
              <Stack.Screen name =  "EditTransaction" component={EditTransactionScreen} />
            </>
          ) : (
            <Stack.Screen name="Auth" component={AuthNavigator} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
  );
};


const App = () => {
  const queryClient = new QueryClient();

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;
