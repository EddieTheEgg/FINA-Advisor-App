import { Dimensions, Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
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

export const EditProfileScreen = () => {
    const insets = useSafeAreaInsets();
    const height = Dimensions.get('window').height;

    const {validateProfileInfo} = useEditProfileStore();
    const [showInvalidFieldsAbove, setShowInvalidFieldsAbove] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [showPasswordEnterToSaveModal, setShowPasswordEnterToSaveModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');

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

    const handleCompleteSaveProfile = () => {
        //First validate the password is correct

        setShowPasswordEnterToSaveModal(false);
        //Do the save here via query call
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
                onRequestClose = {() => setShowPasswordEnterToSaveModal(false)}>
                    <View style = {styles.passwordEnterToSaveModalContainer}>
                        <View style = {styles.passwordEnterToSaveModalContent}>
                            <Text style = {styles.passwordEnterToSaveModalTitle}>Enter Password to Save</Text>
                                <TextInput
                                    placeholder="Password"
                                    style={styles.passwordEnterToSaveModalInput}
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={showPassword}
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
                            <View style = {styles.passwordEnterToSaveModalButtons}>
                            <AnimatedPressable
                                    onPress={handleCompleteSaveProfile}
                                    style={styles.passwordEnterToSaveModalButton}
                                >
                                    <Text style={styles.passwordEnterToSaveModalButtonText}>Save</Text>
                                </AnimatedPressable>
                                <AnimatedPressable
                                    onPress={() => {setShowPasswordEnterToSaveModal(false);}}
                                    style={styles.cancelPasswordEnterToSaveModalButton}>
                                    <Text style={styles.cancelPasswordEnterToSaveModalButtonText}>Cancel</Text>
                                </AnimatedPressable>
                            </View>
                        </View>
                    </View>
            </Modal>
        </View>
    );
};
