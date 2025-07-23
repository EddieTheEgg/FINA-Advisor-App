import { View, Text, Dimensions, FlatList } from 'react-native';
import React from 'react';
import { useEffect, useState } from 'react';
import { styles } from './TransactionListScreen.styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { TransactionListSummarizeSelector } from '../../components/TransactionListSummarizeSelector/TransactionListSummarizeSelector';
import { useTransactionList } from '../../hooks/useTransactionList';
import { useCreateTransactionListStore } from '../../store/useTransactionListStore';
import { TransactionListStatSummarizer } from '../../components/TransactionListStatSummarizer/TransactionListStatSummarizer';
import { LoadingDots } from '../../../../components/LoadingDots/LoadingDots';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';
import { TransactionItem } from '../../components/TransactionItem/TransactionItem';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { FilterTransactionsModal } from '../../components/FilterTransactionsModal/FilterTransactionsModal';
import { TransactionSummary } from '../../types';
import { DashboardNavigationProps } from '../../../../navigation/types/DashboardNavigatorTypes';



type TransactionListScreenProps = {
    navigation: DashboardNavigationProps;
};

export const TransactionListScreen = ({navigation}: TransactionListScreenProps) => {

    const insets = useSafeAreaInsets();
    const canvasPadding = Dimensions.get('window').height * 0.04;

    const {
        date,
        transactionListType,
        sortBy,
        sortOrder,
        accountsFilter,
        categoriesFilter,
        setMonthIncome,
        setMonthExpense,
        setMonthTransfer,
        initializeDraftFromCurrentFilters,
        applyDraftFilters,
    } = useCreateTransactionListStore();

    const request = {
        transaction_type: transactionListType,
        transaction_timeframe: date,
        // Include filter parameters - only add them if they have values
        ...(accountsFilter.length > 0 && { account_ids: accountsFilter }),
        ...(categoriesFilter.length > 0 && { category_ids: categoriesFilter }),
        sort_by: sortBy,
        sort_order: sortOrder,
    };

    const {data, isPending, error, fetchNextPage, hasNextPage} = useTransactionList(request);

    const handleApplyFilters = () => {
        applyDraftFilters();
        setFilterTransactionsModalVisible(false);
    };

    const handleOpenFilterModal = () => {
        initializeDraftFromCurrentFilters();
        setFilterTransactionsModalVisible(true);
    };


    useEffect(() => {
        if (data?.summary) {
            setMonthIncome(data.summary.monthIncome);
            setMonthExpense(data.summary.monthExpense);
            setMonthTransfer(data.summary.monthTransfer);
        }
    }, [data?.summary, setMonthIncome, setMonthExpense, setMonthTransfer, data?.transactions]);

    const [filterTransactionsModalVisible, setFilterTransactionsModalVisible] = useState(false);

    if (error) {
        return <ErrorScreen
            errorText = "Error"
            errorSubText = "Something went wrong, please try again"
            errorMessage = {error.message}
        />;
    }


    const renderTransactionItem = ({ item: transaction }: { item: TransactionSummary }) => (
        <View>
            <TransactionItem transaction = {transaction} navigation = {navigation} />
            <View style = {styles.selectorDivider} key = {Math.random()} />
        </View>
    );

    return (
        <View style={[styles.container, {paddingTop: insets.top + canvasPadding * 0.5, paddingBottom: insets.bottom + canvasPadding}]}>
            <View style={styles.header}>
                <BackButton />
                <Text style={styles.title}>Transactions</Text>
                <AnimatedPressable onPress = {handleOpenFilterModal}>
                    <FontAwesome6 name="sliders" size={24} color="black" />
                </AnimatedPressable>
            </View>
            <View style = {styles.transactionListSelector}>
                <TransactionListSummarizeSelector />
                {isPending ? <LoadingDots style = {styles.loadingDots} /> :
                <TransactionListStatSummarizer /> }
            </View>
            {isPending || !data ? <LoadingDots style = {styles.loadingDots} /> :
                (<>
                    <FlatList
                        data={data?.transactions || []}
                        renderItem={renderTransactionItem}
                        keyExtractor={(transaction) => transaction.transactionId}
                        showsVerticalScrollIndicator={false}
                        style={styles.transactionList}
                        onEndReachedThreshold={0.5}
                        onEndReached={() => hasNextPage && fetchNextPage()}
                    />
                    <FilterTransactionsModal
                        visible = {filterTransactionsModalVisible}
                        onRequestClose = {() => setFilterTransactionsModalVisible(false)}
                        onApplyFilters = {handleApplyFilters}
                        data = {data}
                    />
                </>
            )}
        </View>
    );
};


