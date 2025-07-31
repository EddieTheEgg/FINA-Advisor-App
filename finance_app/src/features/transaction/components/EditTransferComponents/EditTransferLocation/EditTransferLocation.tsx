import { Text, TextInput, View } from 'react-native';
import { styles } from './EditTransferLocation.styles';
import { useState } from 'react';
import { useEditTransactionStore } from '../../../store/useEditTransactionStore.ts';

export type EditTransferLocationProps = {
    placeholder? : string,
    maxLength? : number,
}


export const EditTransferLocation = ({placeholder = 'Location...', maxLength = 50} : EditTransferLocationProps) => {
    const {locationDraft, setLocationDraft} = useEditTransactionStore();
    const [locationInput, setLocationInput] = useState(locationDraft);

    const storeValidLocation = () => {
        if (locationInput && locationInput.trim() !== locationDraft) {
            setLocationDraft(locationInput);
        }
    };


    const remainingChars = maxLength - (locationInput?.length || 0);
    return (
        <View style={styles.locationContainer}>
            <View style={styles.locationHeader}>
                <Text style={styles.locationText}>Location (Optional)</Text>
                <Text style={[
                    styles.charCounter,
                    remainingChars < 10 ? styles.charCounterWarning : {},
                ]}>
                    {locationInput?.length}/{maxLength}
                </Text>
            </View>
            <TextInput
                style={styles.locationInput}
                value={locationInput || ''}
                onChangeText={setLocationInput}
                placeholder={placeholder}
                placeholderTextColor="#999"
                returnKeyType="done"
                maxLength={maxLength}
                onBlur={storeValidLocation}
            />
        </View>
    );
};
