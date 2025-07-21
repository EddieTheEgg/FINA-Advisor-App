import { View, Text, Dimensions } from 'react-native';
import { useEffect } from 'react';
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

export const TransactionListScreen = () => {

    const insets = useSafeAreaInsets();
    const canvasPadding = Dimensions.get('window').height * 0.02;

    const {date, transactionListType, setMonthIncome, setMonthExpense, setMonthTransfer} = useCreateTransactionListStore();

    const request = {
        transaction_type: transactionListType,
        transaction_timeframe: date,
    };
    const {data, isPending, error} = useTransactionList(request);


    useEffect(() => {
        if (data?.summary) {
            setMonthIncome(data.summary.monthIncome);
            setMonthExpense(data.summary.monthExpense);
            setMonthTransfer(data.summary.monthTransfer);
        }
    }, [data?.summary, setMonthIncome, setMonthExpense, setMonthTransfer]);

    if (error) {
        return <ErrorScreen
            errorText = "Error"
            errorSubText = "Something went wrong, please try again"
            errorMessage = {error.message}
        />;
    }


    return (
        <View style={[styles.container, {paddingTop: insets.top + canvasPadding}]}>
            <View style={styles.header}>
                <BackButton />
                <Text style={styles.title}>Transactions</Text>
                <FontAwesome6 name="sliders" size={24} color="black" />
            </View>
            <View style = {styles.transactionListSelector}>
                <TransactionListSummarizeSelector />
                {isPending ? <LoadingDots style = {styles.loadingDots} /> :
                <TransactionListStatSummarizer /> }
            </View>
        </View>
    );
};


