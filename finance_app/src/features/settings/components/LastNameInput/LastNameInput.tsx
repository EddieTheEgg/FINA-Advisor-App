import {View, Text, TextInput} from 'react-native';
import { styles } from './LastNameInput.styles';
import { useEditProfileStore } from '../../store/useEditProfileStore';
import { useEffect } from 'react';


export const LastNameInput = () => {
    const {lastName, lastNameError, setLastName} = useEditProfileStore();
    const maxLength = 20;

    useEffect(() => {
        setLastName(lastName);
    }, [lastName, setLastName]);

    const remainingChars = maxLength - lastName.length;

    return (
        <View>
            <View style = {styles.headerContainer}>
                <Text style = {styles.headerText}>Last Name</Text>
                <Text style = {[styles.charCounter, remainingChars < 5 && styles.charCounterWarning]}>
                    {lastName.length}/{maxLength}
                </Text>
            </View>
            <TextInput
                placeholder = "Enter your last name"
                placeholderTextColor = "#999"
                value = {lastName}
                onChangeText = {setLastName}
                style = {styles.input}
                maxLength = {maxLength}
            />
            {lastNameError && <Text style = {styles.errorText}>{lastNameError}</Text>}
        </View>
    );
};
