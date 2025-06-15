import { View, Text, FlatList, Pressable } from 'react-native';
import { styles } from './RecentTransactions.styles';
import { DashboardData } from '../../types';
import { TransactionPreview } from '../TransactionDisplay/TransactionPreview';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { colors } from '../../../../styles/colors';

type RecentTransactionsProps = {
    recentTransactions: DashboardData['recentTransactions'];
}

const SeparatorComponent = () => <View style={styles.separator} />;

export const RecentTransactions = ({recentTransactions}: RecentTransactionsProps) => {
    return (
        <View style = {styles.recentTransactionsContainer}>
            <View style = {styles.recentTransactionsTitleContainer}>
                <Text style = {styles.recentTransactionsTitle}>Recent Transactions</Text>
                <Pressable style = {styles.viewAllTransactionsButton}>
                    <Text style = {styles.recentTransactionsButtonText}>View All</Text>
                    <FontAwesome6 name = "arrow-right" size = {16} color = {colors.gray[600]} />
                </Pressable>
            </View>
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
