import { Text, TextInput, View } from 'react-native';
import { styles } from './NotesInput.styles.ts';
import { useCreateTransactionStore } from '../../store/useTransactionStore';
import { useState } from 'react';

export type NotesInputProps = {
    placeholder? : string,
    maxLength? : number,
}


export const NotesInput = ({placeholder = 'Notes...', maxLength = 250} : NotesInputProps) => {
    const {notes, setNotes} = useCreateTransactionStore();
    const [notesInput, setNotesInput] = useState(notes);

    const storeValidMerchant = () => {
        if (notesInput && notesInput.trim() !== notes) {
            setNotes(notesInput);
        }
    };


    const remainingChars = maxLength - (notesInput?.length || 0);
    return (
        <View style={styles.notesContainer}>
            <View style={styles.notesHeader}>
                <Text style={styles.notesText}>Notes</Text>
                <Text style={[
                    styles.charCounter,
                    remainingChars < 10 ? styles.charCounterWarning : {},
                ]}>
                    {notesInput?.length}/{maxLength}
                </Text>
            </View>
            <TextInput
                multiline={true}
                style={styles.notesInput}
                value={notesInput || ''}
                onChangeText={setNotesInput}
                placeholder={placeholder}
                placeholderTextColor="#999"
                returnKeyType="done"
                maxLength={maxLength}
                onBlur={storeValidMerchant}
            />
        </View>
    );
};
