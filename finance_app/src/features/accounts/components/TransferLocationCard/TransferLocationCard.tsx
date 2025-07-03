import { Text, TextInput, View } from 'react-native';
import { styles } from './TransferLocationCard.styles';

type TransferLocationCardProps = {
    location: string;
    onLocationChange: (location: string) => void;
    placeholder?: string;
    maxLength?: number;
}

export const TransferLocationCard = ({
    location,
    onLocationChange,
    placeholder = 'Enter location...',
    maxLength = 50} : TransferLocationCardProps) => {
    const remainingChars = maxLength - location.length;
    return (
            <View style={styles.transferLocationCard}>
                <View style={styles.locationHeader}>
                    <Text style={styles.locationTitle}>Location (Optional)</Text>
                    <Text style={[
                        styles.charCounter,
                        remainingChars < 10 ? styles.charCounterWarning : {},
                    ]}>
                        {location.length}/{maxLength}
                    </Text>
                </View>
                <TextInput
                    style={styles.transferLocationInput}
                    value={location}
                    onChangeText={onLocationChange}
                    placeholder={placeholder}
                    placeholderTextColor="#999"
                    returnKeyType="done"
                    maxLength={maxLength}
                />
            </View>
        );
};
