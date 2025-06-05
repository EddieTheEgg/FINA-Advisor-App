import { View, Text } from 'react-native';
import { styles } from './BalanceDisplay.styles';

type BalanceDisplayProps = {
    balance: number | 0.00;
    isLoading?: boolean;
    currencySymbol: string | '$';
}

export default function BalanceDisplay({balance, isLoading, currencySymbol} : BalanceDisplayProps ) {
    return (
        <View>
            <Text style = {styles.balanceLabel}>Total Current Balance</Text>
            {isLoading ? (<Text>...</Text>)
            :
            (<Text style={styles.balanceText}>{currencySymbol}{balance.toFixed(2)}</Text>)}
        </View>
    );
}
