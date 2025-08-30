import { View, Text, ScrollView, Dimensions, Modal, TextInput, Pressable, Image } from 'react-native';
import { styles } from './SecurityScreen.styles';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { fontSize } from '../../../../styles/fontSizes';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { colors } from '../../../../styles/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChangePasswordCard } from '../../components/ChangePasswordCard/ChangePasswordCard';
import { DashboardNavigationProps } from '../../../../navigation/types/DashboardNavigatorTypes';
import { DeleteAccountCard } from '../../components/DeleteAccountCard/DeleteAccountCard';
import { useState, useEffect } from 'react';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { LoadingDots } from '../../../../components/LoadingDots/LoadingDots';
import { useCheckPassword } from '../../hooks/useCheckPassword';
import { useDeleteAccount } from '../../hooks/useDeleteAccount';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';
import { useAuth } from '../../../auth/hooks/useAuth';

type SecurityScreenProps = {
    navigation: DashboardNavigationProps;
}

export const SecurityScreen = ({navigation}: SecurityScreenProps) => {
    const insets = useSafeAreaInsets();
    const height = Dimensions.get('window').height;
    const [showPasswordEnterToDeleteModal, setShowPasswordEnterToDeleteModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordValidationError, setPasswordValidationError] = useState<string | null>(null);
    const [isPasswordButtonDisabled, setIsPasswordButtonDisabled] = useState(false);
    const [passwordCountdown, setPasswordCountdown] = useState(0);

    const { checkPassword, isValidating } = useCheckPassword();
    const { signOut } = useAuth();

    const { mutate: deleteUser, isPending: isDeletingUser, error: deleteUserError, isSuccess: deleteUserSuccess } = useDeleteAccount();

    const handleDeleteAccount = () => {
        setShowPasswordEnterToDeleteModal(true);
    };

    const handleCompleteDeleteAccount = async () => {
        if (isPasswordButtonDisabled) {
            return;
        }

        try {
            setPasswordValidationError(null);
            setIsPasswordButtonDisabled(true);
            setPasswordCountdown(5); // 5 second cooldown for password validation

            // Validate the password
            const result = await checkPassword(password);
            if (result.is_valid) {
                setShowPasswordEnterToDeleteModal(false);
                setPassword(''); // Clear password for security
                setIsPasswordButtonDisabled(false);
                setPasswordCountdown(0);
                deleteUser();
                console.log('Account deletion confirmed!');
            } else {
                setPasswordValidationError('Incorrect password. Please try again after cooldown.');
            }
        } catch (error) {
            console.error('Password validation failed:', error);
            setPasswordValidationError('Failed to validate password. Please try again.');
        }
    };

    // Countdown effect for password validation cooldown
    useEffect(() => {
        if (passwordCountdown > 0) {
            const timer = setTimeout(() => {
                setPasswordCountdown(passwordCountdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (passwordCountdown === 0 && isPasswordButtonDisabled) {
            setIsPasswordButtonDisabled(false);
        }
    }, [passwordCountdown, isPasswordButtonDisabled]);

    useEffect(() => {
        if (deleteUserSuccess) {
            // Sign out the user which will automatically navigate to Welcome screen
            signOut();
        }
    }, [deleteUserSuccess, signOut]);

    if (isDeletingUser) {
        return (
            <View style={[styles.deletingUserContainer, {paddingTop: insets.top, paddingBottom: insets.bottom}]}>
                <View>
                    <Image source={require('../../../../assets/images/Loading_Pig.png')} style={styles.image} />
                    <LoadingDots style ={styles.text} loadingText = "Deleting user" />
                </View>
            </View>
        );
    }

    if (deleteUserError) {
        return <ErrorScreen
            errorText = "Error deleting user"
            errorSubText = "Please try again later"
            errorMessage = {deleteUserError.message}
        />;
    }

    return (
        <View style = {[styles.container, {paddingTop: insets.top}]}>
            <ScrollView
                showsVerticalScrollIndicator = {false}
                contentContainerStyle = {[styles.scrollViewContent, {paddingBottom: insets.bottom + height * 0.2}]}
            >

                <View style = {styles.headerSection}>
                    <BackButton />
                    <Text style = {styles.title}>Security</Text>
                    <FontAwesome6 name = "empty-space" size = {fontSize.xxl + 5} color = {colors.background} />
                </View>
                <ChangePasswordCard navigation = {navigation} />
                <DeleteAccountCard onDeleteAccount={handleDeleteAccount} />
                <Modal
                visible = {showPasswordEnterToDeleteModal}
                animationType = "fade"
                transparent = {true}
                onRequestClose = {() => {
                    setShowPasswordEnterToDeleteModal(false);
                    setPassword('');
                    setPasswordValidationError(null);
                    setIsPasswordButtonDisabled(false);
                    setPasswordCountdown(0);
                }}>
                    <View style = {styles.passwordEnterToSaveModalContainer}>
                        <View style = {styles.passwordEnterToSaveModalContent}>
                            <Text style = {styles.passwordEnterToSaveModalTitle}>Enter Password to Delete Account</Text>
                                <TextInput
                                    placeholder="Password"
                                    style={styles.passwordEnterToSaveModalInput}
                                    value={password}
                                    onChangeText={(text) => {
                                        setPassword(text);
                                        setPasswordValidationError(null); // Clear error when user types
                                    }}
                                    secureTextEntry={!showPassword}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    keyboardType="default"
                                    maxLength={128}
                                />
                                <Pressable onPress= {() => setShowPassword(!showPassword)}>
                                    {showPassword ?
                                        <FontAwesome6 name="eye-slash" solid style = {styles.eyeIcon}/> :
                                        <FontAwesome6 name="eye" solid style = {styles.eyeIcon}/>
                                    }
                                </Pressable>
                                {passwordValidationError && (
                                    <Text style={styles.passwordErrorText}>{passwordValidationError}</Text>
                                )}
                                {isValidating && (
                                    <LoadingDots style={styles.validatingPasswordText} loadingText="Validating password" />
                                )}
                            <View style = {styles.passwordEnterToSaveModalButtons}>
                            <AnimatedPressable
                                    onPress={handleCompleteDeleteAccount}
                                    style={[
                                        styles.passwordEnterToSaveModalButton,
                                        (isValidating || isPasswordButtonDisabled) && styles.disabledSaveProfileButton,
                                    ]}
                                    disabled={isValidating || isPasswordButtonDisabled}
                                >
                                    <Text style={styles.passwordEnterToSaveModalButtonText}>
                                        {isPasswordButtonDisabled && passwordCountdown > 0
                                            ? `Wait ${passwordCountdown}s`
                                            : isValidating
                                            ? 'Validating...'
                                            : 'Delete'
                                        }
                                    </Text>
                                </AnimatedPressable>
                                <AnimatedPressable
                                    onPress={() => {
                                        setShowPasswordEnterToDeleteModal(false);
                                        setPassword('');
                                        setPasswordValidationError(null);
                                        setIsPasswordButtonDisabled(false);
                                        setPasswordCountdown(0);
                                    }}
                                    style={styles.cancelPasswordEnterToSaveModalButton}>
                                    <Text style={styles.cancelPasswordEnterToSaveModalButtonText}>Cancel</Text>
                                </AnimatedPressable>
                            </View>
                        </View>
                    </View>
            </Modal>
            </ScrollView>
        </View>
    );
};
