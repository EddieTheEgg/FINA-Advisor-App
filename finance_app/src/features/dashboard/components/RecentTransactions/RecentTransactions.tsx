import { View, Text, FlatList } from 'react-native';
import { styles } from './RecentTransactions.styles';
import { DashboardData } from '../../types';
import { TransactionPreview } from '../TransactionDisplay/TransactionPreview';

type RecentTransactionsProps = {
    recentTransactions: DashboardData['recentTransactions'];
}

const SeparatorComponent = () => <View style={styles.separator} />;

export const RecentTransactions = ({recentTransactions}: RecentTransactionsProps) => {
    return (
        <View style = {styles.recentTransactionsContainer}>
            <Text style = {styles.recentTransactionsTitle}>Recent Transactions</Text>
            <FlatList
                data = {recentTransactions}
                renderItem = {({item}) => <TransactionPreview transactionItem={item}/>}
                keyExtractor = {(item) => item.transactionId}
                showsVerticalScrollIndicator = {false}
                ItemSeparatorComponent={SeparatorComponent}
                scrollEnabled = {false} />
        </View>
    );
};
