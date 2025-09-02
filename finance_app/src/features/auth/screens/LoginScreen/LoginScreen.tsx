import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { styles } from './LoginScreen.styles';
import SignInButton from '../../components/SignInButton/SignInButton';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useLogin } from '../../hooks/useLogin';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { AuthNavigationProps } from '../../../../navigation/types/AuthNavigatorTypes';
import { colors } from '../../../../styles/colors';

type LoginScreenProps = {
    navigation: AuthNavigationProps
}

const LoginScreen = ({ navigation }: LoginScreenProps) => {
    const insets = useSafeAreaInsets();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [validationError, setValidationError] = useState<string | null>(null);

    // Use the query login hook to login the user
    const {mutate: loginUser, error, isPending} = useLogin();

    const handleLogin = async () => {
        // Clear any previous validation errors
        setValidationError(null);

        // Basic validation
        if (!email.trim()) {
            setValidationError('Email is required');
            return;
        }
        if (!password.trim()) {
            setValidationError('Password is required');
            return;
        }
        if (!email.includes('@')) {
            setValidationError('Please enter a valid email address');
            return;
        }

        loginUser({email: email.trim(), password: password.trim()});
    };

    const handleForgotPass = () => {
        navigation.navigate('ForgotPassword');
    };

    // Clear validation error when user starts typing
    const handleEmailChange = (text: string) => {
        setEmail(text);
        if (validationError) {
            setValidationError(null);
        }
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
        if (validationError) {
            setValidationError(null);
        }
    };

    // Show validation error first, then API error
    const displayError = validationError || (error ? 'Invalid email or password' : null);

    return (
        <View style={[styles.mainContainer, {paddingTop: insets.top, paddingBottom: insets.bottom}]}>
            <AnimatedPressable
                style = {styles.backButton}
                onPress = {() => navigation.navigate('Welcome')}
            >
                 <FontAwesome6 name="arrow-left" size={24} color="black" solid />
            </AnimatedPressable>
            <View>
                <Text style={styles.title}>Sign in</Text>
            </View>
            <View style={styles.inputsContainer}>
                <TextInput
                    placeholder="Your Email"
                    style={styles.input}
                    placeholderTextColor={colors.gray[400]}
                    value={email}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    onChangeText={handleEmailChange}
                />
                <View>
                    <TextInput
                        placeholder="Password"
                        style={styles.input}
                        placeholderTextColor={colors.gray[400]}
                        value={password}
                        onChangeText={handlePasswordChange}
                        secureTextEntry={showPassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="default"
                    />
                    <Pressable onPress= {() => setShowPassword(!showPassword)}>
                        {showPassword ?
                            <FontAwesome6 name="eye-slash" solid style = {styles.eyeIcon}/> :
                            <FontAwesome6 name="eye" solid style = {styles.eyeIcon}/>
                        }
                    </Pressable>
                </View>
                {displayError && <Text style={styles.errorText}>{displayError}</Text>}
            </View>
            <View style={styles.buttonContainer}>
                <SignInButton onPress={handleLogin} disabled={isPending} />
                <Pressable onPress={handleForgotPass}>
                    <Text style = {styles.forgotPasswordText}>Forgot password?</Text>
                </Pressable>
                {isPending && <Text style={styles.loadingText}>Loading...</Text>}
            </View>
        </View>
    );
};

export default LoginScreen;


