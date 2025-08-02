import { Text, View } from 'react-native';
import { CategoryData} from '../../types';
import { styles } from './TransactionPreview.styles';
import { formatDate } from '../../../../utils/formatDate';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { DashboardNavigationProps } from '../../../../navigation/types/DashboardNavigatorTypes';



type Transaction = {
    transactionId: string;
    amount: number;
    title: string;
    transactionDate: string;
    transactionType: 'INCOME' | 'EXPENSE' | 'TRANSFER';
    category: CategoryData;
    merchant: string | null;
    accountName: string;
    toAccountName?: string;
    notes: string | null;
    isSubscription: boolean;
}

type TransactionPreviewProps = {
    transactionItem : Transaction
    navigation: DashboardNavigationProps;
}

export const TransactionPreview = ({transactionItem, navigation} : TransactionPreviewProps) => {
    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    };

    const getAmountStyle = () => {
        switch (transactionItem.transactionType) {
            case 'INCOME':
                return [styles.transactionAmount, styles.incomeAmount];
            case 'EXPENSE':
                return [styles.transactionAmount, styles.expenseAmount];
            case 'TRANSFER':
                return [styles.transactionAmount, styles.transferAmount];
            default:
                return styles.transactionAmount;
        }
    };

    const formatAmount = () => {
        const sign = transactionItem.transactionType === 'INCOME' ? '+' :
                    transactionItem.transactionType === 'EXPENSE' ? '-' : '';
        return `${sign}$${Math.abs(transactionItem.amount).toFixed(2)}`;
    };

    const handleNavToTransactionDetails = () => {
        navigation.getParent()?.getParent()?.navigate('TransactionDetail', {
            transactionId: transactionItem.transactionId,
        });
    };


    return (
        <AnimatedPressable
        onPress = {handleNavToTransactionDetails}>
            <View style={styles.transactionItemContainer}>
                <Text style={[styles.iconText, {backgroundColor: transactionItem.category.color}]}>{transactionItem.category.icon}</Text>
                <View style={styles.contentContainer}>
                    <Text style={styles.transactionTitle}>{truncateText(transactionItem.title, 15)}</Text>
                    <Text style={styles.accountText}>{formatDate(transactionItem.transactionDate)} • {truncateText(transactionItem.accountName, 15)}</Text>
                </View>
                <Text style={getAmountStyle()}>
                    {formatAmount()}
                </Text>
            </View>
        </AnimatedPressable>
    );
};

