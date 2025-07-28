import { Text, TextInput, View } from 'react-native';
import { styles } from './EditNotesInput.styles';
import { useEditTransactionStore } from '../../../../store/useEditTransactionStore';
import { useState, useEffect } from 'react';

export type EditNotesInputProps = {
    placeholder? : string,
    maxLength? : number,
}


export const EditNotesInput = ({placeholder = 'Notes...', maxLength = 250} : EditNotesInputProps) => {
    const {notesDraft, setNotesDraft} = useEditTransactionStore();
    const [notesInput, setNotesInput] = useState(notesDraft);

    // Sync local state with store value when it changes
    useEffect(() => {
        setNotesInput(notesDraft);
    }, [notesDraft]);

    const storeValidMerchant = () => {
        if (notesInput && notesInput.trim() !== notesDraft) {
            setNotesDraft(notesInput);
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
