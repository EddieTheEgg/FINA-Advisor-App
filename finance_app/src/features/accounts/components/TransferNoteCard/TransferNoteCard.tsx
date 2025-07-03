import { Text, TextInput, View } from 'react-native';
import { styles } from './TransferNoteCard.styles';

type TransferNoteCardProps = {
    note: string;
    onNoteChange : (note : string) => void
    placeholder?: string;
    maxLength?: number;
};


export const TransferNoteCard = ({note, onNoteChange, placeholder = 'Enter note...', maxLength = 150} : TransferNoteCardProps) => {
    const remainingChars = maxLength - note.length;
    return (
        <View style={styles.transferNoteCard}>
            <View style={styles.noteHeader}>
                <Text style={styles.noteTitle}>Note (Optional)</Text>
                <Text style={[
                    styles.charCounter,
                    remainingChars < 10 ? styles.charCounterWarning : {},
                ]}>
                    {note.length}/{maxLength}
                </Text>
            </View>
            <TextInput
                style={styles.transferNoteInput}
                value={note}
                onChangeText={onNoteChange}
                placeholder={placeholder}
                placeholderTextColor="#999"
                returnKeyType="done"
                maxLength={maxLength}
            />
        </View>
    );
};
