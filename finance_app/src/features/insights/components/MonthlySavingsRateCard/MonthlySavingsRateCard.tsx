import { Text, View } from 'react-native';
import { MonthlySavingsRateResponse } from '../../types';
import { styles } from './MonthlySavingsRateCard.styles';
import { getStatusColor } from '../../utils/getStatusColor';
import { roundPercentage } from '../../utils/roundPercentage';

type MonthlySavingsRateCardProps = {
    data: MonthlySavingsRateResponse
};

export const MonthlySavingsRateCard = ({data} : MonthlySavingsRateCardProps) => {


    return (
        <View style = {[styles.container, {backgroundColor: getStatusColor(data.status).backgroundColor}]}>
            <View style = {styles.contentContainer}>
                <View style = {styles.headerContainer}>
                    <Text style = {[styles.icon]}>{data.icon}</Text>
                    <Text style = {styles.title}>Savings Rate</Text>
                </View>
                <Text style = {styles.detailStats}>You're saving <Text style = {styles.boldText}>{roundPercentage(data.percentageSavings)}%</Text> of your income this month.</Text>
                <Text style = {styles.analysisText}>{data.savingsAnalysis}</Text>
            </View>
        </View>
    );
};

