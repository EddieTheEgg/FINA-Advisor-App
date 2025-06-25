import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AccountNavigatorParamList = {
    AccountsList: undefined;
    AccountDetails: { accountId: string };
};

export type AccountNavigatorProps = NativeStackNavigationProp<AccountNavigatorParamList>;
