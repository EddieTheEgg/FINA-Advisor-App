import { View, Text, FlatList, ScrollView, Dimensions} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAccountDetails } from '../../hooks/useAccountDetails';
import { useAccountTransactionHistory } from '../../hooks/useAccountTransactionHistory';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { AccountTransactionResponse } from '../../types';
import { styles } from './AccountDetailsScreen.styles';
import { LoadingDots } from '../../../../components/LoadingDots/LoadingDots';
import { AccountTransactionCard } from '../../components/AccountTransactionCard/AccountTransactionCard';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';
import { AccountDetailsCard } from '../../components/AccountDetailsCard/AccountDetailsCard';
import { NoTransactions } from '../../components/NoTransactions/NoTransactions';
import { TransferButton } from '../../components/TransferButton/TransferButton';
import { AddTransactionButton } from '../../components/AddTransactionButton/AddTransactionButton';
import { RouteProp } from '@react-navigation/native';
import { AccountNavigatorParamList, AccountNavigatorProps } from '../../../../navigation/types/AccountNavigatorTypes';

const SeparatorComponent = () => <View style={styles.separator} />;
const { height } = Dimensions.get('window');
const responsivePadding = height * 0.2;

type AccountDetailsScreenProps = {
    route: RouteProp<AccountNavigatorParamList, 'AccountDetails'>;
    navigation: AccountNavigatorProps;
}

export const AccountDetailsScreen = ({ route, navigation }: AccountDetailsScreenProps) => {
    const { accountId } = route.params;
    const insets = useSafeAreaInsets();

    // Query for account details
    const {data : accountDetails,
        isPending : isAccountDetailsPending,
        error : accountDetailsError} = useAccountDetails(accountId);

    // Query for account transactions
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
        <ScrollView
        style = {[styles.accountDetailsContainer, {paddingTop: insets.top}]}
        showsVerticalScrollIndicator = {false}
        contentContainerStyle = {{paddingBottom: insets.bottom + responsivePadding}}
        >
            <View style = {styles.accountDetailsHeader}>
                <BackButton />
                <Text style = {styles.accountDetailsTitle}> {accountDetails.name}</Text>
            </View>
            <View style = {styles.accountDetailsCardContainer}>
                <AccountDetailsCard accountDetails = {accountDetails}/>
            </View>
             <View style={styles.accountQuickActionCardContainer}>
                <TransferButton fromAccountDetails = {accountDetails} navigation = {navigation} />
                <AddTransactionButton navigation = {navigation} />
            </View>
            <View style = {styles.transactionListContainer}>
                <Text style = {styles.transactionListTitle}>Transaction History</Text>
                {accountTransactions.pages.flatMap(page => page.transactions).length <= 0 ? (
                    <NoTransactions />
            ) : (
                <FlatList
                    style = {styles.transactionHistoryContainer}
                    data = {accountTransactions.pages.flatMap(page => page.transactions)}
                    renderItem = {({item}) => <AccountTransactionCard transactionData = {item} navigation = {navigation}/>}
                    keyExtractor = {(item : AccountTransactionResponse, index: number) => `transaction-${item.transactionId}-${index}`}
                    onEndReached = {() => {
                        if (hasNextPage && !isFetchingNextPage) {
                            fetchNextPage();
                        }
                    }}
                    onEndReachedThreshold = {0.5}
                    ItemSeparatorComponent={SeparatorComponent}
                    scrollEnabled = {false}
                    ListFooterComponent = {isFetchingNextPage ? <LoadingDots /> : null}
                />
                )}
            </View>
        </ScrollView>
    );
};
