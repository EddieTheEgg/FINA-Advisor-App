import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AccountNavigatorParamList = {
    AccountsList: undefined;
    AccountDetails: { accountId: string };
    Transfer: undefined;
    TransferAccountSelection: {
        selectionType: 'from' | 'to';
    };
};

export type AccountNavigatorProps = NativeStackNavigationProp<AccountNavigatorParamList>;
