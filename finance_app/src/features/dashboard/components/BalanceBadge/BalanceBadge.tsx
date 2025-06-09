import {View, Text} from 'react-native';
import {styles} from './BalanceBadge.styles';
import { BalanceBadgeDisplayProps } from '../../types';

export default function BalanceBadge({
    financialSummary,
    currencySymbol = '$',
}: BalanceBadgeDisplayProps) {

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
