import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Home: undefined;
    Auth: undefined;
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
    EditSelectAccount: undefined;
    EditSelectCategory: undefined;
    EditSelectTransferAccount: {
      accountType: 'source' | 'to';
    };
    CreateCategory: undefined;
  };

  export type RootNavigationProps = NativeStackNavigationProp<RootStackParamList>;
