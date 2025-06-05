import {View, Text} from 'react-native';
import {styles} from './BalanceBadge.styles';

type NetAmountBadgeProps = {
    netAmount: number;
    currencySymbol: string | '$';
    isPositive: boolean;
}

export default function NetAmountBadge({ 
  netAmount,
  currencySymbol = '$',
  isPositive
}: NetAmountBadgeProps) {

  const formattedAmount = Math.abs(netAmount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: false,
  });

  return (
    <View style={[styles.badge, isPositive ? styles.positiveBadge : styles.negativeBadge]}>
        <Text style={styles.badgeText}>
            {isPositive ? '+' : '-'}{currencySymbol}{formattedAmount}
        </Text>
    </View>
  );
}
