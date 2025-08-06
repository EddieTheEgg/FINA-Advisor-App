import { Text, View } from 'react-native';
import { MonthlySpendingTrend } from '../../types';
import { styles } from './MonthlySpendingTrendCard.styles';
import { getStatusColor } from '../../utils/getStatusColor';
import { roundPercentage } from '../../utils/roundPercentage';

type MonthlySpendingTrendCardProps = {
    data: MonthlySpendingTrend
};

export const MonthlySpendingTrendCard = ({data} : MonthlySpendingTrendCardProps) => {

    let comparisionText  = 'more';

    if (data.previousMonthSpending > data.currentMonthSpending) {
        comparisionText = 'less';
    }

    return (
        <View style = {[styles.container, {backgroundColor: getStatusColor(data.status).backgroundColor}]}>
            <View style = {styles.contentContainer}>
                <View style = {styles.headerContainer}>
                    <Text style = {[styles.icon]}>{data.icon}</Text>
                    <Text style = {styles.title}>Spending Trend</Text>
                </View>
                <Text style = {styles.detailStats}>You spent <Text style = {styles.boldText}>{roundPercentage(data.spendingTrendPercentage)}% {comparisionText}</Text> than last month.</Text>
                <View style = {styles.trendContainer}>
                    <Text>This month: <Text style = {styles.boldText}>${data.currentMonthSpending}</Text></Text>
                    <Text>•</Text>
                    <Text>Last month: <Text style = {styles.boldText}>${data.previousMonthSpending}</Text></Text>
                </View>
            </View>
        </View>
    );
};

