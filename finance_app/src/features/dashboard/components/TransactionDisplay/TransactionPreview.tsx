import { Text, View } from 'react-native';
import { CategoryData} from '../../types';
import { styles } from './TransactionPreview.styles';
import { formatDate } from '../../../../utils/formatDate';



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
}

export const TransactionPreview = ({transactionItem} : TransactionPreviewProps) => {
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


    return (
        <View style={styles.transactionItemContainer}>
            <View style={[
                styles.iconContainer,
                { backgroundColor: transactionItem.category.color || '#808080' },
            ]}>
                <Text style={styles.iconText}>{transactionItem.category.icon}</Text>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.transactionTitle}>
                    {truncateText(transactionItem.title, 18)}
                </Text>
                <View style={styles.subDescBar}>
                    <Text style={styles.accountText}>
                        {formatDate(new Date(transactionItem.transactionDate))}
                    </Text>
                    <Text style={styles.accountName}>
                        {truncateText(transactionItem.accountName, 15)}
                    </Text>
                </View>
            </View>
            <Text style={getAmountStyle()}>
                {formatAmount()}
            </Text>
        </View>
    );
};

