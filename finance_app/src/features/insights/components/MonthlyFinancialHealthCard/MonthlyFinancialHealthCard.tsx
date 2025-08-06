import { Text, View } from 'react-native';
import { MonthlyFinancialHealthResponse } from '../../types';
import { styles } from './MonthlyFinancialHealthCard.styles';
import { getStatusColor } from '../../utils/getStatusColor';

type MonthlyFinancialHealthCardProps = {
    data: MonthlyFinancialHealthResponse
};

export const MonthlyFinancialHealthCard = ({data} : MonthlyFinancialHealthCardProps) => {


    return (
        <View style = {[styles.container, {backgroundColor: getStatusColor(data.status).backgroundColor}]}>
            <View style = {styles.contentContainer}>
                <View style = {styles.headerContainer}>
                    <Text style = {[styles.icon]}>{data.icon}</Text>
                    <Text style = {styles.title}>Monthly Financial Health</Text>
                </View>
                <Text style = {styles.detailStats}>You earned <Text style = {styles.boldText}>${data.income}</Text> and spent <Text style = {styles.boldText}>${data.expense}</Text> this month.</Text>
                <Text style = {styles.analysisText}>Net result: <Text style = {styles.boldText}>${data.netSaved} saved</Text> • {data.analysisDetail}</Text>
            </View>
        </View>
    );
};

