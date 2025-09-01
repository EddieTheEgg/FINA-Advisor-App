import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  CreateAccount: undefined;
  SingleAccount: undefined;
  SetupComplete: undefined;
  WelcomeSuccess: undefined;
  ForgotPassword: undefined;
  ResetPassword: { token: string };
};

export type AuthNavigationProps = NativeStackNavigationProp<AuthStackParamList>;
