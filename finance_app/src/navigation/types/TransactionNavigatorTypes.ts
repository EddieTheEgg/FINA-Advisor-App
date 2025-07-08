import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type TransactionNavigatorParamList = {
    CreateTransaction: undefined;
    SelectCategory : undefined;
};

export type TransactionNavigatorProps = NativeStackNavigationProp<TransactionNavigatorParamList>;
