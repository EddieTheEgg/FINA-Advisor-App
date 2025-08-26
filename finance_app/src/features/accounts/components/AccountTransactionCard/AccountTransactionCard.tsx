import { View, Text } from 'react-native';
import { AccountTransactionResponse } from '../../types';
import { styles } from './AccountTransactionCard.styles';
import { formatDate } from '../../../../utils/formatDate';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { AccountNavigatorProps } from '../../../../navigation/types/AccountNavigatorTypes';

type AccountTransactionCardProps = {
    transactionData : AccountTransactionResponse
    navigation: AccountNavigatorProps
}


export const AccountTransactionCard = ({transactionData, navigation} : AccountTransactionCardProps) => {

    const formatBalance = () => {
        const amount = Math.abs(transactionData.amount);
        const formatCurrency = (sign: string) =>
            `${sign}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

        if (transactionData.transactionType === 'TRANSFER') {
            const sign = transactionData.amount >= 0 ? '' : '-';
            return formatCurrency(sign);
        }
        const sign = transactionData.transactionType === 'INCOME' ? '+' :
                    transactionData.transactionType === 'EXPENSE' ? '-' : '';
        return formatCurrency(sign);
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
        <AnimatedPressable
            onPress = {() => navigation.getParent()?.getParent()?.navigate('TransactionDetail', {transactionId: transactionData.transactionId})}
        >
            <View style = {styles.transactionCardContainer}>
                <Text style = {[styles.transactionCardIcon, {backgroundColor: transactionData.categorySimplified.color}]}>{transactionData.categorySimplified.icon}</Text>
                <View style = {styles.transactionDetailContainer}>
                    <Text style = {styles.transactionTitle}>{truncateText(transactionData.title, 15)}</Text>
                    <Text style = {styles.transactionSubInfoText}>
                        {formatDate(transactionData.transactionDate)} • {transactionData.categorySimplified.categoryName}
                    </Text>
                </View>
                <Text style = {getAmountStyle()}>${formatBalance()}{'>'}</Text>
            </View>
        </AnimatedPressable>
    );
};
