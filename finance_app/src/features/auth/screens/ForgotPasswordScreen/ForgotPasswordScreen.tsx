import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { styles } from './ForgotPasswordScreen.styles';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { AuthNavigationProps } from '../../../../navigation/types/AuthNavigatorTypes';
import { colors } from '../../../../styles/colors';
import { useForgotPassword } from '../../hooks/useForgotPassword';

type ForgotPasswordScreenProps = {
    navigation: AuthNavigationProps
}

const ForgotPasswordScreen = ({ navigation }: ForgotPasswordScreenProps) => {
    const insets = useSafeAreaInsets();
    const [email, setEmail] = useState('');
    const [validationError, setValidationError] = useState<string | null>(null);

    // Use the forgot password hook
    const { mutate: forgotPassword, error, isPending, isSuccess } = useForgotPassword();

    const handleForgotPassword = async () => {
        // Clear any previous validation errors
        setValidationError(null);

        // Basic validation
        if (!email.trim()) {
            setValidationError('Email is required');
            return;
        }
        if (!email.includes('@')) {
            setValidationError('Please enter a valid email address');
            return;
        }

        forgotPassword({ email: email.trim() });
    };

    // Navigate to reset screen when email is sent successfully
    React.useEffect(() => {
        if (isSuccess) {
            // Navigate to reset password screen after a short delay
            const timer = setTimeout(() => {
                navigation.navigate('ResetPassword', { email: email.trim() });
            }, 2000); // 2 second delay to show success message

            return () => clearTimeout(timer);
        }
    }, [isSuccess, navigation, email]);

    // Clear validation error when user starts typing
    const handleEmailChange = (text: string) => {
        setEmail(text);
        if (validationError) {
            setValidationError(null);
        }
    };

    // Show validation error first, then API error
    const displayError = validationError || (error ? 'Something went wrong. Please try again.' : null);

    return (
        <View style={[styles.mainContainer, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <AnimatedPressable
                style={styles.backButton}
                onPress={() => navigation.navigate('Login')}
            >
                <FontAwesome6 name="arrow-left" size={24} color="black" solid />
            </AnimatedPressable>

            <View style={styles.contentContainer}>
                <Text style={styles.title}>Forgot Password</Text>
                <Text style={styles.subtitle}>
                    Enter your email address and we'll send you a verification code to reset your password.
                </Text>

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
                        editable={!isPending}
                    />
                    {displayError && <Text style={styles.errorText}>{displayError}</Text>}
                </View>

                <View style={styles.buttonContainer}>
                    <Pressable 
                        style={[styles.sendButton, isPending && styles.sendButtonDisabled]}
                        onPress={handleForgotPassword}
                        disabled={isPending}
                    >
                        <Text style={[styles.sendButtonText, isPending && styles.sendButtonTextDisabled]}>
                            {isPending ? 'Sending...' : 'Send Verification Code'}
                        </Text>
                    </Pressable>

                    {isSuccess && (
                        <View style={styles.successContainer}>
                            <Text style={styles.successText}>
                                Verification code sent! Check your email and enter the code on the next screen.
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
};

export default ForgotPasswordScreen;
