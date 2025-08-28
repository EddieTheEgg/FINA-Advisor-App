import { View, Text, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { styles } from './AddAccountDetailsCard.styles';
import { useAddAccountStore } from '../../store/useAddAccountStore';
import { AccountType } from '../../types';
import { colors } from '../../../../styles/colors';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';
import { useGroupAccounts } from '../../hooks/useGroupAccounts';

export const AddAccountDetailsCard = () => {
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
        accountNameError,
        validateAccountName,
        initializeAllAccounts,
    } = useAddAccountStore();

    const {data: allAccounts, isPending, error: fetchAllExistingAccountsError} = useGroupAccounts();

    const [inputValue, setInputValue] = useState<string>(
        accountBalance !== 0 ? accountBalance.toFixed(2) : ''
    );
    const [spendingLimitInput, setSpendingLimitInput] = useState<string>(
        creditLimit == null || creditLimit === 0 ? '' : Math.abs(creditLimit).toFixed(2)
    );
    const [showCreditBalanceInfo, setShowCreditBalanceInfo] = useState<boolean>(false);

    // Sync local input value with store amount when it changes
    useEffect(() => {
        setInputValue(accountBalance !== 0 ? accountBalance.toFixed(2) : '');
    }, [accountBalance]);

    // Sync local input value with store amount when it changes (only for credit card)
    useEffect(() => {
        setSpendingLimitInput(
            creditLimit == null || creditLimit === 0 ? '' : Math.abs(creditLimit).toFixed(2)
        );
    }, [creditLimit]);

    // Live validate account name as it changes
    useEffect(() => {
        if (accountName.length === 0) {
            return;
        }
        validateAccountName();
    },[accountName, validateAccountName]);

    // Initialize all accounts when they are fetched so we can validate account name uniqueness
    useEffect(() => {
        if (allAccounts) {
            initializeAllAccounts(Object.values(allAccounts.accountGroupsData).flat());
        }
    }, [allAccounts, initializeAllAccounts]);


    const handleTextChange = (text: string) => {
        // Allow negative numbers, positive numbers, and decimal points
        const numericRegex = /^-?[0-9]*\.?[0-9]*$/;
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
                // Credit limit should always be stored as positive
                setCreditLimit(Math.abs(numericValue));
            }
        }
    };

    if (fetchAllExistingAccountsError) {
        return <ErrorScreen
            errorText = "Error fetching accounts"
            errorSubText = "Something went wrong, existing accounts are needed to validate account name uniqueness"
            errorMessage = {fetchAllExistingAccountsError.message}
        />;
    }



    const remainingChars = 20 - (accountName.length || 0);

    if (accountType === AccountType.CREDIT_CARD) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Account Details - Credit Card</Text>
                <View>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>Account Name</Text>
                        <Text style={[styles.charCounter, remainingChars < 5 && styles.charCounterWarning]}>
                            {accountName.length}/20
                        </Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Account Name"
                        placeholderTextColor={colors.gray[400]}
                        value={accountName}
                        onChangeText={setAccountName}
                        maxLength={20}
                    />
                    {isPending && accountName.trim().length >= 3 && (
                        <Text style={styles.accountNameError}>Checking for duplicates...</Text>
                    )}
                    {accountNameError && !isPending && (
                        <Text style={styles.accountNameError}>{accountNameError}</Text>
                    )}
                </View>
                <View>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>Bank Name (Optional)</Text>
                        <Text style={[styles.charCounter, remainingChars < 5 && styles.charCounterWarning]}>
                            {accountBank?.length || 0}/20
                        </Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Bank Name"
                        placeholderTextColor={colors.gray[400]}
                        value={accountBank || ''}
                        onChangeText={setAccountBank}
                        maxLength={20}
                    />
                </View>
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
                    <Text style={styles.accountBalanceText}>Enter Current Balance</Text>
                    {showCreditBalanceInfo && <Text style={styles.accountBalanceText}>(+ if you have credit to spend, - if you owe money)</Text>}
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
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Account Details - {accountType.charAt(0).toUpperCase() + accountType.slice(1)}</Text>
            <View>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Account Name</Text>
                    <Text style={[styles.charCounter, remainingChars < 5 && styles.charCounterWarning]}>
                        {accountName.length}/20
                    </Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Account Name"
                    placeholderTextColor={colors.gray[400]}
                    value={accountName}
                    onChangeText={setAccountName}
                    maxLength={20}
                />
                {isPending && accountName.trim().length >= 3 && (
                    <Text style={styles.accountNameError}>Checking for duplicates...</Text>
                )}
                {accountNameError && !isPending && (
                    <Text style={styles.accountNameError}>{accountNameError}</Text>
                )}
            </View>
            <View>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Bank Name (Optional)</Text>
                    <Text style={[styles.charCounter, remainingChars < 5 && styles.charCounterWarning]}>
                        {accountBank?.length || 0}/20
                    </Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Bank Name"
                    placeholderTextColor={colors.gray[400]}
                    value={accountBank || ''}
                    onChangeText={setAccountBank}
                    maxLength={20}
                />
            </View>
            <View>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Account Balance</Text>
                </View>
                <TextInput
                    style={styles.inputAmount}
                    value={inputValue}
                    onChangeText={handleTextChange}
                    onBlur={handleBlur}
                    placeholder="0.00"
                    placeholderTextColor={colors.darkerBackground}
                    keyboardType="decimal-pad"
                    returnKeyType="done"
                    selectTextOnFocus={true}
                />
                <Text style={styles.accountBalanceText}>Enter Account Balance</Text>
            </View>
        </View>
    );
};
