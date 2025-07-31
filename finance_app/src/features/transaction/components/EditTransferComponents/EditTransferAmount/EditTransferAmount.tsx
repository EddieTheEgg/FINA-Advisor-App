import { Text, TextInput, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useEditTransactionStore } from '../../../store/useEditTransactionStore';
import { styles } from './EditTransferAmount.styles';

export const EditTransferAmount = () => {

    const {amountDraft, setAmountDraft, sourceAccountDraft, toAccountDraft, validateTransferAmount, transactionTypeDraft, transferAmountError} = useEditTransactionStore();
    const [inputValue, setInputValue] = useState<string>(amountDraft > 0 ? amountDraft.toFixed(2) : '');

    useEffect(() => {
        validateTransferAmount();
    }, [amountDraft, validateTransferAmount, sourceAccountDraft, toAccountDraft]);

    // Sync local input value with store amount when it changes
    useEffect(() => {
        setInputValue(amountDraft > 0 ? amountDraft.toFixed(2) : '');
    }, [amountDraft]);

    const handleTextChange = (text: string) => {
        // If text has multiple decimal points, remove the extra ones
        if (text.includes('.')) {
            const parts = text.split('.');
            if (parts.length > 2) {
                text = parts[0] + '.' + parts.slice(1).join('');
            }
        }

        // If text has more than two digits after the decimal point, limit to 2
        if (text.includes('.')) {
            const parts = text.split('.');
            if (parts[1] && parts[1].length > 2) {
                text = parts[0] + '.' + parts[1].slice(0, 2);
            }
        }

        // If text has more than 8 characters total, limit to 8
        if (text.length > 8) {
            text = text.slice(0, 8);
        }

        setInputValue(text);

    };

    // Update store amount when input is blurred (like when user presses out)
    const handleBlur = () => {
        if (inputValue && !isNaN(parseFloat(inputValue))) {
            const formattedValue = parseFloat(inputValue).toFixed(2);
            setInputValue(formattedValue);
        }

        // Update store amount
        if (inputValue === '') {
            setAmountDraft(0);
        } else {
            const numericValue = parseFloat(inputValue);
            if (!isNaN(numericValue)) {
                setAmountDraft(numericValue);
            }
        }
    };

    return (
          <View style = {styles.transferAmountCardContainer}>
            <Text style = {styles.transferAmountTitle}>Transfer Amount</Text>
            <View style = {styles.inputContainer}>
                <View style = {styles.inputTextContainer}>
                    {transactionTypeDraft === 'EXPENSE' ? (
                    <Text style = {styles.input}>$-</Text>) : (
                    <Text style = {styles.input}>$</Text>)}
                    <TextInput
                        style = {styles.inputText}
                        value={inputValue}
                        onChangeText={handleTextChange}
                        onBlur={handleBlur}
                        placeholder = "0.00"
                        placeholderTextColor={'#ba927d'}
                        keyboardType = "decimal-pad"
                        returnKeyType = "done"
                        selectTextOnFocus={true}
                    />
                </View>
                <Text style={styles.subText}>Enter Transfer Amount</Text>
                {transferAmountError && (
                    <Text style={styles.errorText}>{transferAmountError}</Text>
                )}
            </View>
        </View>
    );
};
