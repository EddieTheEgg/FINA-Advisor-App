import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { styles } from './TransferTitleInput.styles.ts';

type TransferTitleInputProps = {
    title: string;
    onTitleChange: (title: string) => void;
    placeholder?: string;
    maxLength?: number;
}

export const TransferTitleInput = ({
    title,
    onTitleChange,
    placeholder = 'Enter transfer title...',
    maxLength = 50,
} : TransferTitleInputProps) => {
    const remainingChars = maxLength - title.length;

    return (
        <View style={styles.transferTitle}>
            <View style={styles.titleHeader}>
                <Text style={styles.transferTitleText}>Transfer Title</Text>
                <Text style={[
                    styles.charCounter,
                    remainingChars < 10 ? styles.charCounterWarning : {},
                ]}>
                    {title.length}/{maxLength}
                </Text>
            </View>
            <TextInput
                style={styles.transferTitleInput}
                value={title}
                onChangeText={onTitleChange}
                placeholder={placeholder}
                placeholderTextColor="#999"
                returnKeyType="done"
                maxLength={maxLength}
            />
        </View>
    );
};
