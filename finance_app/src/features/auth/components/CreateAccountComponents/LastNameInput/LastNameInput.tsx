import { View, Text, TextInput } from 'react-native';
import { useSignupStore } from '../../../store/useSignupStore';
import { useEffect, useState } from 'react';
import { styles } from './LastNameInput.styles';

export const LastNameInput = () => {
    const { setLastName } = useSignupStore();
    const [lastNameInput, setLastNameInput] = useState('');
    const maxLength = 20;


    useEffect(() => {
        setLastName(lastNameInput);
    }, [lastNameInput, setLastName]);

    const remainingChars = maxLength - (lastNameInput?.length || 0);

    return (
        <View>
            <View style = {styles.headerContainer}>
                <Text style = {styles.headerText}>Last Name</Text>
                <Text style = {[styles.charCounter, remainingChars < 5 && styles.charCounterWarning]}>
                    {lastNameInput.length}/{maxLength}
                </Text>
            </View>
            <TextInput
                placeholder = "Enter your last name"
                value = {lastNameInput}
                onChangeText = {setLastNameInput}
                style = {styles.input}
                maxLength = {maxLength}
            />
        </View>
    );
};
