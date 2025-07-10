import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { Text } from 'react-native';
import { useCreateTransactionStore } from '../../store/useTransactionStore';
import { styles } from './TransactionTypeButton.styles';


type TransactionTypeButtonProps = {
    selectedTransactionType: 'INCOME' | 'EXPENSE' | 'TRANSFER';
    label: string;
}

export const TransactionTypeButton = ({selectedTransactionType, label}: TransactionTypeButtonProps) => {

    const {transactionType, setTransactionType} = useCreateTransactionStore();

    return (
        <AnimatedPressable
        style={
            transactionType === selectedTransactionType
                ? styles.activeTransactionType
                : styles.inactiveTransactionType
        }
        onPress={() => setTransactionType(selectedTransactionType)}
    >
     <Text style = {transactionType === selectedTransactionType
                ? styles.activeTransactionTypeText
                : styles.inactiveTransactionTypeText}>{label}</Text>
    </AnimatedPressable>
);
};
