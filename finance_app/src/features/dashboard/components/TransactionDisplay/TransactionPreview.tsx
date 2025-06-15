import { Text, View } from 'react-native';
import { CategoryData} from '../../types';
import { styles } from './TransactionPreview.styles';



type Transaction = {
    transactionId: string;
    amount: number;
    title: string | null;
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

    const formatDate = () => {
        const date = new Date(transactionItem.transactionDate);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
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
                <Text 
                    style={styles.transactionTitle}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {transactionItem.title}
                </Text>
                <View style={styles.subDescBar}>
                    <Text style={styles.accountText}>
                        {formatDate()}
                    </Text>
                    <Text 
                        style={styles.accountName}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {transactionItem.accountName}
                    </Text>
                </View>
            </View>
            <Text style={getAmountStyle()}>
                {formatAmount()}
            </Text>
        </View>
    );
};

