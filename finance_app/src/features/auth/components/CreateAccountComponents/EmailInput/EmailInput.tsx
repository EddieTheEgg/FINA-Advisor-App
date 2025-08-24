import { View, Text, TextInput } from 'react-native';
import { styles } from './EmailInput.styles';
import { useEffect, useState } from 'react';
import { useSignupStore } from '../../../store/useSignupStore';

export const EmailInput = () => {
    const { email, setEmail, validateEmail, emailError } = useSignupStore();
    const [emailInput, setEmailInput] = useState(email);

    useEffect(() => {
        setEmail(emailInput);
    }, [emailInput, setEmail]);

    useEffect(() => {
        if (emailInput.length === 0) {
            return;
        }
        validateEmail();
    }, [emailInput, validateEmail]);

    return (
        <View>
            <Text style = {styles.headerText}>Email</Text>
            <TextInput
                placeholder = "Enter your email"
                placeholderTextColor = "#999"
                value = {emailInput}
                onChangeText = {setEmailInput}
                style = {styles.input}
                keyboardType = "email-address"
                autoCapitalize = "none"
                maxLength = {245}
            />
            {emailError && <Text style = {styles.errorText}>{emailError}</Text>}
        </View>
    );
};
