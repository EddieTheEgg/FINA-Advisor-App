import { View, Text } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { styles } from './NoTransactions.styles';

export const NoTransactions = () => {
    return (
        <View style = {styles.noTransactionsContainer}>
            <FontAwesome6 name = "file-circle-exclamation" size = {60} style= {styles.noTransactionsIcon} />
            <Text style = {styles.noTransactionsText}>No Transactions Found!</Text>
        </View>
    );
};
