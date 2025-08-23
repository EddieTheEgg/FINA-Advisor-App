import { View, Text, TextInput, Pressable } from 'react-native';
import { styles } from './PasswordInputs.styles';
import { useEffect, useState } from 'react';
import { useSignupStore } from '../../../store/useSignupStore';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

export const PasswordInputs = () => {
    const {password,
            setPassword,
            setConfirmPassword,
            validatePassword,
            passwordError,
            validateConfirmPassword,
            confirmPasswordError} = useSignupStore();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordInput, setPasswordInput] = useState(password);
    const [confirmPasswordInput, setConfirmPasswordInput] = useState(password);

    useEffect(()=> {
        if (passwordInput.length === 0) {
            return;
        }
        setPassword(passwordInput);
        validatePassword();
    }, [passwordInput, setPassword, validatePassword]);

    useEffect(()=> {
        if (confirmPasswordInput.length === 0) {
            return;
        }
        setConfirmPassword(confirmPasswordInput);
        validateConfirmPassword();
    }, [confirmPasswordInput, passwordInput, setConfirmPassword, validateConfirmPassword]);

    return(
        <View style = {styles.container}>
            <View>
                <Text style = {styles.label}>Password</Text>
                <TextInput
                    placeholder = "Create a password"
                    secureTextEntry = {!showPassword}
                    style = {styles.passwordInput}
                    value = {passwordInput}
                    maxLength = {128}
                    onChangeText = {setPasswordInput}
                />
                <Pressable onPress= {() => setShowPassword(!showPassword)}>
                    {!showPassword ?
                        <FontAwesome6 name="eye-slash" solid style = {styles.eyeIcon}/> :
                        <FontAwesome6 name="eye" solid style = {styles.eyeIcon}/>
                    }
                </Pressable>
                {passwordError && <Text style = {styles.errorText}>{passwordError}</Text>}
            </View>
            <View>
                <Text style = {styles.label}>Confirm Password</Text>
                <TextInput
                    placeholder = "Confirm your password"
                    secureTextEntry = {!showConfirmPassword}
                    style = {styles.passwordInput}
                    value = {confirmPasswordInput}
                    maxLength = {128}
                    onChangeText = {setConfirmPasswordInput}
                />
                <Pressable onPress= {() => setShowConfirmPassword(!showConfirmPassword)}>
                    {!showConfirmPassword ?
                        <FontAwesome6 name="eye-slash" solid style = {styles.eyeIcon}/> :
                        <FontAwesome6 name="eye" solid style = {styles.eyeIcon}/>
                    }
                </Pressable>
                {confirmPasswordError && <Text style = {styles.errorText}>{confirmPasswordError}</Text>}
            </View>
        </View>
    );
};
