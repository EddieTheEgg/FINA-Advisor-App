import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AccountResponse } from '../../features/accounts/types';

export type AccountNavigatorParamList = {
    AccountsList: undefined;
    AccountDetails: { accountId: string };
    Transfer: {
        fromAccountDetails: AccountResponse | undefined,
        toAccountDetails: AccountResponse | undefined
    };
    TransferAccountSelection: { fromAccountDetails: AccountResponse | undefined };
};

export type AccountNavigatorProps = NativeStackNavigationProp<AccountNavigatorParamList>;
