import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AccountNavigatorParamList } from './AccountNavigatorTypes';
import { TransactionNavigatorParamList } from './TransactionNavigatorTypes';
import { BudgetsNavigatorParamList } from './BudgetsNavigatorTypes';

export type HomeStackParamList = {
  Dashboard: undefined;
  Accounts: NavigatorScreenParams<AccountNavigatorParamList>;
  Transactions: NavigatorScreenParams<TransactionNavigatorParamList>;
  Insights: undefined;
  Budgets: NavigatorScreenParams<BudgetsNavigatorParamList>;
};

export type HomeNavigationProps = NativeStackNavigationProp<HomeStackParamList>;
