import { Text, TextInput, View } from 'react-native';
import { styles } from './EditTransferNote.styles';
import { useState } from 'react';
import { useEditTransactionStore } from '../../../store/useEditTransactionStore.ts';

export type EditTransferNoteProps = {
    placeholder? : string,
    maxLength? : number,
}


export const EditTransferNote = ({placeholder = 'Notes...', maxLength = 250} : EditTransferNoteProps) => {
    const {notesDraft, setNotesDraft} = useEditTransactionStore();
    const [notesInput, setNotesInput] = useState(notesDraft);

    const storeValidNotes = () => {
        if (notesInput && notesInput.trim() !== notesDraft) {
            setNotesDraft(notesInput);
        }
    };


    const remainingChars = maxLength - (notesInput?.length || 0);
    return (
        <View style={styles.notesContainer}>
            <View style={styles.notesHeader}>
                <Text style={styles.notesText}>Note (Optional)</Text>
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
                onBlur={storeValidNotes}
            />
        </View>
    );
};
