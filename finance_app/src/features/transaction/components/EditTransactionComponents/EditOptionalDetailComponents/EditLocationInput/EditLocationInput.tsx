import { Text, TextInput, View } from 'react-native';
import { styles } from './EditLocationInput.styles';
import { useEditTransactionStore } from '../../../../store/useEditTransactionStore';
import { useState, useEffect } from 'react';

export type EditLocationInputProps = {
    placeholder? : string,
    maxLength? : number,
}


export const EditLocationInput = ({placeholder = 'Location...', maxLength = 50} : EditLocationInputProps) => {
    const {locationDraft, setLocationDraft} = useEditTransactionStore();
    const [locationInput, setLocationInput] = useState(locationDraft);

    // Sync local state with store value when it changes
    useEffect(() => {
        setLocationInput(locationDraft);
    }, [locationDraft]);

    const storeValidLocation = () => {
        if (locationInput && locationInput.trim() !== locationDraft) {
            setLocationDraft(locationInput);
        }
    };


    const remainingChars = maxLength - (locationInput?.length || 0);
    return (
        <View style={styles.locationContainer}>
            <View style={styles.locationHeader}>
                <Text style={styles.locationText}>Location</Text>
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
