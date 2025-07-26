import React from 'react';
import { AnimatedPressable } from '../../../../../components/AnimatedPressable/AnimatedPressable';
import { Text } from 'react-native';
import { useEditTransactionStore } from '../../../store/useEditTransactionStore';
import { styles } from './EditTransactionTypeButton.styles';


type EditTransactionTypeButtonProps = {
    selectedTransactionType: 'INCOME' | 'EXPENSE' | 'TRANSFER';
    label: string;
}

export const EditTransactionTypeButton = React.memo(({selectedTransactionType, label}: EditTransactionTypeButtonProps) => {

    const {transactionTypeDraft, setTransactionTypeDraft} = useEditTransactionStore();

    const handleChangeTransactionType = () => {
        setTransactionTypeDraft(selectedTransactionType);
    };

    return (
        <AnimatedPressable
        style={
            transactionTypeDraft === selectedTransactionType
                ? styles.activeTransactionType
                : styles.inactiveTransactionType
        }
        onPress={handleChangeTransactionType}
    >
     <Text style = {transactionTypeDraft === selectedTransactionType
                ? styles.activeTransactionTypeText
                : styles.inactiveTransactionTypeText}>{label}</Text>
    </AnimatedPressable>
);
});
