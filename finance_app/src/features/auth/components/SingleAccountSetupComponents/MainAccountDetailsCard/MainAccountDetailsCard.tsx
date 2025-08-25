import { View, Text, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { styles } from './MainAccountDetailsCard.styles';
import { useAccountInfoStore } from '../../../store/useSignupStore';
import { AccountType } from '../../../types';
import { colors } from '../../../../../styles/colors';

export const MainAccountDetailsCard = () => {
    const {
        accountType,
        accountName,
        setAccountName,
        accountBank,
        setAccountBank,
        accountBalance,
        setAccountBalance,
        creditLimit,
        setCreditLimit,
        validateAccountName,
        accountNameError,
    } = useAccountInfoStore();

    const [inputValue, setInputValue] = useState<string>(accountBalance > 0 ? accountBalance.toFixed(2) : '');
    const [spendingLimitInput, setSpendingLimitInput] = useState<string>(creditLimit == null ? '' : creditLimit.toFixed(2));

    // Sync local input value with store amount when it changes
    useEffect(() => {
        setInputValue(accountBalance > 0 ? accountBalance.toFixed(2) : '');
    }, [accountBalance]);

    useEffect(() => {
        setSpendingLimitInput(creditLimit == null ? '' : creditLimit.toFixed(2));
    }, [creditLimit]);

    useEffect(() => {
        if (accountName.length === 0) {
            return;
        }
        validateAccountName();
    },[accountName, validateAccountName]);

    const handleTextChange = (text: string) => {
        // Only allow numbers and decimal point
        const numericRegex = /^[0-9]*\.?[0-9]*$/;
        if (!numericRegex.test(text)) {
            return;
        }

        setInputValue(text);
    };

    const handleSpendingLimitChange = (text: string) => {
        const numericRegex = /^[0-9]*\.?[0-9]*$/;
        if (!numericRegex.test(text)) {
            return;
        }

        setSpendingLimitInput(text);
    };

    // Update store amount when input is blurred (like when user presses out)
    const handleBlur = () => {
        if (inputValue && !isNaN(parseFloat(inputValue))) {
            const formattedValue = parseFloat(inputValue).toFixed(2);
            setInputValue(formattedValue);
        }

        // Update store amount for account balance
        if (inputValue === '') {
            setAccountBalance(0);
        } else {
            const numericValue = parseFloat(inputValue);
            if (!isNaN(numericValue)) {
                setAccountBalance(numericValue);
            }
        }
    };

    //Update store amount for spending limit input when blurred (when user pressed out)
    const handleSpendingLimitBlur = () => {
        if (spendingLimitInput && !isNaN(parseFloat(spendingLimitInput))) {
            const formattedValue = parseFloat(spendingLimitInput).toFixed(2);
            setSpendingLimitInput(formattedValue);
        }

        // Update store amount for credit limit
        if (spendingLimitInput === '') {
            setCreditLimit(0);
        } else {
            const numericValue = parseFloat(spendingLimitInput);
            if (!isNaN(numericValue)) {
                setCreditLimit(numericValue);
            }
        }
    };

    const remainingChars = 20 - (accountName.length || 0);

    if (accountType === AccountType.CREDIT_CARD) {
        return (
            <View style = {styles.container}>
            <Text style = {styles.title}>Account Details - {accountType.charAt(0).toUpperCase() + accountType.slice(1)}</Text>
            <View>
                <View style = {styles.headerContainer}>
                    <Text style = {styles.headerText}>Account Name</Text>
                    <Text style = {[styles.charCounter, remainingChars < 5 && styles.charCounterWarning]}>
                        {accountName.length}/20
                    </Text>
                </View>
                <TextInput
                    style = {styles.input}
                    placeholder = "Enter Account Name"
                    placeholderTextColor={colors.gray[400]}
                    value = {accountName}
                    onChangeText = {setAccountName}
                    maxLength = {20}
                />
                {accountNameError && <Text style = {styles.errorText}>{accountNameError}</Text>}
            </View>
            <View>
                <View style = {styles.headerContainer}>
                    <Text style = {styles.headerText}>Bank Name (Optional)</Text>
                    <Text style = {[styles.charCounter, remainingChars < 5 && styles.charCounterWarning]}>
                        {accountBank?.length || 0}/20
                    </Text>
                </View>
                <TextInput
                    style = {styles.input}
                    placeholder = "Enter Bank Name"
                    placeholderTextColor={colors.gray[400]}
                    value = {accountBank || ''}
                    onChangeText = {setAccountBank}
                    maxLength = {20}
                />
            </View>
            <View>
                <View style = {styles.headerContainer}>
                    <Text style = {styles.headerText}>Spent Balance</Text>
                </View>
                <View style = {styles.rowContainer}>
                    <Text style = {styles.negativeText}>-</Text>
                    <TextInput
                        style = {styles.inputAmount}
                        value={inputValue}
                        onChangeText={handleTextChange}
                        onBlur={handleBlur}
                        placeholder = "0.00"
                        placeholderTextColor={colors.darkerBackground}
                        keyboardType = "decimal-pad"
                        returnKeyType = "done"
                        selectTextOnFocus={true}
                    />
                </View>
                <Text style = {styles.accountBalanceText}>Enter Spent Balance</Text>
            </View>
            <View>
                <View style = {styles.headerContainer}>
                    <Text style = {styles.headerText}>Credit Limit (Optional)</Text>
                </View>
                <View style = {styles.rowContainer}>
                    <Text style = {styles.negativeText}>-</Text>
                    <TextInput
                        style = {styles.inputAmount}
                        value={spendingLimitInput}
                        onChangeText={handleSpendingLimitChange}
                        onBlur={handleSpendingLimitBlur}
                        placeholder = "0.00"
                        placeholderTextColor={colors.darkerBackground}
                        keyboardType = "decimal-pad"
                        returnKeyType = "done"
                        selectTextOnFocus={true}
                    />
                </View>
                {/* Note to self, should we make credit limit monthly 
                or for all time? Also we need to pass negative to make it negative,
                should we force negative for credit? */}
                <Text style = {styles.accountBalanceText}>Enter Credit Limit (for the month or forever?)</Text>
            </View>
        </View>
        );
    }

    return (
        <View style = {styles.container}>
            <Text style = {styles.title}>Account Details - {accountType.charAt(0).toUpperCase() + accountType.slice(1)}</Text>
            <View>
                <View style = {styles.headerContainer}>
                    <Text style = {styles.headerText}>Account Name</Text>
                    <Text style = {[styles.charCounter, remainingChars < 5 && styles.charCounterWarning]}>
                        {accountName.length}/20
                    </Text>
                </View>
                <TextInput
                    style = {styles.input}
                    placeholder = "Enter Account Name"
                    placeholderTextColor={colors.gray[400]}
                    value = {accountName}
                    onChangeText = {setAccountName}
                    maxLength = {20}
                />
                {accountNameError && <Text style = {styles.errorText}>{accountNameError}</Text>}
            </View>
            <View>
                <View style = {styles.headerContainer}>
                    <Text style = {styles.headerText}>Bank Name (Optional)</Text>
                    <Text style = {[styles.charCounter, remainingChars < 5 && styles.charCounterWarning]}>
                        {accountBank?.length || 0}/20
                    </Text>
                </View>
                <TextInput
                    style = {styles.input}
                    placeholder = "Enter Bank Name"
                    placeholderTextColor={colors.gray[400]}
                    value = {accountBank || ''}
                    onChangeText = {setAccountBank}
                    maxLength = {20}
                />
            </View>
            <View>
                <View style = {styles.headerContainer}>
                    <Text style = {styles.headerText}>Account Balance</Text>
                </View>
                <TextInput
                    style = {styles.inputAmount}
                    value={inputValue}
                    onChangeText={handleTextChange}
                    onBlur={handleBlur}
                    placeholder = "0.00"
                    placeholderTextColor={colors.darkerBackground}
                    keyboardType = "decimal-pad"
                    returnKeyType = "done"
                    selectTextOnFocus={true}
                />
                <Text style = {styles.accountBalanceText}>Enter Account Balance</Text>
            </View>
        </View>
    );
};
