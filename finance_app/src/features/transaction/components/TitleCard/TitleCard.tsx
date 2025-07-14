import { Text, TextInput, View } from 'react-native';
import { styles } from './TitleCard.styles';
import { useState } from 'react';
import { useCreateTransactionStore } from '../../store/useTransactionStore';

type TitleCardProps = {
    placeholder?: string,
    maxLength?: number;
}

export const TitleCard = ({
    placeholder = 'Enter transaction title...',
    maxLength = 50,
}: TitleCardProps) => {
    const {title, setTitle} = useCreateTransactionStore();
    const [titleInput, setTitleInput] = useState(title);

    const storeValidTitle = () => {
        // Only store the title if it has changed
        if (titleInput.trim() !== title) {
            setTitle(titleInput);
        }
    };

    const remainingChars = maxLength - titleInput.length;
    return (
         <View style={styles.title}>
            <View style={styles.titleHeader}>
                <Text style={styles.titleText}>Title</Text>
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
        </View>
    );
};

