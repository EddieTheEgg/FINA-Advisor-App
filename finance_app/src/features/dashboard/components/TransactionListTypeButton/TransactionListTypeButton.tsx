import React from 'react';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { Text } from 'react-native';
import { useCreateTransactionListStore } from '../../store/useTransactionListStore';
import { styles } from './TransactionListTypeButton.styles';

type TransactionTypeButtonProps = {
    selectedTransactionListType: 'ALL' | 'INCOME' | 'EXPENSE' | 'TRANSFER';
    label: string;
}

export const TransactionListTypeButton = React.memo(({selectedTransactionListType, label}: TransactionTypeButtonProps) => {

    const {transactionListType, setTransactionListType, clearAllActualFilters} = useCreateTransactionListStore();

    const handleChangeTransactionType = () => {
        if (selectedTransactionListType !== transactionListType) {
            clearAllActualFilters();
        }
        setTransactionListType(selectedTransactionListType);
    };

    return (
        <AnimatedPressable
            style={[
                transactionListType === selectedTransactionListType
                    ? styles.activeTransactionListType
                    : styles.inactiveTransactionListType,
            ]}
            onPress={handleChangeTransactionType}
        >
            <Text style = {transactionListType === selectedTransactionListType
                ? styles.activeTransactionListTypeText
                : styles.inactiveTransactionListTypeText}>{label}</Text>
        </AnimatedPressable>
    );
});
