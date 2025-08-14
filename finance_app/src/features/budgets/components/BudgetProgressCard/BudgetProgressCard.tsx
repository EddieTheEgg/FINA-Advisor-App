import { View, Text } from 'react-native';
import { CoreBudgetData } from '../../types';
import { styles } from './BudgetProgressCard.styles';
import { formatCurrencyWithConditionalDecimals } from '../../../../utils/formatAmount';
import { getBudgetColorStatus } from '../../utils/getBudgetColorStatus';
import { fontSize } from '../../../../styles/fontSizes';
import { truncateText } from '../../../../utils/textFormat';
import { colors } from '../../../../styles/colors';


type BudgetProgressCardProps = {
    data: CoreBudgetData;
}

export const BudgetProgressCard = ({data}: BudgetProgressCardProps) => {


    const getResponsiveFontSize = (amount: number) => {
        const amountString = amount.toString();
        const digitCount = amountString.length;
        // Step-based responsive sizing
        if (digitCount <= 3) {
            return fontSize.base * 1.6;
        }
        if (digitCount <= 6) {
            return fontSize.base * 1.4;
        }
        if (digitCount <= 8) {
            return fontSize.lg * 1.2;
        }
        return fontSize.lg;
    };

    const remainingBudget = data.budgetAmount - data.spentAmount;
    const colorStatus = getBudgetColorStatus(data.spentAmount, data.budgetAmount);
    const percentageSpent = Math.round((data.spentAmount / data.budgetAmount) * 100);

    return (
        <View style = {styles.container}>
            <Text style = {styles.budgetProgressTitle}>📊 Budget Progress</Text>
            <View style = {styles.statRowContainer}>
                <View style = {styles.spentContainer}>
                    <Text style = {[styles.spentAmount,
                        {color: colorStatus,
                        fontSize: getResponsiveFontSize(data.spentAmount)}]}>${truncateText(formatCurrencyWithConditionalDecimals(data.spentAmount), 8)}</Text>
                    <Text style = {styles.spentLabel}>SPENT</Text>
                </View>
                <View style = {styles.spentContainer}>
                    <Text style = {[styles.spentAmount,
                        {color: colors.black,
                        fontSize: getResponsiveFontSize(data.budgetAmount)}]}>${truncateText(formatCurrencyWithConditionalDecimals(data.budgetAmount), 8)}</Text>
                    <Text style = {styles.spentLabel}>BUDGET</Text>
                </View>
                <View style = {styles.spentContainer}>
                <Text style = {[styles.spentAmount,
                        {color: colorStatus,
                        fontSize: getResponsiveFontSize(remainingBudget > 0 ? remainingBudget : 0)}]}>${truncateText(formatCurrencyWithConditionalDecimals(remainingBudget > 0 ? remainingBudget : 0), 8)}</Text>
                    <Text style = {styles.spentLabel}>REMAINING</Text>
                </View>
            </View>
            <View style = {styles.progressBarContainer}>
                {/* eslint-disable-next-line react-native/no-inline-styles */}
                <View style = {[styles.progressBar, {width: percentageSpent > 100 ? '100%' : `${percentageSpent}%`, backgroundColor: colorStatus}]}/>
            </View>
            <View style = {styles.progressDetailContainer}>
                <Text style = {styles.percentageUsedText}>{percentageSpent}% of budget used</Text>
                <Text style = {[styles.remainingBudgetText, {color: colorStatus}]}>${formatCurrencyWithConditionalDecimals(Math.abs(remainingBudget))} {remainingBudget > 0 ? 'remaining' : 'over budget'}</Text>
            </View>
        </View>
    );
};
