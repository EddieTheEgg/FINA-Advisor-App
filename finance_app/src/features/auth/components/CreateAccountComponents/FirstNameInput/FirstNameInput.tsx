import { View, Text, TextInput } from 'react-native';
import { useSignupStore } from '../../../store/useSignupStore';
import { useEffect, useState } from 'react';
import { styles } from './FirstNameInput.styles';

export const FirstNameInput = () => {
    const { firstName, setFirstName } = useSignupStore();
    const [firstNameInput, setFirstNameInput] = useState(firstName);
    const maxLength = 20;


    useEffect(() => {
        setFirstName(firstNameInput);
    }, [firstNameInput, setFirstName]);

    const remainingChars = maxLength - (firstNameInput?.length || 0);

    return (
        <View>
            <View style = {styles.headerContainer}>
                <Text style = {styles.headerText}>First Name</Text>
                <Text style = {[styles.charCounter, remainingChars < 5 && styles.charCounterWarning]}>
                    {firstNameInput.length}/{maxLength}
                </Text>
            </View>
            <TextInput
                placeholder = "Enter your first name"
                value = {firstNameInput}
                onChangeText = {setFirstNameInput}
                style = {styles.input}
                maxLength = {maxLength}
            />
        </View>
    );
};
