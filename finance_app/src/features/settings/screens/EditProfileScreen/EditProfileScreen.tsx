import { Dimensions, Image, Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { styles } from './EditProfileScreen.styles';
import BackButton from '../../../auth/components/GoBackButton/GoBackButton';
import { colors } from '../../../../styles/colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { fontSize } from '../../../../styles/fontSizes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PersonalInfoCard } from '../../components/PersonalInfoCard/PersonalInfoCard';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { useEditProfileStore } from '../../store/useEditProfileStore';
import { useEffect, useState } from 'react';
import { LoadingDots } from '../../../../components/LoadingDots/LoadingDots';
import { useCheckPassword } from '../../hooks/useCheckPassword';
import { useUpdateProfile } from '../../hooks/useUpdateProfile';
import { DashboardNavigationProps } from '../../../../navigation/types/DashboardNavigatorTypes';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';

type EditProfileScreenProps = {
    navigation: DashboardNavigationProps;
}

export const EditProfileScreen = ({navigation}: EditProfileScreenProps) => {
    const insets = useSafeAreaInsets();
    const height = Dimensions.get('window').height;

    const {validateProfileInfo, resetAllFields} = useEditProfileStore();
    const { checkPassword, isValidating } = useCheckPassword();
    const {mutate: updateProfile, isPending: isUpdatingProfile, error: updateProfileError, isSuccess: isUpdateSuccess} = useUpdateProfile();

    const [showInvalidFieldsAbove, setShowInvalidFieldsAbove] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [showPasswordEnterToSaveModal, setShowPasswordEnterToSaveModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordValidationError, setPasswordValidationError] = useState<string | null>(null);
    const [isPasswordButtonDisabled, setIsPasswordButtonDisabled] = useState(false);
    const [passwordCountdown, setPasswordCountdown] = useState(0);
    const [showSuccessUpdateMessage, setShowSuccessUpdateMessage] = useState(false);

    const handleSaveProfile = async () => {
       if (isButtonDisabled) {
            return;
       }
       setIsLoading(true);
       setIsButtonDisabled(true);
       setCountdown(10);
       try {
        const isValid = await validateProfileInfo();
        if (!isValid) {
            setShowInvalidFieldsAbove(true);
            return;
        }
        setShowPasswordEnterToSaveModal(true);
        // Show password enter modal to reset
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCompleteSaveProfile = async () => {
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
                setShowPasswordEnterToSaveModal(false);
                setPassword(''); // Clear password for security
                setIsPasswordButtonDisabled(false);
                setPasswordCountdown(0);
                updateProfile();
            } else {
                setPasswordValidationError('Incorrect password. Please try again after cooldown.');
            }
        } catch (error) {
            console.error('Password validation failed:', error);
            setPasswordValidationError('Failed to validate password. Please try again.');
        }
    };

    // Countdown effect for button cooldown
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timer); //If user navigates away, timer will be cleared
        } else if (countdown === 0 && isButtonDisabled) {
            setIsButtonDisabled(false);
        }
    }, [countdown, isButtonDisabled]);

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
        if (isUpdateSuccess) {
            setShowSuccessUpdateMessage(true);
        }
    }, [isUpdateSuccess]);

    if (isUpdatingProfile) {
        return (
            <View style={[styles.loadingContainer, {paddingTop: insets.top, paddingBottom: insets.bottom}]}>
                <View>
                    <Image source={require('../../../../assets/images/Loading_Pig.png')} style={styles.image} />
                    <LoadingDots style ={styles.text} loadingText = {'Updating Profile'} />
                </View>
            </View>
        );
    }

    if (updateProfileError) {
        return <ErrorScreen
            errorText = "Error updating profile"
            errorSubText = "Please try again later"
            errorMessage = {updateProfileError.message}
        />;
    }

    return (
        <View style = {[styles.container, {paddingTop: insets.top}]}>
            <ScrollView
            showsVerticalScrollIndicator = {false}
            contentContainerStyle = {[styles.scrollViewContent, {paddingBottom: insets.bottom + height * 0.5}]}
            >
                <View style = {styles.headerSection}>
                    <BackButton />
                    <Text style = {styles.title}>Edit Profile</Text>
                    <FontAwesome6 name = "empty" size = {fontSize.xxl + 6} color = {colors.background} />
                </View>
                <PersonalInfoCard />
                {isLoading && <LoadingDots style = {styles.validatingText} loadingText = "Validating" />}
                {showInvalidFieldsAbove && <Text style = {styles.invalidFieldsAboveText}>There are some invalid fields above</Text>}
                <AnimatedPressable
                    style = {[
                        styles.saveProfileButton,
                        (isLoading || isButtonDisabled) && styles.disabledSaveProfileButton,
                    ]}
                    onPress = {handleSaveProfile}
                    disabled = {isLoading || isButtonDisabled}
                >
                    <Text style = {styles.saveProfileButtonText}>
                        {isButtonDisabled && countdown > 0
                            ? `Wait ${countdown}s`
                            : 'Save Profile'
                        }
                    </Text>
                </AnimatedPressable>
            </ScrollView>
            <Modal
                visible = {showPasswordEnterToSaveModal}
                animationType = "fade"
                transparent = {true}
                onRequestClose = {() => {
                    setShowPasswordEnterToSaveModal(false);
                    setPassword('');
                    setPasswordValidationError(null);
                    setIsPasswordButtonDisabled(false);
                    setPasswordCountdown(0);
                }}>
                    <View style = {styles.passwordEnterToSaveModalContainer}>
                        <View style = {styles.passwordEnterToSaveModalContent}>
                            <Text style = {styles.passwordEnterToSaveModalTitle}>Enter Password to Save</Text>
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
                                    onPress={handleCompleteSaveProfile}
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
                                            : 'Save'
                                        }
                                    </Text>
                                </AnimatedPressable>
                                <AnimatedPressable
                                    onPress={() => {
                                        setShowPasswordEnterToSaveModal(false);
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
            <Modal
                visible={showSuccessUpdateMessage}
                animationType="fade"
                onRequestClose={() => setShowSuccessUpdateMessage(false)}
                >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Image source={require('../../../../assets/images/confirmation.png')} style={styles.modalImage} />
                        <Text style={styles.modalTitle}>Update Success!</Text>
                        <Text style={styles.modalText}>Your profile has been updated successfully</Text>
                        <View style={styles.modalButtons}>
                            <AnimatedPressable
                                onPress={() => {
                                    setShowSuccessUpdateMessage(false);
                                    resetAllFields();
                                    navigation.goBack();
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
