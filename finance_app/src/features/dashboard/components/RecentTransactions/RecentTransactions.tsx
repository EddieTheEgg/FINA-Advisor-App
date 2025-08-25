import { View, Text, FlatList } from 'react-native';
import { styles } from './RecentTransactions.styles';
import { DashboardData } from '../../types';
import { TransactionPreview } from '../TransactionDisplay/TransactionPreview';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { colors } from '../../../../styles/colors';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { DashboardNavigationProps } from '../../../../navigation/types/DashboardNavigatorTypes';



type RecentTransactionsProps = {
    recentTransactions: DashboardData['recentTransactions'];
    navigation: DashboardNavigationProps;
}



const SeparatorComponent = () => <View style={styles.separator} />;

export const RecentTransactions = ({recentTransactions, navigation}: RecentTransactionsProps) => {

    const handleNavToTransactionList = () => {
        navigation.navigate('TransactionList');
    };


    return (
        <View style = {styles.recentTransactionsContainer}>
            <View style = {styles.recentTransactionsTitleContainer}>
                <Text style = {styles.recentTransactionsTitle}>Recent Transactions</Text>
                <AnimatedPressable
                    style = {styles.viewAllTransactionsButton}
                    onPress = {handleNavToTransactionList}>
                    <Text style = {styles.recentTransactionsButtonText}>View All</Text>
                    <FontAwesome6 name = "arrow-right" size = {16} color = {colors.gray[600]} />
                </AnimatedPressable>
            </View>
            {recentTransactions.length <= 0 ?
                <View style = {styles.noTransactionContainer}>
                      <FontAwesome6 name = "file-circle-exclamation" size = {60} style= {styles.noTransactionsIcon} />
                      <Text style = {styles.noTransactionsText}>No Transactions Found!</Text>
                </View> :
                <FlatList
                    data = {recentTransactions}
                    renderItem = {({item}) => <TransactionPreview transactionItem={item} navigation={navigation}/>}
                    keyExtractor = {(item) => item.transactionId}
                    showsVerticalScrollIndicator = {false}
                    ItemSeparatorComponent={SeparatorComponent}
                    scrollEnabled = {false} />
                }
        </View>
    );
};
