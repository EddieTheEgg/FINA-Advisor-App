import {View, Text, TextInput} from 'react-native';
import { styles } from './FirstNameInput.styles';
import { useEditProfileStore } from '../../store/useEditProfileStore';
import { useEffect } from 'react';


export const FirstNameInput = () => {
    const {firstName, firstNameError, setFirstName} = useEditProfileStore();
    const maxLength = 20;

    useEffect(() => {
        setFirstName(firstName);
    }, [firstName, setFirstName]);

    const remainingChars = maxLength - firstName.length;

    return (
        <View>
            <View style = {styles.headerContainer}>
                <Text style = {styles.headerText}>First Name</Text>
                <Text style = {[styles.charCounter, remainingChars < 5 && styles.charCounterWarning]}>
                    {firstName.length}/{maxLength}
                </Text>
            </View>
            <TextInput
                placeholder = "Enter your first name"
                placeholderTextColor = "#999"
                value = {firstName}
                onChangeText = {setFirstName}
                style = {styles.input}
                maxLength = {maxLength}
            />
            {firstNameError && <Text style = {styles.errorText}>{firstNameError}</Text>}
        </View>
    );
};
