import React from 'react';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { Text } from 'react-native';
import { useCreateTransactionStore } from '../../store/useTransactionStore';
import { styles } from './TransactionTypeButton.styles';


type TransactionTypeButtonProps = {
    selectedTransactionType: 'INCOME' | 'EXPENSE' | 'TRANSFER';
    label: string;
}

export const TransactionTypeButton = React.memo(({selectedTransactionType, label}: TransactionTypeButtonProps) => {

    const {transactionType, setTransactionType, resetToInitialState} = useCreateTransactionStore();

    const handleChangeTransactionType = () => {
        if (selectedTransactionType !== transactionType) {
            resetToInitialState();
        }
        setTransactionType(selectedTransactionType);
    };

    return (
        <AnimatedPressable
        style={
            transactionType === selectedTransactionType
                ? styles.activeTransactionType
                : styles.inactiveTransactionType
        }
        onPress={handleChangeTransactionType}
    >
     <Text style = {transactionType === selectedTransactionType
                ? styles.activeTransactionTypeText
                : styles.inactiveTransactionTypeText}>{label}</Text>
    </AnimatedPressable>
);
});
