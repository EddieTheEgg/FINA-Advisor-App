import { Text, TextInput, View } from 'react-native';
import { styles } from './EditMerchantInput.styles';
import { useEditTransactionStore } from '../../../../store/useEditTransactionStore';
import { useState, useEffect } from 'react';

export type EditMerchantInputProps = {
    placeholder? : string,
    maxLength? : number,
}


export const EditMerchantInput = ({placeholder = 'Merchant name...', maxLength = 50} : EditMerchantInputProps) => {
    const {merchantDraft, setMerchantDraft} = useEditTransactionStore();
    const [merchantInput, setMerchantInput] = useState(merchantDraft);

    // Sync local state with store value when it changes
    useEffect(() => {
        setMerchantInput(merchantDraft);
    }, [merchantDraft]);

    const storeValidMerchant = () => {
        if (merchantInput && merchantInput.trim() !== merchantDraft) {
            setMerchantDraft(merchantInput);
        }
    };


    const remainingChars = maxLength - (merchantInput?.length || 0);
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
