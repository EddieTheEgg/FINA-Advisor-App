import { View, Text } from 'react-native';
import { styles } from './BudgetDisplayCard.styles';
import { BudgetData } from '../../types';
import { formatCurrencyWithConditionalDecimals } from '../../../../utils/formatAmount';
import { colors } from '../../../../styles/colors';

type BudgetDisplayCardProps = {
    budgetData: BudgetData
}

export const BudgetDisplayCard = ({budgetData}: BudgetDisplayCardProps) => {

    const percentageSpent = Math.round((budgetData.budgetSpent / budgetData.budgetAmount) * 100);


    const colorSignal = () => {
        if (percentageSpent > 100) {
            return colors.red;
        }
        else if (percentageSpent > 80) {
            return colors.orange;
        }
        else if (percentageSpent > 0) {
            return colors.darkerGreen;
        }
        else {
            return colors.gray[500];
        }
    };

    const handleRemainingBudgetText = () => {
        const remainingBudget = budgetData.budgetAmount - budgetData.budgetSpent;
        if (remainingBudget > 0) {
            return `$${formatCurrencyWithConditionalDecimals(remainingBudget)} remaining`;
        }
        else {
            return `$${formatCurrencyWithConditionalDecimals(Math.abs(remainingBudget))} over budget`;
        }
    };


    return (
        <View style = {[styles.container, {backgroundColor: colorSignal()}]}>
            <View style = {styles.budgetContentContainer}>
                <View style = {styles.budgetTopSectionContainer}>
                    <Text style = {[styles.budgetIcon, {backgroundColor: budgetData.categoryData.categoryColor}]}>{budgetData.categoryData.categoryIcon}</Text>
                    <Text style = {styles.budgetCategoryName}>{budgetData.categoryData.categoryName}</Text>
                    <View style = {styles.budgetSpentAmountContainer}>
                        <Text style = {styles.budgetSpentAmount}>${formatCurrencyWithConditionalDecimals(budgetData.budgetSpent)}</Text>
                        <Text style = {styles.budgetTotalAmount}> of ${formatCurrencyWithConditionalDecimals(budgetData.budgetAmount)}</Text>
                    </View>
                </View>
                <View style = {styles.budgetProgressContainer}>
                    <View style = {[styles.budgetProgress,
                        // eslint-disable-next-line react-native/no-inline-styles
                        {width: percentageSpent > 100 ? '100%' : `${percentageSpent}%`},
                        {backgroundColor: colorSignal()}]} />
                </View>
                <View style = {styles.budgetProgressDetailFooter}>
                    <Text style = {styles.percentageUsedText}>{percentageSpent}% used</Text>
                    <Text style = {[styles.remainingBudgetText, {color: colorSignal()}]}>{handleRemainingBudgetText()}</Text>
                </View>
            </View>
        </View>
    );
};

