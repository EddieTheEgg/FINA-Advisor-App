import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type DashboardStackParamList = {
    DashboardMenu: undefined;
    TransactionList: undefined;
};

export type DashboardNavigationProps = NativeStackNavigationProp<DashboardStackParamList>;
