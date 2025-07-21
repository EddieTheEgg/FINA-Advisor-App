import { Text, View } from "react-native";
import { TransactionSummary } from '../../types';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { styles } from './TransactionItem.styles';
import { truncateText } from '../../../../utils/textFormat';
import { formatDate } from '../../../../utils/formatDate';

type TransactionItemProps = {
    transaction: TransactionSummary;
};

export const TransactionItem = ({transaction}: TransactionItemProps) => {

    const getAmountStyle = () => {
        switch (transaction.transactionType) {
            case 'INCOME':
                return [styles.transactionAmount, styles.incomeAmount];
            case 'EXPENSE':
                return [styles.transactionAmount, styles.expenseAmount];
            case 'TRANSFER':
                return [styles.transactionAmount, styles.transferAmount];
            default:
                return styles.transactionAmount;
        }
    };

    const formatAmount = () => {
        const sign = transaction.transactionType === 'INCOME' ? '+' :
                    transaction.transactionType === 'EXPENSE' ? '-' : '';
        return `${sign}$${Math.abs(transaction.amount).toFixed(2)}`;
    };


    return (
        <AnimatedPressable style = {styles.transactionItemContainer}>
            <Text style = {[styles.transactionItemIcon, {backgroundColor: transaction.category.color}]}>{transaction.category.icon}</Text>
            <View style = {styles.transactionItemContent}>
                <Text style = {styles.transactionItemTitle}>{truncateText(transaction.title, 15)}</Text>
                <Text style = {styles.transactionItemSubInfoText}>{formatDate(new Date(transaction.transactionDate))} • {transaction.accountName}</Text>
            </View>
            <Text style = {[getAmountStyle()]}>{formatAmount()}</Text>
        </AnimatedPressable>
    );
}; 
