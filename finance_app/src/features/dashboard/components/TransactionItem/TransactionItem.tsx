import { Text, View } from 'react-native';
import { TransactionSummary } from '../../types';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { styles } from './TransactionItem.styles';
import { truncateText } from '../../../../utils/textFormat';
import { formatDate } from '../../../../utils/formatDate';
import { DashboardNavigationProps } from '../../../../navigation/types/DashboardNavigatorTypes';
import { formatAmount } from '../../../../utils/formatAmount';

type TransactionItemProps = {
    transaction: TransactionSummary;
    navigation: DashboardNavigationProps;
};

export const TransactionItem = ({transaction, navigation}: TransactionItemProps) => {

    const getAmountStyle = () => {
        switch (transaction.transactionType) {
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



    return (
        <AnimatedPressable
        style = {styles.transactionItemContainer}
        onPress = {() => {
            //From DashboardNavigator to HomeNavigator to RootNavigator where TransactionDetail is defined
            navigation.getParent()?.getParent()?.navigate('TransactionDetail', {transactionId: transaction.transactionId});
        }}
        >
            <Text style = {[styles.transactionItemIcon, {backgroundColor: transaction.category.color}]}>{transaction.category.icon}</Text>
            <View style = {styles.transactionItemContent}>
                <Text style = {styles.transactionItemTitle}>{truncateText(transaction.title, 15)}</Text>
                <Text style = {styles.transactionItemSubInfoText}>{formatDate(new Date(transaction.transactionDate))} • {transaction.accountName}</Text>
            </View>
            <Text style = {[getAmountStyle()]}>{formatAmount(transaction.transactionType, transaction.amount)}</Text>
        </AnimatedPressable>
    );
};

