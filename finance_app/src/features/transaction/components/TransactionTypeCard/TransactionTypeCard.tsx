import { View, Text } from 'react-native';
import { styles } from './TransactionTypeCard.styles';
import { TransactionTypeButton } from '../TransactionTypeButton/TransactionTypeButton';



export const TransactionTypeCard = () => {


    return (
        <View style = {styles.container}>
           <Text style = {styles.title}>Transaction Type</Text>
           <View style = {styles.transactionTypeContainer}>
                <TransactionTypeButton
                    selectedTransactionType = "EXPENSE"
                    label = "Expense"
                />
                <TransactionTypeButton
                    selectedTransactionType = "INCOME"
                    label = "Income"
                />
                <TransactionTypeButton
                    selectedTransactionType = "TRANSFER"
                    label = "Transfer"
                />
           </View>
        </View>
    );
};
