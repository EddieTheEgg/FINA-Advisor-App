import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../features/auth/screens/WelcomeScreen/WelcomeScreen';
import LoginScreen from '../features/auth/screens/LoginScreen/LoginScreen';
import CreateAccountScreen from '../features/auth/screens/CreateAccount/CreateAccount';
import { AuthStackParamList } from './types/AuthNavigatorTypes';
import { SingleAccountSetupScreen } from '../features/auth/screens/SingleAccountSetupScreen/SingleAccountSetupScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options = {{
            headerTransparent: true,
        }}
      />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="SingleAccount" component={SingleAccountSetupScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
