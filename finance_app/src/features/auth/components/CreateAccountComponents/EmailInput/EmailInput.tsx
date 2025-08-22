import { View, Text, TextInput } from 'react-native';
import { styles } from './EmailInput.styles';
import { useEffect, useState } from 'react';
import { useSignupStore } from '../../../store/useSignupStore';

export const EmailInput = () => {
    const { email, setEmail, validateEmailType } = useSignupStore();
    const [emailInput, setEmailInput] = useState(email);
    const [ emailError, setEmailError] = useState('');

    useEffect(() => {
        const trimmedEmail = emailInput.trim();
        if(validateEmailType(trimmedEmail)) {
            setEmailError('');
            setEmail(trimmedEmail);
        } else {
            setEmailError('Please enter a valid email');
        }
    }, [emailInput, setEmail, validateEmailType]);

    return (
        <View>
            <Text style = {styles.headerText}>Email</Text>
            <TextInput
                placeholder = "Enter your email"
                value = {emailInput}
                onChangeText = {setEmailInput}
                style = {styles.input}
                keyboardType = "email-address"
                autoCapitalize = "none"
            />
            {emailError && <Text style = {styles.errorText}>{emailError}</Text>}
        </View>
    );
};
