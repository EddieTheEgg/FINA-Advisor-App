import { View, Text } from 'react-native';
import { useCreateTransactionListStore } from '../../store/useTransactionListStore';
import { styles } from './AccountFilterSelector.styles';
import { FilterButton } from '../FilterButton/FilterButton';
import { useGroupAccounts } from '../../../accounts/hooks/useGroupAccounts';
import { LoadingDots } from '../../../../components/LoadingDots/LoadingDots';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';

export const AccountFilterSelector = () => {

    const {accountsFilterDraft, setAccountsFilterDraft} = useCreateTransactionListStore();

    const {data: groupedAccounts, isPending: isGroupedAccountsPending, error: groupedAccountsError} = useGroupAccounts();

    //Handle account press where if the account is already in the filter, remove it, otherwise add it
    const handleAccountPress = (accountId: string) => {
        if (accountsFilterDraft.length === 0) {
            setAccountsFilterDraft([accountId]);
        } else {
            setAccountsFilterDraft(accountsFilterDraft.includes(accountId) ? accountsFilterDraft.filter((id) => id !== accountId) : [...accountsFilterDraft, accountId]);
        }
    };

    if (groupedAccountsError) {
        return <ErrorScreen
            errorText = "Error: Filter Accounts"
            errorSubText = "Something went wrong loading the accounts"
            errorMessage = {groupedAccountsError.message}
        />;
    }

    return (
        <View style = {styles.accountFilterMainContainer}>
            <Text style = {styles.accountFilterLabel}>Accounts</Text>
            <View style = {styles.accountFilterContainer}>
                {isGroupedAccountsPending || !groupedAccounts ? <LoadingDots /> :
                Object.values(groupedAccounts.accountGroupsData).flatMap((group) => group.map((account) => (
                    <FilterButton
                        key = {account.accountId}
                        label = {account.icon + ' ' + account.name}
                        onPress = {() =>handleAccountPress(account.accountId)}
                        isActive = {accountsFilterDraft.includes(account.accountId)}
                    />
                )))}
            </View>
        </View>
    );
};
