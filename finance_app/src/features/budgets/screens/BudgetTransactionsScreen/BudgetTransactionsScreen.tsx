import { View, Text, FlatList } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { BudgetsNavigatorParamList } from '../../../../navigation/types/BudgetsNavigatorTypes';
import { BudgetsNavigatorProps } from '../../../../navigation/types/BudgetsNavigatorTypes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './BudgetTransactionsScreen.styles';
import { useGetBudgetDetails } from '../../hooks/useGetBudgetDetails';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen';
import { truncateText } from '../../../../utils/textFormat';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { colors } from '../../../../styles/colors';
import { formatDate, formatDateMonthYear } from '../../../../utils/formatDate';
import { useGetBudgetTransactions } from '../../hooks/useGetBudgetTransactions';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { LoadingDots } from '../../../../components/LoadingDots/LoadingDots';
import { spacing } from '../../../../styles/spacing';

type BudgetTransactionScreenProps = {
    route: RouteProp<BudgetsNavigatorParamList, 'BudgetTransactions'>;
    navigation: BudgetsNavigatorProps;
}

const seperator = () => {
    return <View style={{height: spacing.md}} />;
  };

  
export const BudgetTransactionsScreen = ({route, navigation}: BudgetTransactionScreenProps) => {
    const insets = useSafeAreaInsets();
    const {budgetId} = route.params;

    const {data : budgetData, isPending : isPendingBudgetData, error : errorBudgetData} = useGetBudgetDetails(budgetId);
    const {
        data : budgetTransactionsData,
        isPending : isPendingBudgetTransactionsData,
        error : errorBudgetTransactionsData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useGetBudgetTransactions({budgetId});

    if (isPendingBudgetData || !budgetData || isPendingBudgetTransactionsData || !budgetTransactionsData) {
        return <LoadingScreen />;
    }
    if (errorBudgetData || errorBudgetTransactionsData) {
        return <ErrorScreen
            errorText = "Error fetching budget details"
            errorSubText = "Please try again later"
            errorMessage = {errorBudgetData?.message || errorBudgetTransactionsData?.message || 'Some unknown error occured'}
        />;
    }

    const month = formatDateMonthYear(budgetData.coreBudgetData.budgetPeriod).split(' ')[0];

    const budgetTransactionsFormattedData = budgetTransactionsData.pages.flatMap((page) => page.transactions);

    const handleNavToTransactionDetails = (transactionId: string) => {
        navigation.getParent()?.getParent()?.navigate('TransactionDetail', {transactionId});
    };

    const renderTransactionItem = ({ item: transaction }: { item: any }) => (
        <View>
            <AnimatedPressable
                onPress = {() => handleNavToTransactionDetails(transaction.transactionId)}
                style = {styles.transactionItem}
            >
                <Text style = {[styles.transactionIcon, {backgroundColor: transaction.categoryColor}]}>{transaction.categoryIcon}</Text>
                <View style = {styles.transactionDetails}>
                    <Text style = {styles.transactionTitle}>{truncateText(transaction.transactionTitle, 18)}</Text>
                    <Text style = {styles.transactionDate}>{formatDate(transaction.transactionDate)}</Text>
                </View>
                <Text style = {styles.transactionAmount}>-${truncateText(transaction.transactionAmount.toFixed(2).toString(), 10)}</Text>
            </AnimatedPressable>
            <View style = {styles.transactionItemSeparator} />
        </View>
    );

    return (
        <View style = {[styles.container, {paddingTop: insets.top}]}>
            <View style = {styles.headerSection}>
                <BackButton />
                <Text style = {styles.headerTitle}>{truncateText(budgetData.coreBudgetData.budgetTitle, 18)} Transactions</Text>
                <FontAwesome6 name = "empty-space" size = {24} color = {colors.background} />
            </View>
            <View style = {styles.transactionListHeader}>
                <Text style = {styles.transactionListTitle}>{month} Transactions</Text>
                <Text style = {styles.transactionListSubtitle}>{budgetTransactionsFormattedData.length} total</Text>
            </View>
            <FlatList
                data = {budgetTransactionsFormattedData}
                renderItem = {renderTransactionItem}
                keyExtractor = {(item) => item.transactionId}
                style = {styles.transactionListSection}
                contentContainerStyle = {styles.transactionListSectionContent}
                showsVerticalScrollIndicator = {false}
                ItemSeparatorComponent = {seperator}
                onEndReached = {() => {
                    if (hasNextPage && !isFetchingNextPage) {
                        fetchNextPage();
                    }
                }}
                onEndReachedThreshold = {0.5}
                ListFooterComponent = {isFetchingNextPage ? <LoadingDots /> : null}
            />
        </View>
    );
};
