import { Text, TextInput, View } from 'react-native';
import { styles } from './MerchantInput.styles';
import { useCreateTransactionStore } from '../../store/useTransactionStore';
import { useState } from 'react';

export type MerchantInputProps = {
    placeholder? : string,
    maxLength? : number,
}


export const MerchantInput = ({placeholder = 'Merchant name...', maxLength = 50} : MerchantInputProps) => {
    const {merchant, setMerchant} = useCreateTransactionStore();
    const [merchantInput, setMerchantInput] = useState(merchant);

    const storeValidMerchant = () => {
        if (merchantInput && merchantInput.trim() !== merchant) {
            setMerchant(merchantInput);
        }
    };


    const remainingChars = maxLength - MerchantInput.length;
    return (
        <View style={styles.merchantContainer}>
            <View style={styles.merchantHeader}>
                <Text style={styles.merchantText}>Merchant</Text>
                <Text style={[
                    styles.charCounter,
                    remainingChars < 10 ? styles.charCounterWarning : {},
                ]}>
                    {merchantInput?.length}/{maxLength}
                </Text>
            </View>
            <TextInput
                style={styles.merchantInput}
                value={merchantInput || ''}
                onChangeText={setMerchantInput}
                placeholder={placeholder}
                placeholderTextColor="#999"
                returnKeyType="done"
                maxLength={maxLength}
                onBlur={storeValidMerchant}
            />
        </View>
    );
};
