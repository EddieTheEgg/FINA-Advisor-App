import { Text, View } from 'react-native';
import { MonthlyTopSpendingCategoryResponse } from '../../types';
import { styles } from './MonthlyTopSpendingCategoryCard.styles';
import { getStatusColor } from '../../utils/getStatusColor';
import { roundPercentage } from '../../utils/roundPercentage';

type MonthlyTopSpendingCategoryCardProps = {
    data: MonthlyTopSpendingCategoryResponse
};

export const MonthlyTopSpendingCategoryCard = ({data} : MonthlyTopSpendingCategoryCardProps) => {


    return (
        <View style = {[styles.container, {backgroundColor: getStatusColor(data.status).backgroundColor}]}>
            <View style = {styles.contentContainer}>
                <View style = {styles.headerContainer}>
                    <Text style = {[styles.icon, {backgroundColor: data.category.color}]}>{data.category.icon}</Text>
                    <Text style = {styles.title}>Top Spending Category</Text>
                </View>
                <Text style = {styles.detailStats}><Text style = {styles.boldText}>{data.category.categoryName}</Text> is your biggest expense this month</Text>
                <Text style = {styles.analysisText}>${data.totalSpent} spent ({roundPercentage(data.percentageSpent)}% of your total expenses)</Text>
            </View>
        </View>
    );
};

