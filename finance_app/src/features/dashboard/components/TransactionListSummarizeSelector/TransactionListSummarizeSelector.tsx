import { View } from 'react-native';
import { TransactionListTypeButton } from '../TransactionListTypeButton/TransactionListTypeButton';
import { styles } from './TransactionListSummarizeSelector.styles';
import { TransactionTimePeriodSelector } from '../TransactionTimePeriodSelector/TransactionTimePeriodSelector';

export const TransactionListSummarizeSelector = () => {
    return (
        <View>
            <View style = {styles.transactionTypeContainer}>
                <TransactionListTypeButton
                    selectedTransactionListType = "ALL"
                    label = "      All      "
                />
                <TransactionListTypeButton
                    selectedTransactionListType = "EXPENSE"
                    label = "Expense"
                />
                <TransactionListTypeButton
                    selectedTransactionListType = "INCOME"
                    label = "Income"
                />
                <TransactionListTypeButton
                    selectedTransactionListType = "TRANSFER"
                    label = "Transfer"
                />
            </View>
            <TransactionTimePeriodSelector />
        </View>
    );
};
