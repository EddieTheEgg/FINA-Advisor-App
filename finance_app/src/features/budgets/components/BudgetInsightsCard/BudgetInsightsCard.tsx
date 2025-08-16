import { View, Text } from 'react-native';
import { BudgetDetailData, BudgetSpendingStatus } from '../../types';
import { styles } from './BudgetInsightsCard.styles';

type BudgetInsightsCardProps = {
    data: BudgetDetailData;
}

export const BudgetInsightsCard = ({data}: BudgetInsightsCardProps) => {

    const budgetStatus = data.budgetInsight.statusType;

    if (budgetStatus === BudgetSpendingStatus.ON_TRACK) {
        const leftToSpend = data.coreBudgetData.budgetAmount - data.coreBudgetData.spentAmount;
        return (
            <View style = {styles.onTrackContainer}>
                <Text style = {styles.onTrackTitle}>🎯 Budget Insights</Text>
                <Text style = {styles.onTrackDescription}>Great job! You're spending an average of <Text style = {styles.onTrackValue}>${data.coreBudgetData.dailyAverage.toFixed(2)} per day. </Text>
                    At this rate, you'll spend about <Text style = {styles.onTrackValue}>${data.coreBudgetData.projectedTotal.toFixed(2)}</Text> by the end of the month.
                </Text>
                <Text style = {styles.onTrackSuggestion}>
                    You have <Text style = {styles.onTrackValue}>${leftToSpend.toFixed(2)}</Text> left to spend. That's about <Text style = {styles.onTrackValue}>${(leftToSpend / data.coreBudgetData.daysRemaining).toFixed(2)} per day</Text>.
                </Text>
            </View>
        );
    }

    if (budgetStatus === BudgetSpendingStatus.WARNING) {
        const leftToSpend = data.coreBudgetData.budgetAmount - data.coreBudgetData.spentAmount;
        return (
            <View style = {styles.warningContainer}>
                <Text style = {styles.warningTitle}>⚠️ Budget Warning</Text>
                <Text style = {styles.warningDescription}>You're spending an average of <Text style = {styles.warningValue}>${data.coreBudgetData.dailyAverage.toFixed(2)} per day. </Text>
                   You have <Text style = {styles.warningValue}>${leftToSpend.toFixed(2)}</Text> left to spend for the remaining {data.coreBudgetData.daysRemaining} days.
                </Text>
                <Text style = {styles.warningSuggestion}>
                    Consider limiting your spending to <Text style = {styles.warningValue}>${(leftToSpend / data.coreBudgetData.daysRemaining).toFixed(2)} or less per day</Text> to stay on track.
                </Text>
            </View>
        );
    }

    if (budgetStatus === BudgetSpendingStatus.OVER_BUDGET) {
        const exceededAmount = data.coreBudgetData.projectedTotal - data.coreBudgetData.budgetAmount;
        return (
            <View style = {styles.alertContainer}>
                <Text style = {styles.alertTitle}>🚨 Budget Alert</Text>
                <Text style = {styles.alertDescription}>You're spending an average of <Text style = {styles.alertValue}>${data.coreBudgetData.dailyAverage.toFixed(2)} per day. </Text>
                    At this rate, you'll exceed your budget by <Text style = {styles.alertValue}>${exceededAmount.toFixed(2)}</Text>.
                </Text>
                <Text style = {styles.alertSuggestion}>
                    💡 Try limiting to <Text style = {styles.alertValue}>${data.budgetInsight.dailyAllowanceLimit.toFixed(2)} or less</Text> for the remaining {data.coreBudgetData.daysRemaining} days to minimize overspending.
                </Text>
            </View>
        );
    }
};

//Note if the status is no data, we don't need to show anything here.
