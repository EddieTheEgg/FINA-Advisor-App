import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AccountResponse } from '../../features/accounts/types';

export type AccountNavigatorParamList = {
    AccountsList: undefined;
    AccountDetails: { accountId: string };
    Transfer: undefined;
    TransferAccountSelection: {
        selectionType: 'from' | 'to';
    };
    AddAccount: undefined;
    EditAccount: { accountDetails: AccountResponse };
};

export type AccountNavigatorProps = NativeStackNavigationProp<AccountNavigatorParamList>;
