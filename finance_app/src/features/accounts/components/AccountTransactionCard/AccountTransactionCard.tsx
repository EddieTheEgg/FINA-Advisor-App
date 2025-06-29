import { View, Text } from 'react-native';
import { AccountTransactionResponse } from '../../types';
import { styles } from './AccountTransactionCard.styles';

type AccountTransactionCardProps = {
    transactionData : AccountTransactionResponse
}


export const AccountTransactionCard = ({transactionData} : AccountTransactionCardProps) => {

    const formatDate = (date : string) => {
        const dateObj = new Date(date);
        const day = dateObj.getDate();
        const month = dateObj.toLocaleString('default', { month: 'short' });
        return `${month} ${day}`;
    };

    const formatBalance = () => {
        const amount = Math.abs(transactionData.amount);
        const sign = transactionData.transactionType === 'INCOME' ? '+' :
                    transactionData.transactionType === 'EXPENSE' ? '-' : '';
        return `${sign}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    };

    const getAmountStyle = () => {
        switch (transactionData.transactionType) {
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

    return (
        <View style = {styles.transactionCardContainer}>
            <Text style = {[styles.transactionCardIcon, {backgroundColor: transactionData.categorySimplified.color}]}>{transactionData.categorySimplified.icon}</Text>
            <View style = {styles.transactionDetailContainer}>
                <Text style = {styles.transactionTitle}>{truncateText(transactionData.title, 15)}</Text>
                <Text style = {styles.transactionSubInfoText}>
                    {formatDate(transactionData.transactionDate)} • {transactionData.categorySimplified.categoryName}
                </Text>
            </View>
            <Text style = {getAmountStyle()}>${formatBalance()}</Text>
        </View>
    );
};
