import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './CreateAccount.styles';
import { FirstNameInput } from '../../components/CreateAccountComponents/FirstNameInput/FirstNameInput';
import { LastNameInput } from '../../components/CreateAccountComponents/LastNameInput/LastNameInput';
import { EmailInput } from '../../components/CreateAccountComponents/EmailInput/EmailInput';
import { PasswordInputs } from '../../components/CreateAccountComponents/PasswordInputs/PasswordInputs';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { useSignupStore } from '../../store/useSignupStore';
import { LoadingDots } from '../../../../components/LoadingDots/LoadingDots';

const CreateAccountScreen = () => {
    const insets  = useSafeAreaInsets();
    const { validateCreateAccount } = useSignupStore();
    const [isLoading, setIsLoading] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [countdown, setCountdown] = useState(0);

    const handleContinueToStep2 = async () => {
        if (isButtonDisabled) {
            return;
        }
        setIsLoading(true);
        setIsButtonDisabled(true);
        setCountdown(10);
        try {
            const isValid = await validateCreateAccount();
            if (!isValid) {
                return;
            }
            console.log('Continue to step 2');
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Countdown effect for button cooldown
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (countdown === 0 && isButtonDisabled) {
            setIsButtonDisabled(false);
        }
    }, [countdown, isButtonDisabled]);

    return (
        <View style = {[ styles.container,{paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <View>
                <View style = {styles.headerContainer}>
                    <Text style = {styles.headerText}>Create Account</Text>
                    <Text style = {styles.subHeaderText}>Step 1 of 4</Text>
                    <View style = {styles.dotProgressContainer}>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <View key = {index} style = {[styles.dotProgress, index === 0 && styles.activeDot]}/>
                            ))}
                        </View>
                </View>
                <View style = {styles.formContainer}>
                    <FirstNameInput />
                    <LastNameInput />
                    <EmailInput />
                    <PasswordInputs />
                </View>
                {isLoading && <LoadingDots style = {styles.validatingText} loadingText = "Validating" />}
                <AnimatedPressable
                    style = {[
                        styles.continueButton,
                        (isLoading || isButtonDisabled) && styles.disabledButton,
                    ]}
                    onPress = {handleContinueToStep2}
                    disabled = {isLoading || isButtonDisabled}
                >
                    <Text style = {styles.continueButtonText}>
                        {isButtonDisabled && countdown > 0
                            ? `Wait ${countdown}s`
                            : 'Continue'
                        }
                    </Text>
                </AnimatedPressable>
            </View>
        </View>
    );
};


export default CreateAccountScreen;


