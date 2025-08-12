import {View, Text, TextInput} from 'react-native';
import { useCreateBudgetStore } from '../../store/useCreateBudgetStore';
import { useEffect, useState } from 'react';
import { styles } from './BudgetAmountInput.styles';

export const BudgetAmountInput = () => {

    const {budgetAmount, setBudgetAmount, budgetAmountError, validateBudgetAmount} = useCreateBudgetStore();
    const [tempAmount, setTempAmount] = useState<string>(budgetAmount > 0 ? budgetAmount.toFixed(2) : '');


    useEffect(() => {
        validateBudgetAmount();
    }, [budgetAmount, validateBudgetAmount]);

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

        setTempAmount(text);

    };

    // Update store amount when input is blurred (like when user presses out)
    const handleBlur = () => {
        if (tempAmount && !isNaN(parseFloat(tempAmount))) {
            const formattedValue = parseFloat(tempAmount).toFixed(2);
            setTempAmount(formattedValue);
        }

        // Update store budget amount
        if (tempAmount === '') {
            setBudgetAmount(0);
        } else {
            const numericValue = parseFloat(tempAmount);
            if (!isNaN(numericValue)) {
                setBudgetAmount(numericValue);
            }
        }
    };

    return (
        <View style = {styles.transferAmountCardContainer}>
            <Text style = {styles.transferAmountTitle}>Budget Amount</Text>
            <View style = {styles.inputContainer}>
                <View style = {styles.inputTextContainer}>
                    <Text style = {styles.input}>$</Text>
                    <TextInput
                        style = {styles.inputText}
                        value={tempAmount}
                        onChangeText={handleTextChange}
                        onBlur={handleBlur}
                        placeholder = "0.00"
                        placeholderTextColor={'#ba927d'}
                        keyboardType = "decimal-pad"
                        returnKeyType = "done"
                        selectTextOnFocus={true}
                    />
            </View>
            <Text style={styles.subText}>Enter Budget Amount</Text>
            {budgetAmountError && (
                <Text style={styles.errorText}>{budgetAmountError}</Text>
            )}
        </View>
    </View>
    );
};
