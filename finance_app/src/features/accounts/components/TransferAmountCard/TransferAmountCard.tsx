import { View, Text, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { styles } from './TransferAmountCard.styles';


type TransferAmountCardProps = {
    amount: number;
    onAmountChange : (amount: string) => void;
    error : string;
}

export const TransferAmountCard = ({
    amount,
    onAmountChange,
    error,
} : TransferAmountCardProps) => {
    const [inputValue, setInputValue] = useState<string>('');

    // Sync with external amount changes (like when reset to 0)
    useEffect(() => {
        if (amount === 0) {
            setInputValue('');
        }
    }, [amount]);

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
        onAmountChange(text);
    };

    const handleBlur = () => {
        if (inputValue && !isNaN(parseFloat(inputValue))) {
            const formattedValue = parseFloat(inputValue).toFixed(2);
            setInputValue(formattedValue);
        }
    };

    return (
        <View style = {styles.transferAmountCardContainer}>
            <Text style = {styles.transferAmountTitle}>Amount</Text>
            <View style = {styles.inputContainer}>
                <View style = {styles.inputTextContainer}>
                    <Text style = {styles.input}>$</Text>
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
                {error && (
                    <Text style={styles.errorText}>{error}</Text>
                )}
            </View>
        </View>
    );
};
