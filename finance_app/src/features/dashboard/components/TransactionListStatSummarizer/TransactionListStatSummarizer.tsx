import { View, Text } from 'react-native';
import { useCreateTransactionListStore } from '../../store/useTransactionListStore';
import { styles } from './TransactionListStatSummarizer.styles';

export const TransactionListStatSummarizer = () => {

    const {monthIncome, monthExpense, monthTransfer} = useCreateTransactionListStore();
    return (
        <View style = {styles.summarizeStatContainer}>
            <View style = {styles.summarizeStatItem}>
                <Text style = {styles.summarizeStatItemTitle}>Income</Text>
                <Text style = {styles.incomeValue}>+${monthIncome.toFixed(2)}</Text>
            </View>
            <View style = {styles.summarizeStatItem}>
                <Text style = {styles.summarizeStatItemTitle}>Expense</Text>
                <Text style = {styles.expenseValue}>-${monthExpense.toFixed(2)}</Text>
            </View>
            <View style = {styles.summarizeStatItem}>
                <Text style = {styles.summarizeStatItemTitle}>Transfer</Text>
                <Text style = {styles.transferValue}>${monthTransfer.toFixed(2)}</Text>
            </View>
        </View>
    );
};
