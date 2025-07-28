import { View, Text } from 'react-native';
import { styles } from './EditTransactionTypeCard.styles';
import { EditTransactionTypeButton } from '../EditTransactionTypeButton/EditTransactionTypeButton';

export const EditTransactionTypeCard = () => {

    return (
        <View style = {styles.container}>
           <Text style = {styles.title}>Transaction Type</Text>
           <View style = {styles.transactionTypeContainer}>
                <EditTransactionTypeButton
                    selectedTransactionType = "EXPENSE"
                    label = "Expense"
                />
                <EditTransactionTypeButton
                    selectedTransactionType = "INCOME"
                    label = "Income"
                />
           </View>
           <View style = {styles.transactionTypeInfoContainer}>
                <Text style = {styles.transactionTypeInfoText}>💡 Changing transaction type will affect how this impacts your account balance</Text>
           </View>
        </View>
    );
};
