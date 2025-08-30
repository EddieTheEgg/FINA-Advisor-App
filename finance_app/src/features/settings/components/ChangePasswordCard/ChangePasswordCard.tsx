import { View, Text, TextInput, Pressable, Image, Modal } from 'react-native';
import { styles } from './ChangePasswordCard.styles';
import { useEffect, useState, useCallback } from 'react';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useCheckPassword } from '../../hooks/useCheckPassword';
import { useUpdatePassword } from '../../hooks/useUpdatePassword';
import { LoadingDots } from '../../../../components/LoadingDots/LoadingDots';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';
import { DashboardNavigationProps } from '../../../../navigation/types/DashboardNavigatorTypes';

type ChangePasswordCardProps = {
    navigation: DashboardNavigationProps;
}

export const ChangePasswordCard = ({navigation}: ChangePasswordCardProps) => {
    const insets = useSafeAreaInsets();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showNewPasswordConfirm, setShowNewPasswordConfirm] = useState(false);
    const [currentPasswordError, setCurrentPasswordError] = useState<string | null>(null);
    const [newPasswordError, setNewPasswordError] = useState<string | null>(null);
    const [newPasswordConfirmError, setNewPasswordConfirmError] = useState<string | null>(null);
    const [showSuccessUpdatePasswordModal, setShowSuccessUpdatePasswordModal] = useState(false);
    const [isUpdateButtonDisabled, setIsUpdateButtonDisabled] = useState(false);
    const [updatePasswordCountdown, setUpdatePasswordCountdown] = useState(0);

    // Check if current password is correct
    const { checkPassword, isValidating, error } = useCheckPassword();

    // Update password functionality
    const { mutateAsync: updatePassword, isPending: isUpdatingPassword, error: updatePasswordError, isSuccess } = useUpdatePassword();

    const validatePasswords = useCallback(() => {
        if (newPassword.length < 8) {
            setNewPasswordError('Password must be at least 8 characters.');
            return false;
        } else {
            setNewPasswordError(null);
        }

        const expression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!expression.test(String(newPassword))) {
            setNewPasswordError('Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.');
            return false;
        } else {
            setNewPasswordError(null);
        }

        if (newPassword !== newPasswordConfirm) {
            setNewPasswordConfirmError( 'Passwords do not match.' );
            return false;
        } else {
            setNewPasswordConfirmError(null);
            return true;
        }
    }, [newPassword, newPasswordConfirm]);

    const checkCurrentPassword = useCallback(async () => {
        setCurrentPasswordError(null);
        const result = await checkPassword(currentPassword);
        if (result.is_valid) {
            setCurrentPasswordError(null);
            return true;
        } else {
            setCurrentPasswordError(error?.message || 'Incorrect password. Please try again.');
            return false;
        }
    }, [checkPassword, currentPassword, error?.message]);

    const handleUpdatePassword = async () => {
        if (isUpdateButtonDisabled) {
            return;
        }
        // Set cooldown before attempting update
        setIsUpdateButtonDisabled(true);
        setUpdatePasswordCountdown(5); // 5 second cooldown for password update

        // First validate the current password
        const isCurrentPasswordValid = await checkCurrentPassword();
        if (!isCurrentPasswordValid) {
            return;
        }

        // Then validate the new passwords
        if (!validatePasswords()) {
            return;
        }

        // Finally update the password
        await updatePassword({
            current_password: currentPassword,
            new_password: newPassword,
            new_password_confirm: newPasswordConfirm,
        });

        // Reset cooldown on success
        setIsUpdateButtonDisabled(false);
        setUpdatePasswordCountdown(0);
    };

    useEffect(()=> {
        validatePasswords();
    }, [validatePasswords]);

    useEffect(()=> {
        if (isSuccess) {
            setShowSuccessUpdatePasswordModal(true);
        }
    }, [isSuccess]);

    // Set cooldown after any password update attempt
    useEffect(() => {
        if (!isUpdatingPassword && (isSuccess || updatePasswordError)) {
            setIsUpdateButtonDisabled(true);
            setUpdatePasswordCountdown(5); // 5 second cooldown after any attempt
        }
    }, [isUpdatingPassword, isSuccess, updatePasswordError]);

    // Countdown effect for update password button cooldown
    useEffect(() => {
        if (updatePasswordCountdown > 0) {
            const timer = setTimeout(() => {
                setUpdatePasswordCountdown(updatePasswordCountdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (updatePasswordCountdown === 0 && isUpdateButtonDisabled) {
            setIsUpdateButtonDisabled(false);
        }
    }, [updatePasswordCountdown, isUpdateButtonDisabled]);

    if (isUpdatingPassword) {
        return (
            <View style={[styles.loadingContainer, {paddingTop: insets.top, paddingBottom: insets.bottom}]}>
                <View>
                    <Image source={require('../../../../assets/images/Loading_Pig.png')} style={styles.image} />
                    <LoadingDots style ={styles.text} loadingText = {'Updating Password'} />
                </View>
            </View>
        );
    }

    if (updatePasswordError) {
        return <ErrorScreen
            errorText = "Error updating password"
            errorSubText = "Please try again later"
            errorMessage = {updatePasswordError.message}
        />;
    }


    return (
        <View style = {styles.container}>
            <Text style = {styles.title}>Change Password</Text>
            <View style = {styles.inputContainer}>
                <Text style = {styles.subTitle}>Current Password</Text>
                <TextInput
                    placeholder = "Enter current password"
                    secureTextEntry = {!showCurrentPassword}
                    style = {styles.input}
                    value = {currentPassword}
                    onChangeText = {setCurrentPassword}
                />
                <Pressable onPress= {() => setShowCurrentPassword(!showCurrentPassword)}>
                    {!showCurrentPassword ?
                        <FontAwesome6 name="eye-slash" solid style = {styles.eyeIcon}/> :
                        <FontAwesome6 name="eye" solid style = {styles.eyeIcon}/>
                    }
                </Pressable>
            </View>
            {isValidating && <Text style = {styles.validationText}>Validating...</Text>}
            {error && <Text style = {styles.errorText}>{error.message}</Text>}
            {currentPasswordError && <Text style = {styles.errorText}>{currentPasswordError}</Text>}
            <View style = {styles.inputContainer}>
                <Text style = {styles.subTitle}>New Password</Text>
                <TextInput
                    placeholder = "Enter new password"
                    secureTextEntry = {!showNewPassword}
                    style = {styles.input}
                    value = {newPassword}
                    onChangeText = {setNewPassword}
                />
                 <Pressable onPress= {() => setShowNewPassword(!showNewPassword)}>
                    {!showNewPassword ?
                        <FontAwesome6 name="eye-slash" solid style = {styles.eyeIcon}/> :
                        <FontAwesome6 name="eye" solid style = {styles.eyeIcon}/>
                    }
                </Pressable>
                {newPasswordError && <Text style = {styles.errorText}>{newPasswordError}</Text>}
            </View>
            <View style = {styles.inputContainer}>
                <Text style = {styles.subTitle}>Confirm New Password</Text>
                <TextInput
                    placeholder = "Confirm new password"
                    secureTextEntry = {!showNewPasswordConfirm}
                    style = {styles.input}
                    value = {newPasswordConfirm}
                    onChangeText = {setNewPasswordConfirm}
                />
                <Pressable onPress= {() => setShowNewPasswordConfirm(!showNewPasswordConfirm)}>
                    {!showNewPasswordConfirm ?
                        <FontAwesome6 name="eye-slash" solid style = {styles.eyeIcon}/> :
                        <FontAwesome6 name="eye" solid style = {styles.eyeIcon}/>
                    }
                </Pressable>
                {newPasswordConfirmError && <Text style = {styles.errorText}>{newPasswordConfirmError}</Text>}
            </View>
            <AnimatedPressable
                style = {[
                    styles.updatePasswordButton,
                    (isUpdatingPassword || isValidating || isUpdateButtonDisabled) && styles.buttonDisabled,
                ]}
                onPress = {handleUpdatePassword}
                disabled = {isUpdatingPassword || isValidating || isUpdateButtonDisabled}
            >
                <Text style = {styles.updatePasswordButtonText}>
                    {isUpdateButtonDisabled && updatePasswordCountdown > 0
                        ? `Wait ${updatePasswordCountdown}s`
                        : isUpdatingPassword
                        ? 'Updating...'
                        : 'Update Password'
                    }
                </Text>
            </AnimatedPressable>
            <Modal
                visible={showSuccessUpdatePasswordModal}
                animationType="fade"
                onRequestClose={() => setShowSuccessUpdatePasswordModal(false)}
                >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Image source={require('../../../../assets/images/confirmation.png')} style={styles.modalImage} />
                        <Text style={styles.modalTitle}>Update Success!</Text>
                        <Text style={styles.modalText}>Your password has been updated successfully</Text>
                        <View style={styles.modalButtons}>
                            <AnimatedPressable
                                onPress={() => {
                                    setCurrentPassword('');
                                    setNewPassword('');
                                    setNewPasswordConfirm('');
                                    setShowSuccessUpdatePasswordModal(false);
                                    navigation.navigate('Settings');
                                }}
                                style={styles.continueButton}
                            >
                                <Text style={styles.continueButtonText}>Continue</Text>
                            </AnimatedPressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
