import { View, Text } from 'react-native';
import { styles } from './EditTransactionTypeCard.styles';
import { EditTransactionTypeButton } from '../EditTransactionTypeButton/EditTransactionTypeButton';
import { useEditTransactionStore } from '../../../store/useEditTransactionStore';

export const EditTransactionTypeCard = () => {

    const {transactionType, transactionTypeDraft} = useEditTransactionStore();
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
            {transactionType !== transactionTypeDraft && (
                <View style = {styles.transactionTypeInfoContainer}>
                        <Text style = {styles.transactionTypeInfoText}>💡 Transaction type is different from the original transaction, this will affect how the amount impacts your account balance!</Text>
                </View>
            )}
        </View>
    );
};
