import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  CreateAccount: undefined;
};

export type AuthNavigationProps = NativeStackNavigationProp<AuthStackParamList>;
