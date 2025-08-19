import { Text, View } from 'react-native';
import { styles } from './BudgetDetailsCard.styles';
import { CoreBudgetData } from '../../types';
import { formatDateMonthYear } from '../../../../utils/formatDate';
import { truncateText } from '../../../../utils/textFormat';


type BudgetDetailsCardProps = {
    data: CoreBudgetData;
}


export const BudgetDetailsCard = ({data}: BudgetDetailsCardProps) => {

     const handleNegativeDaysRemaining = (daysRemaining: number) => {
        if (daysRemaining < 0) {
            return 0;
        }
        return daysRemaining;
     };

    return (
        <View style = {styles.container}>
           <Text style = {styles.title}>📋 Budget Details</Text>
           <View style = {styles.sectionRowContainer}>
                <Text style = {styles.sectionTitle}>Budget Period</Text>
                <Text style = {styles.sectionValue}>{formatDateMonthYear(data.budgetPeriod)}</Text>
           </View>
           <View style = {styles.separator} />
           <View style = {styles.sectionRowContainer}>
                <Text style = {styles.sectionTitle}>Budget Limit</Text>
                <Text style = {styles.sectionValue}>${truncateText(data.budgetAmount.toFixed(2), 10)}</Text>
           </View>
           <View style = {styles.separator} />
           <View style = {styles.sectionRowContainer}>
                <Text style = {styles.sectionTitle}>Current Spending</Text>
                <Text style = {styles.sectionValue}>${truncateText(data.spentAmount.toFixed(2), 10)}</Text>
           </View>
           <View style = {styles.separator} />
           <View style = {styles.sectionRowContainer}>
                <Text style = {styles.sectionTitle}>Average Daily Spend</Text>
                <Text style = {styles.sectionValue}>${truncateText(data.dailyAverage.toFixed(2), 10)}</Text>
           </View>
           <View style = {styles.separator} />
           <View style = {styles.sectionRowContainer}>
                <Text style = {styles.sectionTitle}>Days Remaining</Text>
                <Text style = {styles.sectionValue}>{handleNegativeDaysRemaining(data.daysRemaining)}</Text>
           </View>
           <View style = {styles.separator} />
           <View style = {styles.sectionRowContainer}>
                <Text style = {styles.sectionTitle}>Projected Total Spending</Text>
                <Text style = {styles.sectionValue}>${truncateText(data.projectedTotal.toFixed(2), 10)}</Text>
           </View>
        </View>
    );
};
