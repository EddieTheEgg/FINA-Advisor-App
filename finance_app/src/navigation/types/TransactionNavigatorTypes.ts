import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type TransactionNavigatorParamList = {
    CreateTransaction: undefined;
    SelectAccount: undefined;
    SelectCategory : undefined;
    CreateCategory: undefined;
};

export type TransactionNavigatorProps = NativeStackNavigationProp<TransactionNavigatorParamList>;
