import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

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
    token: string;
}

const ResetPasswordScreen = ({ navigation }: ResetPasswordScreenProps) => {
    const insets = useSafeAreaInsets();
    const route = useRoute();
    const { token } = route.params as RouteParams;

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(null);

    // Use the reset password hook
    const { mutate: resetPassword, error, isPending, isSuccess } = useResetPassword();

    const handleResetPassword = async () => {
        // Clear any previous validation errors
        setValidationError(null);

        // Basic validation
        if (!newPassword.trim()) {
            setValidationError('New password is required');
            return;
        }
        if (newPassword.length < 6) {
            setValidationError('Password must be at least 6 characters');
            return;
        }
        if (newPassword !== confirmPassword) {
            setValidationError('Passwords do not match');
            return;
        }

        resetPassword({ 
            token: token,
            new_password: newPassword.trim() 
        });
    };

    // Clear validation error when user starts typing
    const handleNewPasswordChange = (text: string) => {
        setNewPassword(text);
        if (validationError) {
            setValidationError(null);
        }
    };

    const handleConfirmPasswordChange = (text: string) => {
        setConfirmPassword(text);
        if (validationError) {
            setValidationError(null);
        }
    };

    // Show validation error first, then API error
    const displayError = validationError || (error ? 'Invalid or expired reset link. Please try again.' : null);

    return (
        <View style={[styles.mainContainer, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <AnimatedPressable
                style={styles.backButton}
                onPress={() => navigation.navigate('Login')}
            >
                <FontAwesome6 name="arrow-left" size={24} color="black" solid />
            </AnimatedPressable>

            <View style={styles.contentContainer}>
                <Text style={styles.title}>Reset Password</Text>
                <Text style={styles.subtitle}>
                    Enter your new password below.
                </Text>

                <View style={styles.inputsContainer}>
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
                    <Pressable 
                        style={[styles.resetButton, isPending && styles.resetButtonDisabled]}
                        onPress={handleResetPassword}
                        disabled={isPending}
                    >
                        <Text style={[styles.resetButtonText, isPending && styles.resetButtonTextDisabled]}>
                            {isPending ? 'Resetting...' : 'Reset Password'}
                        </Text>
                    </Pressable>

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
        </View>
    );
};

export default ResetPasswordScreen;
