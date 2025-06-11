import {View, Text} from 'react-native';
import {styles} from './BalanceBadge.styles';
import { DashboardPeriodProps } from '../../types';
import { useDashboardQuery } from '../../hooks/useDashboard';

export default function BalanceBadge({selectedMonth, selectedYear}: DashboardPeriodProps) {

    const { data: dashboard } = useDashboardQuery(selectedMonth, selectedYear);
    const financialSummary = dashboard?.financialSummary;
    const currencySymbol = '$';

    const formattedAmount = Math.abs(financialSummary?.monthlyNet ?? 0).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: false,
    });

    return (
        <View style={[styles.badge, financialSummary?.isPositive ? styles.positiveBadge : styles.negativeBadge]}>
            <Text style={styles.badgeText}>
                {financialSummary?.isPositive ? '+' : '-'}{currencySymbol}{formattedAmount}
            </Text>
        </View>
    );
}
