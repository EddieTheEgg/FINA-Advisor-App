import { View, Text } from 'react-native';
import { CoreBudgetData } from '../../types';
import { styles } from './BudgetSummaryCard.styles';
import { fontSize } from '../../../../styles/fontSizes';
import { formatCurrencyWithConditionalDecimals } from '../../../../utils/formatAmount';
import { formatDateMonthYear } from '../../../../utils/formatDate';
import { getBudgetColorStatus } from '../../utils/getBudgetColorStatus';


type BudgetSummaryCardProps = {
    data: CoreBudgetData;
}

export const BudgetSummaryCard = ({data}: BudgetSummaryCardProps) => {

    const percentageSpent = Math.round((data.spentAmount / data.budgetAmount) * 100);
    const colorStatus = getBudgetColorStatus(data.spentAmount, data.budgetAmount);

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


    return (
        <View style = {[styles.backgroundContainer, {backgroundColor: colorStatus}]}>
            <View style = {styles.actualContentContainer}>
                <Text style = {[styles.budgetIcon, {backgroundColor: data.budgetColor}]}>{data.budgetIcon}</Text>
                <Text style = {[styles.budgetAmount, {fontSize: getResponsiveFontSize(data.budgetAmount), color: colorStatus}]}>
                    ${formatCurrencyWithConditionalDecimals(data.spentAmount)}
                </Text>
                <Text style = {styles.budgetTitle}>{data.budgetTitle}</Text>
                <Text style = {styles.budgetPeriod}>{formatDateMonthYear(data.budgetPeriod)}</Text>
                <Text style = {[styles.percentageUsedText, {backgroundColor: colorStatus}]}>{percentageSpent}% used</Text>
            </View>
        </View>
    );
};

