import { View, Text } from 'react-native';
import { TransactionResponse } from '../../../transaction/types';
import { styles } from './MainCardSummary.styles';
import { formatAmount } from '../../../../utils/formatAmount';
import { fontSize } from '../../../../styles/fontSizes';

type MainCardSummaryProps = {
    transactionDetails: TransactionResponse;
}

export const MainCardSummary = ({transactionDetails}: MainCardSummaryProps) => {

    const getAmountStyle = () => {
        switch (transactionDetails.transactionType) {
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

    const getResponsiveFontSize = (amount: number) => {
        const amountString = amount.toString();
        const digitCount = amountString.length;
        // Step-based responsive sizing
        if (digitCount <= 3) {
            return fontSize.xxxl * 1.6;
        }
        if (digitCount <= 6) {
            return fontSize.xxxl * 1.4;
        }
        if (digitCount <= 8) {
            return fontSize.xxxl * 1.2;
        }
        return fontSize.xxxl;
    };

    const transactionAmount = transactionDetails.amount;

    return (
        <View style = {styles.mainCardContainer}>
            <View style = {styles.categoryIconContainer}>
                <Text style = {[styles.categoryIconText, {backgroundColor: transactionDetails.category.color}]}>{transactionDetails.category.icon}</Text>
            </View>
            <Text style={[getAmountStyle(), {fontSize: getResponsiveFontSize(transactionAmount)}]}>
                {formatAmount(transactionDetails.transactionType, transactionAmount)}
            </Text>
            <Text style = {styles.transactionTitle}>{transactionDetails.title}</Text>
            <Text style = {styles.categoryLabel}>{transactionDetails.category.categoryName}</Text>
            <Text style = {styles.transactionTypeLabel}>{transactionDetails.transactionType}</Text>
        </View>
    );
};
