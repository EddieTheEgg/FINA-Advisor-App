import { View, Text } from 'react-native';
import { styles } from './RecurringTransactionFrequencySelector.styles';
import { Picker } from '@react-native-picker/picker';

type RecurringTransactionFrequencySelectorProps = {
    onFrequencySelect: (frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY') => void;
    value: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY' | null;
};

export const RecurringTransactionFrequencySelector = ({ onFrequencySelect, value }: RecurringTransactionFrequencySelectorProps) => {

    const handleFrequencySelect = (itemValue: string) => {
        onFrequencySelect(itemValue as 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY');
    };

    return (
        <View style={styles.frequencyContainer}>
            <Text style={styles.frequencyTitle}>Frequency</Text>
            <Picker
                selectedValue={value ?? 'DAILY'}
                onValueChange={handleFrequencySelect}
            >
                <Picker.Item label="Daily" value="DAILY" />
                <Picker.Item label="Weekly" value="WEEKLY" />
                <Picker.Item label="Monthly" value="MONTHLY" />
                <Picker.Item label="Yearly" value="YEARLY" />
            </Picker>
        </View>
    );
};
