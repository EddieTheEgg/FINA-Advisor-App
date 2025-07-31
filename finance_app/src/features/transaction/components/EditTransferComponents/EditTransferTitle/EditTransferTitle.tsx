import { Text, TextInput, View } from 'react-native';
import { styles } from './EditTransferTitle.styles';
import { useEffect, useState } from 'react';
import { useEditTransactionStore } from '../../../store/useEditTransactionStore';

type EditTransferTitleProps = {
    placeholder?: string,
    maxLength?: number;
}

export const EditTransferTitle = ({
    placeholder = 'Enter transfer title...',
    maxLength = 50,
}: EditTransferTitleProps) => {
    const { titleDraft, setTitleDraft, validateTitle, titleError} = useEditTransactionStore();
    const [titleInput, setTitleInput] = useState(titleDraft);

    const storeValidTitle = () => {
        // Only store the title if it has changed
        if (titleInput.trim() !== titleDraft) {
            setTitleDraft(titleInput);
        }
        validateTitle();
    };

    useEffect(() => {
        validateTitle();
    }, [titleInput, validateTitle]);

    const remainingChars = maxLength - titleInput.length;
    return (
         <View style={styles.title}>
            <View style={styles.titleHeader}>
                <Text style={styles.titleText}>Transfer Title</Text>
                <Text style={[
                    styles.charCounter,
                    remainingChars < 10 ? styles.charCounterWarning : {},
                ]}>
                    {titleInput.length}/{maxLength}
                </Text>
            </View>
            <TextInput
                style={styles.titleInput}
                value={titleInput}
                onChangeText={setTitleInput}
                placeholder={placeholder}
                placeholderTextColor="#999"
                returnKeyType="done"
                maxLength={maxLength}
                onBlur={storeValidTitle}
            />
            {titleError && (
                <Text style={styles.titleError}>{titleError}</Text>
            )}
        </View>
    );
};

