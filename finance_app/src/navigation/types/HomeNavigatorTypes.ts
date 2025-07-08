import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AccountNavigatorParamList } from './AccountNavigatorTypes';
import { TransactionNavigatorParamList } from './TransactionNavigatorTypes';

export type HomeStackParamList = {
  Dashboard: undefined;
  Accounts: NavigatorScreenParams<AccountNavigatorParamList>;
  Transactions: NavigatorScreenParams<TransactionNavigatorParamList>;
  Insights: undefined;
  Profile: undefined;
};

export type HomeNavigationProps = NativeStackNavigationProp<HomeStackParamList>;
