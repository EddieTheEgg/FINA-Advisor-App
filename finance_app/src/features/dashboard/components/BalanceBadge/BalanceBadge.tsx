import {View, Text} from 'react-native';
import {styles} from './BalanceBadge.styles';
import { DashboardData } from '../../types';

type BalanceBadgeProps = {
    dashboard: DashboardData;
}

export default function BalanceBadge({ dashboard }: BalanceBadgeProps) {
    const financialSummary = dashboard.financialSummary;
    const currencySymbol = '$';

    const formattedAmount = Math.abs(financialSummary.monthlyNet).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: false,
    });

    return (
        <View style={[styles.badge, financialSummary.isPositive ? styles.positiveBadge : styles.negativeBadge]}>
            <Text style={styles.badgeText}>
                {financialSummary.isPositive ? '+' : '-'}{currencySymbol}{formattedAmount}
            </Text>
        </View>
    );
}
