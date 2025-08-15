import { View, Text } from 'react-native';
import { CoreBudgetData } from '../../../types';
import { styles }from './CurrentBudgetInfo.styles';
import { formatCurrencyWithConditionalDecimals } from '../../../../../utils/formatAmount';

type CurrentBudgetInfoProps = {
    data: CoreBudgetData;
}

export const CurrentBudgetInfo = ({data}: CurrentBudgetInfoProps) => {

    const percentageUsed = Math.floor((data.spentAmount / data.budgetAmount) * 100);

    return (
        <View style = {styles.container}>
            <Text style = {styles.budgetTitleText}>{data.budgetIcon} Current {data.budgetTitle} Budget</Text>
            <Text style = {styles.currentSpentText}>You've spent ${formatCurrencyWithConditionalDecimals(data.spentAmount)} of your current
                ${formatCurrencyWithConditionalDecimals(data.budgetAmount)} budget {'('}{percentageUsed}%{' '}used{')'}</Text>
            <Text style = {styles.currentBudgetAmount}>${data.budgetAmount.toFixed(2)}</Text>
        </View>
    );
};
