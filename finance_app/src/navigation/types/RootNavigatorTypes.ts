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
      accountId?: string;
    };
  };

  export type RootNavigationProps = NativeStackNavigationProp<RootStackParamList>;
