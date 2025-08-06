import { Text, View } from 'react-native';
import { KeyInsightsStatus, MonthlyFinancialHealthResponse } from '../../types';
import { styles } from './MonthlyFinancialHealthCard.styles';
import { colors } from '../../../../styles/colors';

type MonthlyFinancialHealthCardProps = {
    data: MonthlyFinancialHealthResponse
};

export const MonthlyFinancialHealthCard = ({data} : MonthlyFinancialHealthCardProps) => {

    const getStatusColor = (status : KeyInsightsStatus) => {
        if (status === KeyInsightsStatus.POSITIVE) {
            return {
                backgroundColor: colors.green,
            }
        }
        if (status === KeyInsightsStatus.NEGATIVE) {
            return {
                backgroundColor: colors.red,
            }
        }
        if (status === KeyInsightsStatus.WARNING) {
            return {
                backgroundColor: colors.yellowBackground,
            }
        }
        return {
            backgroundColor: colors.gray[500],
        };
    };


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

