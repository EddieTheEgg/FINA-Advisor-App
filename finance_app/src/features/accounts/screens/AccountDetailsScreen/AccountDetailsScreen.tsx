import { View, Text, FlatList } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { AccountNavigatorParamList } from '../../../../navigation/types/AccountNavigatorTypes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAccountDetails } from '../../hooks/useAccountDetails';
import { useAccountTransactionHistory } from '../../hooks/useAccountTransactionHistory';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { TransactionResponse } from '../../types';
import { styles } from './AccountDetailsScreen.styles';
import { LoadingDots } from '../../../../components/LoadingDots/LoadingDots';
import { AccountTransactionCard } from '../../components/AccountTransactionCard/AccountTransactionCard';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';
import { AccountDetailsCard } from '../../components/AccountDetailsCard/AccountDetailsCard';


type AccountDetailsRouteProp = RouteProp<AccountNavigatorParamList, 'AccountDetails'>;

export const AccountDetailsScreen = ({ route } : {route: AccountDetailsRouteProp}) => {
    const { accountId } = route.params;
    const insets = useSafeAreaInsets();
    const {data : accountDetails,
        isPending : isAccountDetailsPending,
        error : accountDetailsError} = useAccountDetails(accountId);

    const {data : accountTransactions,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isPending : isAccountTransactionsPending,
        error : accountTransactionsError,
        } = useAccountTransactionHistory(accountId);

    if (accountDetailsError || accountTransactionsError) {
        return <ErrorScreen
        errorText = "Error fetching account details or transactions"
        errorSubText = "Please try again later"
        errorMessage = {accountDetailsError?.message || accountTransactionsError?.message || 'Unknown error'} />;
    }

    if (isAccountDetailsPending
        || isAccountTransactionsPending
        || !accountTransactions
        || !accountDetails) {
        return <LoadingDots />;
    }

    return (
        <View style = {[styles.accountDetailsContainer, {paddingTop: insets.top}]}>
            <View style = {styles.accountDetailsHeader}>
                <BackButton />
                <Text style = {styles.accountDetailsTitle}> {accountDetails.name}</Text>
            </View>
            <View style = {styles.accountDetailsCardContainer}>
                <AccountDetailsCard accountDetails = {accountDetails}/>
            </View>
            <View style = {styles.transactionListContainer}>
                <Text style = {styles.transactionListTitle}>Account Transactions</Text>
                <FlatList
                    data = {accountTransactions.pages.flatMap(page => page.transactions)}
                    renderItem = {({item}) => <AccountTransactionCard transactionData = {item}/>}
                    keyExtractor = {(item : TransactionResponse, index: number) => `transaction-${item.transactionId}-${index}`}
                    onEndReached = {() => {
                        if (hasNextPage && !isFetchingNextPage) {
                            fetchNextPage();
                        }
                    }}
                    onEndReachedThreshold = {0.5}
                    ListFooterComponent = {isFetchingNextPage ? <LoadingDots /> : null}
                />
            </View>
        </View>
    );
};
