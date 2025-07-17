import { Text, TextInput, View } from 'react-native';
import { styles } from './LocationInput.styles.ts';
import { useCreateTransactionStore } from '../../store/useTransactionStore';
import { useState } from 'react';

export type LocationInputProps = {
    placeholder? : string,
    maxLength? : number,
}


export const LocationInput = ({placeholder = 'Location...', maxLength = 50} : LocationInputProps) => {
    const {location, setLocation} = useCreateTransactionStore();
    const [locationInput, setLocationInput] = useState(location);

    const storeValidLocation = () => {
        if (locationInput && locationInput.trim() !== location) {
            setLocation(locationInput);
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
