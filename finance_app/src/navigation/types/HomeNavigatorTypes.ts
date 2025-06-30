import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AccountNavigatorParamList } from './AccountNavigatorTypes';
import { AccountResponse } from '../../features/accounts/types';

export type HomeStackParamList = {
  Dashboard: undefined;
  Accounts: NavigatorScreenParams<AccountNavigatorParamList>;
  Transactions: { thisAccountDetails: AccountResponse } |undefined;
  Insights: undefined;
  Profile: undefined;
};

export type HomeNavigationProps = NativeStackNavigationProp<HomeStackParamList>;
