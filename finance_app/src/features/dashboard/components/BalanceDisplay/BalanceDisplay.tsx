import { View, Text } from 'react-native';
import { styles } from './BalanceDisplay.styles';
import { DashboardData } from '../../types';
import { RFValue } from 'react-native-responsive-fontsize';
import { Platform } from 'react-native';

type BalanceDisplayProps = {
    dashboard: DashboardData;
}

export default function BalanceDisplay({ dashboard }: BalanceDisplayProps) {
    const period = dashboard.period;
    const financialSummary = dashboard.financialSummary;
    const currencySymbol = '$';

    //Dynamic font sizing that scales with digit for balances
    // const balanceString2 = '9,999,999,999,999.00'; // 9 trillion max
    const balanceString = financialSummary.totalBalance
        ? financialSummary.totalBalance.toFixed(2)
        : '0.00';
    const numDigits = balanceString.replace('.', '').length;

    const minFontSize = Platform.OS === 'android' ? RFValue(20) : RFValue(14);
    const baseFontSize = Platform.OS === 'android' ? RFValue(88) : RFValue(65);

    const dynamicFontSize = Math.max(minFontSize, baseFontSize - numDigits * 9);

    return (
        <View style={styles.balanceCardRow}>
            <Text style={styles.balanceLabel}>
                {period.month}'s Total Balance
            </Text>
            <Text style={[styles.balanceText, {fontSize: dynamicFontSize}]}
            >
                {currencySymbol}{balanceString}
            </Text>
        </View>
    );
}
