import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type DashboardStackParamList = {
    DashboardMenu: undefined;
    TransactionList: undefined;
    Settings: undefined;
};

export type DashboardNavigationProps = NativeStackNavigationProp<DashboardStackParamList>;
