import { View, Text, TextInput } from 'react-native';
import { CoreBudgetData } from '../../../types';
import { styles } from './UpdateBudgetAmount.styles';
import { useState } from 'react';
import { useEffect } from 'react';
import { useEditBudgetStore } from '../../../store/useEditBudgetStore';
import { formatCurrencyWithConditionalDecimals } from '../../../../../utils/formatAmount';
import { getBudgetColorStatus } from '../../../utils/getBudgetColorStatus';



 type UpdateBudgetAmountProps = {
    data: CoreBudgetData;
}

export const UpdateBudgetAmount = ({data}: UpdateBudgetAmountProps) => {
    const {budgetAmount, budgetAmountDraft, setBudgetAmountDraft, validateBudgetAmount, budgetAmountError} = useEditBudgetStore();
    const [tempAmount, setTempAmount] = useState<string>(budgetAmountDraft > 0 ? budgetAmountDraft.toFixed(2) : '');

    // Update tempAmount when budgetAmountDraft changes (e.g., when switching tabs)
    useEffect(() => {
        setTempAmount(budgetAmountDraft > 0 ? budgetAmountDraft.toFixed(2) : '');
    }, [budgetAmountDraft]);

    useEffect(() => {
        validateBudgetAmount();
    }, [budgetAmountDraft, validateBudgetAmount]);

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
            setBudgetAmountDraft(0);
        } else {
            const numericValue = parseFloat(tempAmount);
            if (!isNaN(numericValue)) {
                setBudgetAmountDraft(numericValue);
            }
        }
    };

    const percentageUsed = (data.spentAmount / budgetAmountDraft) * 100;
    const newRemainingValue = budgetAmountDraft - data.spentAmount;


    return (
    <View style = {styles.transferAmountCardContainer}>
        <Text style = {styles.transferAmountTitle}>Update Budget Amount</Text>
        <View style = {styles.inputContainer}>
            <View style = {styles.inputTextContainer}>
                <Text style = {styles.input}>$</Text>
                <TextInput
                    style = {styles.inputText}
                    value={tempAmount}
                    onChangeText={handleTextChange}
                    onBlur={handleBlur}
                    placeholder = {budgetAmountDraft > 0 ? budgetAmountDraft.toFixed(2) : '0.00'}
                    placeholderTextColor={'#ba927d'}
                    keyboardType = "decimal-pad"
                    returnKeyType = "done"
                    selectTextOnFocus={true}
                />
            </View>
            <Text style={styles.subText}>Set new monthly budget</Text>
            {budgetAmountError && (
                <Text style={styles.errorText}>{budgetAmountError}</Text>
            )}
        </View>
        {(budgetAmountDraft > 0 && budgetAmountDraft !== budgetAmount) && (
            <View style = {styles.updatedBudgetImpactContainer}>
                <Text style = {styles.updateBudgetImpactTitle}>📊 Updated Budget Impact</Text>
                <View style = {styles.rowSection}>
                    <Text style = {styles.rowTitle}>Current Budget:</Text>
                    <Text style = {styles.rowValue}>${formatCurrencyWithConditionalDecimals(budgetAmount)}</Text>
                </View>
                <View style = {styles.rowSection}>
                    <Text style = {styles.rowTitle}>New Budget:</Text>
                    <Text style = {styles.rowValue}>${formatCurrencyWithConditionalDecimals(budgetAmountDraft)}</Text>
                </View>
                <View style = {styles.rowSection}>
                    <Text style = {styles.rowTitle}>Already Spent:</Text>
                    <Text style = {styles.rowValue}>${formatCurrencyWithConditionalDecimals(data.spentAmount)}</Text>
                </View>
                <Text style = {styles.newProgressText}>New Progress:</Text>
                <View style = {styles.progressBarContainer}>
                    <View style = {[styles.progressBar,
                        {width: `${percentageUsed > 100 ? 100 : percentageUsed}%`,
                        backgroundColor: getBudgetColorStatus(data.spentAmount, budgetAmountDraft)},
                        ]} />
                </View>
                <View style = {styles.rowSection}>
                    <Text style = {styles.rowTitle}>{Math.floor(percentageUsed)}% used</Text>
                    <Text style = {styles.rowValue}>${formatCurrencyWithConditionalDecimals(Math.abs(newRemainingValue))} {newRemainingValue >= 0 ? 'remaining' : 'over budget'} </Text>
                </View>
            </View>
        )}
    </View>
    );
};

