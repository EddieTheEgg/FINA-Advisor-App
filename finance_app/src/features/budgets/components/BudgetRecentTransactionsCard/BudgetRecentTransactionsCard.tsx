import { View, Text } from 'react-native';
import { BudgetDetailData } from '../../types';
import { styles } from './BudgetRecentTransactionsCard.styles';
import { BudgetsNavigatorProps } from '../../../../navigation/types/BudgetsNavigatorTypes';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { formatDate } from '../../../../utils/formatDate';
import { truncateText } from '../../../../utils/textFormat';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { colors } from '../../../../styles/colors';
import { fontSize } from '../../../../styles/fontSizes';

type BudgetRecentTransactionsCardProps = {
    data: BudgetDetailData;
    navigation: BudgetsNavigatorProps;
}

export const BudgetRecentTransactionsCard = ({data, navigation}: BudgetRecentTransactionsCardProps) => {
    const handleNavToTransactionDetails = (transactionId: string) => {
        navigation.getParent()?.getParent()?.navigate('TransactionDetail', {
            transactionId: transactionId,
        });
    };

    return (
        <View style = {styles.container}>
            <Text style = {styles.title}>{data.coreBudgetData.budgetIcon} Recent {data.coreBudgetData.budgetTitle} Transactions</Text>
            <View>
                {data.recentBudgetTransactions.map((transaction) => (
                    <View key = {transaction.transactionId}>
                        <AnimatedPressable
                            onPress = {() => handleNavToTransactionDetails(transaction.transactionId)}
                            style = {styles.transactionItem}
                        >
                            <Text style = {[styles.transactionIcon, {backgroundColor: transaction.categoryColor}]}>{transaction.categoryIcon}</Text>
                            <View style = {styles.transactionDetails}>
                                <Text style = {styles.transactionTitle}>{truncateText(transaction.transactionTitle, 15)}</Text>
                                <Text style = {styles.transactionDate}>{formatDate(transaction.transactionDate)}</Text>
                            </View>
                            <Text style = {styles.transactionAmount}>-${truncateText(transaction.transactionAmount.toFixed(2).toString(), 10)}</Text>
                        </AnimatedPressable>
                        <View style = {styles.transactionSeparator} />
                    </View>
                ))}
            </View>
            <AnimatedPressable
                onPress = {() => {}}
                style = {styles.viewAllTransactionsButton}
            >
                <Text style = {styles.viewAllTransactionsButtonText}>View All {truncateText(data.coreBudgetData.budgetTitle, 10)} Transactions <FontAwesome6 name = "arrow-right" size = {fontSize.sm + 2} color = {colors.darkerBackground} /></Text>
            </AnimatedPressable>
        </View>
    );
};
