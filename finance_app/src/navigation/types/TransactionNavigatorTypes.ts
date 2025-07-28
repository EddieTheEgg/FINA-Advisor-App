import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type TransactionNavigatorParamList = {
    CreateTransaction: undefined;
    SelectAccount: undefined;
    SelectCategory : undefined;
    CreateCategory: undefined;
    EditSelectAccount: undefined;
    TransactionDetail: {
      transactionId: string;
      accountId?: string;
    };
    EditTransaction: {
      transactionId: string;
    };
    EditTransfer: {
      transactionId: string;
    };
    EditSelectCategory: undefined;
};

export type TransactionNavigatorProps = NativeStackNavigationProp<TransactionNavigatorParamList>;
