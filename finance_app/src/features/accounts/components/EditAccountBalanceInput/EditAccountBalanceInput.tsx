import { Text, TextInput, View } from 'react-native';
import { colors } from '../../../../styles/colors';
import { styles } from './EditAccountBalanceInput.styles';
import { useEditAccountStore } from '../../store/useEditAccountStore';
import { useState } from 'react';

export const EditAccountBalanceInput = () => {
    const {accountBalanceDraft, setAccountBalanceDraft} = useEditAccountStore();

    const [inputValue, setInputValue] = useState<string>(
        accountBalanceDraft !== 0 ? accountBalanceDraft.toFixed(2) : ''
    );

    const handleTextChange = (text: string) => {
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
    };

    return (
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
            <Text style={styles.accountBalanceText}>Edit Account Balance</Text>
            <View style = {styles.infoContainer}>
                <Text style = {styles.infoText}>Balance changes will automatically create a <Text style = {styles.infoTextBold}>balance adjustment transaction</Text> that will only appear in this account history.</Text>
            </View>
        </View>
    );
};
