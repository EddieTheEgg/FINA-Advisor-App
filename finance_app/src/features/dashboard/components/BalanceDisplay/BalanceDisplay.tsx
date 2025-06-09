import { View, Text } from 'react-native';
import { styles } from './BalanceDisplay.styles';
import { BalanceBadgeDisplayProps  } from '../../types';



export default function BalanceDisplay({financialSummary, currencySymbol} : BalanceBadgeDisplayProps ) {
    return (
        <View>
            <Text style = {styles.balanceLabel}>Total Current Balance</Text>
            <Text style={styles.balanceText}>
                {currencySymbol}{(financialSummary?.totalBalance ?? 0).toFixed(2)}
            </Text>
        </View>
    );
}
