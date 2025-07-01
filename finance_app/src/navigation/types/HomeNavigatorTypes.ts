import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AccountNavigatorParamList } from './AccountNavigatorTypes';

export type HomeStackParamList = {
  Dashboard: undefined;
  Accounts: NavigatorScreenParams<AccountNavigatorParamList>;
  Transactions: undefined;
  Insights: undefined;
  Profile: undefined;
};

export type HomeNavigationProps = NativeStackNavigationProp<HomeStackParamList>;
