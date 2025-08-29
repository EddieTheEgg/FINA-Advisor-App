import {View, Text, TextInput} from 'react-native';
import { useState } from 'react';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { colors } from '../../../../styles/colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { styles } from './EditAccountCreditInputs.styles';
import { useEditAccountStore } from '../../store/useEditAccountStore';

export const EditAccountCreditInputs = () => {
    const {accountBalanceDraft, creditLimitDraft,setAccountBalanceDraft, setCreditLimitDraft, validateCreditLimit, creditLimitError} = useEditAccountStore();
    const [inputValue, setInputValue] = useState<string>(
        accountBalanceDraft !== 0 ? accountBalanceDraft.toFixed(2) : ''
    );
    const [spendingLimitInput, setSpendingLimitInput] = useState<string>(
        creditLimitDraft == null || creditLimitDraft === 0 ? '' : Math.abs(creditLimitDraft).toFixed(2)
    );
    const [showCreditBalanceInfo, setShowCreditBalanceInfo] = useState(false);

    // Handle account balance input change
    const handleTextChange = (text: string) => {
        // Allow negative numbers, positive numbers, and decimal points
        const numericRegex = /^-?[0-9]*\.?[0-9]*$/;
        if (!numericRegex.test(text)) {
            return;
        }

        setInputValue(text);
    };

    const handleBlur = () => {
        if (inputValue && !isNaN(parseFloat(inputValue))) {
            const formattedValue = parseFloat(inputValue).toFixed(2);
            setInputValue(formattedValue);
        }

        // Update store amount for account balance
        if (inputValue === '') {
            setAccountBalanceDraft(0);
        } else {
            const numericValue = parseFloat(inputValue);
            if (!isNaN(numericValue)) {
                setAccountBalanceDraft(numericValue);
            }
        }
        // Validate credit limit after balance changes
        validateCreditLimit();
    };

    // Handle spending limit input change
    const handleSpendingLimitChange = (text: string) => {
        const numericRegex = /^[0-9]*\.?[0-9]*$/;
        if (!numericRegex.test(text)) {
            return;
        }

        setSpendingLimitInput(text);
    };

    const handleSpendingLimitBlur = () => {
        if (spendingLimitInput && !isNaN(parseFloat(spendingLimitInput))) {
            const formattedValue = parseFloat(spendingLimitInput).toFixed(2);
            setSpendingLimitInput(formattedValue);
        }

        // Update store amount for credit limit
        if (spendingLimitInput === '') {
            setCreditLimitDraft(0);
        } else {
            const numericValue = parseFloat(spendingLimitInput);
            if (!isNaN(numericValue)) {
                // Credit limit should always be stored as positive
                setCreditLimitDraft(Math.abs(numericValue));
            }
        }
        // Validate credit limit after limit changes
        validateCreditLimit();
    };

    return(
        <View>
            <View>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Credit Balance</Text>
                    <AnimatedPressable
                        onPress={() => setShowCreditBalanceInfo(!showCreditBalanceInfo)}
                    >
                        <FontAwesome6 name="circle-question" size={16} color={colors.black} />
                    </AnimatedPressable>
                </View>
                <TextInput
                    style={styles.inputAmount}
                    value={inputValue}
                    onChangeText={handleTextChange}
                    onBlur={handleBlur}
                    placeholder="0.00"
                    placeholderTextColor={colors.darkerBackground}
                    keyboardType="numeric"
                    returnKeyType="done"
                    selectTextOnFocus={true}
                />
                <Text style={styles.accountBalanceText}>Edit Current Balance</Text>
                {showCreditBalanceInfo && <Text style={styles.accountBalanceText}>(+ if you have credit to spend, - if you owe money)</Text>}
                <View style = {styles.infoContainer}>
                    <Text style = {styles.infoText}>Balance changes will automatically create a <Text style = {styles.infoTextBold}>balance adjustment transaction</Text> that will only appear in this account history.</Text>
                </View>
            </View>
    <View>
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Credit Limit (Optional)</Text>
        </View>
        <TextInput
            style={styles.inputAmount}
            value={spendingLimitInput}
            onChangeText={handleSpendingLimitChange}
            onBlur={handleSpendingLimitBlur}
            placeholder="0.00"
            placeholderTextColor={colors.darkerBackground}
            keyboardType="decimal-pad"
            returnKeyType="done"
            selectTextOnFocus={true}
        />
            <Text style={styles.accountBalanceText}>Enter Max Spending Limit</Text>
            {creditLimitError && <Text style={styles.errorText}>{creditLimitError}</Text>}
        </View>
    </View>
    );
};
