import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TransactionResponse } from '../../features/transaction/types';

export type RootStackParamList = {
    Home: undefined;
    Auth: undefined;
    TransactionDetail: {
      transactionId: string;
      accountId?: string;
    };
    EditTransaction: {
      transactionDetails: TransactionResponse;
    };
    EditSelectAccount: undefined;
  };

  export type RootNavigationProps = NativeStackNavigationProp<RootStackParamList>;
