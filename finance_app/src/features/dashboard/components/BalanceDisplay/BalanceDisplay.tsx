import { View, Text } from 'react-native';
import { styles } from './BalanceDisplay.styles';
import { DashboardData } from '../../types';

type BalanceDisplayProps = {
    financialSummary: DashboardData['financialSummary'] | undefined;
    currencySymbol: string;
}

export default function BalanceDisplay({financialSummary, currencySymbol} : BalanceDisplayProps ) {
    return (
        <View>
            <Text style = {styles.balanceLabel}>Total Current Balance</Text>
            <Text style={styles.balanceText}>
                {currencySymbol}{(financialSummary?.totalBalance ?? 0).toFixed(2)}
            </Text>
        </View>
    );
}
