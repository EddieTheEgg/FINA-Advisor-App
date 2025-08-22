import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../features/auth/screens/WelcomeScreen/WelcomeScreen';
import LoginScreen from '../features/auth/screens/LoginScreen/LoginScreen';
import CreateAccountScreen from '../features/auth/screens/CreateAccount/CreateAccount';
import BackButton from '../features/auth/components/GoBackButton/GoBackButton';
import { AuthStackParamList } from './types/AuthNavigatorTypes';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const renderBackButton = () => <BackButton />;

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
            headerShown: true,
            headerTransparent: true,
            headerLeft: renderBackButton,
            headerTitle: '',
        }}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccountScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
