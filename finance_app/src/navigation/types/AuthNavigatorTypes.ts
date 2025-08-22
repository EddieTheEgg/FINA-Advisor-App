import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  CreateAccount: undefined;
  AddYourAccounts: undefined;
  CreateYourAccounts: undefined;
  ChooseCategories: undefined;
  WelcomeSuccess: undefined;
};

export type AuthNavigationProps = NativeStackNavigationProp<AuthStackParamList>;
