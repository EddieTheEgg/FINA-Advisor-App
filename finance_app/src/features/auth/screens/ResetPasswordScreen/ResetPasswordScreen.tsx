import React, { useEffect, useState } from 'react';
import { Dimensions, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { AuthNavigationProps } from '../../../../navigation/types/AuthNavigatorTypes';
import { colors } from '../../../../styles/colors';

import { useRoute } from '@react-navigation/native';
import { useResetPassword } from '../../hooks/useResetPassword';
import { styles } from './ResetPasswordScreen.styles';

type ResetPasswordScreenProps = {
    navigation: AuthNavigationProps
}

type RouteParams = {
    email: string;
}

const ResetPasswordScreen = ({ navigation }: ResetPasswordScreenProps) => {
    const insets = useSafeAreaInsets();
    const route = useRoute();
    const { email } = route.params as RouteParams;
    const height = Dimensions.get('window').height;
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(null);
    const [hasResetSuccessfully, setHasResetSuccessfully] = useState(false);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    // Use the reset password hook
    const { mutate: resetPassword, error, isPending, isSuccess } = useResetPassword();

    const validatePassword = (password: string): boolean => {
        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters.');
            return false;
        }

        const expression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!expression.test(password)) {
            setPasswordError('Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.');
            return false;
        }

        setPasswordError(null);
        return true;
    };

    const handleResetPassword = async () => {
        // Clear any previous validation errors
        setValidationError(null);
        setPasswordError(null);

        // Basic validation
        if (!verificationCode.trim()) {
            setValidationError('Verification code is required');
            return;
        }
        if (verificationCode.length !== 6) {
            setValidationError('Verification code must be 6 digits');
            return;
        }
        if (!newPassword.trim()) {
            setValidationError('New password is required');
            return;
        }

        // Password strength validation
        if (!validatePassword(newPassword)) {
            return; // Stop here if password validation fails
        }

        if (newPassword !== confirmPassword) {
            setValidationError('Passwords do not match');
            return;
        }

        const requestData = {
            verification_code: verificationCode.trim(),
            new_password: newPassword.trim(),
        };

        console.log('🔍 Frontend sending:', requestData);

        // Add this to see what the hook returns
        const result = await resetPassword(requestData);
        console.log('🔍 Hook result:', result);
        console.log('�� isSuccess state:', isSuccess);
        console.log('🔍 error state:', error);

    };

    // Clear validation error when user starts typing
    const handleVerificationCodeChange = (text: string) => {
        setVerificationCode(text);
        if (validationError) {
            setValidationError(null);
        }
    };

    // Update your password change handlers
    const handleNewPasswordChange = (text: string) => {
        setNewPassword(text);
        if (validationError) {
            setValidationError(null);
        }
        if (passwordError) {
            setPasswordError(null);
        }
        // Validate password as user types (optional)
        if (text.length >= 8) {
            validatePassword(text);
        }
    };

    const handleConfirmPasswordChange = (text: string) => {
        setConfirmPassword(text);
        if (validationError) {
            setValidationError(null);
        }
    };


    // Show validation error first, then API error
    const displayError = validationError || (error ? 'Invalid or expired verification code. Please try again.' : null);

    useEffect(() => {
        if (isSuccess) {
            setHasResetSuccessfully(true);
            // When success, page will move after 2 seconds and reset will stay disabled since always true (see below)
            const timer = setTimeout(() => {
                // Button stays disabled, just hide the loading state
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [isSuccess]);


    return (
        <View style={[styles.mainContainer, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <ScrollView
                showsVerticalScrollIndicator = {false}
                contentContainerStyle = {[styles.scrollViewContainer, {paddingBottom: insets.bottom + height * 0.2}]}
            >
                <AnimatedPressable
                    style={styles.backButton}
                    onPress={() => navigation.navigate('Login')}
                >
                    <FontAwesome6 name="arrow-left" size={24} color="black" solid />
                </AnimatedPressable>

                <View style={styles.contentContainer}>
                    <Text style={styles.title}>Reset Password</Text>
                    <Text style={styles.subtitle}>
                        Enter the verification code sent to {email} and your new password.
                    </Text>

                    <View style={styles.inputsContainer}>
                        <TextInput
                            placeholder="Verification Code"
                            style={styles.input}
                            placeholderTextColor={colors.gray[400]}
                            value={verificationCode}
                            onChangeText={handleVerificationCodeChange}
                            keyboardType="number-pad"
                            maxLength={6}
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={!isPending}
                        />
                    <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="New Password"
                                style={styles.input}
                                placeholderTextColor={colors.gray[400]}
                                value={newPassword}
                                onChangeText={handleNewPasswordChange}
                                secureTextEntry={!showNewPassword}
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="default"
                                editable={!isPending}
                            />
                            <Pressable onPress={() => setShowNewPassword(!showNewPassword)}>
                                {showNewPassword ?
                                    <FontAwesome6 name="eye-slash" solid style={styles.eyeIcon}/> :
                                    <FontAwesome6 name="eye" solid style={styles.eyeIcon}/>
                                }
                            </Pressable>
                        </View>
                        {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="Confirm New Password"
                                style={styles.input}
                                placeholderTextColor={colors.gray[400]}
                                value={confirmPassword}
                                onChangeText={handleConfirmPasswordChange}
                                secureTextEntry={!showConfirmPassword}
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="default"
                                editable={!isPending}
                            />
                            <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ?
                                    <FontAwesome6 name="eye-slash" solid style={styles.eyeIcon}/> :
                                    <FontAwesome6 name="eye" solid style={styles.eyeIcon}/>
                                }
                            </Pressable>
                            </View>
                        {displayError && <Text style={styles.errorText}>{displayError}</Text>}
                    </View>

                    <View style={styles.buttonContainer}>
                    <AnimatedPressable
                        style={[styles.resetButton, (isPending || hasResetSuccessfully) && styles.resetButtonDisabled]}
                        onPress={handleResetPassword}
                        disabled={isPending || hasResetSuccessfully} // Disable during pending OR permanently after success
                    >
                        <Text style={[styles.resetButtonText, (isPending || hasResetSuccessfully) && styles.resetButtonTextDisabled]}>
                            {isPending ? 'Resetting...' : hasResetSuccessfully ? 'Password Reset!' : 'Reset Password'}
                        </Text>
                    </AnimatedPressable>
                    {isSuccess && (
                        <View style={styles.successContainer}>
                            <Text style={styles.successText}>
                                Password reset successfully! You can now login with your new password.
                            </Text>
                            <Pressable
                                style={styles.loginButton}
                                onPress={() => navigation.navigate('Login')}
                            >
                                <Text style={styles.loginButtonText}>Go to Login</Text>
                            </Pressable>
                        </View>
                    )}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default ResetPasswordScreen;
